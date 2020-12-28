import * as faunadb from 'faunadb';

import * as dotenv from 'dotenv';
import { query } from 'faunadb';
import Collection = query.Collection;
dotenv.config();

const client = new faunadb.Client({ secret: process.env.FAUNADB_KEY})
const {
  Delete,
  CreateCollection,
  Collections
} = faunadb.query;

export const getAllCollection = async () => {
  return await client.query(Collections)
}

export const createCollection = async (tableName: string) => {
  return await client.query(
    CreateCollection({ name: tableName })
  )
}

export const deleteCollection = async (tableName: string) => {
  return await client.query(
    Delete(Collection(tableName))
  )
}
