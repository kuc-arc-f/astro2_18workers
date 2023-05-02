import LibAuth from './LibAuth';

const LibTest = {
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
  } 
}

export default LibTest;
