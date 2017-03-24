require 'sinatra'
require 'json'
xdcdscff
post '/event_handler'    do 
  
  payload = JSON.parse(params[:payload])
  "Well, it worked!"
end    

