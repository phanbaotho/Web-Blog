var express = require('express')
var router = express.Router();
var post_md = require('../models/post');
router.get("/",function(req,res){
	// res.json({message:"This is Blog"});
	var data = post_md.getallposts();
	if(data){
		data.then(function(posts){
			var results ={
				posts:posts,
				error:false
			}
				res.render("blog/index",{data:results});
		}).catch(function(err){
			var results ={
				error: "Could not get post"
			}
				res.render("blog/index",{data:results});
		});
	}

});
router.get("/post/:id",function(req,res){
	var data = post_md.getpostbyid(req.params.id);
	if(data){
		data.then(function(posts){
			var results = {
				post:posts[0],
				error:false
			}
			res.render("blog/blog",{data:results})
		}).catch(function(err){
		var post = {
				error:"Could not load post"
			}
			res.render("blog/blog",{data:results})
		})
	}
})
router.get("/about",function(req,res){
	res.render("blog/about",{data:{error:false}});
})
module.exports = router;