module DilemmasHelper
  def dilemma_link(dilemma)
    link_to(dilemma.name, dilemma_path(dilemma))
  end

  def author_deadline(dilemma)
    "author: #{dilemma.author.email} | deadline: #{dilemma.pretty_deadline}"
  end

end
