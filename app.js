const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Capturar dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve arquivos estáticos da raiz

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && user.password === password) {
      res.send('Login realizado com sucesso!');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (error) {
    res.status(500).send('Erro ao fazer login: ' + error.message);
  }
});

// Cadastro
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.send('Usuário registrado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao registrar usuário: ' + error.message);
  }
});

// Servidor ok
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
