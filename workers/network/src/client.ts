// @ts-expect-error
import StorageWorker from "@ec-nordbund/network?worker";
import { wrap } from "comlink";
import { DATA } from "./index";

export function createNetworkWorker(pwd: string) {
  let worker: Worker = new StorageWorker()

  worker.postMessage({ pwd, msg: 'ec-init'})

  return {
    store: wrap<DATA>(worker),
    worker
  }
}