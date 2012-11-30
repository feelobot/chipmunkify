require 'rubygems'
require 'sinatra'
require 'haml'
#require 'sass'

=begin
## CONFIGURATION
configure :development do
  DataMapper.setup(:default, {
    :adapter  => 'mysql',
    :host     => 'localhost',
    :username => 'root' ,
    :password => '',
    :database => 'sinatra_development'})  

  DataMapper::Logger.new(STDOUT, :debug)
end

configure :production do
  DataMapper.setup(:default, {
    :adapter  => 'mysql',
    :host     => 'localhost',
    :username => 'user' ,
    :password => 'pass',
    :database => 'sinatra_production'})  
end

=end
get '/' do
  haml :index
end

get '/:ytid' do
  @ytid=params[:ytid]
  haml :player
  #else
  #  @msg = 'Sorry we could not find the song you are looking for...try searching the song in the search bar above.'
  #  haml :invalid
  #end
end

post '/convert/' do
  @ytid=params[:url]
  `youtube-dl --extract-audio --audio-format=wav -k http://www.youtube.com/watch?v=#{@ytid} && sox #{@ytid}.wav public/songs/#{@ytid}.wav speed 1.65`

end

