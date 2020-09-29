// @ts-expect-error
import NetworkWorker from "@ec-nordbund/network?worker";
import { wrap } from "comlink";
import { DATA } from "./index";

export function createNetworkWorker(pwd: string) {
  let worker: Worker = new NetworkWorker()

  worker.postMessage({ pwd, msg: 'ec-init'})

  return {
    store: wrap<DATA>(worker),
    worker
  }
}