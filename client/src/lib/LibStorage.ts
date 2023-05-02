import LibConfig from './LibConfig';
import LibSqlite from './LibSqlite';
//
const LibStorage = {
  /**
  * save: db save
  * @param
  *
  * @return
  */
  save: async function(db : any): Promise<void>
  {
    try{
      const uint8Array = db.export();
      const base64 = this.base64encode(uint8Array);
//console.log(base64);
      const key = LibConfig.STORAGE_KEY_DB;
      localStorage.setItem(key, base64);
    } catch (e) {
      console.error(e);
      throw new Error('Error , save');
    }   
  },
  /**
  * get: get save
  * @param
  *
  * @return
  */
  get: async function(): Promise<any>
  {
    try{
      let ret = null;
      const key = LibConfig.STORAGE_KEY_DB;
  console.log("key=", key);
      const base64= localStorage.getItem(key);   
      if(base64 === null) {
        return ret;
      }   
  //console.log(base64);
      const u8 = this.base64decode(base64);
      const SQL = await LibSqlite.getSql();
      const db = new SQL.Database(u8);
      ret = db;
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , get');
    }   
  }, 

  /**
  * base64encode
  * @param data:Uint8Array
  *
  * @return
  */
  base64encode: function(data:Uint8Array): any
  {
    //@ts-ignore
    return btoa([...data].map(n => String.fromCharCode(n)).join(""));
  },
  /**
  * base64encode
  * @param data:string
  *
  * @return
  */
   base64decode: function(data:string): any
   {
     //@ts-ignore
     return new Uint8Array([...atob(data)].map(s => s.charCodeAt(0)));
   },
 
}
export default LibStorage;
