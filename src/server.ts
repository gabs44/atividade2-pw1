import express, { NextFunction, Request, Response } from "express";
import router from "./routes";

const app = express();
app.use(express.json())

app.use(router)


app.listen(4444, ()=>{
  console.log('server running on port 4444')
})
