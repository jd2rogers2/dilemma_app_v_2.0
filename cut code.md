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