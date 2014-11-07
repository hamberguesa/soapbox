APP_ID = ENV['APP_ID']
APP_SECRET = ENV['APP_SECRET']
REDIRECT_URI = 'http://localhost:9393/'

#Show all of your splash, or show login page
#if you are not logged in
get '/' do
  erb :index
end

get '/log_in' do
  redirect to("https://www.facebook.com/dialog/oauth?client_id=#{APP_ID}&redirect_uri=#{REDIRECT_URI}")
  p params
end



#Get all of your splashes
get '/splashes' do
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

#Login
post '/users' do
	 if params[:code]
    self.get_sweet_access_token(params[:code])
  else
    p "nothing in here"
    p params
  end
end
