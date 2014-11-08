def populate_splashes


end

#post new splash
https://tomafro.net/2009/08/using-indexes-in-rails-index-your-associations
https://tomafro.net/tags/using-indexes-in-rails
http://stackoverflow.com/questions/24892076/postgres-how-to-create-index-for-simple-association-directly-outside-of-activ
http://www.postgresql.org/docs/9.2/static/indexes-types.html
http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates
http://spinczyk.net/blog/2009/10/04/radius-search-with-google-maps-and-mysql/
http://williams.best.vwh.net/avform.htm#Dist
http://stackoverflow.com/questions/5031268/algorithm-to-find-all-latitude-longitude-locations-within-a-certain-distance-fro
http://www.movable-type.co.uk/scripts/latlong-db.html
# post '/splashes' do
#   splash = Splash.create(:content => params[:content])
#   current_user.splashes_created << splash
#   current_user.splashes << splash
#   # populate_splashes
#   if request.xhr?
#     content_type :json
#     splash.to_json
#   else
#     redirect '/'
#   end
# end
  # upon splash creation and long lat inheritance, after create
  # add to user's splash list, (user.splashes) get appended splash_id


# for splash model
# after_save :populate_splashes
