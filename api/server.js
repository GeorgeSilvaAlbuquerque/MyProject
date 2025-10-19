const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com MongoDB (pode usar MongoDB Atlas ou local)
mongoose.connect("mongodb://localhost:27017/usuarios", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Modelo de usuário
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
});

const User = mongoose.model("User", UserSchema);

// Rota de cadastro
app.post("/register", async (req, res) => {
  try {
    const { email, password, birthDate } = req.body;

    // Gera hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      birthDate,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (err) {
    res.status(400).json({ error: "Erro ao registrar usuário", details: err });
  }
});

// Rota de login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  // Compara senha digitada com hash salvo
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Senha incorreta" });
  }

  res.json({ message: "Login bem-sucedido!" });
});

// Inicia servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});