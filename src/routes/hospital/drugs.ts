// /// <reference path="../../../typings.d.ts" />

// import * as Knex from 'knex';
// import * as fastify from 'fastify';
// import * as moment from 'moment'
// import * as HttpStatus from 'http-status-codes';
// import { DrugsModel } from '../../models/cannabis/drugs';
// let shell = require("shelljs");

// const drugModel = new DrugsModel();

// const router = (fastify, { }, next) => {
//   var db: Knex = fastify.dbCannabis;

//   fastify.get('/', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
//     reply.code(HttpStatus.OK).send({
//       statusCode: HttpStatus.OK,
//       message: 'USE DRUG'
//     })
//   })

//   fastify.post('/all-drug', { preHandler: [fastify.apiMonitoring] }, async (req: fastify.Request, reply: fastify.Reply) => {
//     const hospcode = req.body.hospcode;
//     try {
//       const result: any = await drugModel.getAllDrugs(db, hospcode);
//       reply.send({
//         statusCode: HttpStatus.OK,
//         reccount: result.length,
//         rows: result
//       });
//     } catch (error) {
//       console.log('drug-all', error.message);
//       reply.send({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: error.message
//       });
//     }
//   });

//   fastify.post('/byid-drug/:drug_id', { preHandler: [fastify.apiMonitoring, fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
//     const drug_id = req.body.drug_id;
//     try {
//       const result:any = await drugModel.getdrugByid(db, drug_id);
//       reply.send({
//         rows: result
//       })
//     } catch (error) {
//       reply.send({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: error.message
//       })
//     }
//   });

//   fastify.post('/insert-drug',{preHandler:[fastify.apiMonitoring,fastify.authenticate]}, async (req: fastify.Request, reply: fastify.Reply) => {
//     const drug_id = req.body.drug_id || 0;
//     const drugcode = req.body.drugcode;
//     const drugname = req.body.drugname;
//     const hospcode = req.body.hospcode;
//     const composition = req.body.composition;
//     const dosage_form = req.body.dosage_form;
//     const tmtcode = req.body.tmtcode;
//     const code_24digit = req.body.code_24digit;
//     const fdcode = req.body.fdcode;
//     const gs1code = req.body.gs1code;
//       try {
//             const result: any = await drugModel.drugInsert(db, drug_id, hospcode, drugcode, drugname, composition,
//               dosage_form, tmtcode, code_24digit, fdcode, gs1code);
//             reply.send({
//               statusCode: HttpStatus.OK,
//               result
//             });
//           } catch (error) {
//             console.log('drugInsert', error.message);
//             reply.send({
//               statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//               message: error.message
//             });
//           }
//   });

//   fastify.post('/delete-drug', { preHandler: [fastify.apiMonitoring,fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
//     const drug_id = req.body.drug_id || 0;
//     if (drug_id) {
//         try {
//             const result = await drugModel.drugDelete(db, drug_id);
//             reply.send({
//                 statusCode: HttpStatus.OK,
//                 result
//             });
//         } catch (error) {
//             console.log('delete drug', error.message);
//             reply.send({
//                 statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//                 message: error.message
//             });
//         }
//     } else {
//         reply.send({
//             statusCode: HttpStatus.BAD_REQUEST,
//             message: 'delete drug: Invalid parameter'
//         });
//     }
//   });

//   next();
// }

// module.exports = router;