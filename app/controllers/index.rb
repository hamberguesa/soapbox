#Show all of your splash, or show login page
#if you are not logged in
get '/' do
  erb :index
end

#Get all of your splashes
get '/splashes' do 
end

#Get single splash ID
get '/splashes/:id' do 
end

post '/splashes/:id/comment' do 
end

#post new splash 
post '/splash' do 
end

#Login
post '/users' do 
end