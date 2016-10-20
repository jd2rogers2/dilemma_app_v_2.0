class Factor < ApplicationRecord
  validates :name, presence: {name: "factor name must not be blank"}
  validates :points, presence: true, numericality: {message: "points entry must only contain digits"}
  belongs_to :option
end
