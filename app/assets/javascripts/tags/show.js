class Tag {
  constructor(id, name, new_dilemmas){
    this.id = id;
    this.name = name;
    this.dilemmas = new_dilemmas;
    // for (var i = 0; i < new_dilemmas.length; i++){
    //   var new_dilemma = new Dilemma(new_dilemmas[i].id, new_dilemmas[i].name, new_dilemmas[i].deadline, new_dilemmas[i].author_id, new_dilemmas[i].tags);
    //   this.dilemmas.push(new_dilemma);
    // }
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

  // this.prettyDeadline = function(){
  //   this.deadline;
  //   // need to build this out
  // }
}

function makeTagShowPage(){
  var tag_id = $('#tag_show_page').attr('data-id');
  $.get("/tags/"+ tag_id + ".json", function(data){
    debugger;
    var tag = new Tag(data.id, data.name, data.dilemmas);

    // unrefactored code below still has tag as response data
    // var dilemmas = tag.dilemmas;
    // var h3 = `<h3>${tag.name}</h3>`;
    // var rows = "";
    // for (var count = 0; count < dilemmas.length; count++) {
    //   var dilemma = dilemmas[count];
    //   var dilemmas_tags = dilemma.tags;
    //   var tags_a_tags = "";
    //   for (var i = 0; i < dilemmas_tags.length; i++){
    //     var tag = dilemmas_tags[i];
    //     tags_a_tags += `<a href="/tags/${tag.id}">${tag.name}</a> `;
    //   }
    //   rows += `<tr><td><a href="/dilemmas/${dilemmas[count].id}">${dilemmas[count].name}</a></td><td>${dilemmas[count].deadline}</td><td>${tags_a_tags}</td></tr>`;
    // }
    // var table = `<table><tbody><tr><th>dilemma</th><th>deadline</th><th>tags</th></tr>${rows}</tbody></table>`;
    // var total = h3 + table;
    // $('#tag_show_page').html(total);
  });
}

$(document).ready(function(){
});