class Tag {
  constructor(id, name, new_dilemmas){
    this.id = id;
    this.name = name;
    this.dilemmas = [];
    for (var i = 0; i < new_dilemmas.length; i++){
      var new_dilemma = new Dilemma(new_dilemmas[i].id, new_dilemmas[i].name, new_dilemmas[i].deadline, new_dilemmas[i].author_id, new_dilemmas[i].tags);
      this.dilemmas.push(new_dilemma);
    }
  }
}

class Dilemma {
  constructor(id, name, deadline, author_id, new_tags){
    this.id = id;
    this.name = name;
    this.deadline = deadline;
    this.author_id = author_id;
    this.tags = new_tags;
    // for (var i = 0; i < new_tags.length; i++){
    //   var new_tag = new Tag(new_tags[i].id, new_tags[i].name);
    //   this.tags.push(new_tag);
    // }
  }

  prettyDeadline(){
    var date = new Date(this.deadline);
    return date.toDateString();
  }
}

function makeTagShowPage(){
  var tag_id = $('#tag_show_page').attr('data-id');
  $.get("/tags/"+ tag_id + ".json", function(data){
    var tag = new Tag(data.id, data.name, data.dilemmas);
    var rows = "";
    for (var count = 0; count < tag.dilemmas.length; count++) {
      var dilemmas_tags = tag.dilemmas[count].tags;
      var tags_a_tags = "";
      for (var i = 0; i < dilemmas_tags.length; i++){
        tags_a_tags += `<a href="/tags/${dilemmas_tags[i].id}">${dilemmas_tags[i].name}</a> `;
      }
      // tag does not have dilemmas attr here?????
      rows += `<tr><td><a href="/dilemmas/${tag.dilemmas[count].id}">${tag.dilemmas[count].name}</a></td><td>${tag.dilemmas[count].prettyDeadline()}</td><td>${tags_a_tags}</td></tr>`;
    }
    var html = `<h3>${tag.name}</h3><table><tbody><tr><th>dilemma</th><th>deadline</th><th>tags</th></tr>${rows}</tbody></table>`;
    $('#tag_show_page').html(html);
  });
}

$(document).ready(function(){
});