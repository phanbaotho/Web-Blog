module.exports = function(io){
	var usernames = [];
	io.sockets.on("connection",function(socket){
		console.log("Have a new user connected");
		socket.on("adduser",function(username){
			socket.username = username;
			usernames.push(username);
			var data  = {
				sender:"SERVER",
				message:"You have join chat room"
			};
			socket.emit("update_message",data);
			var data ={
				sender:"SERVER",
				message:username + " have join chat room"
			};
			socket.broadcast.emit("update_message",data);

		})
		socket.on("send_message",function(message){
			var data ={
				sender:"You",
				message:message
			}
			socket.emit("update_message",data);
				var data ={
				sender: socket.username,
				message:message
			};
			socket.broadcast.emit("update_message",data);
		})
		socket.on("disconnect",function(){
			for(var i = 0;i < usernames.length ;i++){
				if(usernames[i] == socket.username){
					usernames.splice(i,1)
				}
			}
				var data ={
				sender:"SERVER",
				message:socket.username + " left chat room"
			};
			socket.broadcast.emit("update_message",data);
		})
	})
}