class Comment {
  constructor(id, content, commenter_id, dilemma_id) {
    this.id = id;
    this.content = content;
    this.commenter_id = commenter_id;
    this.dilemma_id = dilemma_id;
  }
}

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
  $('input#new_comment').click(function(event){
    event.preventDefault();
    var dilemma_id = parseInt($('#comment_dilemma_id').attr('value'));
    var commenter_id = parseInt($('#comment_commenter_id').attr('value'));
    var content = $('textarea').val();
    var new_comment = {"comment" : {"content" : content, "dilemma_id" : dilemma_id, "commenter_id" : commenter_id}};
    $.ajax({
      "url" : "/comments",
      "type" : "POST",
      "data" : new_comment,
      "dataType" : "json",
      success : function(data) {
        debugger;
        // var commentObject = new Comment(data.id, data.content, data.commenter_id, data.dilemma_id)
      }
    });
  });
}

$(document).ready(function(){
  addComment();
});