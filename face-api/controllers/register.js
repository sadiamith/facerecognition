const handleRegister = (req, res, database, bcrypt) => {
    const {name, email, password} = req.body;
    if(!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
    }
    
    const hash = bcrypt.hashSync(password);
    database.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                }).then(user => {
                    res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
};