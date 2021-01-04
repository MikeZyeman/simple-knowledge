import { getFaunaKey } from './environment.fql';
import { Client, query } from 'faunadb';

const client = new Client({ secret: getFaunaKey()})
const {
  CreateIndex,
  Collection
} = query;

export interface FieldModel {
  field: string[];
}

export interface IndexModel {
  name: string;
  source: any;
  terms?: FieldModel[];
  values?: any[];

  unique?: boolean;
  serialized?: boolean;
  permissions?: any;
  data?: any;
}

export const createIndex = async (index: IndexModel) => {

  const terms = [];

  console.log(index.terms);

  return await client.query((
    CreateIndex({
      name: index.name,
      source: Collection(index.source),
      terms: terms,
      serialized: index.serialized,
      unique: index.unique
    })
  ))
}
