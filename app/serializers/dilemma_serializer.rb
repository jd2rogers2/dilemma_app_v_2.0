class DilemmaSerializer < ActiveModel::Serializer
  # format.json {render json: @dilemma.to_json(include: [:tags, comments: {include: :commenter}, options: {include: :factors}])}
  attributes :id, :tags, :author_id, :name, :deadline
  has_many :comments, serializer: DilemmaCommentsSerializer
  has_many :options, serializer: DilemmaOptionsSerializer
end
