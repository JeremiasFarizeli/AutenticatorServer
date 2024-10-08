const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', user: username, user: email });
    } catch (err) {
        res.status(500).json({ error: 'Error creating user' });
    }

};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se o usuário existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verificar senha (supondo que você tem a lógica para verificar a senha)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Gerar o token com userId e username
        const token = jwt.sign(
            { userId: user.id, username: user.username }, // Inclui username no token
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Login error', details: err.message });
    }
}


exports.users = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error ao buscar todos os usuários' });
    }
}


exports.findOne = async (req, res) => {
    const username = req.params.username
    
    try {
        const user = await User.findOne({
            where: { username },
            attributes: { exclude: ['password'] } // Excluindo a senha da resposta
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(user);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao pesquisar usuário no banco.' });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user' });
    }

}
