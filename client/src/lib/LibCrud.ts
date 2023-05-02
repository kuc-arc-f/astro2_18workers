import LibAuth from './LibAuth';
import LibConfig from './LibConfig';

const LibCrud = {
  /**
   * validLogin:
   * @param key: any
   *
   * @return
   */  
  validLogin : async function() : Promise<any>
  {
    console.log("#validLogin");
    let ret = false;
    const validLogin: boolean = await LibAuth.validLogin();
    if(validLogin !== false) {
      ret = true;
    }
    return ret;
  },
  /**
   * getList:
   * @param key: any
   *
   * @return
   */  
  getList : async function() : Promise<any>
  {
    try{
      let items: any[] = [];
      const url = LibConfig.API_URL + "/chats/index";
      const response = await fetch(url);
      const json = await response.json();
      items = json.data;
console.log(items);
      return items;
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
  get: async function(id: number) : Promise<any>
  {
    try{
      const url = import.meta.env.PUBLIC_API_URL;
      let item: any = {
        "id": id
      };
      const body = JSON.stringify(item);		
      const res = await fetch(url + "/todos/get", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      console.log(json);   
      if (res.status !== 200) {
        throw new Error(await res.text());
      } 
      item = json.data;
//console.log(item);
      return item;      
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * delete:
   * @param key: any
   *
   * @return
   */   
  delete : async function(id: number) : Promise<any>
  {
    try{
      let item = {};
      /*
      item = await trpc.task.deleteTask.mutate(String(id));
console.log(item);
      */
      return item;
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * update:
   * @param key: any
   *
   * @return
   */   
  update : async function() : Promise<any>
  {
    try{
      return;
    } catch (e) {
      console.error(e);
    }
  },
}

export default LibCrud;
