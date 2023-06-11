class ApplicationController < ActionController::Base
  before_action :set_variables
  helper_method :time_string
  ROOT = "https://www.last.fm/music/"
  PLACEHOLDER = "https://mario.wiki.gallery/images/thumb/c/ca/Attacky_Sack.png/200px-Attacky_Sack.png"

  def set_variables
    @albums_amount = Album.all.count
  end

  def time_string(time)
    hour = (time / 3600).floor
    time -= 3600 * hour
    mins = (time / 60).floor
    time -= 60 * mins
    hour == 0 ? "#{mins}m#{time}s": "#{hour}h#{mins}m#{time}s"
  end
end
