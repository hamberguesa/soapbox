class Splash < ActiveRecord::Base
	belongs_to :author, :class_name => 'User'
	has_many :comments

	has_many :user_splashes
	has_many :users, :through => :user_splashes
	before_save :inherit_from_author

	private
	def inherit_from_author
	 	if self.author  
	 		self.latitude = self.author.latitude
	 		self.longitude = self.author.longitude
	 		self.author_name = "#{self.author.first_name} #{self.author.last_name}"
	 	end
	end
end