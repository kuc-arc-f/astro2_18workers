import LibSqlite from './LibSqlite';
import LibStorage from './LibStorage';

//
const LibDbSession = {
  /**
  * set:
  * @param key: any
  *
  * @return
  */ 
  set: async function(key: any, value: any): Promise<any>
  {
    try {
  console.log("testSet");
        const db = await LibSqlite.getDb();
        //DELETE
        let sql = `
        DELETE FROM Session WHERE key ='${key}'
        `;
        await db.exec(sql);
        // INSERT
        let valueJson = JSON.stringify(value);
        sql = `
        INSERT INTO Session(key, value, createdAt, updatedAt)
        VALUES
        (
            '${key}', 
            '${valueJson}',
            DATETIME('now','localtime'), 
            DATETIME('now','localtime')
        );
        `;
        await db.exec(sql);
        await LibStorage.save(db);
    } catch (e) {
      console.error(e);
    }
  },
  /**
  * get:
  * @param key: any
  *
  * @return
  */ 
  get: async function(key: any): Promise<any>
  {
    try {
      let ret = null;
      const db = await LibSqlite.getDb();
      if(db === null) {
        return ret;
      }
      const sql = `
      SELECT value, id, key FROM Session WHERE key ='${key}'  LIMIT 1 
      `;
      let items = await LibSqlite.select(db, sql);
//console.log(items);
      if(items === null || items.length < 1) {
        return ret;
      }
      ret = items[0];		
//console.log(ret);
      ret = JSON.parse(ret[0] || '[]');
      return ret;
    } catch (e) {
      console.error(e);
    }
  },  
}
export default LibDbSession;
