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
    Dilemma.allInstances.push(this);
  }

  prettyDeadline(){
    var date = new Date(this.deadline);
    return date.toDateString();
  }
}
Dilemma.allInstances = [];

function getUsersDilemmas(){
  $.get("/dilemmas.json", function(data){
    $('#dilemma_index_header_row').after(dilemmaIndexDataToHtml(data));
  });
}

function dilemmaIndexDataToHtml(data){
  var html = ""
  for (var i = 0; i < data.length; i++){
    if (data[i].author_id == getUser()){
      var dilemma = new Dilemma(data[i].id, data[i].name, data[i].deadline, data[i].author_id, data[i].tags);
      html += "<tr><td><a href='/dilemmas/" + dilemma.id + "'>" + dilemma.name + "</a></td><td>" + dilemma.prettyDeadline() + "</td><td>";
      for (count = 0; count < dilemma.tags.length; count++){
        html += "<a href='/tags/" + dilemma.tags[count].id + "'>" + dilemma.tags[count].name + "</a> "
      }
      html += "</td><td><a rel='nofollow' data-method='delete' href='/dilemmas/" + dilemma.id + "'>delete</a></td>"
    }
  }
  return html;
}

function getUser(){
  return $('#dilemma_index_header_row').attr('data-current-user-id');
}

$(document).ready(function(){
});