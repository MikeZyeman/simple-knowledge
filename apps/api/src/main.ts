import * as express from 'express';
import { Message } from '@simple-knowledge/api-interfaces';
import { SetArticleController, SetCategoryController } from '@simple-knowledge/api-lib';

import { environment } from './environments/environment';

const app = express();

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

SetArticleController(app, environment.faunakey);
SetCategoryController(app, environment.faunakey);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
