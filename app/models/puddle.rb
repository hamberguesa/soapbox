class Puddle < ActiveRecord::Base
  belongs_to :jumper, class_name: "User"
  belongs_to :splash
end
