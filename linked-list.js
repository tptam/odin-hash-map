import { createNode } from "./node.js";

class LinkedList {
  #head;
  constructor() {}
  append(key, value) {
    if (this.#head === undefined) {
      this.#head = createNode();
      this.#head.value = value;
      this.#head.key = key;
    } else {
      const newNode = createNode();
      newNode.key = key;
      newNode.value = value;
      this.tail().nextNode = newNode;
    }
  }
  prepend(key, value) {
    if (this.#head === undefined) {
      this.append(key, value);
    } else {
      const newNode = createNode();
      newNode.key = key;
      newNode.value = value;
      newNode.nextNode = this.#head;
      this.#head = newNode;
    }
  }
  size() {
    if (this.#head === undefined) {
      return 0;
    }
    let current = this.#head;
    let count = 0;
    while (current !== null) {
      count++;
      current = current.nextNode;
    }
    return count;
  }
  head() {
    return this.#head;
  }
  tail() {
    if (this.#head === undefined) {
      return;
    } else {
      let current = this.#head;
      while (current.nextNode !== null) {
        current = current.nextNode;
      }
      return current;
    }
  }
  at(index) {
    if (this.#head === undefined) {
      return undefined;
    }
    const size = this.size();
    if (index < 0 && size + index >= 0) {
      return this.at(size + index);
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    let current = this.#head;
    let count = 0;
    while (index !== count) {
      current = current.nextNode;
      count++;
    }
    return current;
  }

  pop() {
    if (this.#head === undefined) {
      return undefined;
    }
    const tail = this.tail();
    if (tail === this.#head) {
      this.#head = undefined;
    } else {
      this.at(-2).nextNode = null;
    }
    return tail;
  }

  contains(key) {
    if (this.#head === undefined) {
      return false;
    }
    let current = this.#head;
    while (current !== null) {
      if (current.key === key) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }
  find(key) {
    if (this.#head === undefined) {
      return null;
    }
    let current = this.#head;
    while (current !== null) {
      if (current.key === key) {
        return current;
      }
      current = current.nextNode;
    }
    return null;
  }
  findIndex(key) {
    if (this.#head === undefined) {
      return null;
    }
    let current = this.#head;
    let count = 0;
    while (current !== null) {
      if (current.key === key) {
        return count;
      }
      count++;
      current = current.nextNode;
    }
    return null;
  }
  toString() {
    if (this.#head === undefined) {
      return "";
    }
    let string = "";
    let current = this.#head;
    while (true) {
      if (current === null) {
        string += "null";
        break;
      } else {
        string += `( ${current.key} ) -> `;
        current = current.nextNode;
      }
    }
    return string;
  }

  //   Extra credit
  insertAt(key, value, index) {
    if (this.#head === undefined) {
      this.append(key, value);
      return;
    }
    const size = this.size();
    if (index < 0 && size + index >= 0) {
      this.insertAt(value, size + index);
      return;
    }
    if (index <= 0) {
      this.prepend(key, value);
      return;
    }
    if (index >= size) {
      this.append(key, value);
      return;
    }
    const newNode = createNode();
    newNode.key = key;
    newNode.value = value;
    newNode.nextNode = this.at(index);
    this.at(index - 1).nextNode = newNode;
  }
  removeAt(index) {
    if (this.#head === undefined) {
      return;
    }
    const size = this.size();
    if (index < 0 && size + index >= 0) {
      this.removeAt(size + index);
      return;
    }
    if (index < 0 || index >= size) {
      return;
    }
    if (index === size - 1) {
      this.pop();
      return;
    }
    if (index === 0) {
      this.#head = this.#head.nextNode;
      return;
    }
    this.at(index - 1).nextNode = this.at(index + 1);
  }
  clear() {
    this.#head = undefined;
  }
}

export { LinkedList };
