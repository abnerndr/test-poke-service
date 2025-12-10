# Teste Técnico — Reverbs

Seu desafio é desenvolver uma **Pokedex completa**, utilizando como base a API pública **PokeAPI ([https://pokeapi.co/](https://pokeapi.co/))**. O projeto deverá ser dividido em **duas partes**: uma API própria (backend) e uma interface visual (frontend).

Você pode escolher livremente entre as tecnologias permitidas para cada parte.

---

## 🎯 Objetivo Geral

Criar uma aplicação capaz de exibir pokémons, visualizar detalhes individuais e realizar simulações de batalha entre dois pokémons, registrando o resultado em banco de dados.

---

## 🧩 Requisitos da API (Backend)

A API deverá:

1. **Consumir a PokeAPI** e realizar o **tratamento dos dados** antes de enviá-los ao frontend.
2. **Servir integralmente** o frontend — o frontend **não pode** acessar diretamente a PokeAPI.
3. **Integrar com uma IA** (de livre escolha) para auxiliar ou simular batalhas.
4. **Simular batalhas entre pokémons**, utilizando alguma lógica própria ou IA.
5. **Registrar o resultado das batalhas** em um banco de dados (tecnologia livre).

Tecnologias permitidas para backend:

- **NestJS**, **Next.js (API Routes)** ou **FastAPI**.

---

## 🖥️ Requisitos do Frontend

O frontend deverá:

1. Consumir **exclusivamente** a API desenvolvida pelo candidato.
2. Realizar o **tratamento e validação** dos dados recebidos.
3. Conter as seguintes páginas:
   - **Página de listagem de pokémons** (pode ser paginada).
   - **Página individual de um pokémon**, contendo **pelo menos 6 características** (+ nome e imagem).
   - **Página de batalha**, onde o usuário selecionará dois pokémons e visualizará o resultado.

Tecnologias permitidas para frontend:

- **Angular**, **React** ou **Next.js**.

---

## 📦 Banco de Dados

- Livre escolha (PostgreSQL, MySQL, MongoDB, SQLite, etc.)
- Deve armazenar **resultados das batalhas**, contendo no mínimo:
  - Pokémons envolvidos
  - Pokémon vencedor
  - Data/hora
  - Qualquer outro dado que considerar relevante

---

## 🤖 Inteligência Artificial

A API deverá integrar com algum serviço de IA (de sua preferência) para auxiliar na simulação da batalha — o modo de uso da IA é livre.

---

## 📚 Entrega

O candidato deverá fornecer:

- Repositório com o código da API e do frontend.
- Instruções claras de como rodar o projeto localmente (README).
- Scripts ou instruções para configurar o banco de dados.

---

## ✔️ Critérios de Avaliação

- Organização do código
- Estruturação da API
- Implementação da lógica de batalha
- Uso adequado da IA
- Qualidade do frontend
- Clareza das instruções de instalação
- Boas práticas gerais

---

**Boa sorte!**
