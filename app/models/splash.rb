class Splash < ActiveRecord::Base
	include Math
	belongs_to :author, :class_name => 'User'
	has_many :comments

	has_many :user_splashes
	has_many :users, :through => :user_splashes
	before_save :inherit_from_author

	# add_index :conversations, :user_id, :name => 'user_id_ix'
	# Example of how this would be used to index splashes (I think-- JBH)
	# add_index :user_splashes, :user_id, :name => 'user_id_ix'

	add_index :latitude
	after_save :populate_splashes

	private
	def inherit_from_author
	 	if self.author
	 		self.latitude = self.author.latitude
	 		self.longitude = self.author.longitude
	 		self.author_name = "#{self.author.first_name} #{self.author.last_name}"
	 	end
	end

	def populate_splashes
		# Will check to see if coords are within bounding box around 1 block radius
		# is_candidate?

		# Will determine if candidates are within set radius (one block-- which is what?)
		# within_radius?
		dist = acos(sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(lon1 - lon2)) * r
		# Faker::Address.latitude
		# Faker::Address.longitude
		# self.long

	end


end
