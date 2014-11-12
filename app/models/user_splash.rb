class UserSplash < ActiveRecord::Base
	belongs_to :user
	belongs_to :splash
  validates_uniqueness_of :user_id, :scope => :splash_id
end
