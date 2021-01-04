import * as dotenv from 'dotenv';

dotenv.config();

export function getFaunaKey() {
  return process.env.FAUNADB_KEY
}
