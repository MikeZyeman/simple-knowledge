import ArticleService from './article.service';

function errorMessage(e, res) {
  console.log(e);
  res.sendStatus(500);
}

const SetArticleController = (app) => {

  const articleService = new ArticleService();
  const baseRoute = '/article';

  //get
  app.get(`${baseRoute}`, (req, res) => {
    articleService.getArticles()
      .then((data) => {
        res.send(data);
      })
      .catch(e => errorMessage(e, res))
  })

  //get by id
  app.get(`${baseRoute}/:id`, async (req, res) => {
    articleService.getArticle(req.params.id)
      .then((data) => {
        res.send(data)
      })
      .catch(e => errorMessage(e, res))
  })

  //get by category


}

export default SetArticleController;
