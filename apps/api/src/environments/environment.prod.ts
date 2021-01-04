import { getFaunaKey } from '@simple-knowledge/fql-lib';

export const environment = {
  production: true,
  faunakey: getFaunaKey()
};
