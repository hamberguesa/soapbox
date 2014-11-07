
10.times do |x|

	user = User.create(:user_name=> Faker::Internet.user_name,
		:latitude => Faker::Address.latitude,
		:longitude => Faker::Address.longitude)
	5.times do |x|
		user.splashes_created << Splash.create(:content => Faker::Lorem.sentence)
	end

end
