import * as Knex from 'knex';

export class DrugsModel {

  getAllDrugs(db: Knex, hospcode) {
    return db('drug as d')
    .select('d.drug_id', 'd.drugcode', 'd.drugname', 'd.hospcode', 'h.hosname',
    'd.composition', 'd.dosage_form', 'd.tmtcode', 'd.code_24digit',
    'd.fdcode', 'd.gs1code', 'd.update_datetime')
    .leftJoin('hospital as h', 'd.hospcode', 'h.hoscode')
    .where('d.hospcode', hospcode);
  }

  getdrugByid(db: Knex, drug_id) {
    return db('drug')
    .where({drug_id: drug_id});
  }


  async drugInsert(db: Knex, drug_id, hospcode, drugcode, drugname, composition,
    dosage_form, tmtcode, code_24digit, fdcode, gs1code) {

    if (drug_id === 0) {
      const drugInsert = await db('drug')
      .insert({ hospcode: hospcode, drugcode: drugcode, drugname: drugname,
        composition: composition, dosage_form: dosage_form, tmtcode: tmtcode,
        code_24digit: code_24digit, fdcode: fdcode, gs1code: gs1code });
      return {drugInsert}
    } else {
      const drugInsert = await db('drug')
      .update({ hospcode: hospcode, drugcode: drugcode, drugname: drugname,
        composition: composition, dosage_form: dosage_form, tmtcode: tmtcode,
        code_24digit: code_24digit, fdcode: fdcode, gs1code: gs1code })
      .where('drug_id', '=', drug_id);
      return {drugInsert}
    }
  }

  drugDelete(db: Knex, drug_id) {
    return db('drug')
    .where('drug_id', drug_id)
    .del();
  }

}