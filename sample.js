import { HashMap } from "./hash-map.js";

const test = new HashMap(16, 0.75);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.toString()); // buckets[0..15] are shown

test.set("moon", "silver");
console.log(test.toString()); // Expanded buckets[0..31] are shown

test.set("hat", "rainbow");
console.log(test.get("hat")); // rainbow

console.log(test.get("frog")); // green
console.log(test.get("shark")); // null

console.log(test.has("frog")); // true
console.log(test.has("shark")); // false

console.log(test.remove("frog")); // true
console.log(test.remove("shark")); // false

console.log(test.get("frog")); // null

console.log(test.length()); // 12

test.clear();
console.log(test.length()); // 0

test.set("Mars", "red");
test.set("Earth", "blue");
test.set("Jupiter", "marble");

console.log(test.keys()); // [ 'Earth', 'Mars', 'Jupiter' ]
console.log(test.values()); // [ 'blue', 'red', 'marble' ]
console.log(test.entries()); // [ [ 'Earth', 'blue' ], [ 'Mars', 'red' ], [ 'Jupiter', 'marble' ] ]
