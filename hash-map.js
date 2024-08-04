import { LinkedList } from "./linked-list.js";

class HashMap {
  #capacity = 16;
  #loadFactor = 0.8;
  #buckets;
  #size = 0;

  constructor() {
    this.#buckets = [];
    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets.push(null);
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    if (this.#buckets[hashCode] === null) {
      const list = new LinkedList();
      list.append(key, value);
      this.#buckets[hashCode] = list;
      return;
    }
    const bucket = this.#buckets[hashCode];
    const oldNode = bucket.find(key);
    if (oldNode === null) {
      bucket.append(key, value);
    } else {
      oldNode.value = value;
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucket = this.#buckets[hashCode];
    if (bucket === null) {
      return null;
    }
    const node = bucket.find(key);
    if (node === null) {
      return null;
    } else {
      return node.value;
    }
  }

  toString() {
    let string = "";
    this.#buckets.forEach((bucket, index) => {
      if (bucket === null) {
        string += `${index}: null` + "\n";
      } else {
        string += `${index}: ${bucket.toString()}` + "\n";
      }
    });
    return string;
  }
}

export { HashMap };
