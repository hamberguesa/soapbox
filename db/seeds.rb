10.times do |x|

  @user = User.create(:username => Faker::Internet.user_name, :latitude =>Faker::Address.latitude, :longitude => Faker::Address.longitude)

  5.times do |x|
    @user.splashes << Splash.create(:content => Faker::Lorem.sentence)
    # puts "*"*50
    # puts splash
    # splash << user
    # user.splish_splashers << a
  end

end
