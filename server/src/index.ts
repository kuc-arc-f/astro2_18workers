import { Hono } from "hono";
import { cors } from 'hono/cors'
import type { Database } from '@cloudflare/d1'
//router
import Common from './lib/Common';
import testRouter from './routes/test';
import todoRouter from './routes/todo';

export interface Env {
  DB: Database,
  API_KEY: string
}
const app = new Hono<Env>()
app.use("/*", cors());
const retObj = {ret: "NG", data: [], message: "Error, Internal Server Error"};
//
app.use('*', async (c, next) => {
  if(c.req.method === 'GET') {
    console.log("method= GET ");
    return c.json(retObj);
  }
  if(c.req.method === 'POST') {  
  }
  await next();
})
//GET
app.get("/", (c) => c.text("Hello World-222"));
app.get("/test2", (c) => {
  console.log("key=", c.env.API_KEY);
  return c.text("Hello World-222");
});

//
app.route('/test', testRouter);
app.route('/todos', todoRouter);

export default app;