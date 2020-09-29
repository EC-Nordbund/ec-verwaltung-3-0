import { expose } from "comlink";
import { IPerson, IPerson_base, IAnmeldung, IAnmeldung_base } from "@ec-nordbund/types";


async function createInterface(pwd: string) {
  const key = await generateKey(pwd)
  return jsonEncryptionInterface(key)
}

async function init(pwd: string) {
  return {}
}

const _self: WorkerGlobalScope & typeof globalThis = self as any

_self.onmessage = async (msg) => { 
  if (msg.data.msg !== 'ec-init') {
    return
  }

  _self.onmessage = undefined!

  const data = await init(msg.data.pwd)

  expose(data)
}

export type DATA = ReturnType<typeof init> extends Promise<infer U> ? U : null

console.log('network worker running')
