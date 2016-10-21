class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comment_params)
    # redirect_to dilemma_path(@comment.dilemma)
    redirect_to comment_path(@comment)
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    @comment.delete
    redirect_to dilemma_path(@comment.dilemma)
  end

  def show
    @comment = Comment.find_by(id: params[:id])
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @comment.to_json(include: [:commenter])}
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :dilemma_id, :commenter_id)
  end
end
