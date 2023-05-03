
import Common from './Common';
//
const DbCommon = {
  /**
  *
  * @param
  *
  * @return
  */   
  execute: async function (sql: string, c: any, body: any): Promise<any>
  {
    try{
      let ret = false;
      const valid = await Common.validApiKey(c, body);
//console.log("valid=", valid);
      if(!valid) {
        console.error("Error, DbCommon.execute");
        throw new Error('Error , create');
      }
      const resulte= await c.env.DB.prepare(sql).run();
      //console.log("success=", resulte.success);
      ret = resulte.success;
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , execute');
    }    
  },
  /**
  *
  * @param
  *
  * @return
  */ 
  select: async function (sql: string, c: any, body: any): Promise<any>
  {
    try{
      let ret = false;
      const valid = await Common.validApiKey(c, body);
//console.log("valid=", valid);
      if(!valid) {
        console.error("Error, DbCommon.select");
        throw new Error('Error , create');
      }
      const resulte= await c.env.DB.prepare(sql).all();
      ret = resulte.results;
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , select');
    }    
  },   
}
export default DbCommon;
