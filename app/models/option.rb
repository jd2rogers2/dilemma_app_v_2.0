class Option < ApplicationRecord
  validates :name, presence: {name: "option name must not be blank"}
  belongs_to :dilemma
  has_many :factors
  before_destroy :destroy_factors

  def factors_attributes=(factor_hash)
    factor_hash.each do |num_key, hash|
      if hash[:name] != "" && hash[:points] != ""
        if self.factors.include?(Factor.find_by(id: hash[:id]))
          factor = Factor.find_by(id: hash[:id])
          factor.update(name: hash[:name], points: hash[:points])
          factor.save
        else
          new_fact = Factor.create(hash)
          self.factors << new_fact
          self.save
        end
      end
    end
  end

  def total_points
    sum = 0
    self.factors.each do |f|
      sum += f.points
    end
    sum
  end

  def destroy_factors
    self.factors.each do |f|
      f.destroy
    end
  end
end
