const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    // First check to make sure the password and confirmPass are the same
    if (req.body.password !== req.body.confirmPass){
        res.send({error: "Your passwords do not match"})
    } else {
        // Get the data from the request body
        const { username, email, password } = req.body
        // Has the password before creating user
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: passwordHash })
        user.save();
        res.send(`New User Created - ${user.username}`);
    }
}