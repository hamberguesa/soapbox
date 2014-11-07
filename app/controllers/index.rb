APP_ID = ENV['APP_ID']
APP_SECRET = ENV['APP_SECRET']
REDIRECT_URI = 'http://localhost:9393/'

#Show all of your splash, or show login page
#if you are not logged in
get '/' do
  erb :index
end

# get '/log_in' do
#   # redirect to("https://www.facebook.com/dialog/oauth?client_id=#{APP_ID}&redirect_uri=#{REDIRECT_URI}")
#   # p params
# end


#Get all of your splashes
get '/splashes' do
  session[:user]
  @splashes = Splash.all
  content_type :json
  Splash.all.to_json
end

#Get single splash ID
get '/splashes/:id' do
end

post '/splashes/:id/comment' do
end

#post new splash
post '/splash' do
end

get '/auth/facebook/callback' do
  auth = request.env['omniauth.auth']
  facebook_id = auth['uid']
  session[:user_id] = facebook_id
  user = User.find_by_user_name(facebook_id)

  if user
    user.token = auth['credentials'].token
    user.save
    #Update latitude and longitude
  else
    User.create(:user_name => facebook_id, :token =>  auth['credentials'].token, :first_name => auth['extra']['raw_info'].first_name, :last_name => auth['extra']['raw_info'].last_name)
  end
  redirect to '/'
end

get '/auth/failure' do
  flash[:notice] = params[:message] # if using sinatra-flash or rack-flash

  redirect '/'
end

get '/logout' do
  session[:user_id] = nil
  redirect '/'

end

