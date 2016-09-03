//  Get Search Results from songsterr
function getSongsterr(userSearch) {
  var artist = userSearch;
  $.ajax({
    url: 'http://www.songsterr.com/a/ra/songs/byartists.json?artists=' + artist,
    dataType: 'json',
    type: 'GET'
  })
  .done(function(result) {
    console.log(result);
    result.sort(function(a, b) {
      var titleA = a.title.toUpperCase(); // ignore upper and lowercase
      var titleB = b.title.toUpperCase(); // ignore upper and lowercase
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    for (var i = 0; i < result.length; i++) {
      $('.songs').append('<li class="each-song"><a href="http://www.songsterr.com/a/wa/song?id=' + result[i].id + '">' + result[i].title + '<li>');
    }
  });
}

// Get search results from YouTube
// Get search results from Wiki

// ---------------------------------------------------------------
// ---------------------------------------------------------------

$(document).ready(function() {
  $('#search').submit(function(e) {
    e.preventDefault();
    var userSearch = $(this).find("input[name='search']").val();
    console.log(userSearch);
    getSongsterr(userSearch);
  });
});
