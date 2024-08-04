function createNode() {
  let key = null;
  let value = null;
  let nextNode = null;
  function toString() {
    return `{ key: ${this.key}, value: ${this.value}, nextNode: ${
      this.nextNode === null ? "null" : "Node (" + this.nextNode.key + ")"
    } }`;
  }
  return { key, value, nextNode, toString };
}

export { createNode };
