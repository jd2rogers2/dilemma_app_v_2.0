class Comment {
  constructor(id, content, commenter, dilemma_id) {
    this.id = id;
    this.content = content;
    this.commenter = commenter;
    this.dilemma_id = dilemma_id;
    Comment.allInstances.push(this);
  }
}

Comment.allInstances = [];
var current_user_id, author_id;

function getAndDisplayComments(){
  var dilemma_id = $('#comment_table').attr('data-dilemma-id');
  $.get("/dilemmas/" + dilemma_id + ".json", function(data){
    buildAllComments(data.comments);
    thisDilemmasCommentsHtml(dilemma_id);
  });
}

function buildAllComments(comments){
  for (var count = 0; count < comments.length; count++){
    var comment = new Comment(comments[count].id, comments[count].content, comments[count].commenter, comments[count].dilemma_id);
  }
}

function thisDilemmasCommentsHtml(this_dilemmas_id){
  for (var count = 0; count < Comment.allInstances.length; count++){
    var comment = Comment.allInstances[count];
    if (comment.dilemma_id == this_dilemmas_id){
      var this_id = false;
      debugger;
      if (author_id === current_user_id) {
        this_id = comment.id;
      }
      var template = Handlebars.compile($("#comment-template").html());
      var html = template({email: comment.commenter.email, content: comment.content, id: this_id});
      $('#comment_header_row').after(html);
    }
  }
}

function commentHtml(comment){
  var comment_html = "<tr><td>" + comment.commenter.email + "</td><td>" + comment.content;
  if (author_id === current_user_id) {
    comment_html += " <a rel='nofollow' data-method='delete' href='/comments/" + comment.id + "'>delete</a>"
  }
  return comment_html += "</td></tr>";
}

function addComment(){
  $('input#new_comment').click(function(event){
    event.preventDefault();
    var dilemma_id = $('#comment_dilemma_id').attr('value');
    var content = $('textarea').val();
    var new_comment = {"comment" : {"content" : content, "dilemma_id" : dilemma_id, "commenter_id" : current_user_id}};
    $.ajax({
      "url" : "/comments",
      "type" : "POST",
      "data" : new_comment,
      "datatype" : "json",
      // randomly switching back and forth from dataType to datatype
      success : function(data) {
        var comObj = new Comment(data.id, data.content, data.commenter, data.dilemma_id);
        // $('#comment_create_row').before(commentHtml(comObj))
        var template = Handlebars.compile($("#comment-template").html());
        var html = template({email: comObj.commenter.email, content: comObj.content});
        $('#comment_create_row').before(html);
      }, 
      error : function(data, error, message) {
        alert(message);
      }
    });
  });
}

$(document).ready(function(){
  addComment();
  author_id = $('#comment_table').attr('data-author-id');
  current_user_id = $('#comment_table').attr('data-current-user-id');
});