//import LibCookie from './LibCookie';
import LibConfig from './LibConfig';
//
const HttpCommon = {
  /**
  * 
  * @param
  *
  * @return
  */ 
  post: async function(item: any, path: string): Promise<any>
  {
    try {
      const url = import.meta.env.PUBLIC_API_URL;
      const apiKey = import.meta.env.PUBLIC_API_KEY;
//console.log("#getList.apiKey=" + apiKey);
      item.api_key = apiKey;
      const body: any = JSON.stringify(item);		
      const res = await fetch(url + path, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
//console.log(json);   
      if (res.status !== 200) {
        throw new Error(await res.text());
      }
      if (json.ret !==  LibConfig.OK_CODE) {
        throw new Error("Error, json.ret <> OK");
      } 
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('Error , post');
    }
  }, 
}
export default HttpCommon;
