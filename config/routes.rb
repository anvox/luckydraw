Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  resources :lucky_draws, only: [:create]
  get '/draw/:slug', to: 'lucky_draws#show', as: :draw
end
