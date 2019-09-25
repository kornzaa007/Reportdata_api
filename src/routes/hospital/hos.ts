/// <reference path="../../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as moment from 'moment'
import * as HttpStatus from 'http-status-codes';
import { HosModel } from '../../models/hospital/hos';
let shell = require("shelljs");

const hosModel = new HosModel();

const router = (fastify, { }, next) => {
  var db: Knex = fastify.dbCannabis;

  fastify.get('/', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    reply.code(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      message: 'USE Hospital'
    })
  })

  fastify.post('/getAllHos', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const hospcode = req.body.hospcode;
    try {
      const result: any = await hosModel.getAllHos(db);
      reply.send({
        statusCode: HttpStatus.OK,
        reccount: result.length,
        rows: result
      });
    } catch (error) {
      console.log('getAllHos', error.message);
      reply.send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      });
    }
  });

  next();
}

module.exports = router;