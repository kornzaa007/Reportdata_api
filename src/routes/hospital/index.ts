/// <reference path="../../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as moment from 'moment'
import * as HttpStatus from 'http-status-codes';
import { MainModel } from '../../models/main';
let shell = require("shelljs");

const mainModel = new MainModel();

const router = (fastify, { }, next) => {
  var db: Knex = fastify.dbCannabis;

  fastify.get('/', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    console.log(db);
    reply.code(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      message: 'HOSPITAL-API'
    })
  })


  next();

}

module.exports = router;