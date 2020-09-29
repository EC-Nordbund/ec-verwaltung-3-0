const ivLen = 16; // the IV is always 16 bytes

function stringToTypedArray(str: string) {
  return new Uint8Array(str.split('').map((v) => v.charCodeAt(0)));
}
function stringFromTypedArray(arr: Uint8Array) {
  return String.fromCharCode(...arr);
}

export function generateKey(rawKey: string) {
  return crypto.subtle.importKey('raw', stringToTypedArray(rawKey).slice(0, 16), { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
}

function joinIvAndData(iv: Uint8Array, data: Uint8Array) {
  var buf = new Uint8Array(iv.length + data.length);

  iv.forEach((byte, i) => buf[i] = byte)
  data.forEach((byte, i) => buf[ivLen + i] = byte);

  return buf;
}

function createIV() {
  const initializationVector = new Uint8Array(ivLen);
  crypto.getRandomValues(initializationVector);

  return initializationVector
}

async function encrypt(data: string, key: CryptoKey) {
  const iv = createIV()

  const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: iv }, key, stringToTypedArray(data))
  const ciphered = joinIvAndData(iv, new Uint8Array(encrypted))
  return btoa(stringFromTypedArray(ciphered))
}

function separateIvFromData(buf: Uint8Array) {
  var iv = new Uint8Array(ivLen);
  var data = new Uint8Array(buf.length - ivLen);

  buf.forEach((byte, i) => {
    if (i < ivLen) {
      iv[i] = byte;
    } else {
      data[i - ivLen] = byte;
    }
  });

  return { iv: iv, data: data };
}

async function decrypt(data: string, key: CryptoKey) {
  const parts = separateIvFromData(stringToTypedArray(atob(data)));

  const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: parts.iv }, key, parts.data)

  return stringFromTypedArray(new Uint8Array(decrypted))
}

export interface encryptedJsonData<T> extends String { }

export type StringEncryptionInterface = ReturnType<typeof stringEncryptionInterface>
export type JsonEncryptionInterface = ReturnType<typeof jsonEncryptionInterface>

export function stringEncryptionInterface(key: CryptoKey) {
  return {
    async encrypt(data: string) {
      return encrypt(data, key)
    },
    async decrypt(data: string) {
      return decrypt(data as string, key)
    }
  }
}

export function jsonEncryptionInterface(key: CryptoKey) {
  return {
    async encrypt<T extends {}>(data: T): Promise<encryptedJsonData<T>> {
      return encrypt(JSON.stringify(data), key)
    },
    async decrypt<T extends {}>(data: encryptedJsonData<T>): Promise<T> {
      return JSON.parse(await decrypt(data as string, key))
    }
  }
}

