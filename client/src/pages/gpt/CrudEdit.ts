import LibCrud from '../../lib/LibCrud';
import Crud from './Crud';
//
const CrudEdit = {
  /**
   *
   * @param key: any
   *
   * @return
   */
  update : async function() : Promise<any>
  {
    try{
      let ret = false;
      const url = import.meta.env.PUBLIC_API_URL;
      console.log("url=", url); 
      const elm: any = document.querySelector('#item_id');
      const id = elm?.value;  
      let values = Crud.getInputValues();  
      values.id = Number(id);
  console.log(values);
//return;
      const body = JSON.stringify(values);		
      const res = await fetch(url + '/todos/update', {
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
      const valid = await LibCrud.validLogin();
//console.log("valid=", valid);
      if(valid === false) {
//        alert("NG, valid Login");
      }
      //
      const hid_completed: any = document.querySelector('#item_completed');
      const hid_completed_value = hid_completed?.value;      
      const completed = (<HTMLInputElement>document.querySelector("#completed"));
      if(Number(hid_completed_value) === 1) {
        completed.checked = true;
      }

      //btn
      const button: any = document.querySelector('#btn_save');
      button.addEventListener('click', async() => {
        const res = await this.update();
console.log("res=", res);
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
CrudEdit.startProc();

export default CrudEdit;
