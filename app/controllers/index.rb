APP_ID = ENV['APP_ID']
APP_SECRET = ENV['APP_SECRET']
REDIRECT_URI = 'http://localhost:9393'
#REDIRECT_URI = 'http://soap-box.herokuapp.com'
#Leave above URL for heroku



#Show all of your splash, or show login page
#if you are not logged in
get '/' do
  # if current_user
  #   @splashes = @current_user.splashes.order('created_at').reverse
  erb :login
  # else
  #   # erb :login
  # end
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

