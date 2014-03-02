$(document).ready(function() { 
	get_event_image(); 
	get_page_info(); 
}); 

function get_event_image() {
	$.ajax({
		type:'GET', 
		url:'http://graph.facebook.com/ELAatUTCS', 
		success: function(data) {
			var img = data["cover"]["source"]; 
			$('section.activities').append('<img src="'+img+'">'); 
		}
	}); 
}

function get_page_info() {
	$.getScript('//connect.facebook.net/en_US/all.js',function() {
		FB.api('/ELAatUTCS',function(data) {
			console.log(data); 
		});
	});  
}
