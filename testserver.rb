require 'sinatra'
require 'json'

post '/vent_handler'    do 

  
  payload = JSON.parse(params[:payload])

