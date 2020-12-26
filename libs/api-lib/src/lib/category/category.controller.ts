import CategoryService from './category.service';


function errorMessage(e, res) {
  console.log(e);
  res.sendStatus(500);
}

const SetCategoryController = (app) => {

  const categoryService = new CategoryService();
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

export default SetCategoryController;
