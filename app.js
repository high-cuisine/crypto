const express = require('express');
const path = require('path');
const app = express();
const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crypto',
    password: 'qwerty',
    port: 5432,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile((path.join(__dirname, 'public', 'index.html')));
});

app.use('/application.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'application.html'));
    return;
});

app.post('/api/dates', async (req, res) => {
    const {email} = req.body;
    console.log(email);
    try {
        await addUser(email);
        res.redirect('./application.html');
        console.log('pop');
        return;
    }
    catch(error) {
        console.error('Ошибка при добавлении пользователя:', error);
        res.status(500).send('Ошибка при добавлении пользователя');
    }
})
pool.query('SELECT * FROM users', (error, result) => {
    if(error) {
        trow (error);
    }
    console.log(result.rows);
});

async function addUser(email) {
    let status = 'first';
    const query = `
        INSERT INTO users (transaction_status, email)
        VALUES ($1, $2)
        RETURNING id
    `;
    const { rows } = await pool.query(query, [status, email]);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server work');
});
