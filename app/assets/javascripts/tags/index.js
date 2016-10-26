function getAllTags(){
  $.get("/tags.json", function(data){
    for (var count = 0; count < data.length; count ++) {
      var tag = new Tag(data[count].id, data[count].name, data[count].dilemmas);
      var context = {tag_name: tag.name, tag_id: tag.id, dilemma_array: []}
      for (var i = 0; i < tag.dilemmas.length; i++){
        context.dilemma_array.push({dilemma_id: tag.dilemmas[i].id, dilemma_name: tag.dilemmas[i].name});
      }
      var template = Handlebars.compile($('#tag-index-template').html());
      var html = template(context)
      $('#link_row').before(html);
    }
  })
}

function createNewTag(){
  $('input:submit').click(function(event){
    event.preventDefault();
    var name = $('#tag_name').val();
    var new_tag = {"tag" : {"name" : name}};
    $.ajax({
      "url" : "/tags",
      "type" : "POST",
      "datatype" : "json",
      "data" : new_tag,
      success : function(data){
        var template = Handlebars.compile($('#tag-index-template').html());
        var context = {tag_id: data.id, tag_name: data.name}
        var new_html = template(context);
        $('#link_row').before(new_html);
      },
      error : function(data, error, message){
        alert(message);
      }
    });
  });
}

$(document).ready(function(){
});