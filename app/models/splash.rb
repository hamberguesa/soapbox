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

	def populate_splashes
		# Will check to see if coords are within bounding box around 1 block (100m) radius for each splash in db
		# is_candidate? && within_radius
		# dist_from_ = acos(sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(lon1 - lon2)) * r
		# if self.author
			distance_km = 30 # Change this value to change soapbox radius (in kilometers)
			if self.latitude && self.longitude
				bounds = find_bounding_coordinates(self.latitude, self.longitude, distance_km)
			end
			p "%"*100
			p bounds
			p "%"*100
			lon1 = self.longitude
			lat1 = self.latitude
			# require 'pry'; binding.pry
			if bounds
				splash_pool = User.where(
					("latitude >= #{bounds[0]}" && "latitude <= #{bounds[1]}") && ("longitude >= #{bounds[2]}" && "longitude <= #{bounds[3]}") )
					# &&	(acos(sin(lat1) * sin("latitude") + cos(lat1) * cos("latitude") * cos("#{lon1} - longitude")) <= 0.1570))
				if splash_pool
					splash_pool.each do |match|
						p "*"*100
						p match
						p "*"*100
						match.splashes << self
					end
				end
			end
		# end
	end

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
