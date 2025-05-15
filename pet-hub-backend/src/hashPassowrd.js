const bcrypt = require('bcryptjs');

const password1 = bcrypt.hashSync("123456", 10);
const password2 = bcrypt.hashSync("456798", 10);
const password3 = bcrypt.hashSync("798456", 10);
const testPassword = bcrypt.hashSync("123789", 10);

console.log("Usuario1:", password1);
console.log("Usuario2:", password2);
console.log("Usuario3:", password3);
console.log("test:", testPassword);
console.log(bcrypt.compareSync("123456", "$2b$10$xGeYZ1U4NbvgSmrwQTrflOfQsX3Fl51VPjlEY6.neNYdqq99gbe1S"));

// console.log("Admin:", password2);