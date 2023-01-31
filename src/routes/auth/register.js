const { User } = require('../../models');

module.exports = (req, res) => {
    console.log(req.body);
    // First check to make sure the password and confirmPass are the same
    if (req.body.password !== req.body.confirmPass){
        res.send({error: "Your passwords do not match"})
    }
    // Get the data from the request body
    const { username, email, password } = req.body
    const user = new User({ username, email, password })
    user.save();
    res.send(`New User Created - ${user.username}`);
}