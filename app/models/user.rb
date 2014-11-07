class User < ActiveRecord::Base
  has_many :puddles, foreign_key: :splash_id
  has_many :splashes, through: :puddles

  has_many :comments

  # A splish splash is an authored splash, FYI
  has_many :splish_splashes, class_name: "Splash"
end
