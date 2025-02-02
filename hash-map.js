import { LinkedList } from "./linked-list.js";

class HashMap {
  #capacity;
  #loadFactor;
  #buckets;
  #length = 0;

  constructor(capacity = 16, loadFactor = 0.75) {
    this.#capacity = capacity;
    this.#loadFactor = loadFactor;
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

  #getBucket(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    const bucket = this.#buckets[index];
    return bucket;
  }

  set(key, value) {
    const bucket = this.#getBucket(key);
    const node = bucket.find(key);
    if (node === null) {
      bucket.append(key, value);
      this.#length++;
      if (this.#length > this.#capacity * this.#loadFactor) {
        this.grow();
      }
    } else {
      node.value = value;
    }
  }

  get(key) {
    const bucket = this.#getBucket(key);
    const node = bucket.find(key);
    if (node === null) {
      return null;
    } else {
      return node.value;
    }
  }

  has(key) {
    const bucket = this.#getBucket(key);
    const node = bucket.find(key);
    return node !== null;
  }

  remove(key) {
    const bucket = this.#getBucket(key);
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

  clear() {
    this.#buckets.forEach((bucket) => bucket.clear());
    this.#length = 0;
  }

  keys() {
    return this.#buckets.reduce(
      (acc, bucket) => [...acc, ...bucket.keys()],
      []
    );
  }

  values() {
    return this.#buckets.reduce(
      (acc, bucket) => [...acc, ...bucket.values()],
      []
    );
  }

  entries() {
    return this.#buckets.reduce(
      (acc, bucket) => [...acc, ...bucket.entries()],
      []
    );
  }

  grow() {
    // Double the capacity
    // https://www.geeksforgeeks.org/load-factor-in-hashmap-in-java-with-examples/
    const entries = this.entries();
    this.clear();
    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets.push(new LinkedList());
    }
    this.#capacity *= 2;
    entries.forEach(([key, value]) => this.set(key, value));
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
