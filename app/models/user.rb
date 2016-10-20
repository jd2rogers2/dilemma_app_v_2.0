class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  devise :omniauthable, omniauth_providers: [:facebook]
  has_many :comments, foreign_key: "commenter_id"
  has_many :dilemmas, foreign_key: "author_id"

  def overdue_dilemmas
    self.dilemmas.collect {|d| d if d.overdue?}
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end

  def current_dilemma
    self.dilemmas.find_by(id: self.current_dilemma_id)
  end

  def current_dilemma=(dilemma_id)
    self.current_dilemma_id = self.dilemmas.find_by(id: dilemma_id).id
    self.save
  end
end
