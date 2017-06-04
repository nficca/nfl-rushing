Rails.application.routes.draw do
  root 'rushings#index'

  resources :rushings, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
