function getAllTags(){
  $.get("/tags.json", function(data){
    for (var count = 0; count < data.length; count ++) {
      var tag = data[count];
      var dilemmas = tag.dilemmas;
      var dilemmas_html = "";
      for (var i = 0; i < dilemmas.length; i++){
        dilemmas_html += `<a href="/dilemmas/${dilemmas[i].id}">${dilemmas[i].name}</a> `;
      }
      var total_new_html = `<tr><td>${tag.name}</td><td>${dilemmas_html}</td><td><a href="/tags/${tag.id}">view</a></td></tr>`;
      $('#link_row').before(total_new_html);
      // loading weird, blinking like it's loading something else first
    }
  })
}
$(document).ready(function(){
  getAllTags();
});