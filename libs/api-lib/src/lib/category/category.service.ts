import { Client, query } from 'faunadb';


const {
  Paginate,
  Get,
  Ref,
  Create,
  Collection,
  Documents
} = query;

import { CategoryModel } from '@simple-knowledge/api-interfaces';

export default class CategoryService {

  client: any;

  constructor(key) {
    this.client = new Client({ secret: key})
  }

  async getCategories(): Promise<CategoryModel[]> {
    const refs: any = await this.client.query(
      Paginate(
        Documents(Collection('Categories'))
      )
    )
    CategoryService.hasNoData(refs);

    const categories: CategoryModel[] = [];
    for (const ref of refs.data) {

      const doc: any = await this.client.query(
        Get(ref)
      )
      CategoryService.hasNoData(doc);

      categories.push({
        id: ref.id,
        title: doc.data.title
      });
    }

    return categories;
  }

  async getCategory(id: number): Promise<CategoryModel> {
    const doc: any = await this.client.query(
      Get(
        Ref(
          Collection('Categories'),
          id
        )
      )
    ).catch(e => console.log)

    return {
      id: doc.ref.id,
      title: doc.data.title
    }
  }

  async addCategory(category: CategoryModel) {
    const doc = await this.client.query(
      Create(
        Collection('Category')
      )
    );

    console.log(doc)
  }

  private static hasNoData(obj: any) {
    if (!('data' in obj)) throw new Error('No data in response');
  }
}
