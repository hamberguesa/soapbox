APP_ID = '707121299378507'
APP_SECRET = '72d2ff5d680d8cd979cce2197fa867e7'
REDIRECT_URI = "http://localhost:9393/"
#Show all of your splash, or show login page
#if you are not logged in
get '/' do
  erb :index
end

get '/log_in' do
  redirect to("https://www.facebook.com/dialog/oauth?client_id=#{APP_ID}&redirect_uri=#{REDIRECT_URI}")
  p params
end

get '/auth' do
  if params[:code]
    p get_sweet_access_token(params[:code])
  else
    p "nothing in here"
    p params
  end
end

def get_sweet_access_token(code)
  p HTTParty.get("https://graph.facebook.com/oauth/access_token?client_id=#{APP_ID}&redirect_uri=#{REDIRECT_URI}&client_secret=#{APP_SECRET}&code=#{code}")

end

#Get all of your splashes
get '/splashes' do
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
end
