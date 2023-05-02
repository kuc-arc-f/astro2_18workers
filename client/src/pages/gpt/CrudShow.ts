import LibCrud from '../../lib/LibCrud';
import LibConfig from '../../lib/LibConfig';
//import { trpc } from '../../utils/trpc';

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
      const url = import.meta.env.PUBLIC_API_URL;
      console.log("url=", url); 
      const item = {
        id: id
      }
console.log(item);
      const body = JSON.stringify(item);		
      const res = await fetch(url + '/todos/delete', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      console.log(json);   
      if (res.status !== 200) {
        throw new Error(await res.text());
      } 
      ret = true;
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
