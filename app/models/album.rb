class Album < ApplicationRecord
  belongs_to :artist, foreign_key: 'artist'
  has_many :tracks
end
