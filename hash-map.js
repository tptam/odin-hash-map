import { LinkedList } from "./linked-list.js";

class HashMap {
  #capacity = 16;
  #loadFactor = 0.8;
  #buckets;
  #length = 0;

  constructor() {
    this.#buckets = [];
    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets.push(new LinkedList());
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
    const bucket = this.#buckets[hashCode];
    const node = bucket.find(key);
    if (node === null) {
      bucket.append(key, value);
      this.#length++;
    } else {
      node.value = value;
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucket = this.#buckets[hashCode];
    const node = bucket.find(key);
    if (node === null) {
      return null;
    } else {
      return node.value;
    }
  }

  has(key) {
    const hashCode = this.hash(key);
    const bucket = this.#buckets[hashCode];
    const node = bucket.find(key);
    return node !== null;
  }

  remove(key) {
    const hashCode = this.hash(key);
    const bucket = this.#buckets[hashCode];
    const index = bucket.findIndex(key);
    if (index === null) {
      return false;
    } else {
      bucket.removeAt(index);
      this.#length--;
      return true;
    }
  }

  length() {
    return this.#length;
  }

  toString() {
    let string = "";
    this.#buckets.forEach((bucket, index) => {
      string += `${index}: ${bucket.toString()}` + "\n";
    });
    return string;
  }
}

export { HashMap };
