Rails.application.routes.draw do
  get 'stats/index'
  get '/tracks', to: "tracks#index"
  get '/albums', to: "albums#index"
  get '/albums/:id', to: "albums#show"
  get '/artists', to: "artists#index"
  get '/artists/:id', to: "artists#show"
  get '/stats', to: "stats#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "albums#index"
end
