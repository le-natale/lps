import importlib.util
from ftplib import error_perm
from io import BytesIO
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location("deploy_chat", Path(__file__).with_name("deploy-chat-eve.py"))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class FakeFTP:
    def __init__(self, files, fail_rename=False):
        self.files = dict(files)
        self.writes = []
        self.fail_rename = fail_rename

    def retrbinary(self, command, callback):
        name = command.removeprefix("RETR ")
        if name not in self.files:
            raise error_perm("550 not found")
        callback(self.files[name])

    def storbinary(self, command, source):
        name = command.removeprefix("STOR ")
        self.writes.append(name)
        self.files[name] = source.read()

    def rename(self, source, destination):
        if self.fail_rename:
            raise error_perm("550 rename denied")
        self.files[destination] = self.files.pop(source)


class DeployTest(unittest.TestCase):
    def setUp(self):
        self.original = b'<script src="https://app.fluxianexus.com.br/chat-widget.js" data-agent="reservas"></script>'
        self.candidate = self.original
        for old, new in module.REPLACEMENTS:
            self.candidate = self.candidate.replace(old, new)
        self.expected = module.EXPECTED_BLOB
        module.EXPECTED_BLOB = module.git_blob(self.original)

    def tearDown(self):
        module.EXPECTED_BLOB = self.expected

    def test_publish_changes_only_index_and_keeps_backup_and_other_files(self):
        ftp = FakeFTP({"index.html": self.original, "foto.jpg": b"preservada"})
        module.publish(ftp, self.candidate)
        self.assertEqual(ftp.files["index.html"], self.candidate)
        self.assertEqual(ftp.files[module.BACKUP], self.original)
        self.assertEqual(ftp.files["foto.jpg"], b"preservada")

    def test_changed_remote_is_not_written(self):
        ftp = FakeFTP({"index.html": b"outra versao", "foto.jpg": b"preservada"})
        with self.assertRaises(ValueError):
            module.publish(ftp, self.candidate)
        self.assertEqual(ftp.writes, [])

    def test_candidate_with_extra_changes_is_not_written(self):
        ftp = FakeFTP({"index.html": self.original})
        with self.assertRaises(ValueError):
            module.publish(ftp, self.candidate + b"alteracao extra")
        self.assertEqual(ftp.writes, [])

    def test_rename_failure_keeps_original_and_backup(self):
        ftp = FakeFTP({"index.html": self.original}, fail_rename=True)
        with self.assertRaises(error_perm):
            module.publish(ftp, self.candidate)
        self.assertEqual(ftp.files["index.html"], self.original)
        self.assertEqual(ftp.files[module.BACKUP], self.original)


if __name__ == "__main__":
    unittest.main()
