class Comment < ActiveRecord::Base
  belongs_to :splash
  belongs_to :user
end
