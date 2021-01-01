import { createCollection, createIndex, IndexModel } from '@simple-knowledge/fql-lib';

async function setupFaunaDB() {
  await createCollection("Categories");
  await createCollection("Articles");


}

setupFaunaDB()
  .then(() => {
    console.log("Set up ")
  })
  .catch((err) => {
    console.log(err)
  })
