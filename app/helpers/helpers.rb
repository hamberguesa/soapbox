
def current_user
  @current_user ||= User.find_by(:fb_user_id => session[:user_id]) if session[:user_id]
end

def time_ago
  hours = ((Time.now - Splash.last.created_at)/3600).floor
  minutes = ((Time.now - Splash.last.created_at)/60).to_i
  if minutes == 0
    minutes += 1
  else 
    minutes = minutes
  end

  if hours > 0
    @time_created = "#{hours} hour #{minutes-60} minutes ago"
  else
    if minutes < 2 
      @time_created = "#{minutes} minute ago"
    else
      @time_created = "#{minutes} minutes ago"
    end
  end 
end
