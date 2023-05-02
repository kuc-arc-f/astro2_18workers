import LibStorage from './LibStorage';
import LibConfig from './LibConfig';
//
const LibSqlite = {
  db: null,
  /**
  * getDb: DBインスタンスを返す
  * @param
  *
  * @return
  */  
  getDb: async function(): Promise<any>
  {
    try{
      if(this.db !== null) {
        return this.db
      };
console.log("db=none");
      const db = await LibStorage.get();
//console.log(db);
      if(db !== null) {
        this.setImportDb(db);
        return db;
      }
      let sqlFilePath = LibConfig.SQLITE_FILE_PATH;
console.log("sqlFilePath=", sqlFilePath);
      //@ts-ignore
      const SQL = await initSqlJs({locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
      })   
      const dataPromise = await fetch(sqlFilePath).then(res => res.arrayBuffer());
      const u8array = new Uint8Array(dataPromise);
      this.db = new SQL.Database(new Uint8Array(u8array));
      return this.db;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getDb');
    }   
  },
  /**
  * getSql: SQL を返す
  * @param db: any
  *
  * @return Promise<any>
  */  
  getSql: async function(): Promise<any>
  {
    try{
      //@ts-ignore
      const SQL = await initSqlJs({locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
      })   
      return SQL;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getSql');
    }   
  },
 /**
 * setImportDb: インポートしたDBの設定
 * @param db: any
 *
 * @return Promise<void>
 */  
  setImportDb: async function(db: any): Promise<void>
  {
   try{
     this.db = db;
   } catch (e) {
     console.error(e);
     throw new Error('Error , setImportDb');
   }   
  },  
  /**
  * select: select実行
  * @param sql: string
  *
  * @return
  */ 
   select: async function(db: any, sql: string): Promise<any>
   {
     try{
      let ret = null;
      if(db === null) {
        console.error("error, db is null");
        throw new Error('Error , db is null');        
//        return ret;
      };
      //@ts-ignore
      const res = db.exec(sql);
      if(res.length > 0) {
//        console.log(res[0]);
        ret = res[0].values;
      }
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , select');
    }   
  },
}
export default LibSqlite;
