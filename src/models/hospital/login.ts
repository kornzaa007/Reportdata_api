import * as Knex from 'knex';
var crypto = require('crypto');
const maxLimit = 2500;

export class LoginModel {

  login(db: Knex, username, password) {
    return db('webuser')
    .select()
    .where({
      userid: username,
      password:  password
    })
    .limit(1);
  }

}