class DilemmaCommentsSerializer < ActiveModel::Serializer
  attributes :id, :commenter, :commenter_id, :dilemma_id, :content
end
