# 🧾 Task Manager (CRUD)

Projeto simples de gerenciamento de tarefas (CRUD) desenvolvido para prática de back-end e integração com front-end.

🔗 **Repositório:** https://github.com/HainerPS/crud

---

## 🚀 Tecnologias utilizadas

* **Front-end:** HTML, CSS, JavaScript
* **Back-end:** Node.js + Express
* **Banco de dados:** SQLite
* **Ferramentas:** Cursor IDE, IA (Claude)

---

🌐 Deploy
🔗 Front-end: https://crud-rust-tau.vercel.app/
🔗 API (Back-end): https://crud-api-0q8i.onrender.com/

---

## 📌 Funcionalidades

* Criar tarefas
* Listar tarefas
* Excluir tarefas

---

## 🖼️ Preview da interface

### Tema escuro

![Tela do app no tema escuro](assets/tela-dark.png)

### Tema claro

![Tela do app no tema claro](assets/tela-light.png)

---

## ⚙️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/HainerPS/crud.git
```

---

### 2. Acessar a pasta do backend

```bash
cd backend
```

---

### 3. Instalar dependências

```bash
npm install
```

---

### 4. Rodar o servidor

```bash
node src/server.js
```

Servidor disponível em:

```text
http://localhost:3000
```

---

### 5. Abrir o front-end

Abra o arquivo:

```text
frontend/index.html
```

---

## 🔌 Endpoints da API

### GET /tasks

Lista todas as tarefas

### POST /tasks

Cria uma nova tarefa

Exemplo de body:

```json
{
  "title": "Nova tarefa"
}
```

### DELETE /tasks/:id

Remove uma tarefa pelo ID

---

## 🧠 Uso de IA

A inteligência artificial foi utilizada como apoio no desenvolvimento para:

* estruturar o projeto
* gerar sugestões de código
* explicar conceitos
* auxiliar na resolução de erros

Todo o código foi revisado, adaptado e testado manualmente.

---

## 📁 Estrutura do projeto

```
backend/
  src/
    controllers/
    routes/
    db.js
    server.js

frontend/
  css/
  js/
  index.html
```

---

## 📌 Observações

Projeto desenvolvido com foco em aprendizado e consolidação de conceitos de API REST e integração com front-end.

---

## 👨‍💻 Autor

Hainer Soares
🔗 https://github.com/HainerPS
🔗 https://www.linkedin.com/in/hainer-soares-b4487818b/
