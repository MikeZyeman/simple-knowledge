import ArticleService from './article.service';

function errorMessage(e, res) {
  console.log(e);
  res.sendStatus(500);
}

export const SetArticleController = (app, key) => {

  const articleService = new ArticleService(key);
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


  app.post(`${baseRoute}/:id`, async (req, res) => {

  })

}

