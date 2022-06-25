var q =require('q');
var db = require('../common/database');
var connection = db.getconnection();

function adduser(user){
	if(user){
		var defer = q.defer();
		var query = connection.query('INSERT INTO users SET ?', user, function (error, results) {
		  if (error){
		  	 throw error;
		  }else{
		  		  defer.resolve(results);
		  }

		});
		return defer.promise;
	}
	return false;
}
function getuserbyemail(email){
	if(email){
		var defer = q.defer();
		var query = connection.query('SELECT * FROM users WHERE ?',{"email":email},function(err,result){
						 if (err){
						  	 throw err;
						  }else{
						  		  defer.resolve(result);
						  }
		});
			return defer.promise;
	}
	return false;
}
function getallusers(){
	var defer = q.defer();
		var query = connection.query('SELECT * FROM users',function(err,result){
						 if (err){
						  	 throw err;
						  }else{
						  		  defer.resolve(result);
						  }
		});
			return defer.promise;
}
module.exports ={
	adduser:adduser,
	getuserbyemail:getuserbyemail,
	getallusers:getallusers
} 


