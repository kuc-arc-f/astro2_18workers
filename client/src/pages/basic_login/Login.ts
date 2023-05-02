import LibBasicLogin from '../../lib/LibBasicLogin';

const Login = {
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc: function(): void 
  {
    try{
      console.log("#startProc: Login");
      //btn
      const button: any = document.querySelector('#btn_login');
      button.addEventListener('click', () => {
        LibBasicLogin.login();
      });    
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
Login.startProc();

export default Login;
