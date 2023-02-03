const axios = require('axios');

module.exports = async (req, res) => {
    try{
        const query = `
            query($id: ID!){
                submission(id:$id){
                    id
                    quiz{
                        title
                    }
                    score
                }
            }
        `

        const { data } = await axios.post(
            process.env.GRAPHQL_ENDPOINT,
            {
                query,
                variables: {
                    id: req.params.id
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        let submission = data.data.submission
        res.render('results', { submission })
        
    } catch(err){
        console.log(err)
    }
}