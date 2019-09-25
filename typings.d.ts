import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import * as Knex from 'knex'

declare module 'fastify' {
  interface FastifyRequest<HttpRequest> {
    user: any;
    files: any[]
  }
  interface FastifyReply<HttpResponse> {
    sendFile(filename: string): FastifyReply<HttpResponse>;
  }
  interface Request extends FastifyRequest<IncomingMessage> { }
  interface Reply extends FastifyReply<ServerResponse> { }
  interface FastifyInstance {
    Knex: Knex;
    db: Knex;
    dbCannabis: Knex;
    dbHDC: Knex;
  }
}

