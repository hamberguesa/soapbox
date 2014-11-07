module Helper
  def self.get_sweet_access_token(code)
    HTTParty.get("https://graph.facebook.com/oauth/access_token?client_id=#{APP_ID}&redirect_uri=#{REDIRECT_URI}&client_secret=#{APP_SECRET}&code=#{code}")
  end
end
