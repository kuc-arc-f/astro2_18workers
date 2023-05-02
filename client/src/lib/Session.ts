import LibCookie from './LibCookie';
import LibConfig from './LibConfig';
//
const Session = {
  /* put, get, delete */
  /**
  * 
  * @param
  *
  * @return
  */ 
  delete: async function(key: string): Promise<any>
  {
    try {
      let ret = false;
      const sid = this.getSessionId();
console.log("sid=", sid);      
      const url = import.meta.env.PUBLIC_API_URL + "/session/delete";
      const item = {
        sessionId: sid,
        key: key,
      }
      const body = JSON.stringify(item);		
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
console.log(json);
      if (res.status != 200) {
        throw new Error(await res.text());
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getSessionId');
    }
  }, 
  /**
  * 
  * @param
  *
  * @return
  */ 
  get: async function(key: string): Promise<any>
  {
    try {
      let ret = null;
      const sid = this.getSessionId();
//console.log("sid=", sid);      
      const url = import.meta.env.PUBLIC_API_URL + "/session/get";
      const item = {
        sessionId: sid,
        key: key,
      }
      const body = JSON.stringify(item);		
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
//console.log(json);
      if (res.status !== 200) {
        throw new Error(await res.text());
      }
      if (json.ret !== LibConfig.OK_CODE) {
        throw new Error("Error, ret <> OK");
      }
      if(typeof json.data === "undefined") {
        throw new Error("Error, value nothing");
      }
      ret = json.data;
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , get');
    }
  },   
  /**
  * 
  * @param
  *
  * @return
  */ 
  put: async function(key: string, value: any): Promise<any>
  {
    try {
      let ret = false;
      const sid = this.getSessionId();
//console.log("sid=", sid);      
      const url = import.meta.env.PUBLIC_API_URL + "/session/create";
      const item = {
        sessionId: sid,
        key: key,
        value: value,
      }
      const body = JSON.stringify(item);		
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
//console.log(json);
      if (res.status != 200) {
        throw new Error(await res.text());
      }
      ret = true;
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getSessionId');
    }
  },
  /**
  * 
  * @param
  *
  * @return
  */ 
  getSessionId: function(): string
  {
    try {
      let ret = "";
      const key = LibConfig.COOKIE_KEY_SESSION;
      const sid = LibCookie.get_cookie(key);
//console.log("sid=", sid);
      //add SessionId
      //@ts-ignore
      ret = sid;
      if(sid === null) {
        const rand = Number(Math.random() * 1000000);
        //@ts-ignore
        let newSid = Date.now() + "-" + String(parseInt(rand));
        ret = newSid;
        LibCookie.set_cookie(key, newSid);
      }
      return ret;
    } catch (e) {
      console.error(e);
      throw new Error('Error , getSessionId');
    }
  },
 
}
export default Session;
