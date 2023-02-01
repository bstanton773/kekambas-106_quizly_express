const { GraphQLString } = require('graphql');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const { createJwtToken } = require('../util/auth');


const register = {
    type: GraphQLString,
    description: 'Register a new user',
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args){
        const checkUser = await User.findOne({ email: args.email })
        if (checkUser){
            throw new Error("User with this email address already exists")
        }

        const { username, email, password } = args;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: passwordHash });

        await user.save();

        const token = createJwtToken(user);

        return token;
    }
}


const login = {
    type: GraphQLString,
    description: "Log a user in with email and password",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args){
        // Get user from database based on the email
        const user = await User.findOne({ email: args.email })
        // Get the hashed password from the user or set it to an empty string if no user
        const hashedPassword = user?.password || ""
        // returns a boolean if the passwords match
        const correctPassword = await bcrypt.compare(args.password, hashedPassword);
        // if no user or bad password
        if (!user || !correctPassword){
            throw new Error('Invalid Credentials')
        }
        // credential our used via token
        const token = createJwtToken(user);
        return token
    }
}


module.exports = {
    register,
    login
}
