const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

var result = bcrypt.compareSync(someOtherPlaintextPassword, hash); 

console.log(result)

