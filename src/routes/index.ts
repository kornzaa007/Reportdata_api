/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as moment from 'moment'
import * as HttpStatus from 'http-status-codes';
import { MainModel } from '../models/main';
let shell = require("shelljs");

const mainModel = new MainModel();

const router = (fastify, { }, next) => {
  var db: Knex = fastify.dbCannabis;

  fastify.get('/', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    reply.code(HttpStatus.OK).send({
      statusCode: HttpStatus.OK,
      message: 'HOSPITAL API Service.'
    })
  })


  fastify.get('/status', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
    var ua = req.headers['user-agent'];
    let browserDevice = 'desktop';
    let mobileType = null;
    let mobileName = null;

    if (/mobile/i.test(ua)) {
      browserDevice = 'mobile';
    }

    if (/ipad/i.test(ua)) {
      browserDevice = 'tablet';
      mobileName = 'iPad';
    } else if (/iphone/i.test(ua)) {
      mobileName = 'iPhone';
    } else if (/SAMSUNG SM-A9000/i.test(ua)) {
      mobileName = 'Samsung Galaxy A5';
    } else if (/SAMSUNG SM-G9301/i.test(ua)) {
      mobileName = 'Samsung Galaxy A7';
    } else if (/SAMSUNG SM-A9000/i.test(ua)) {
      mobileName = 'Samsung Galaxy A9';
    } else if (/SAMSUNG SM-N900V/i.test(ua)) {
      mobileName = 'Samsung Galaxy Note 3';
    } else if (/android/i.test(ua)) {
      mobileName = 'Android';
    }

    var ip = (req.headers['x-forwarded-for'] ||
      req.raw.connection.remoteAddress ||
      req.raw.socket.remoteAddress) + '';
    var remoteAddr = req.raw.connection.remoteAddress;
    if (ip.search(/[:]/g) !== -1 && ip.search(/[.]/g) !== -1) {
      let addr = remoteAddr.split(':');
      ip = addr[3];
    }
    var socketAddr = req.raw.socket.remoteAddress;
    if (socketAddr.search(/[:]/g) !== -1 && socketAddr.search(/[.]/g) !== -1) {
      let addr = socketAddr.split(':');
      socketAddr = addr[3];
    }

    reply.send({
      statusCode: HttpStatus.OK,
      date_response: moment().locale('th').format('YYYY-MM-DD HH:mm:ss'),
      serviceName: 'HOSPITAL API',
      dbType: process.env.HIS_DB_CLIENT,
      client: {
        userAgent: req.headers['user-agent'],
        clientIp: ip,
        socketremoteAddress: socketAddr,
        device: browserDevice,
        mobileType: mobileType,
        mobileName: mobileName,
      }
    });
  })

  next();

}

module.exports = router;