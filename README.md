# 📋 Lista de Tarefas

Este projeto é a minha primeira API criada em Node.js. 

É um sistema que Lista, cria, atualiza, deleta tarefas e as organiza por status que a tarefa se encontra. 

É um crud que ultiliza  métodos de requisições HTTP, com validações de Testes Unitarios via Jest no Back-End.   

O Desing busca ser simples mas ao mesmo tempo bonito e muito funcional, contendo validações de entrada, facilidade de uso e responsividade em larguras de até 320px. 

## 🚀 Tecnologias Utilizadas

As seguintes tecnologias foram utilizadas no desenvolvimento do projeto:

<div style="display: inline_block">
  <img align="center" alt="js" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img align="center" alt="nodejs" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img align="center" alt="Express" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
  <img align="center" alt="mySql" src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" />
  <img align="center" alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img align="center" alt="jest" src="https://img.shields.io/badge/Jest-FFF?style=for-the-badge&logo=jest&logoColor=orange" />
 
</div><br/>



## ⚙️ Funcionalidades

- **Criar Tarefa** (Método `POST`)
- **Listar Tarefas** (Método `GET`)
- **Atualizar Tarefa** (Método `PUT`)
- **Excluir Tarefa** (Método `DELETE`)

## 🔨 Dependências Principais:
- **npm init -y**  Inicializa o projeto e cria o package.json
- **npm i express** Framework para construir a API
- **npm i mysql2** Driver para conexão com MySQL
- **npm i dotenv** Carregar variáveis de ambiente do arquivo .env

## 🔨 Dependências de Desenvolvimento:
- **npm i nodemon -D** = Reinicia o servidor automaticamente ao salvar os arquivos
- **npx eslint --init** = Inicializa e configura o ESLint para padronização de código
- **docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql** = Conteiner MySql Docker

## 📚 Biblioteca:
- **Toastify.js:** https://apvarun.github.io/toastify-js/
- **Jest.js:** https://jestjs.io/pt-BR/docs/getting-started

<br>

## 📌 Como Funciona:

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd nome-do-projeto
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Edite as variaveis de ambiente no .env:
   ```sh
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root
   DB_DATABASE=tasklist
   PORT=3000
   ```
5. Inicie o container MySQL (caso use Docker):
   ```sh
   docker run --name mysql \
   -e MYSQL_ROOT_PASSWORD=root \
   -p 3306:3306 \
   -d mysql
   ```
6. Inicie o servidor com nodemon:
   ```sh 
   npm run dev
   ```
   
<br>

## 🖥 Video do Projeto:


https://github.com/user-attachments/assets/dba308a8-5a8f-4edb-a137-09981bb65217


---

