class UserSplash < ActiveRecord::Base
	belongs_to :user
	belongs_to :splash
  	validates_uniqueness_of :splash_id, :scope => :user_id
end
