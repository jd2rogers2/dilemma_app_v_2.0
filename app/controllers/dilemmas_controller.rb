class DilemmasController < ApplicationController
  before_action :require_login, only: [:new, :edit, :show, :index, :overdue]

  def new
    @dilemma = Dilemma.new
  end

  def create
    @dilemma = current_user.dilemmas.create(dilemma_params)
    validate_dilemma
  end

  def edit
    @dilemma = current_user.current_dilemma
  end

  def update
    set_dilemma
    @dilemma.update(dilemma_params)
    validate_dilemma
  end

  def show
    set_dilemma
    if @dilemma.author == current_user
      current_user.current_dilemma = current_user.dilemmas.find_by(id: params[:id])
    end
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @dilemma.to_json(include: [:tags, :comments, options: {include: :factors}])}
    end
  end

  def index
    @dilemmas = Dilemma.all
    respond_to do |format|
      format.json {render json: @dilemmas.to_json(include: [:tags, :comments, options: {include: :factors}])}
      format.html {render :index}
    end
  end

  def destroy
    set_dilemma
    @dilemma.destroy
    redirect_to dilemmas_path
  end

  def overdue
  end

  private
  def dilemma_params
    params.require(:dilemma).permit(:name, "deadline(3i)", "deadline(2i)", "deadline(1i)", tags_attributes: [:name], tag_ids: [])
  end

  def set_dilemma
    @dilemma = Dilemma.find_by(id: params[:id])
  end

  def validate_dilemma
    if @dilemma.invalid?
      flash[:message] = @dilemma.errors.details[:name].first[:name]
      if @dilemma.id
        redirect_to edit_dilemma_path(@dilemma)
      else
        redirect_to new_dilemma_path
      end
    else
      current_user.current_dilemma = @dilemma.id
      redirect_to dilemma_path(@dilemma)
    end
  end
end
