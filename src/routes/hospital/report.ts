/// <reference path="../../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as moment from 'moment'
import * as HttpStatus from 'http-status-codes';
import { ReportModel } from '../../models/hospital/report';
let shell = require("shelljs");

const reportModel = new ReportModel();

const router = (fastify, { }, next) => {
  var db: Knex = fastify.dbCannabis;

  fastify.get('/', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    reply.code(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      message: 'Use Report'
    })
  })

  fastify.post('/show-all-report', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    try {
      const result: any = await reportModel.showOverAllReport(db);
      reply.send({
        statusCode: HttpStatus.OK,
        reccount: result.length,
        rows: result
      });
    } catch (error) {
      console.log('show-all-report', error.message);
      reply.send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      });
    }
  });

  next();
}

module.exports = router;