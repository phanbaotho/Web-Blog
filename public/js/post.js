function Post(){
	function bindevent(){

		$(".post_edit").click(function(e){
	
			var params = {
				id:$('.id').val(),
				title: $('.title').val(),
				content: tinymce.get("mytextarea").getContent(),
				author:$('.author').val()
			}
			var base_url = 'http://localhost:3000';
		$.ajax({
			url: base_url +"/admin/post/edit",
			type:"PUT",
			data:params,
			dataType:"json",
			success:function(res){
				if(res.status_code ==200){
					location.reload();
				}
			}
		})


		});

		$('.post_delete').click(function(e){
			var post_id = $(this).attr("post_id");

				var base_url = 'http://localhost:3000';
			$.ajax({
			url: base_url +"/admin/post/delete",
			type:"DELETE",
			data:{id:post_id},
			dataType:"json",
			success:function(res){
				if(res.status_code ==200){
					location.reload();
				}
			}
		})
		});
		
	}
	bindevent();
}
$(document).ready(function(){
	new Post();
})