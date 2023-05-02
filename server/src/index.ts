import { Hono } from "hono";
import { cors } from 'hono/cors'
import type { Database } from '@cloudflare/d1'
//router
import testRouter from './routes/test';
import todoRouter from './routes/todo';

interface Env {
  DB: Database
}

const app = new Hono<Env>()
app.use("/*", cors());
//const retArr = {ret: "OK", data: {}, message: ""};

app.get("/", (c) => c.text("Hello World-222"));
//
app.route('/test', testRouter);
app.route('/todos', todoRouter);

export default app;