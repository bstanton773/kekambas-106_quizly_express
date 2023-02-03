const axios = require('axios');

module.exports = async (req, res) => {
    let slug = req.params.slug;
    let quizData;
    try{
        const query = `
            query($slug: String!){
                quizBySlug(slug: $slug){
                    id
                    slug
                    title
                    description
                    questions{
                        id
                        title
                        order
                        correctAnswer
                    }
                }
            }
  
        `

        const { data } = await axios.post(
            process.env.GRAPHQL_ENDPOINT,
            {
                query,
                variables: { slug }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        quizData = data.data.quizBySlug;
        console.log(quizData);

    } catch(err){
        console.log(err)
    }
    res.render('quiz', { quiz: quizData })
}