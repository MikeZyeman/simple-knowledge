import { query, Client} from 'faunadb';

import * as dotenv from 'dotenv';
dotenv.config();

const {
  Paginate,
  Get,
  Ref,
  Create,
  Update,
  Delete,

  Collection,
  Documents
} = query;

import { ArticleModel, ArticleThumbnailModel } from '@simple-knowledge/api-interfaces';

export default class ArticleService {

  client: any;

  constructor(key) {
    this.client = new Client({ secret: key })
  }

  async getArticles(): Promise<ArticleThumbnailModel[]> {
    const refs: any = await this.client.query(
      Paginate(
        Documents(Collection('Articles'))
      )
    ).catch(e => console.log(e));
    ArticleService.hasNoData(refs);

    const articles : ArticleThumbnailModel[] = [];
    for (const ref of refs.data) {

      const doc: any = await this.client.query(
        Get(ref)
      );
      ArticleService.hasNoData(doc);

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
    const doc: any = await this.client.query(
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

  async addArticle(data: ArticleModel) {
    delete data.id;

    const doc = await this.client.query(
      Create(
        Collection('Articles'),
        { data }
      )
    ).catch(e => console.log)

    console.log(doc);
  }

  async updateArticle(id: number, data: ArticleModel) {
    delete data.id;

    const doc = await this.client.query(
      Update(
        Ref(Collection('Articles'), id),
        { data }
      )
    ).catch(e => console.log)

    console.log(doc);

  }

  async removeArticle(id: number) {
    const doc = await this.client.query(
      Delete(
        Ref(Collection('Articles'), id)
      )
    )

    console.log(doc);
  }

  private static hasNoData(obj: any) {
    if (!('data' in obj)) throw new Error('No data in response');
  }
}
