import * as Knex from 'knex';
const dbName = process.env.DB_NAME;
const dbClient = process.env.DB_CLIENT;
const maxLimit = 1000;

export class MainModel {

  getTableName(knex: Knex, dbname = dbName) {
    return knex
      .select('TABLE_NAME')
      .from('information_schema.tables')
      .where('TABLE_SCHEMA', '=', dbname);
  }
}