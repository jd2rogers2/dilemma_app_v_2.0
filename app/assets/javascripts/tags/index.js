function getAllTags(){
  $.get("/tags.json", function(data){
    for (var count = 0; count < data.length; count ++) {
      var tag = new Tag(data[count].id, data[count].name, data[count].dilemmas);
      var dilemma_a_tags = "";
      for (var i = 0; i < tag.dilemmas.length; i++){
        dilemma_a_tags += `<a href="/dilemmas/${tag.dilemmas[i].id}">${tag.dilemmas[i].name}</a> `;
      }
      var html = `<tr><td>${tag.name}</td><td>${dilemma_a_tags}</td><td><a href="/tags/${tag.id}">view</a></td></tr>`;
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
        var new_html = "<tr><td>" + data.name + "</td><td></td><</tr>"
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