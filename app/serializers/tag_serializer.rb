class TagSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :dilemmas, serializer: TagDilemmasSerializer
end
