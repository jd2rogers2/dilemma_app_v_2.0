class CommentSerializer < ActiveModel::Serializer
  attributes :id, :commenter, :content, :dilemma_id
  # format.json {render json: @comment.to_json(include: [:commenter])}
end
