class ArtistsController < ApplicationController
  def index
    @artists = Artist.order(:name)
    @artists_time = Track.joins(:artist).group(:artist).order("artists.name").sum("duration * plays")
    @artists_plays = Track.joins(:artist).group(:artist).order("artists.name").sum(:plays)
  end

  def show
    @artist = Artist.find(params[:id])
    @artist_albums = Album.joins(:artist).where("albums.artist = #{params[:id]}")
  end
end
