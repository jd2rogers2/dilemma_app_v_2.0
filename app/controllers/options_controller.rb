class OptionsController < ApplicationController
  before_action :require_login, only: [:new, :edit, :show]
  def new
    @option = Option.new
  end

  def create
    @option = current_user.current_dilemma.options.create(option_params)
    validate_option_and_factors
  end

  def edit
    set_option
  end

  def update
    set_option
    @option.update(option_params)
    validate_option_and_factors
  end

  def show
    set_option
  end

  def destroy
    set_option
    @option.destroy
    redirect_to dilemma_path(current_user.current_dilemma)
  end

  private
  def option_params
    params.require(:option).permit(:name, factors_attributes: [:name, :points, :id])
  end

  def set_option
    @option = Option.find_by(id: params[:id])
  end

  def validate_option_and_factors
    if @option.invalid? && @option.name != ""
      @option.factors.each do |fact|
        if fact.invalid?
          binding.pry
          @option.factors.delete(fact)
          flash[:message] = fact.errors.messages[:points].first
        else
          fact.option_id = @option.id
          fact.save
        end
      end
      @option.save
      redirect_to edit_dilemma_option_path(@option.dilemma, @option)
    elsif @option.name == ""
      flash[:message] = @option.errors.details[:name].first[:name]
      @option.id ? (redirect_to edit_dilemma_option_path(@option.dilemma, @option)) : (redirect_to new_dilemma_option_path)
    else
      redirect_to dilemma_option_path(@option.dilemma, @option)
    end
  end
end
