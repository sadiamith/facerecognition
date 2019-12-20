const handleSignin = (req, res, database, bcrypt) => {
    database.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid){
            return database.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        }
        else{
            res.status(400).json('wrong info')
        }
    })
    .catch(err => res.status(400).json('Wrong Credentials'))
}

module.exports = {
    handleSignin: this.handleSignin
}