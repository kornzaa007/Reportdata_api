import * as Knex from 'knex';

export class HosModel {

  getAllHos(db: Knex) {
    return db('hop2561')
    .select()
  }

}