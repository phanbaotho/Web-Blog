var q =require('q');
var db = require('../common/database');
var connection = db.getconnection();

function getallposts(){
	var defer = q.defer();
	var query = connection.query('SELECT * FROM posts', function (error, results) {
	  if (error){
	  	 throw error;
	  }else{
	  		  defer.resolve(results);
	  }

	});
	return defer.promise;
}
function addpost(params){
	if(params){
	var defer = q.defer();
	var query = connection.query('INSERT INTO posts SET ?',params, function (error, results) {
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

function getpostbyid(id){
		var defer = q.defer();
	var query = connection.query('SELECT * FROM posts WHERE ?',{id:id}, function (error, results) {
	  if (error){
	  	 throw error;
	  }else{
	  		  defer.resolve(results);
	  }

	});
	return defer.promise;
}
function updatepost(params){

	if(params){
		var defer = q.defer();

		var query = connection.query('UPDATE posts SET title = ?, content = ?, author = ?,updated_at = ? WHERE id = ?', [params.title, params.content, params.author,new Date(),params.id], function (error, results){
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
function deletepost(post_id){

	if(post_id){
		var defer = q.defer();

		var query = connection.query('DELETE FROM posts WHERE id = ?', [post_id], function (error, results){
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
module.exports ={
	getallposts:getallposts,
	addpost:addpost,
	getpostbyid:getpostbyid,
	updatepost:updatepost,
	deletepost:deletepost
} 