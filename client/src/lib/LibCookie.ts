import moment from 'moment'
//
const LibCookie = {
  set_cookie: function(key: string, value: string){
    try{
      const dt = moment().add(10, 'year').toDate().toUTCString()
//      console.log( dt );
      document.cookie = `${key}=${value}; path=/; expires=${dt}`;
    } catch (e) {
      console.log(e);
      throw new Error('error, set_cookie');
    }
  },
  get_cookie: function(key:string){
    try{
      let ret = null
      const cookieValue = document.cookie.split('; ')
      .find(row => row.startsWith(key))
//console.log(typeof cookieValue)
      if(typeof cookieValue != 'undefined'){
        ret = cookieValue.split('=')[1];
      }
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, get_cookie');
    }
  },
  delete_cookie: function(key:string){
    try{
      document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    } catch (e) {
      console.log(e);
      throw new Error('error, get_cookie');
    }
  },
}
export default LibCookie
