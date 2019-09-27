import * as Knex from 'knex';

export class NewsModel {

  getAllNews(db: Knex) {
    return db('timeline')
    .where('active','=','Yes')
    .orderBy('sequence', 'asc');
  }

}