class User < ActiveRecord::Base
	has_many :splashes_created, :class_name => 'Splash', :foreign_key => 'author_id'
	has_many :comments

	has_many :user_splashes
	has_many :splashes, :through => :user_splashes
end
