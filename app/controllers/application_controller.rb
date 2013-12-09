class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

<<<<<<< HEAD
  before_filter :authenticate_user!  
 
=======
  before_filter :authenticate_user!
>>>>>>> 602248376d5b38d474b6c987e532a66dc21f3d5e
end
