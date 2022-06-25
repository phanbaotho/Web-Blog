var  bcrypt = require('bcrypt');



function hasspassword(password){
	var saltRounds = 10;
	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(password, salt);
    return hash;
}
function compare_password(password,hash){

	var result = bcrypt.compareSync(password, hash)

	return result; 
}
module.exports = {
	hasspassword:hasspassword,
	compare_password:compare_password
}