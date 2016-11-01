cut from dilemmas index.js
function getUsersDilemmas(){
  $.get("/dilemmas.json", function(data){
    $('#dilemma_index_header_row').after(dilemmaIndexDataToHtml(data));
  });
}

function getUser(){
  return $('#dilemma_index_header_row').attr('data-current-user-id');
}

function dilemmaIndexDataToHtml(data){
  var template = Handlebars.compile($('#dilemma-index-template').html());
  var context;
  for (var i = 0; i < data.length; i++){
    // debugger;
    if (data[i].author_id == getUser()){
      var dilemma = new Dilemma(data[i].id, data[i].name, data[i].deadline, data[i].author_id, data[i].tags);
      context = {dilemma_name: dilemma.name, dilemma_id: dilemma.id, dilemma_deadline: dilemma.prettyDeadline(), tags: []}
      for (count = 0; count < dilemma.tags.length; count++){
        context.tags.push({tag_id: dilemma.tags[count].id, tag_name: dilemma.tags[count].name})
      }
    }
  }
  return template(context);
}

cut from dilemmas index
  <% current_user.dilemmas.each do |d| %>
    <%= render 'layouts/table', {d: d} %>
  <% end %>

cut from tags index
  <% @tags.each do |t| %>
    <tr>
      <td><%= t.name %></td>
      <td>
        <% t.dilemmas.each do |d| %>
          <%= link_to d.name, dilemma_path(d) %>
        <% end %>
      </td>
      <td><%= link_to "view", tag_path(t) %></td>
    </tr>
  <% end %>

cut from tag show page
  <h3><%= @tag.name %></h3>
  <table>
    <tr>
      <th>dilemmas:</th>
      <th>deadline</th>
      <th>all tags</th>
    </tr>
    <% @tag.dilemmas.each do |d| %>
      <%= render 'layouts/table', {d: d} %>
    <% end %>
  </table>

cut from dilemma show page, replaced with old_comments div
  <% @dilemma.comments.each do |c| %>
    <tr>
      <td><%= c.commenter.email %></td>
      <td><%= c.content %></td>
      <% if author_check(@dilemma.author) %>
        <td><%= link_to "delete", comment_path(c), method: "delete" %></td>
      <% end %>
    </tr>
  <% end %>