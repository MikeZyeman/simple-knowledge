import * as faunadb from 'faunadb';

import * as dotenv from 'dotenv';
dotenv.config();

const client = new faunadb.Client({ secret: process.env.FAUNADB_KEY})
const {
  CreateCollection
} = faunadb.query;

export const createCollection = async (tableName: string) => {
  return await client.query(
    CreateCollection({ name: tableName })
  )
}

