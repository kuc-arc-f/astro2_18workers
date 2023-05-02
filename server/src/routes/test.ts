import { Hono } from "hono";
import type { Database } from '@cloudflare/d1'

interface Env {
  DB: Database
}
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
      INSERT INTO Customers ( CompanyName, ContactName)
      VALUES('${body.title}', '${body.body}');
      `;
      //console.log(sql);
      await c.env.DB.prepare(sql).run();
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
      UPDATE Customers 
      SET CompanyName = '${body.title}', ContactName='${body.body}'
      WHERE id = ${body.id}
      `;
      console.log(sql);
      await c.env.DB.prepare(sql).run();
    }
/*
*/
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
    //console.log(body);
    if (body) {
      const sql = `
      DELETE FROM Customers WHERE id = ${body.id}
      `;
      //console.log(sql);
      await c.env.DB.prepare(sql).run();
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
    let result: any = {};  
    if (body) {
      result = await c.env.DB.prepare(
      `
      SELECT CompanyName ,ContactName FROM Customers
      WHERE id = ${body.id}
      `
      ).all();
    console.log(result.results);
      if(result.results.length < 1) {
        console.error("Error, results.length < 1");
        throw new Error('Error , get');
      }
      item = result.results[0];
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
    let item = {};
    const body = await c.req.json();
    console.log(body);
    let result: any = {};  
    if (body) {
      result = await c.env.DB.prepare(
      `
      SELECT CompanyName ,ContactName FROM Customers
      ORDER BY id DESC
      `
      ).all();
    console.log(result.results);
      if(result.results.length < 1) {
        console.error("Error, results.length < 1");
      }
    }
    return c.json({ret: "OK", data: result.results});
  } catch (e) {
    console.error(e);
    return c.json(retObj);
  }  
});
export default router;
