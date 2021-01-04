import { getFaunaKey } from '@simple-knowledge/fql-lib';

export const environment = {
  production: false,
  faunakey: getFaunaKey()
};
