"""Publica apenas o index da landing, preservando backup e demais arquivos."""
from ftplib import FTP_TLS, error_perm
from hashlib import sha1, sha256
from io import BytesIO
from pathlib import Path
import os
import ssl
import sys

EXPECTED_BLOB = "5abf45a60b45436f35f111604d81fa6fa8ea2030"
BACKUP = "index.before-eve-5abf45a.backup"
REPLACEMENTS = (
    (b'src="https://app.fluxianexus.com.br/chat-widget.js"',
     b'src="https://app.fluxianexus.com.br/chat-widget.js?v=eve-casamentos-1"'),
    (b'data-agent="reservas"', b'data-agent="casamentos"'),
)


def retrieve(ftp, name, *, optional=False):
    output = BytesIO()
    try:
        ftp.retrbinary("RETR " + name, output.write)
    except error_perm as exc:
        if optional and str(exc).startswith("550"):
            return None
        raise
    return output.getvalue()


def git_blob(data):
    return sha1(b"blob " + str(len(data)).encode() + b"\0" + data).hexdigest()


def publish(ftp, candidate):
    current = retrieve(ftp, "index.html")
    if current == candidate:
        return "A página já estava atualizada."
    if git_blob(current) != EXPECTED_BLOB:
        raise ValueError("A página remota mudou desde a verificação; publicação interrompida.")
    expected = current
    for old, new in REPLACEMENTS:
        if expected.count(old) != 1:
            raise ValueError("A alteração esperada não foi encontrada uma única vez.")
        expected = expected.replace(old, new, 1)
    if expected != candidate:
        raise ValueError("O arquivo candidato contém alterações além do chat.")

    backup = retrieve(ftp, BACKUP, optional=True)
    if backup is None:
        ftp.storbinary("STOR " + BACKUP, BytesIO(current))
        if retrieve(ftp, BACKUP) != current:
            raise ValueError("O backup não foi confirmado.")
    elif backup != current:
        raise ValueError("Já existe um backup diferente; publicação interrompida.")

    staging = "index.eve-chat-" + sha256(candidate).hexdigest()[:12] + ".tmp"
    existing = retrieve(ftp, staging, optional=True)
    if existing is None:
        ftp.storbinary("STOR " + staging, BytesIO(candidate))
        if retrieve(ftp, staging) != candidate:
            raise ValueError("O arquivo de preparação não foi confirmado.")
    elif existing != candidate:
        raise ValueError("O arquivo de preparação já existe com outro conteúdo.")

    ftp.rename(staging, "index.html")
    if retrieve(ftp, "index.html") != candidate:
        raise ValueError("A atualização remota não foi confirmada; o backup foi preservado.")
    return "Chat de casamentos publicado; backup e demais arquivos preservados."


def main():
    keys = ("FTP_SERVER", "FTP_PORT", "FTP_USERNAME", "FTP_PASSWORD")
    if not all(os.environ.get(k) for k in keys):
        raise ValueError("Configuração de publicação incompleta.")
    candidate = Path("sites/pousada-villa-monte-verde/index.html").read_bytes()
    with FTP_TLS(context=ssl.create_default_context(), timeout=45) as ftp:
        ftp.connect(os.environ["FTP_SERVER"], int(os.environ["FTP_PORT"]))
        ftp.login(os.environ["FTP_USERNAME"], os.environ["FTP_PASSWORD"])
        ftp.prot_p()
        ftp.cwd("./lp/pousada-villa-monte-verde/")
        print(publish(ftp, candidate))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print("Falha na publicação:", type(exc).__name__, file=sys.stderr)
        sys.exit(1)
