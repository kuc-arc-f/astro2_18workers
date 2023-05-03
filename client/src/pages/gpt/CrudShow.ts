import LibCrud from '../../lib/LibCrud';
import LibConfig from '../../lib/LibConfig';
import HttpCommon from '../../lib/HttpCommon';
//
const Crud = {
  /**
   * delete:
   * @param key: any
   *
   * @return
   */   
  delete : async function(id: number) : Promise<any>
  {
    try{
      let ret = false;
//      const url = import.meta.env.PUBLIC_API_URL;
//      console.log("url=", url); 
      const item = {
        id: id
      }
//console.log(item);
      const json = await HttpCommon.post(item, '/todos/delete');
//console.log(json);
      if (json.ret ===  LibConfig.OK_CODE) {
        ret = true;
      }      
      return ret;      
    } catch (e) {
      console.error(e);
    }
  },  
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
      //btn
      const elm: any = document.querySelector('#item_id');
      const id = elm?.value;
console.log("id=", id);
      const button: any = document.querySelector('#btn_delete');
      button.addEventListener('click', async () => {
        const res = await this.delete(Number(id));
console.log(res);
        if(res) {
          window.location.href = '/gpt';	
        }
      }); 
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
Crud.startProc();

export default Crud;
