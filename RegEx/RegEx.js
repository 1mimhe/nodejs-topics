const re = new RegExp("abc"); // /abc/

console.log(re.test("asbcafj")); // false

console.log(re.test("abcasfas")); // true

console.log("Mammad Hosseini".search(re)); // -1

console.log("Mammad abc Hosseini".search(re)); // 7

console.log("Mammad abc Hosseini".match(re)); // [ 'abc', index: 7, input: 'Mammad abc Hosseini', groups: undefined ]