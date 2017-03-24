require 'sinatra'
require 'json'
xdcdsc
post '/vent_handler'    do 
  
  payload = JSON.parse(params[:payload])
  "Well, it worked!"
end    

