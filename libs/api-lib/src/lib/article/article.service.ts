import * as faunadb from 'faunadb';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new faunadb.Client({ secret: process.env.FAUNADB_KEY})
const {
  Paginate,
  Get,
  Ref,
  Create,
  Update,
  Delete,

  Collection,
  Documents
} = faunadb.query;

import { ArticleModel, ArticleThumbnailModel } from '@simple-knowledge/api-interfaces';

export default class ArticleService {

  async getArticles(): Promise<ArticleThumbnailModel[]> {
    const refs: any = await client.query(
      Paginate(
        Documents(Collection('Articles'))
      )
    ).catch(e => console.log(e));
    this.hasNoData(refs);

    const articles : ArticleThumbnailModel[] = [];
    for (const ref of refs.data) {

      const doc: any = await client.query(
        Get(ref)
      );
      this.hasNoData(doc);

      articles.push({
        id: ref.id,
        title: doc.data.title,
        category: null,
        text: doc.data.text.substring(0, 100) + ' ...',
      })
    }

    return articles;
  }

  async getArticle(id: number): Promise<ArticleModel> {
    const doc: any = await client.query(
      Get(
        Ref(
          Collection('Articles'),
          id
        )
      )
    ).catch(e => console.log)

    return {
      id: doc.ref.id,
      category: undefined,
      text: doc.data.text,
      title: doc.data.title
    }
  }

  async addPost(data: ArticleModel) {
    delete data.id;

    const doc = await client.query(
      Create(
        Collection('Articles'),
        { data }
      )
    ).catch(e => console.log)

    console.log(doc);
  }

  async updatePost(id: number, data: ArticleModel) {
    delete data.id;

    const doc = await client.query(
      Update(
        Ref(Collection('Articles'), id),
        { data }
      )
    ).catch(e => console.log)

    console.log(doc);

  }

  async removePost(id: number) {
    const doc = await client.query(
      Delete(
        Ref(Collection('Articles'), id)
      )
    )
  }

  private hasNoData(obj: any) {
    if (!('data' in obj)) throw new Error('No data in response');
  }
}
