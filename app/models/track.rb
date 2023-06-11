class Track < ApplicationRecord
  belongs_to :album, foreign_key: "album"
  belongs_to :artist, foreign_key: "artist"
end
