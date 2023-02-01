module.exports = (req, res) => {
    // Clear the jwtToken
    res.cookie('jwtToken', '', { httpOnly: true });
    res.redirect('/auth/login');
}