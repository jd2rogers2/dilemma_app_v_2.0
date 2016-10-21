function makeTagShowPage(){
  var num = $('#tag_show_page').attr('data-id');
  $.get("/tags/"+ num + ".json", function(tag){
    var dilemmas = tag.dilemmas;
    var h3 = `<h3>${tag.name}</h3>`;
    var rows = "";
    for (var count = 0; count < dilemmas.length; count++) {
      var dilemma = dilemmas[count];
      var dilemmas_tags = dilemma.tags;
      var tags_a_tags = "";
      for (var i = 0; i < dilemmas_tags.length; i++){
        var tag = dilemmas_tags[i];
        tags_a_tags += `<a href="/tags/${tag.id}">${tag.name}</a> `;
      }
      rows += `<tr><td><a href="/dilemmas/${dilemmas[count].id}">${dilemmas[count].name}</a></td><td>${dilemmas[count].deadline}</td><td>${tags_a_tags}</td></tr>`;
    }
    var table = `<table><tbody><tr><th>dilemma</th><th>deadline</th><th>tags</th></tr>${rows}</tbody></table>`;
    var total = h3 + table;
    $('#tag_show_page').html(total);
  });
}

$(document).ready(function(){
});