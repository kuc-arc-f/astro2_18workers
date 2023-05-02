import LibCrud from '../../lib/LibCrud';

const CrudIndex = {
  /**
  * getList
  * @param
  *
  * @return
  */
  getList :async function (): Promise<any>
  {
    try{
      const url = import.meta.env.PUBLIC_API_URL;
console.log("#getList:" + url);
      let items: any[] = [];
      const body = JSON.stringify({});		
      const res = await fetch(url + "/todos/get_list", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      console.log(json);   
      if (res.status !== 200) {
        throw new Error(await res.text());
      } 
      items = json.data;
console.log(items);
      return items;
    } catch (e) {
      console.error(e);
    } 
  }  ,  
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      const valid = await LibCrud.validLogin();
//console.log("valid=", valid);
      if(valid === false) {
        alert("NG, valid Login");
      }
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudIndex.startProc();

export default CrudIndex;
