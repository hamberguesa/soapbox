APP_ID = ENV['APP_ID']
APP_SECRET = ENV['APP_SECRET']
REDIRECT_URI = 'http://localhost:9393'
#REDIRECT_URI = 'http://soap-box.herokuapp.com'
#Leave above URL for heroku



#Show all of your splashes, or show login page
#if you are not logged in
get '/' do
  p "*" * 80
  p current_user
  p session
  p "*" * 80
  if current_user
    @splashes = @current_user.splashes.order('created_at').reverse
    erb :index
  else
    erb :index
  end
end

#Get all of your splashes
get '/splashes' do
  if current_user
    @current_user.latitude = params[:lat] 
    @current_user.longitude = params[:lon] 
    @current_user.save!
  end
  old_splashes = Splash.where("created_at <= ?", Time.now - 2.hours)
  old_splashes.each {|old| old.destroy}
  @splashes = Splash.all
  if request.xhr?
    content_type :json
    current_user.splashes.to_json
  else
    redirect '/'
  end
end

get '/splashes/:id/comments' do
  content_type :json
  Comment.find_by(:splash_id => params[:id].to_i).to_json
end

post '/splashes/:id/comment' do
  splash = Splash.find(params[:id])
  comment = Comment.create(:content => params[:content])
  current_user.comments << comment
  splash.comments << comment
  if request.xhr?
    content_type :json
    comment.to_json
  else
    redirect '/'
  end
end


#post new splash
post '/splashes' do
  splash = Splash.create(:content => params[:content])
  current_user.splashes_created << splash
  if request.xhr?
    content_type :json
    splash.to_json
  else
    redirect '/'
  end
end

get '/auth/facebook/callback' do

  auth = request.env['omniauth.auth']
  facebook_id = auth['uid']
  session[:user_id] = facebook_id
  user = User.find_by(:fb_user_id => facebook_id)

  if user
    user.token = auth['credentials'].token
    user.save
    #Update latitude and longitude
  else
    User.create(:fb_user_id => facebook_id, :token =>  auth['credentials'].token, :first_name => auth['extra']['raw_info'].first_name, :last_name => auth['extra']['raw_info'].last_name)
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

# 1130pm signin status: 
# current user: nil
# session: {"session_id"=>"be49b2925e6ab5666ecf5bbb6d6dd4623474aa0048ec8c3313b3ec752088d372", "tracking"=>{"HTTP_USER_AGENT"=>"7be1a42d74a413474898ddb9adfef9a5a84719e3", "HTTP_ACCEPT_ENCODING"=>"ed2b3ca90a4e723402367a1d17c8b28392842398", "HTTP_ACCEPT_LANGUAGE"=>"66eae971492938c2dcc2fb1ddc8d7ec3196037da"}, "csrf"=>"e7b89ace610c7c7b1d3b56b6bd27aaed"}
# "********************************************************************************"
# ERROR:
# I, [2014-11-11T23:17:54.890283 #22108]  INFO -- omniauth: (facebook) Callback phase initiated.
# E, [2014-11-11T23:17:54.890619 #22108] ERROR -- omniauth: (facebook) Authentication failure! no_authorization_code: OmniAuth::Strategies::Facebook::NoAuthorizationCodeError, must pass either a `code` (via URL or by an `fbsr_XXX` signed request cookie)

