/// <reference path="../../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import { LoginModel } from '../../models/hospital/login';

const loginModel = new LoginModel();
var crypto = require('crypto');

const router = (fastify, { }, next) => {
    var db: Knex = fastify.dbCannabis;

    fastify.post('/', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const userName = req.body.username || '';
        const password = req.body.password || '';

        if (userName !== '' && password !== '') {
            try {
                const passwd = await crypto.createHash('md5').update(password).digest('hex');
                const result: any = await loginModel.login(db, userName, passwd);
                if (result && result.length) {
                    const row = result[0];

                    const today = moment().locale('th').format('YYYY-MM-DD HH:mm:ss');
                    const expire = moment().locale('th').add(4, 'hour').format('YYYY-MM-DD HH:mm:ss');
                    const skey = crypto.createHash('md5').update(today + expire).digest('hex');
                    const token = await fastify.jwt.sign({
                        userid: row.userid,
                        hname: row.hname,
                        create: today,
                        expire: expire,
                        skey: skey
                    }, { expiresIn: '4h' });

                    reply.send({
                        statusCode: HttpStatus.OK,
                        token: token
                    });
                } else {
                    reply.send({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Invalid username or password.'
                    });
                }
            } catch (error) {
                reply.send({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message
                });
            }
        } else {
            console.log(HttpStatus.getStatusText(HttpStatus.BAD_REQUEST));
            reply.send({
                statusCode: HttpStatus.BAD_REQUEST,
                message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
            });
        }
    });


    fastify.post('/expire-token', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const token = req.body.token || '';

        if (token) {
            try {
                reply.send({
                    statusCode: HttpStatus.OK,
                    token: token
                });
            } catch (error) {
                reply.send({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message
                });
            }
        } else {
            reply.send({
                statusCode: HttpStatus.BAD_REQUEST,
                message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
            });
        }
    });


    next();

}

module.exports = router;
