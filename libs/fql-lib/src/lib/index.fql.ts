import * as faunadb from 'faunadb';
import getFaunaKey from './environment.fql';

const client = new faunadb.Client({ secret: getFaunaKey()})
const {
  CreateIndex
} = faunadb.query;

export interface IndexModel {
  name: string;
  source: any;
  terms?: any[];
  values?: any[];

  unique?: boolean;
  serialized?: boolean;
  permissions?: any;
  data?: any;
}

export const createIndex = async (index: IndexModel) => {
  return await client.query((
    CreateIndex
  ))
}
