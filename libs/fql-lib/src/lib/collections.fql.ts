import { Client, query} from 'faunadb';
import getFaunaKey from './environment.fql';

const client = new Client({ secret: getFaunaKey()})
const {
  CreateCollection,
  Get,
  Ref,
  Collection
} = query;

export const createCollection = async (collName: string) => {
  return await client.query(
    CreateCollection({ name: collName })
  )
}

export const getCollectionReference = async (collName: string) => {
  return await client.query(
    Get(Collection(''))
  );
}
