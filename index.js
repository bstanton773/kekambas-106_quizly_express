const express = require('express');
const app = express();
const port = 3000;


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('register', { username: 'brians' });
});

// Import the function from routes module
const initRoutes = require('./src/routes');
// Execute the function with app as argument
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
