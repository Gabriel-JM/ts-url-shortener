# TypeScript URL Shortener

Um encurtador de URL feito com Node.js + TypeScript.

## Instalação
É necessário possuir Docker.

**PostgreSQL**
```bash
  docker run -p 5432:5432 -d \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=url_shortener_db \
    -v pgdata:/var/lib/postgres/data \
    postgres
```

**Imagem do Projeto**
```bash
  docker build -t ts-url-shortener-image .
```

> **OBS:** Eu tentei usar docker-compose porém não estava funcionando corretamente.

## Variáveis de ambiente
- PORT: padrão 3200
- DB_URL: string de conexão com o banco de dados, seguindo esse formato:
  `postgresql://<user>:<password>@<host>/<database>`, por exemplo postgresql://postgres:postgres@localhost/url_shortener_db

## Executando
**Produção:**
```bash
  npm i
  npm run build
  npm start
```

**Desenvolvimento:**
```bash
  npm i
  npm run dev
```

## Utilização

### Gerando a URL encurtada

Faça uma requisição POST para o dominio, por exemplo `http://localhost/encurtador`, com o body de
```json
  {
    "url": "http://url.com"
  }
```

e irá receber uma resposta com a url encurtada
```json
  {
    "url": "http://localhost/abc123"
  }
```

### Acessando a página

Acesse o link encurtado ou faça um requisição GET e será redirecionado ao link correto.
