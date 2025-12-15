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

// Exibir todos os eventos
app.get("/eventos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM eventos ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar eventos." });
  }
});

// Buscar evento por ID (NOVO)
app.get("/eventos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("SELECT * FROM eventos WHERE id = $1", [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Evento não encontrado." });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar evento." });
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

// Criar inscrição em evento (NOVO)
app.post("/inscricoes", async (req, res) => {
  try {
    const { 
      eventoId, 
      nomeCompleto, 
      cpf, 
      numeroMatricula, 
      email, 
      telefone, 
      curso 
    } = req.body;

    // Verifica se o evento existe e tem vagas
    const eventoResult = await pool.query(
      "SELECT vagasrestantes FROM eventos WHERE id = $1", 
      [eventoId]
    );

    if (eventoResult.rowCount === 0) {
      return res.status(404).json({ message: "Evento não encontrado." });
    }

    if (eventoResult.rows[0].vagasrestantes <= 0) {
      return res.status(400).json({ message: "Não há vagas disponíveis para este evento." });
    }

    // Insere a inscrição
    const insertQuery = `
      INSERT INTO inscricoes 
      (evento_id, nome_completo, cpf, numero_matricula, email, telefone, curso, data_inscricao)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *;
    `;
    const values = [eventoId, nomeCompleto, cpf, numeroMatricula, email, telefone, curso];
    const inscricaoResult = await pool.query(insertQuery, values);

    // Atualiza o número de vagas restantes
    await pool.query(
      "UPDATE eventos SET vagasrestantes = vagasrestantes - 1 WHERE id = $1",
      [eventoId]
    );

    res.status(201).json({
      message: "Inscrição realizada com sucesso!",
      inscricao: inscricaoResult.rows[0]
    });
  } catch (error) {
    console.error(error);
    
    // Verifica se é erro de chave duplicada (usuário já inscrito)
    if (error.code === '23505') {
      return res.status(400).json({ 
        message: "Você já está inscrito neste evento." 
      });
    }
    
    res.status(500).json({ message: "Erro ao realizar inscrição." });
  }
});

// Listar inscrições de um evento (NOVO)
app.get("/eventos/:id/inscricoes", async (req, res) => {
  try {
    const eventoId = req.params.id;
    const result = await pool.query(
      "SELECT * FROM inscricoes WHERE evento_id = $1 ORDER BY data_inscricao DESC",
      [eventoId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar inscrições." });
  }
});

// ==================== ROTAS DE NOTÍCIAS ====================

// Criar notícia
app.post("/cadastroNoticia", async (req, res) => {
  try {
    const { titulo, texto } = req.body;
    const query = `
      INSERT INTO noticias 
      (titulo, texto, data_criacao)
      VALUES ($1, $2, NOW())
      RETURNING *;
    `;
    const values = [titulo, texto];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar notícia." });
  }
});

// Listar notícias (últimas 5, ordenadas por data)
app.get("/noticias", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM noticias ORDER BY data_criacao DESC LIMIT 5"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar notícias." });
  }
});

// Deletar notícia por ID
app.delete("/noticias/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("DELETE FROM noticias WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Notícia não encontrada." });
    }
    res.json({ message: "Notícia deletada com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar notícia." });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});