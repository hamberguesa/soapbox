get '/' do
  erb :index
end

# APP_ID = ENV['APP_ID']
# APP_SECRET = ENV['APP_SECRET']
# APP_TOKEN = ENV['ACCESS_TOKEN']
# REDIRECT_URI = 'http://localhost:9393'
# #REDIRECT_URI = 'http://soap-box.herokuapp.com'
# #Leave above URL for heroku



# # before do 
# #   puts "*"
# #   if current_user
# #       #check access token with facebook
# #       # in_db = request.env["HTTP_ACCESSTOKEN"] == @current_user.token 
# #       # puts in_db
# #       # puts request.env["HTTP_ACCESSTOKEN"]
# #       # if !in_db

# #       #   response = HTTParty.get "https://graph.facebook.com/oauth/access_token?client_id=#{APP_ID}&client_secret=#{APP_SECRET}&grant_type=client_credentials"
# #       #   puts response
# #       #   puts "https://graph.facebook.com/debug_token?input_token=#{env["HTTP_ACCESSTOKEN"]}&access_token=#{APP_TOKEN}"
# #       #   fb_response = HTTParty.get "https://graph.facebook.com/debug_token?input_token=#{env["HTTP_ACCESSTOKEN"]}&access_token=#{APP_TOKEN}"
# #       #   puts fb_response
# #       # end
# #     else 
# #       #check user_id 
# #       p session
# #       p request.env["HTTP_ACCESSTOKEN"]
# #       puts "~"
# #       content_type :html
# #     end
# #   end
#   get '/' do
#     puts session["user_id"]
#     erb :login
#   end

#   #Get all of your splashes
#   get '/splashes' do
#     if current_user
#       @current_user.latitude = params[:lat]
#       @current_user.longitude = params[:lon]
#       @current_user.save!
#       old_splashes = Splash.where("created_at <= ?", Time.now - 2.hours)
#       old_splashes.each {|old| old.destroy}
#       @splashes = Splash.all
#       content_type :json
#       current_user.splashes.to_json
#     end
    
#   end

#   get '/splashes/:id/comments' do
#     content_type :json
#     Comment.find_by(:splash_id => params[:id].to_i).to_json
#   end

#   post '/splashes/:id/comment' do
#     splash = Splash.find(params[:id])
#     comment = Comment.create(:content => params[:content])
#     current_user.comments << comment
#     splash.comments << comment
#     if request.xhr?
#       content_type :json
#       comment.to_json
#     else
#       redirect '/'
#     end
#   end


#   #post new splash
#   post '/splashes' do
#     splash = Splash.create(:content => params[:content])
#     current_user.splashes_created << splash
#     if request.xhr?
#       content_type :json
#       splash.to_json
#     else
#       redirect '/'
#     end
#   end

#   get '/auth/facebook/callback' do

#     auth = request.env['omniauth.auth']
#     facebook_id = auth['uid']
#     session[:user_id] = facebook_id
#     user = User.find_by(:fb_user_id => facebook_id)

#     if user
#       user.token = auth['credentials'].token
#       user.save
#       #Update latitude and longitude
#     else
#       User.create(:fb_user_id => facebook_id, :token =>  auth['credentials'].token, :first_name => auth['extra']['raw_info'].first_name, :last_name => auth['extra']['raw_info'].last_name)
#     end
#     user.to_json
#   end

#   get '/auth/failure' do
#     flash[:notice] = params[:message] # if using sinatra-flash or rack-flash
#     redirect '/'
#   end

#   namespace '/user' do 
#     get '/logout' do
#       session[:user_id] = nil
#     end

#     post '/login' do 
#       session[:user_id] = params[:user_id]
#       user = User.find_by(:fb_user_id => params[:user_id])
#       if user 
#        user.token = params[:token]
#        user.save
#      else
#       user = User.create(:fb_user_id => params[:user_id], :token => params[:token]) #auth['credentials'].token, :first_name => auth['extra']['raw_info'].first_name, :last_name => auth['extra']['raw_info'].last_name)
#      end
#        content_type :json
#        user.to_json
#     end
#   end

