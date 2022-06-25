var express = require('express')
var router = express.Router();
var post_md = require('../models/post');
router.use("/admin", require("./admin"));
router.use("/blog", require("./blog"));

// router.get("/",function(req,res){
// 	// res.json({message:"This is Home Page"});
// 	res.render("test");
// });
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
router.get("/chat",function(req,res){
		res.render("chat");
})



module.exports = router;