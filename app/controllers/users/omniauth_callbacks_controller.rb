class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @user = User.from_omniauth(auth)
    sign_in_and_redirect @user
  end

  private
  def auth
    request.env["omniauth.auth"]
  end
end