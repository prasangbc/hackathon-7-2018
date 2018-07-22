/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.results = (request, response) => {
    const {
        restaurants
    } = request.body;
    response.render('results', {
        restaurants
    })
}
