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
    var html ="";
    for (var i = 0; i < data.length; i++){
      if (data[i].author_id == getUser()){
        html += "<tr><td><a href='/dilemmas/" + data[i].id + "'>" + data[i].name + "</a></td><td></td>"
        debugger;
      }
    }
  });
}

function getUser(){
  return $('#dilemmas_index').attr('data-current-user-id');
}

// <tr>
//   <td><%= link_to d.name, dilemma_path(d) %></td>
//   <td><%= d.pretty_deadline %></td>
//   <td>
//     <% d.tags.each do |t| %>
//       <%= link_to t.name, tag_path(t) %>
//     <% end %>
//   </td>
//   <% if author_check(d.author) %>
//     <td><%= link_to "delete", dilemma_path(d), method: "delete" %></td>
//   <% end %>
// </tr>

$(document).ready(function(){
});