// @ts-expect-error
import StorageWorker from "@ec-nordbund/cache?worker";
import { wrap } from "comlink";
import { DATA } from "./index";

export function createStorageWorker(pwd: string) {
  let worker: Worker = new StorageWorker()

  worker.postMessage({ pwd, msg: 'ec-init'})

  return {
    store: wrap<DATA>(worker),
    worker
  }
}