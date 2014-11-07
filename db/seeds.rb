
10.times do |x|

	user = User.create(:fb_user_id=> Faker::Internet.user_name,
		:latitude => Faker::Address.latitude,
		:longitude => Faker::Address.longitude)
	5.times do |x|
    splash = Splash.create(:content => Faker::Lorem.sentence)
		user.splashes_created << splash
    5.times do |y|
      splash.comments << Comment.create(:content => Faker::Lorem.sentence)
    end
	end

end
User.all.each do |user|

  splashesarr = Splash.all.sample(5)
  splashesarr.each do |splash|
    user.splashes << splash
  end

end


