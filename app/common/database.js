var config = require('config')
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : config.get("mysql.host"),
  user     : config.get("mysql.user"),
  password : config.get("mysql.password"),
  database : config.get("mysql.database")
});
 
connection.connect(function(err) {
	if (err) throw err
	
});
function getconnection(){
	return connection;
}
module.exports =  {
	getconnection:getconnection
}