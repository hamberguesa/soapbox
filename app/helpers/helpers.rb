
def current_user
  @current_user ||= User.find_by(:fb_user_id => session[:user_id]) if session[:user_id]
end

def time_ago
  # this is where all the times are being set to the last splash time
  puts "*"*50
  p @splashes.last.created_at
  p Time.now
  puts "~"*50
  @splashes.each do |blargh|
    p "blargh id:"
    p blargh
    p "this is the blargh"
    p Time.now - blargh.created_at
    p ""
  hours = ((Time.now - blargh.created_at)/3600).floor
  minutes = ((Time.now - blargh.created_at)/60).to_i
  if minutes == 0
    minutes += 1
  else
    minutes = minutes
  end

  if hours > 0
    @time_created = "#{hours} hour #{minutes} minutes ago"
  end
    if minutes < 2
      @time_created = "#{minutes} minute ago"
    else
      @time_created = "#{minutes} minutes ago"
    end
  end
end
