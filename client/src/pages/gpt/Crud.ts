import LibCrud from '../../lib/LibCrud';

const Crud = {
  /**
   * 
   * @param key: any
   *
   * @return
   */
  getInputValues: function() : any
  {
    try{
      const data: any = {};
  
      // inputタグから値を取得し、オブジェクトにセットする
      const title = (<HTMLInputElement>document.querySelector("#title")).value;
      data.title = title;
      
      const content = (<HTMLInputElement>document.querySelector("#content")).value;
      data.content = content;
      
//      const priority = (<HTMLInputElement>document.querySelector("#priority")).value;
//      data.priority = parseInt(priority);
    
      const completed = (<HTMLInputElement>document.querySelector("#completed")).checked;
      data.completed = completed ? 1 : 0;
      

    
      return data;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getInputValues');
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
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
Crud.startProc();

export default Crud;
