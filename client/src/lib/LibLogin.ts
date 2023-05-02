import LibConfig from './LibConfig';
import LibDbSession from './LibDbSession';
import { trpc } from '../utils/trpc';
//
const LibLogin = {
  /**
  * login
  * @param
  *
  * @return
  */ 
  login : async function () {
    try {
      let ret = false;
      const password = document.querySelector<HTMLInputElement>('#password');
      const email = document.querySelector<HTMLInputElement>('#email');
      const item = {
        email: email?.value,
        password: password?.value,
      }
//console.log(item); 
      const user:any = await trpc.user.login.mutate(item);
//console.log(user);
      if(user.ret !== LibConfig.OK_CODE) {
        console.error("error, trpc.user.login");
        alert("Error, login");
        throw new Error("error, trpc.user.login");
      }
      const key = LibConfig.SESSION_KEY_USER;     
      user.password = "";     
      await LibDbSession.set(key, user.data);
      window.location.href = '/';	
      ret = true;
      return ret;
    } catch (error) {
        console.error(error);
    }     
  } 
}

export default LibLogin;
