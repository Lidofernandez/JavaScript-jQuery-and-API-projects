$(document).ready(function() {


 $("form").submit(function(event){
   event.preventDefault();
   
   // the AJAX part
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var displayPhotos;
    
    
    var $searchFild = $("#search");
    
    var $sumitButton = $("#submit");
    
    $searchFild.prop("disabled", true);   
    $sumitButton.attr("disabled", true).val("searching...");
    
   
    var tagsSearch = $searchFild.val();
    
    if (tagsSearch !== ""){
      var flickrOptions = {
        tags: tagsSearch,
        format: "json"
      };
      
      function displayPhotos (data) {
        if (data.items.length > 0) {
          var photoHTML = '<ul>';
          $.each(data.items,function(i,photo) {
            photoHTML += '<li class="grid-25 tablet-grid-50">';
            photoHTML += '<a href="' + photo.link + '" class="image">';
            photoHTML += '<img src="' + photo.media.m + '"></a></li>';
          }); // end each
          photoHTML += '</ul>';
          $('#photos').html(photoHTML);
          console.log(data);
          $searchFild.val("")
        } else {
          
          var message = '<p>None photos found with this/these tag/s: ' + $searchFild.val() +'</p>';
          document.getElementById('photos').innerHTML = message;
          $searchFild.val("");
          
        }
      }
      
      $.getJSON(flickerAPI, flickrOptions, displayPhotos);
        
      
      var message = "";
      document.getElementById('photos').innerHTML = message;
      $searchFild.prop("disabled", false);   
      $sumitButton.attr("disabled", false).val("search");
      
    
    
    
    } else {
      
      var message = "<p>Please type a tag for searching</p>";
      document.getElementById('photos').innerHTML = message;
      
      $searchFild.prop("disabled", false);   
      $sumitButton.attr("disabled", false).val("search");
    }
  
   
}); 

}); // end ready


