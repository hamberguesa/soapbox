class UserSplashes < ActiveRecord::Base
	belongs_to :users 
	belongs_to :splashes
end
