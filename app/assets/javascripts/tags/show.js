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
    var html = `<h3>${tag.name}</h3><table><tbody><tr><th>dilemma</th><th>deadline</th><th>tags</th></tr>${makeRows(tag.dilemmas)}</tbody></table>`;
    $('#tag_show_page').html(html);
  });
}

function makeRows(dilemmas){
  var rows = "";
  for (var count = 0; count < dilemmas.length; count++) {
    var a_tags = "";
    var tags = dilemmas[count].tags;
    for (var i = 0; i < tags.length; i++){
      a_tags += `<a href="/tags/${tags[i].id}">${tags[i].name}</a> `;
    }
    rows += `<tr><td><a href="/dilemmas/${dilemmas[count].id}">${dilemmas[count].name}</a></td><td>${dilemmas[count].prettyDeadline()}</td><td>${a_tags}</td></tr>`;
  }
  return rows;
}

$(document).ready(function(){
});