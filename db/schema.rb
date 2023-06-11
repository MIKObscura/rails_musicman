# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 0) do
  create_table "albums", force: :cascade do |t|
    t.text "title", null: false
    t.integer "artist", null: false
  end

  create_table "artists", force: :cascade do |t|
    t.text "name", null: false
  end

  create_table "tracks", force: :cascade do |t|
    t.text "title", null: false
    t.integer "artist", null: false
    t.integer "album", null: false
    t.integer "plays", default: 1, null: false
    t.integer "duration"
  end

  add_foreign_key "albums", "artists", column: "artist"
  add_foreign_key "tracks", "albums", column: "album"
  add_foreign_key "tracks", "artists", column: "artist"
end
