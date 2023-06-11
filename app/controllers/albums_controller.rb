require "open-uri"
require "fuzzystringmatch"
class AlbumsController < ApplicationController
  def index
    @albums = Album.joins(:artist).order("artists.name, albums.title")
    @albums_time = Track.joins(:album, :artist).group(:album).order("artists.name, albums.title").sum("duration * plays")
    @albums_plays = Track.joins(:album, :artist).group(:album).order("artists.name, albums.title").sum(:plays)
  end

  def show
    @album = Album.find(params[:id])
    @tracklist = Track.joins(:album).where("tracks.album = #{params[:id]}")
    @image = get_image("#{@album.artist.name} - #{@album.title}".split(" - "))
  end

  def get_image(album)
    artist = album[0].gsub(" ", "+")
    album_title = album[1..album.length - 1].join(" - ").gsub("/", "%2F").gsub(" ", "+")
    begin
      query = WEBrick::HTTPUtils.escape "#{ROOT}#{artist}/#{album_title}"
      puts query
      page = Nokogiri.HTML(URI.open(query), nil, "UTF-8")
      page.at_css("a.cover-art img")["src"]
    rescue NoMethodError
      puts "Error: Could not retrieve URL, using most probable alternative"
      album_found = find_album artist, album_title
      query = WEBrick::HTTPUtils.escape "https://www.last.fm#{album_found["href"]}"
      puts query
      page = Nokogiri.HTML(URI.open(query), nil, "UTF-8")
      begin
        page.at_css("a.cover-art img")["src"]
      rescue NoMethodError, TypeError
        PLACEHOLDER
      end
    rescue OpenURI::HTTPError
      PLACEHOLDER
    end
  end

  def find_album(artist, album)
    query = WEBrick::HTTPUtils.escape "#{ROOT}#{artist}/+albums?order=most_popular"
    page = Nokogiri.HTML(URI.open(query), nil, "UTF-8")
    albums = page.css("section#artist-albums-section a.link-block-target")
    matches = {}
    jarow = FuzzyStringMatch::JaroWinkler.create :pure
    albums.each do |a|
      matches[a.text] = jarow.getDistance album, a.text
    end
    matches = matches.sort_by{|k,v| -v}.to_h
    index = albums.find_index {|a| a.text == matches.keys[0]}
    begin
      albums[index]
    rescue NoMethodError, TypeError
      PLACEHOLDER
    end
  end
end
