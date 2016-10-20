class Dilemma < ApplicationRecord
  validates :name, presence: {name: "dilemma name must not be blank"}
  validates :deadline, presence: true

  has_many :comments
  has_many :commenters, class_name: "User", through: :comments
  belongs_to :author, class_name: "User"
  has_many :options
  has_many :factors, through: :options
  has_many :dilemma_tags
  has_many :tags, through: :dilemma_tags

  before_destroy :destroy_options

  def tags_attributes=(tag_hash)
    tag_hash.each do |num_key, hash|
      if hash[:name] != ""
        tag = Tag.create(hash)
        self.tags << tag
        self.save
      end
    end
  end

  def best_option
    has_most_points = nil
    self.options.each do |opt|
      if has_most_points == nil
        has_most_points = opt
      elsif opt.total_points > has_most_points.total_points
        has_most_points = opt
      end 
    end
    has_most_points.name
  end

  def overdue?
    self.deadline < Time.now ? true : false
  end

  def pretty_deadline
    self.deadline.strftime("%A, %d %b %Y")
  end

  def destroy_options
    self.options.each do |o|
      o.destroy
    end
  end

end
