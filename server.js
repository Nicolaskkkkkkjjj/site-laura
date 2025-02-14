const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do PostgreSQL
const pool = new Pool({
    user: 'postgres',        // Substitua pelo seu usuário do PostgreSQL
    host: 'localhost',          // Host do banco de dados
    database: 'postgres',      // Nome do banco de dados
    password: 'Sabonete1299',      // Senha do banco de dados
    port: 5432,                 // Porta do PostgreSQL
});

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para receber a sugestão
app.post('/sugestao', async (req, res) => {
    const { sugestao } = req.body;
    
    if (!sugestao) {
        return res.status(400).json({ error: 'Sugestão é obrigatória.' });
    }
    
    try {
        // Insere a sugestão no banco de dados
        const result = await pool.query(
            'INSERT INTO sugestoes (lugar) VALUES ($1) RETURNING *',
            [sugestao]
        );
        
        res.status(201).json({ message: 'Sugestão enviada com sucesso!', data: result.rows[0] });
    } catch (error) {
        console.error('Erro ao salvar sugestão:', error);
        res.status(500).json({ error: 'Erro ao processar a sugestão.' });
    }
});

app.use(cors());
app.use(bodyParser.json());

// Rota para receber a data e a hora
app.post('/agendar', async (req, res) => {
    const { data, hora } = req.body;
    
    if (!data || !hora) {
        return res.status(400).json({ error: 'Data e hora são obrigatórias.' });
    }
    
    try {
        const result = await pool.query(
            'INSERT INTO agendamentos (data, hora) VALUES ($1, $2) RETURNING *',
            [data, hora]
        );
        
        res.status(201).json({ message: 'Agendamento salvo com sucesso!', data: result.rows[0] });
    } catch (error) {
        console.error('Erro ao salvar agendamento:', error);
        res.status(500).json({ error: 'Erro ao processar o agendamento.' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

