var maxResults=5;
var searchInput='';
var title =''

/* Global configuration for Ajax requests 
jQuery.ajaxSetup({
   timeout: 99999999999
});*/

function searchYT(searchInput, maxResults)
  {
    $('#results').slideDown('fast');
    $.ajax
    ({ 
      type: "GET",
      url: 'http://gdata.youtube.com/feeds/videos' +
      '?vq=' + searchInput +
      '&max-results=' + maxResults +
      '&alt=json-in-script&callback=showMyVideos&' + 
      'orderby=relevance&sortorder=descending&format=5&fmt=18',
      success: function(response)
      {
        //console.log("JSON success");
      } 
    });
  }

// Code for Searching Videos
$(function() 
{ 
  $('#results').slideUp('fast');
  
  $('#searchbar').keyup(function()
  {
    searchInput = $(this).val();
    if($(this).val().length > 2)
    {
      //console.log("u have entered 3 chars")
      searchYT(searchInput, 5);
    }
    else
      {
        $('#results').text('');
        $('#results').slideUp('fast');
      }
  });
//**********************************************************
  //When I Click an Item in the Div
  $('.yt-link a').live("click", function(event){
    event.preventDefault();
    var yturl = $(this).attr("href");
    var ytid = yturl.split('v=')[1];
    var ampersandPosition = ytid.indexOf('&');
    if(ampersandPosition != -1) {
      ytid = ytid.substring(0, ampersandPosition);
    }
    title = $(this).text();
    $('#searchbar').val(title);
    console.log(ytid);
    console.log(title);
    $('#results').html("<p><strong>Our Chipmunks Are Rehersing Your Selection</strong></p><p>They can take some time...Grab some pop corn, the entertainment will commence automatically :)</p><p><img src='/imgs/DancingChipmunks.gif'/></p>");
    $.ajax({ 
      type: "POST",
      url: '/convert/',
      data: {url:ytid}, 
      success: function(response) {
        console.log(response);
      }
    }).done(function()
    {
      $('#results').html('<audio autoplay="autoplay" controls="controls"><source src="songs/'+ytid+'.wav">Your browser does not support the audio tag.</audio>');
    });
    return false;
  });
});
