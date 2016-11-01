class TagsController < ApplicationController
  before_action :require_login, only: [:new, :edit, :show, :index]
  def new
    @tag = Tag.new
  end

  def create
    @tag = Tag.create(tag_params)
    # redirect_to tag_path(@tag)
    respond_to do |format|
      # format.json {render json: @tag.to_json(include: [dilemmas: {include: :tags}])}
      format.json {render json: @tag}
      # format.html {render :show}
    end
  end

  def edit
    set_tag
  end

  def update
    set_tag
    @tag.update(tag_params)
    redirect_to tag_path(@tag)
  end

  def show
    set_tag
    respond_to do |format|
      # format.json {render json: @tag.to_json(include: [dilemmas: {include: :tags}])}
      format.json {render json: @tag}
      format.html {render :show}
    end
  end

  def index
    @tag = Tag.new
    @tags = Tag.all
    respond_to do |format|
      # format.json {render json: @tags.to_json(include: :dilemmas)}
      format.json {render json: @tags}
      format.html {render :index}
    end
  end

  def destroy
    set_tag
    @tag.destroy
    redirect_to tags_path
  end

  private
  def tag_params
    params.require(:tag).permit(:name)
  end

  def set_tag
    @tag = Tag.find_by(id: params[:id])
  end
end
