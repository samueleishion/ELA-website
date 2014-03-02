$(document).ready(function() { 
	get_event_image(); 
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