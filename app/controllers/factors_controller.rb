class FactorsController < ApplicationController
  before_action :require_login, only: [:new]
  def new
    @option = current_user.current_dilemma.options.find_by(id: params[:option_id])
    @factor = @option.factors.new
  end

  def create
    @factor = Factor.create(factor_params)
    flash[:message] = @factor.errors.messages[:points].first
    redirect_to dilemma_option_path(current_user.current_dilemma, @factor.option_id)
  end

  def destroy
    @factor = Factor.find_by(id: params[:id])
    @factor.delete
    redirect_to dilemma_option_path(@factor.option.dilemma, @factor.option)
  end

  private
  def factor_params
    params.require(:factor).permit(:name, :points, :option_id)
  end
end
