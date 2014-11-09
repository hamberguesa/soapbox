
def current_user
  @current_user ||= User.find_by(:fb_user_id => session[:user_id]) if session[:user_id]
end

def time_ago
  hours = ((Time.now - Splash.last.created_at)/3600).floor
  minutes = ((Time.now - Splash.last.created_at)/60).to_i

  if hours > 0
    @time_created = "#{hours} hour #{minutes} minutes ago"
  end
    if minutes < 2 
      @time_created = "#{minutes} minute ago"
    else
      @time_created = "#{minutes} minutes ago"
    end
end
