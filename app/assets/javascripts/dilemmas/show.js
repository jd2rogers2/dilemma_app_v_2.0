function getAndDisplayComments(){
  var dilemma_id = $('#comment_table').attr('data-dilemma-id');
  var author_id = $('#comment_table').attr('data-author-id');
  var current_user_id = $('#comment_table').attr('data-current-user-id');
  $.get("/dilemmas/" + dilemma_id + ".json", function(data){
    var comments = data.comments;
    var total = "";
    for (var count = 0; count < comments.length; count++){
      var content = comments[count].content;
      var email = comments[count].commenter.email;
      total += "<tr><td>" + email + "</td><td>" + content;
      if (author_id === current_user_id) {
        total += " <a rel='nofollow' data-method='delete' href='/comments/" + comments[count].id + "'>delete</a>"
      }
      total += "</td></tr>";
    }
    $('#comment_header_row').after(total)
  });
}

function addComment(){
  $('#')
}

$(document).ready(function(){
});