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