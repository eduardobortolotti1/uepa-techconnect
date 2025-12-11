import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// Criar evento
app.post("/cadastroEvento", async (req, res) => {
  try {
    const { titulo, descricao, data, apresentadores, vagas, contato } = req.body;

    const query = `
      INSERT INTO eventos 
      (titulo, descricao, data, apresentadores, vagasRestantes, contato)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [titulo, descricao, data, apresentadores, vagas, contato];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar evento." });
  }
});

// Exibir todos
app.get("/eventos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM eventos ORDER BY id ASC");
    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ message: "Erro ao listar eventos." });
  }
});

// Deletar por ID
app.delete("/eventos/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query("DELETE FROM eventos WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Evento não encontrado." });
    }

    res.json({ message: "Evento deletado com sucesso." });

  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar evento." });
  }
});

// Atualizar evento por ID
app.put("/eventos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, descricao, data, apresentadores, vagasRestantes, contato } = req.body;

    const query = `
      UPDATE eventos
      SET titulo = $1,
          descricao = $2,
          data = $3,
          apresentadores = $4,
          vagasRestantes = $5,
          contato = $6
      WHERE id = $7
      RETURNING *;
    `;

    const values = [titulo, descricao, data, apresentadores, vagasRestantes, contato, id];

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Evento não encontrado." });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar evento." });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
