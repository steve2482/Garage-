//  Get Search Results from songsterr and display

function getSongsterr(userSearch) {
  var artist = userSearch;
  $.ajax({
    url: 'https://www.songsterr.com/a/ra/songs/byartists.json?artists="' + artist + '"',
    dataType: 'json',
    type: 'GET'
  })
  .done(function(result) {
// Sort the results
    result.sort(function(a, b) {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    for (var i = 0; i < result.length; i++) {
      $('.songs').append('<li class="each-song"><a href="https://www.songsterr.com/a/wa/song?id=' + result[i].id + '">' + result[i].title + '<li>');
    }
  });
}

// Get search results from YouTube and display

function getYouTube(userSearch) {
  var params = {
    part: 'snippet',
    key: 'AIzaSyDOA-ddJ3xi67PNWuEVlqfalhKlxDqj538',
    q: userSearch
  };
  var url = 'https://www.googleapis.com/youtube/v3/search';
  $.getJSON(url, params, function(result) {
  })
  .done(function(result) {
    for (var i = 0; i < result.items.length; i++) {
      var title = result.items[i].snippet.title;
      var thumbnail = result.items[i].snippet.thumbnails.medium.url;
      var vidId = result.items[i].id.videoId;
      var content = '<a href="https://www.youtube.com/watch?v=' + vidId + '"><img class="thumbnail" src="' + thumbnail + '"></a><br><p class="title"><a href="https://www.youtube.com/watch?v=' + vidId + '">' + title + '</a>';
      $('.videos').append(content);
    }
  });
}

// Get search results from Wiki and display

function getWiki(userSearch) {
  function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  var title = capitalizeEachWord(userSearch);
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=query&titles=' + title + '&prop=extracts&format=json',
    dataType: 'jsonp',
    type: 'GET'
  })
  .done(function(result) {
    console.log(result);
    var pageId = Object.keys(result.query.pages);
    var content = '<h2>' + result.query.pages[pageId].title + '</h2><br>' + result.query.pages[pageId].extract;
    $('.wiki-article').append(content);
  });
}

// Clear results display

function clearResults() {
  $('.songs').text('');
  $('.videos').text('');
  $('.wiki-article').text('');
}

// ------------------------------------------------------
// ------------------------------------------------------

$(document).ready(function() {
  $('#search').submit(function(e) {
    e.preventDefault();
    clearResults();
    var userSearch = $(this).find("input[name='search']").val();
    getSongsterr(userSearch);
    getYouTube(userSearch);
    getWiki(userSearch);
    $('.results').show();
    $('#user-request').val('');
  });
});
