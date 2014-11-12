APP_ID = ENV['APP_ID']
APP_SECRET = ENV['APP_SECRET']
REDIRECT_URI = 'http://localhost:9393'
#REDIRECT_URI = 'http://soap-box.herokuapp.com'
#Leave above URL for heroku



#Show all of your splashes, or show login page
#if you are not logged in
get '/' do
  if current_user
    @splashes = @current_user.splashes.order('created_at').reverse
    erb :index
  else
    erb :login
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
