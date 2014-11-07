class Splash < ActiveRecord::Base
	belongs_to :author, :class_name => 'User'
	has_many :comments

	has_many :user_splashes
	has_many :users, :through => :user_splashes
	before_save :inherit_location

	private
	def inherit_location
	 	if self.author  
	 		self.latitude = self.author.latitude
	 		self.longitude = self.author.longitude
	 	end
	end
end