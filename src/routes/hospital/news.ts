/// <reference path="../../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as moment from 'moment'
import * as HttpStatus from 'http-status-codes';
import { NewsModel } from '../../models/hospital/news';
let shell = require("shelljs");

const newsModel = new NewsModel();

const router = (fastify, { }, next) => {
  var db: Knex = fastify.dbCannabis;

  fastify.get('/', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    reply.code(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      message: 'Use News'
    })
  })

  fastify.post('/get-all-news', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    try {
      const result: any = await newsModel.getAllNews(db);
      reply.send({
        statusCode: HttpStatus.OK,
        reccount: result.length,
        rows: result
      });
    } catch (error) {
      console.log('get-all-news', error.message);
      reply.send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      });
    }
  });

  next();
}

module.exports = router;