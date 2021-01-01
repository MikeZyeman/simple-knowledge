import * as dotenv from 'dotenv';

dotenv.config();

export default function getFaunaKey() {
  return process.env.FAUNADB_KEY
}
