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

  set(key, value) {
    const hashCode = this.hash(key);
    const bucket = this.#buckets[hashCode];
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

  clear() {
    this.#buckets.forEach((bucket) => bucket.clear());
    this.#length = 0;
  }

  keys() {
    const result = [];
    this.#buckets.forEach((bucket) => {
      let current = bucket.head();
      while (current !== undefined && current !== null) {
        result.push(current.key);
        current = current.nextNode;
      }
    });
    return result;
  }

  values() {
    const result = [];
    this.#buckets.forEach((bucket) => {
      let current = bucket.head();
      while (current !== undefined && current !== null) {
        result.push(current.value);
        current = current.nextNode;
      }
    });
    return result;
  }

  entries() {
    const result = [];
    this.#buckets.forEach((bucket) => {
      let current = bucket.head();
      while (current !== undefined && current !== null) {
        result.push([current.key, current.value]);
        current = current.nextNode;
      }
    });
    return result;
  }

  grow() {
    // Double the capacity
    // https://www.geeksforgeeks.org/load-factor-in-hashmap-in-java-with-examples/
    const entries = this.entries();
    this.clear();
    this.#capacity *= 2;
    for (let i = this.#capacity / 2; i < this.#capacity; i++) {
      this.#buckets[i] = new LinkedList();
    }
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
