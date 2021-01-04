import CategoryService from './category.service';

function errorMessage(e, res) {
  console.log(e);
  res.sendStatus(500);
}

export const SetCategoryController = (app, key) => {

  const categoryService = new CategoryService(key);
  const baseRoute = '/category'

  //get
  app.get(`${baseRoute}`, (req, res) => {
    categoryService.getCategories()
      .then((data) => { res.send(data); })
      .catch((e) => errorMessage(e, res))
  })

  //get by id
  app.get(`${baseRoute}/:id`, (req, res) => {
    categoryService.getCategory(req.params.id)
      .then((data) => { res.send(data); })
      .catch((e) => errorMessage(e, res))
  })
}
