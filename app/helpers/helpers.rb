
def current_user
  @current_user ||= User.find_by(:fb_user_id => session[:user_id]) if session[:user_id]
end
