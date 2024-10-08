require('dotenv').config();
const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const port = 6001

// Rotas
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);

// Sincronizar os modelos com os respectivos bancos de dados
async function syncDatabases() {
    try {
        // Sincroniza o banco de dados de usuários
        await User.sync();
        console.log('User database synchronized');

    } catch (error) {
        console.error('Error syncing databases:', error);
    }
}

syncDatabases();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
