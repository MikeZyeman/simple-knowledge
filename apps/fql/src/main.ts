import { createCollection, createIndex } from '@simple-knowledge/fql-lib';

async function setupFaunaDB() {

  //Create collections

  await createCollection("Categories");
  await createCollection("Articles");


  //Create index
  await createIndex({
    name: 'articles_by_category',
    source: 'Articles',
    serialized: true,
    unique: false,
    terms: [
      {
        field: ["data", "title"]
      }
    ]
  })

}

setupFaunaDB()
  .then(() => {
    console.log("Set up ");
    process.exit(1);
  })
  .catch((err) => {
    console.log(err)
    process.exit(1);
  })
