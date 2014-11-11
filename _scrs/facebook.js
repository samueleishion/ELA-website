$(document).ready(function() { 
	get_event_image(); 
	get_page_albums(); 
}); 

function get_event_image() {
	$.ajax({
		type:'GET', 
		url:'http://graph.facebook.com/ELAatUTCS', 
		success: function(data) {
			var src = data["cover"]["source"]; 

			$('section.activities content').append('<img src="'+src+'">'); 
			$('section.activities content').append('<input type="hidden" id="src" value="'+src+'">'); 
		}, 
		complete: function() {
			var src = $('section.activities #src').val(); 
			var img = new Image(); 
			var context, data; 
			var x = 0, y = 0; 
			img.src = src; 
			context = document.getElementById('canvas').getContext('2d'); 
			context.drawImage(img,0,0); 
			console.log(context.getImageData(x,y,1,1)); 
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
				get_album_picture(id,name,url); 
			}
		});
	});  
}

function valid_album_name(album_name) {
	return !((album_name=="Cover Photos") || (album_name=="Profile Pictures") || (album_name=="Timeline Photos")); 
}

function get_album_picture(album_id,name,url) { 
	$.getScript('//connect.facebook.net/en_US/all.js',function() {
		FB.api('/'+album_id+'/picture',function(data) {
			var img = data["data"]["url"]; 
			$('section.previous content').append('<a href="'+url+'" target="_new" class="event"><div class="image" style="background-image:url('+img+');"></div><h3>'+name+'</h3>'); 
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

function get_page_events() {
	$.getScript('//connect.facebook.net/en_US/all.js',function() {
		FB.api('/ELAatUTCS/events',function(data) {
			console.log(data); 
		}); 
	}); 
}