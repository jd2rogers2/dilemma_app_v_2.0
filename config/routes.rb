Rails.application.routes.draw do
  get '/dilemmas/overdue', to: 'dilemmas#overdue', as: 'overdue'
  # resources :factors, only: [:destroy, :new, :create]
  devise_for :users, controllers: {omniauth_callbacks: "users/omniauth_callbacks"}
  resources :dilemmas
  resources :tags
  resources :comments
  resources :users
  # resources :options
  root to: 'welcome#home'

  resources :dilemmas, only: [:show] do
    resources :options do
      resources :factors, only: [:destroy, :new, :create]
    end
  end
end
