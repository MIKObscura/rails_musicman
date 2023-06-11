class TracksController < ApplicationController
  def index
    @tracks = Track.left_joins(:album, :artist).order("plays DESC, artists.name, albums.title, title")
  end
end
