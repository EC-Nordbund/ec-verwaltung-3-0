import { IDBPDatabase, openDB } from "idb";
import { jsonEncryptionInterface, generateKey } from "aes-crypro-wrapper";
import { expose } from "comlink";
import { IPerson, IPerson_base, IAnmeldung, IAnmeldung_base } from "@ec-nordbund/types";

interface dataExtension {
  version: string;
}

async function createInterface(pwd: string) {
  const key = await generateKey(pwd)
  return jsonEncryptionInterface(key)
}

async function init(pwd: string) {
  let encryptionInterface = await createInterface(pwd)


  function secureStore<T extends {}, INDEX extends keyof T, KEY = T[INDEX]>(name: string, keyName: INDEX) {
    return {
      upgrade(db: IDBPDatabase<any>) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, {
            keyPath: 'secure_id'
          })
        }
      },
      store(db: IDBPDatabase<any>) {
        return {
          async get(id: KEY) {
            return await encryptionInterface.decrypt((await db.get(name, id as any)).contents) as (T & dataExtension)
          },
          async getAll() {
            const data = await db.getAll(name)
            return await Promise.all(data.map(({ contents }) => encryptionInterface.decrypt(contents))) as (T & dataExtension)[]
          },
          async add(data: T & dataExtension) {
            return await db.add(name, {
              secure_id: (data as any)[keyName],
              contents: await encryptionInterface.encrypt(data)
            })
          },
          async put(data: T & dataExtension) {
            return await db.put(name, {
              secure_id: (data as any)[keyName],
              contents: await encryptionInterface.encrypt(data)
            })
          },
          async delete(id: KEY) {
            return await db.delete(name, id as any)
          },
          async clear() {
            return await db.clear(name)
          }
        }
      }
    }
  }

  function secureListStore<T extends {}>(name: string) {
    const listStore = secureStore<{ ID: 'STATIC', list: T[] }, "ID">(name, 'ID')
    return {
      upgrade: listStore.upgrade,
      store(db: IDBPDatabase<any>) {
        const store = listStore.store(db)

        return {
          get() {
            return store.get('STATIC')
          },
          add(data: T[], version: string) {
            return store.add({ ID: 'STATIC', version, list: data })
          },
          put(data: T[], version: string) {
            return store.put({ ID: 'STATIC', version, list: data })
          },
          delete() {
            return store.clear()
          },
          clear() {
            return store.clear()
          }
        }
      }
    }
  }

  const stores = {
    personen: secureStore<IPerson, 'person_id'>('personen', 'person_id'),
    personen_list: secureListStore<IPerson_base>('personen_list'),
    anmeldungen: secureStore<IAnmeldung, 'anmelde_id'>('anmeldungen', 'anmelde_id'),
    anmeldungen_list: secureListStore<IAnmeldung_base>('anmeldungen_list')
  }

  const db = await openDB<any>('ec-database', 1, {
    upgrade(db) {
      Object.values(stores).forEach(v => v.upgrade(db))
    }
  })
  
  const indexedDBstore = {
    personen: stores.personen.store(db),
    personen_list: stores.personen_list.store(db),
    anmeldungen: stores.anmeldungen.store(db),
    anmeldungen_list: stores.anmeldungen_list.store(db)
  }
  
  return indexedDBstore
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
