import * as Knex from 'knex';

export class ReportModel {

  showOverAllReport(db: Knex) {
    return db('table_status');
  }

}