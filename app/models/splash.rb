class Splash < ActiveRecord::Base
	include Math
	belongs_to :author, :class_name => 'User'
	has_many :comments

	has_many :user_splashes
	has_many :users, :through => :user_splashes
	before_save :inherit_from_author

	after_save :populate_splashes

	private
	def inherit_from_author
	 	if self.author
	 		self.latitude = self.author.latitude
	 		self.longitude = self.author.longitude
	 		self.author_name = "#{self.author.first_name} #{self.author.last_name}"
	 	end
	end

	# Will check to see if coords are within bounding box && then 1 block (100m) radius for every splash, pushing selections to matched users
	def populate_splashes
		distance_km = 0.1 # Normal setting: 0.1. Change this value to change soapbox radius (in kilometers)
		if self.latitude && self.longitude
			bounds = find_bounding_coordinates(self.latitude, self.longitude, distance_km)
		end
		lon1 = self.longitude
		lat1 = self.latitude
		if bounds
			splash_pool = User.where(("latitude >= #{bounds[0]}" && "latitude <= #{bounds[1]}") && ("longitude >= #{bounds[2]}" && "longitude <= #{bounds[3]}"))
			# RADIUS SEARCH - NOTE THe CODE BELOW DOES NOT CURRENTLY WORK -- MATH IS CORRECT, ERRORS ARE NOT
			# To use radius search, append the following line (minus the one ending parens at end of above db call) to the db call, once it works
				# && ( (acos(sin(lat1) * sin("latitude") + cos(lat1) * cos("latitude") * cos("#{lon1} - longitude")) * 6371 >= distance_km)))
		end
		if splash_pool
			splash_pool.each {|match| match.splashes << self}
		end
	end

	# Helper method to optimize db query by creating passable min-max lat/longitude values
	def find_bounding_coordinates(lat, lon, distance_km = 0.1)
		d = distance_km.to_f
		r = d/6371.to_f # Where 6371km is the Earth's radius, and r is the angular radius

		latT = asin(sin(lat)/cos(r))
		lat_min = lat - r
		lat_max = lat + r
		delta_lon = acos( ( cos(r) - sin(latT) * sin(lat) ) / ( cos(latT) * cos(lat) ) )
		lon_min = lon - delta_lon
		lon_max = lon + delta_lon
		[lat_min, lat_max, lon_min, lon_max]
	end
end
