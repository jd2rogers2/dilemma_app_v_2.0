class Comment {
  constructor(id, content, commenter, dilemma_id) {
    this.id = id;
    this.content = content;
    this.commenter = commenter;
    this.dilemma_id = dilemma_id;
  }
}

Comment.allInstances = [];

function getAndDisplayComments(){
  var dilemma_id = $('#comment_table').attr('data-dilemma-id');
  $.get("/dilemmas/" + dilemma_id + ".json", function(data){
    $('#comment_header_row').after(buildComments(data.comments))
  });
}

function buildComments(comments){
  var author_id = $('#comment_table').attr('data-author-id');
  var current_user_id = $('#comment_table').attr('data-current-user-id');
  var html = "";
  for (var count = 0; count < comments.length; count++){
    var comment = new Comment(comments[count].id, comments[count].content, comments[count].commenter, comments[count].dilemma_id);
    Comment.allInstances.push(comment)
    html += "<tr><td>" + comment.commenter.email + "</td><td>" + comment.content;
    if (author_id === current_user_id) {
      html += " <a rel='nofollow' data-method='delete' href='/comments/" + comment.id + "'>delete</a>"
    }
    html += "</td></tr>";
  }
  return html;
}

function addComment(){
  $('input#new_comment').click(function(event){
    event.preventDefault();
    var author_id = $('#comment_table').attr('data-author-id');
    var dilemma_id = $('#comment_dilemma_id').attr('value');
    var commenter_id = $('#comment_commenter_id').attr('value');
    var content = $('textarea').val();
    var new_comment = {"comment" : {"content" : content, "dilemma_id" : dilemma_id, "commenter_id" : commenter_id}};
    $.ajax({
      "url" : "/comments",
      "type" : "POST",
      "data" : new_comment,
      "datatype" : "json",
      success : function(data) {
        var comObj = new Comment(data.id, data.content, data.commenter_id, data.dilemma_id)
        var comment_html = "<tr><td>" + data.commenter.email + "</td><td>" + data.content;
        if (author_id === commenter_id) {
          comment_html += " <a rel='nofollow' data-method='delete' href='/comments/" + author_id + "'>delete</a>"
        }
        comment_html += "</td></tr>";
        $('#comment_create_row').before(comment_html)
      }, 
      error : function(data, error, message) {
        alert(message);
      }
    });
  });
}

function deleteComment(){
  $('div#comment_table a').click(function(event){
    event.preventDefault();
    debugger;
  });
}

function showDilemma(){
  $
}

$(document).ready(function(){
  addComment();
  deleteComment();
});