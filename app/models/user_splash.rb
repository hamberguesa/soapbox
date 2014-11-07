class UserSplash < ActiveRecord::Base
	belongs_to :user
	belongs_to :splash
end
