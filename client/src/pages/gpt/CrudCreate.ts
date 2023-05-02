import LibCrud from '../../lib/LibCrud';
import LibAuth from '../../lib/LibAuth';
import LibConfig from '../../lib/LibConfig';
//import { trpc } from '../../utils/trpc';
import Crud from './Crud';
//
const CrudCreate = {

  /**
   * addItem:
   * @param key: any
   *
   * @return
   */
  addItem : async function() : Promise<any>
  {
    try{
      let ret = false;
      const url = import.meta.env.PUBLIC_API_URL;
      console.log("url=", url);
      let values = Crud.getInputValues();
//console.log(values);
//return;
      const body = JSON.stringify(values);		
      const res = await fetch(url + '/todos/create', {
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
      console.error("Error, addItem");
      console.error(e);
      throw new Error('Error , addItem');
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
      const button: any = document.querySelector('#btn_save');
      button.addEventListener('click', async () => {
        const result = await this.addItem();
        console.log("result=", result);
        if(result) {
          window.location.href = '/gpt';
        }
      }); 
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
CrudCreate.startProc();

export default CrudCreate;
