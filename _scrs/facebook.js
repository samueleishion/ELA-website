$(document).ready(function() { 
	get_event_image(); 
	get_page_albums(); 
}); 

function get_event_image() {
	$.ajax({
		type:'GET', 
		url:'http://graph.facebook.com/ELAatUTCS', 
		success: function(data) {
			var img = data["cover"]["source"]; 
			$('section.activities content').append('<img src="'+img+'">'); 
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

function get_page_albums() {
	$.getScript('//connect.facebook.net/en_US/all.js',function() {
		FB.api('/ELAatUTCS/albums',function(data) {
			var album, id, url, name; 

			for(var i = 0; i < data["data"].length; i++) {
				album = data["data"][i]; 
				name = album["name"]; 
				if(!valid_album_name(name)) continue; 
				id = album["id"]; 
				url = album["link"]; 
				get_album_picture(id); 
				get_album_photos(id); 
			}
		});
	});  
}

function valid_album_name(album_name) {
	return !((album_name=="Cover Photos") || (album_name=="Profile Pictures") || (album_name=="Timeline Photos")); 
}

function get_album_picture(album_id) { 
	$.getScript('//connect.facebook.net/en_US/all.js',function() {
		FB.api('/'+album_id+'/picture',function(data) {
			var img = data["data"]["url"]; 
		}); 
	}); 
}

function get_album_photos(album_id) {
	$.getScript('//connect.facebook.net/en_US/all.js',function() {
		FB.api('/'+album_id+'/photos',function(data) {
			var img; 
			for(var i = 0; i < data["data"].length; i++) {
				img = data["data"][i]["images"]; 
			} 
		}); 
	}); 
}