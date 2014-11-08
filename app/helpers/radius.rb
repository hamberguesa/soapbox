def populate_splashes


end

#post new splash




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
