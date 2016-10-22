function getAllTags(){
  $.get("/tags.json", function(data){
    for (var count = 0; count < data.length; count ++) {
      var tag = data[count];
      var dilemmas = data[count].dilemmas;
      var dilemmas_html = "";
      for (var i = 0; i < dilemmas.length; i++){
        dilemmas_html += `<a href="/dilemmas/${dilemmas[i].id}">${dilemmas[i].name}</a> `;
      }
      var total_new_html = `<tr><td>${tag.name}</td><td>${dilemmas_html}</td><td><a href="/tags/${tag.id}">view</a></td></tr>`;
      $('#link_row').before(total_new_html);
      // loading weird, blinking like it's loading something else first
      // also adding the tags a second time if you navigate back to the page
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
  createNewTag();
});