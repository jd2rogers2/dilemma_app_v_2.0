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

function authorCheck(commenter_id){
  var author_id = $('#comment_table').attr('data-author-id');
  var current_user_id = $('#comment_table').attr('data-current-user-id');
  if (author_id === current_user_id || current_user_id == commenter_id){
    return current_user_id;
  } else {
    return false;
  }
}

function thisDilemmasCommentsHtml(this_dilemmas_id){
  for (var count = 0; count < Comment.allInstances.length; count++){
    var comment = Comment.allInstances[count];
    if (comment.dilemma_id == this_dilemmas_id){
      var template = Handlebars.compile($("#comment-template").html());
      var html = template({email: comment.commenter.email, content: comment.content, id: comment.id, boolean: authorCheck(comment.commenter.id)});
      $('#comment_create_row').before(html);
    }
  }
}

function addComment(){
  $('input#new_comment').click(function(event){
    event.preventDefault();
    var dilemma_id = $('#comment_dilemma_id').attr('value');
    var content = $('textarea').val();
    var current_user_id = $('#comment_table').attr('data-current-user-id');
    var new_comment = {"comment" : {"content" : content, "dilemma_id" : dilemma_id, "commenter_id" : current_user_id}};
    $.post({
      "url" : "/comments",
      "data" : new_comment,
      success : function(data) {
        var comObj = new Comment(data.id, data.content, data.commenter, data.dilemma_id);
        var template = Handlebars.compile($("#comment-template").html());
        var html = template({email: comObj.commenter.email, content: comObj.content, id: comObj.id, boolean: authorCheck(comObj.commenter.id)});
        $('#comment_create_row').before(html);
      }, 
      error : function(data, error, message) {
        alert(message);
      }
    });
  });
}

function showComment(){
  $('#comment_content').keydown(function(){
    var content = $('textarea').val();
    $('#comment_text').html(content);
  })
}

$(document).ready(function(){
  addComment();
  showComment();
});