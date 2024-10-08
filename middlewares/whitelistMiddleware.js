const whitelist = process.env.WHITELIST_USERS.split(',');


module.exports = (req, res, next) => {

    const username = req.user.username    // Certifique-se de acessar o usuário de req.user.

    if (!whitelist.includes(username)) {

        //return res.json("UserInWhitelisted: teste")
        return res.status(403).json({ error: 'User is not whitelisted - Precisa estar logado com usuário administrador' });
    }

    next();
};
