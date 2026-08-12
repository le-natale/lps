# Landing pages de clientes

Este repositório centraliza as landing pages publicadas pela FluxIA.

## Ambientes

- `develop`: homologação via FTP.
- `main`: produção via SSH na VPS.

As alterações devem ser testadas em `develop` e promovidas para `main`
somente depois da aprovação.

## Estrutura

Cada cliente possui uma pasta independente em `sites/`:

```text
sites/
└── pousada-villa-monte-verde/
    ├── index.html
    └── logo-villa-monte-verde-dourado.png
```

Novos clientes devem receber uma pasta própria e workflows com grupos de
concorrência, destinos e verificações exclusivos. Isso evita que uma LP altere
os arquivos de outra.

## Pousada Villa Monte Verde

- Homologação: https://fluxianexus.com.br/lp/pousada-villa-monte-verde/
- Produção: https://lps.pousadavillamonteverde.com.br/
- Container de produção: `lps-manutencao`
- Diretório no container: `/usr/share/nginx/html`

## Secrets necessários

Homologação:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_PORT`

Produção:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_HOST_KEY`
