// Testes de API com Supertest
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { pool } from './db.js';

const API_URL = 'http://localhost:3000';

describe('API de Eventos', () => {
  let eventoIdCriado;

  afterAll(async () => {
    // Limpar evento de teste
    if (eventoIdCriado) {
      await pool.query('DELETE FROM eventos WHERE id = $1', [eventoIdCriado]);
    }
    await pool.end();
  });

  describe('POST /cadastroEvento', () => {
    it('deve cadastrar um novo evento com sucesso', async () => {
      const novoEvento = {
        titulo: 'Workshop API Test',
        descricao: 'Descrição do workshop de teste',
        data: '2025-06-01',
        apresentadores: 'Prof. Teste',
        vagas: 30,
        contato: 'teste@uepa.br'
      };

      const response = await request(API_URL)
        .post('/cadastroEvento')
        .send(novoEvento)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.titulo).toBe(novoEvento.titulo);
      expect(response.body.vagasrestantes).toBe(novoEvento.vagas);

      eventoIdCriado = response.body.id;
    });

    it('deve retornar erro 500 ao faltar campos obrigatórios', async () => {
      const eventoIncompleto = {
        titulo: 'Evento Incompleto'
        // faltando outros campos
      };

      const response = await request(API_URL)
        .post('/cadastroEvento')
        .send(eventoIncompleto)
        .expect(500);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /eventos', () => {
    it('deve listar todos os eventos', async () => {
      const response = await request(API_URL)
        .get('/eventos')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('titulo');
        expect(response.body[0]).toHaveProperty('vagasrestantes');
      }
    });
  });

  describe('GET /eventos/:id', () => {
    it('deve retornar um evento específico', async () => {
      const response = await request(API_URL)
        .get(`/eventos/${eventoIdCriado}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', eventoIdCriado);
      expect(response.body).toHaveProperty('titulo');
    });

    it('deve retornar 404 para evento inexistente', async () => {
      const response = await request(API_URL)
        .get('/eventos/99999')
        .expect(404);

      expect(response.body.message).toContain('não encontrado');
    });
  });

  describe('PUT /eventos/:id', () => {
    it('deve atualizar um evento existente', async () => {
      const eventoAtualizado = {
        titulo: 'Workshop Atualizado',
        descricao: 'Nova descrição',
        data: '2025-06-15',
        apresentadores: 'Prof. Atualizado',
        vagasRestantes: 25,
        contato: 'novo@uepa.br'
      };

      const response = await request(API_URL)
        .put(`/eventos/${eventoIdCriado}`)
        .send(eventoAtualizado)
        .expect(200);

      expect(response.body.titulo).toBe(eventoAtualizado.titulo);
      expect(response.body.vagasrestantes).toBe(25);
    });

    it('deve retornar 404 ao atualizar evento inexistente', async () => {
      const response = await request(API_URL)
        .put('/eventos/99999')
        .send({ titulo: 'Teste' })
        .expect(404);

      expect(response.body.message).toContain('não encontrado');
    });
  });

  describe('DELETE /eventos/:id', () => {
    it('deve deletar um evento existente', async () => {
      const response = await request(API_URL)
        .delete(`/eventos/${eventoIdCriado}`)
        .expect(200);

      expect(response.body.message).toContain('deletado com sucesso');

      // Verificar se foi realmente deletado
      await request(API_URL)
        .get(`/eventos/${eventoIdCriado}`)
        .expect(404);

      eventoIdCriado = null; // Limpar referência
    });

    it('deve retornar 404 ao deletar evento inexistente', async () => {
      const response = await request(API_URL)
        .delete('/eventos/99999')
        .expect(404);

      expect(response.body.message).toContain('não encontrado');
    });
  });
});

describe('API de Notícias', () => {
  let noticiaIdCriada;

  afterAll(async () => {
    if (noticiaIdCriada) {
      await pool.query('DELETE FROM noticias WHERE id = $1', [noticiaIdCriada]);
    }
  });

  describe('POST /cadastroNoticia', () => {
    it('deve cadastrar uma nova notícia', async () => {
      const novaNoticia = {
        titulo: 'Notícia de Teste API',
        texto: 'Conteúdo da notícia de teste para a API'
      };

      const response = await request(API_URL)
        .post('/cadastroNoticia')
        .send(novaNoticia)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.titulo).toBe(novaNoticia.titulo);
      expect(response.body).toHaveProperty('data_criacao');

      noticiaIdCriada = response.body.id;
    });
  });

  describe('GET /noticias', () => {
    it('deve listar últimas 5 notícias ordenadas por data', async () => {
      const response = await request(API_URL)
        .get('/noticias')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeLessThanOrEqual(5);

      if (response.body.length > 1) {
        // Verificar ordenação (mais recente primeiro)
        const primeira = new Date(response.body[0].data_criacao);
        const segunda = new Date(response.body[1].data_criacao);
        expect(primeira >= segunda).toBe(true);
      }
    });
  });

  describe('DELETE /noticias/:id', () => {
    it('deve deletar uma notícia existente', async () => {
      const response = await request(API_URL)
        .delete(`/noticias/${noticiaIdCriada}`)
        .expect(200);

      expect(response.body.message).toContain('deletada com sucesso');
      noticiaIdCriada = null;
    });
  });
});

describe('API de Inscrições', () => {
  let eventoTesteId;
  let inscricaoId;

  beforeAll(async () => {
    // Criar evento para teste
    const evento = await pool.query(`
      INSERT INTO eventos (titulo, descricao, data, apresentadores, vagasrestantes, contato)
      VALUES ('Evento Teste Inscrição', 'Descrição', '2025-07-01', 'Prof. Teste', 5, 'teste@uepa.br')
      RETURNING id
    `);
    eventoTesteId = evento.rows[0].id;
  });

  afterAll(async () => {
    if (inscricaoId) {
      await pool.query('DELETE FROM inscricoes WHERE id = $1', [inscricaoId]);
    }
    if (eventoTesteId) {
      await pool.query('DELETE FROM eventos WHERE id = $1', [eventoTesteId]);
    }
  });

  describe('POST /inscricoes', () => {
    it('deve criar uma inscrição com sucesso', async () => {
      const inscricao = {
        eventoId: eventoTesteId,
        nomeCompleto: 'João Teste Silva',
        cpf: '123.456.789-00',
        numeroMatricula: '202312345',
        email: 'joao.teste@aluno.uepa.br',
        telefone: '(91) 98765-4321',
        curso: 'Ciência da Computação'
      };

      const response = await request(API_URL)
        .post('/inscricoes')
        .send(inscricao)
        .expect(201);

      expect(response.body.message).toContain('sucesso');
      expect(response.body).toHaveProperty('inscricao');
      inscricaoId = response.body.inscricao.id;
    });

    it('deve diminuir vagas restantes após inscrição', async () => {
      const eventoAntes = await pool.query(
        'SELECT vagasrestantes FROM eventos WHERE id = $1',
        [eventoTesteId]
      );

      const inscricao = {
        eventoId: eventoTesteId,
        nomeCompleto: 'Maria Teste',
        cpf: '987.654.321-00',
        numeroMatricula: '202312346',
        email: 'maria@aluno.uepa.br',
        telefone: '(91) 98765-1234',
        curso: 'Sistemas de Informação'
      };

      await request(API_URL)
        .post('/inscricoes')
        .send(inscricao)
        .expect(201);

      const eventoDepois = await pool.query(
        'SELECT vagasrestantes FROM eventos WHERE id = $1',
        [eventoTesteId]
      );

      expect(eventoDepois.rows[0].vagasrestantes).toBe(
        eventoAntes.rows[0].vagasrestantes - 1
      );
    });

    it('deve retornar erro para evento sem vagas', async () => {
      // Zerar vagas do evento
      await pool.query(
        'UPDATE eventos SET vagasrestantes = 0 WHERE id = $1',
        [eventoTesteId]
      );

      const inscricao = {
        eventoId: eventoTesteId,
        nomeCompleto: 'Pedro Teste',
        cpf: '111.222.333-44',
        numeroMatricula: '202312347',
        email: 'pedro@aluno.uepa.br',
        telefone: '(91) 91234-5678',
        curso: 'Engenharia'
      };

      const response = await request(API_URL)
        .post('/inscricoes')
        .send(inscricao)
        .expect(400);

      expect(response.body.message).toContain('vagas');
    });

    it('deve retornar erro para evento inexistente', async () => {
      const inscricao = {
        eventoId: 99999,
        nomeCompleto: 'Teste',
        cpf: '123.456.789-00',
        numeroMatricula: '123',
        email: 'test@test.com',
        telefone: '123',
        curso: 'Teste'
      };

      const response = await request(API_URL)
        .post('/inscricoes')
        .send(inscricao)
        .expect(404);

      expect(response.body.message).toContain('não encontrado');
    });
  });

  describe('GET /eventos/:id/inscricoes', () => {
    it('deve listar inscrições de um evento', async () => {
      const response = await request(API_URL)
        .get(`/eventos/${eventoTesteId}/inscricoes`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('evento_id', eventoTesteId);
        expect(response.body[0]).toHaveProperty('nome_completo');
      }
    });
  });
});