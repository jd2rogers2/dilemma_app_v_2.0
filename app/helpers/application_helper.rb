module ApplicationHelper
  def author_check(author)
    author == current_user ? true : false
  end
end
