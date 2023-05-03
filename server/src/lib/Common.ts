
const Common = {
  /**
  *
  * @param
  *
  * @return
  */   
  validApiKey: async function (c: any, body: any): Promise<any>
  {
    try{
      let ret = false;
      const envKey = c.env.API_KEY;
      //console.log("envKey=", envKey);
      if (!body.api_key) {
        return ret;
      }
      if (body.api_key !== envKey) {
        return ret;
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
    }    
  },
}
export default Common;
