
def current_user
	puts "*"*50
	puts "Session User ID: #{session[:user_id]}"
	puts "*"*50
	@current_user ||= User.find_by(:fb_user_id => session[:user_id]) if session[:user_id]
end
