class WelcomeController < ApplicationController
  def home
    if user_signed_in?
      redirect_to dilemmas_path
    end
  end
end
