# 🚶 Calculador de Rotas a Pé

Front-end em React do Projeto 3 de Programação Eficaz (Insper, 2026/2).

## 🔗 Links

- **Site:** http://route-calculator-static.s3-website.us-east-2.amazonaws.com
- **API:** http://3.141.166.91
- **Servidor:** https://github.com/Luigiverderio/server-app-progeficaz

## ✨ Funcionalidades

- Cadastro e login com JWT
- Rota a pé no mapa, com distância e tempo
- CRUD completo de favoritas:
  - **Criar:** salvar a rota calculada com um nome (`POST /favoritas`)
  - **Listar:** ver todas as favoritas na página Favoritas (`GET /favoritas`)
  - **Atualizar:** recalcular a rota e atualizar o tempo salvo (`PUT /favoritas/<id>`)
  - **Apagar:** remover uma favorita (`DELETE /favoritas/<id>`)

## 🛠️ Tecnologias

React · Vite · React Router · axios · Leaflet

## 💻 Como rodar

```bash
npm install
npm run dev
```
