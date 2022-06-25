var express = require('express')
var router = express.Router();
var user_md = require('../models/user')
var post_md =require('../models/post')
var helpers  =require('../helpers/helper')
router.get("/",function(req,res){
	if(req.session.user){
	var data =post_md.getallposts();
	data.then(function(posts){
		var data = {
			posts:posts,
			error:false
		}
		res.render("admin/dashboard",{data:data});
	}).catch(function(err){
		res.render("admin/dashboard",{data:{error:"get post fail"}});
	})
	}else{
		res.redirect('/admin/login');
	}

	
});
router.get("/signup",function(req,res){
	res.render("signup",{data:{}})
});
router.get("/login",function(req,res){
	res.render("login",{data:{}})
});
router.post("/signup",function(req,res){
	var user = req.body;
	if(user.mail.trim().length ==0){
		res.render("signup",{data:{error:"Email is required"}});
	}
	if(user.passwd != user.repasswd && user.repasswd.trim().length ==0 ){
		res.render("signup",{data:{error:"Password is not match"}});
	}
	var password  =  helpers.hasspassword(user.passwd);
	user ={
		email: user.mail,
		password:password,
		firstname:user.firstname,
		lastname:user.lastname

	}

	var result = user_md.adduser(user);
	result.then(function(data){
		res.redirect("/admin/login");
	}).catch(function(err){
		res.render("signup",{data:{error:"counld not insert data"}});
	});
	// if(!result){
	// 	resr.render("signup",{data:{error:"counld not insert data"}});
	// }else{
	// 	res.json({message:"insert successfull"})
	// }

});

router.post("/login",function(req,res){
	var params =req.body;
	if(params.mail.trim().length ==0){
		res.render("login",{data:{error:"Please enter an email"}});
	}else{
		var data = user_md.getuserbyemail(params.mail);
		if(data){
			data.then(function(users){
				var user =users[0];
				var status =helpers.compare_password(params.passwd.toString(),user.password);
				if(!status){
							res.render("login",{data:{error:"Password is wrong"}})
				}else{
					req.session.user =user;
					res.redirect("/admin")
				}
			})
		}else{
			res.render("login",{data:{error:"Email is not exits"}});
		}
	}
});
router.get("/post/new",function(req,res){
	if(req.session.user){
res.render("admin/post/new",{data:{error:false}})
	}else{
res.redirect('/admin/login');
	}
	
});
router.post("/post/new",function(req,res){
	if(req.session.user){
	var params = req.body;
	if(params.title.trim().length ==0){
		res.render("admin/post/new",{data:{error:"title is required"}})
	}else{
			var now =new Date();
	params.created_at =now;
	params.updated_at =now;
	var data = post_md.addpost(params);
	data.then(function(result){
		res.redirect("/admin");
	}).catch(function(err){
			var data = {
			error:"Could not insert post"
		}
		res.render("admin/post/new",{data:data})
	});
	}
	}else{
res.redirect('/admin/login');
	}


})
router.get("/post/edit/:id",function(req,res){
	if(req.session.user){
	var params = req.params;
	var id = params.id;
	var post = post_md.getpostbyid(id);
	if(post){
		post.then(function(posts){
			var post = posts[0];
			var data ={
				post:post,
				error:false
					}
			res.render("admin/post/edit",{data:data});
		}).catch(function(err){
			var data = {
			error:"Could not get post"
						}
			res.render("admin/post/edit",{data:data});
		})
	}else{
		var data = {
				error:"Could not get post"
					}
			res.render("admin/post/edit",{data:data})
		
		}
	}else{
res.redirect('/admin/login');
	}

});
router.put("/post/edit",function(req,res){
	if(req.session.user){
	var params = req.body;
	var data = post_md.updatepost(params);
	if(!data){
		res.json({status_code:500})
	}else{
		data.then(function(result){
			res.json({status_code:200})
		}).catch(function(err){
				res.json({status_code:500})
			})
	}
	}else{
res.redirect('/admin/login');
	}

});
router.delete("/post/delete",function(req,res){
	if(req.session.user){
	var post_id = req.body.id;
	var data = post_md.deletepost(post_id);
	if(!data){
		res.json({status_code:500})
	}else{
		data.then(function(result){
			res.json({status_code:200})
		}).catch(function(err){
				res.json({status_code:500})
			})
	}
	}else{
res.redirect('/admin/login');
	}


});
router.get("/user",function(req,res){
	if(req.session.user){
	var data = user_md.getallusers();
	if(data){
		data.then(function(users){
		var data = {
			users:users,
			error:false
		}
		res.render("admin/user",{data:data});
	}).catch(function(err){
		res.render("admin/user",{data:{error:"get users fail"}});
	})
	}
	}else{
		res.redirect('/admin/login');
	}

})
module.exports = router;