import express from "./express";
import cors from './cors'
import { json as bodyparser } from "./body-parser";
import { push } from "./push";

const app = express()
const subs: any[] = []

app.use(cors())

app.use(bodyparser())

app.post('/subscribe', (req, res) => {
  subs.push(req.body)
  res.end('OK')
})

app.get('/test-msg', (req, res) => {
  push(subs)
  res.end('OK')
})

app.listen(3333)
