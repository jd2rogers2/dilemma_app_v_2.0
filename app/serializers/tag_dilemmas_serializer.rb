class TagDilemmasSerializer < ActiveModel::Serializer
  attributes :id, :tags, :name, :deadline, :author_id
end
