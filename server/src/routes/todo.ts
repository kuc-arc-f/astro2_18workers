import { Hono } from "hono";
import { Env } from '../index'
import DbCommon from '../lib/DbCommon';

const router = new Hono<Env>()
const retObj = {ret: "NG", data: [], message: "Error, Internal Server Error"};

/**
* create
* @param
*
* @return
*/  
router.post("/create", async (c) => {
  try{
    const body = await c.req.json();
    //console.log(body);
    if (body) {
      const sql = `
      INSERT INTO todos ( title, content, completed)
      VALUES('${body.title}', '${body.content}', 0);
      `;
console.log(sql);
      const resulte = await DbCommon.execute(sql, c, body);
      if(resulte !== true) {
        console.error("Error, /create");
        throw new Error('Error , create');
      }      
    }
    return c.json({ret: "OK", data: body});
  } catch (e) {
    console.error(e);
    return c.json(retObj);
  }  
});
/**
* update
* @param
*
* @return
*/  
router.post("/update", async (c) => {
  try{
    const body = await c.req.json();
console.log(body);
    if (body) {
      const sql = `
      UPDATE todos 
      SET title = '${body.title}', content='${body.content}',
      completed = '${body.completed}'
      WHERE id = ${body.id}
      `;
//      console.log(sql);
      const resulte = await DbCommon.execute(sql, c, body);
      if(resulte !== true) {
        console.error("Error, /update");
        throw new Error('Error , update');
      }        
    }
    return c.json({ret: "OK", data: body});
  } catch (e) {
    console.error(e);
    return c.json(retObj);
  }  
});
/**
* delete
* @param
*
* @return
*/ 
router.post("/delete", async (c) => {
  try{
    const body = await c.req.json();
    if (body) {
      const sql = `
      DELETE FROM todos WHERE id = ${body.id}
      `;
      //console.log(sql);
      const resulte = await DbCommon.execute(sql, c, body);
      if(resulte !== true) {
        console.error("Error, /delete");
        throw new Error('Error , delete');
      }        
    }
    return c.json({ret: "OK", data: body});    
  } catch (e) {
    console.error(e);
    return c.json(retObj);
  }  

});
/**
* get
* @param
*
* @return
*/ 
router.post("/get", async (c) => {
  try{
    let item = {};
    const body = await c.req.json();
    console.log(body);
    if (body) {
      const sql = `
      SELECT * FROM todos
      WHERE id = ${body.id}
      `;
      const resulte = await DbCommon.select(sql, c, body);
//console.log(resulte);
      if(resulte.length < 1) {
        console.error("Error, results.length < 1");
        throw new Error('Error , get');
      }
      item = resulte[0];
    }
    return c.json({ret: "OK", data: item});
  } catch (e) {
    console.error(e);
    return c.json(retObj);
  }  
});
/**
* get_list
* @param
*
* @return
*/ 
router.post("/get_list", async (c) => {
  try{
    const body = await c.req.json();
    //console.log(body);
    let resulte: any = [];  
    if (body) {
      const sql = `
      SELECT * FROM todos
      ORDER BY id DESC
      `;
      resulte = await DbCommon.select(sql, c, body);
      //console.log(resulte);
      if(resulte.length < 1) {
        console.error("Error, results.length < 1");
      }
    }
    return c.json({ret: "OK", data: resulte});
  } catch (e) {
    console.error(e);
    return c.json(retObj);
  }  
});
export default router;
