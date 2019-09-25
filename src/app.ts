/// <reference path="../typings.d.ts" />

import path = require('path');
import * as http from 'http'
import * as HttpStatus from 'http-status-codes';
import * as fastify from 'fastify';


require('dotenv').config({ path: path.join(__dirname, '../config') });

import { Server, IncomingMessage, ServerResponse } from 'http';

// const multer = require('fastify-multer');
import helmet = require('fastify-helmet');
import fileUpload = require('fastify-file-upload');

const app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: {
    level: 'error',
    prettyPrint: true
  },
  bodyLimit: 5 * 1048576,
});

// app.register(require('fastify-multer'));
app.register(require('fastify-formbody'));
app.register(require('fastify-cors'), { exposedHeaders: 'Content-Disposition' });
app.register(require('fastify-no-icon'));
app.register(
  helmet,
  { hidePoweredBy: { setTo: 'PHP 5.2.0' } }
);

app.register(fileUpload, { limits: { fileSize: 96 * 1024 * 1024 } });

app.register(require('fastify-rate-limit'), {
  max: +process.env.MAX_CONNECTION_PER_MINUTE || 100000,
  timeWindow: '1 minute'
});

app.register(require('fastify-static'), {
  root: path.join(__dirname, '../public'),
  prefix: '/html',
});

app.register(require('./plugin/jwt'), {
  secret: process.env.SECRET_KEY
});

app.decorate("apiMonitoring", async (req, reply) => {
  console.log(req.raw.ip, req.raw.url);
});

// DB connection =========================================
app.register(require('./plugin/db'), {
  connection: createConnectionOption({
    client: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    port: process.env.DB_PORT,
    schema: process.env.DB_SCHEMA,
    charSet: process.env.DB_CHARSET,
    encrypt: process.env.DB_ENCRYPT || true
  }),
  connectionName: 'dbCannabis'
});

app.register(require('./routes/index'), { prefix: '/', logger: true });
app.register(require('./routes/hospital/index'), { prefix: '/hospital', logger: true });
app.register(require('./routes/hospital/hos'), { prefix: '/hospital/hos', logger: true });

const port = +process.env.PORT || 3001;
const host = '0.0.0.0';

app.listen(port, host, (err) => {
  if (err) throw err;
  console.log(app.server.address());
});

function createConnectionOption(db: any) {
  if (db.client === 'mssql') {
    return {
      client: db.client,
      connection: {
        server: db.host,
        user: db.user,
        password: db.password,
        database: db.dbName,
        options: {
          port: +db.port,
          schema: db.schema,
          encrypt: db.encrypt
        }
      }
    };
  } else {
    return {
      client: db.client,
      connection: {
        host: db.host,
        port: +db.port,
        user: db.user,
        password: db.password,
        database: db.dbName,
      },
      pool: {
        min: 0,
        max: 7,
        afterCreate: (conn, done) => {
          conn.query('SET NAMES ' + db.charSet, (err) => {
            done(err, conn);
          });
        }
      },
      debug: false,
    };
  }

}
