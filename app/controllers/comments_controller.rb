class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comment_params)
    redirect_to dilemma_path(@comment.dilemma)
  end

  def destroy
    @comment = Comment.find_by(id: params[:id])
    @comment.delete
    redirect_to dilemma_path(@comment.dilemma)
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :dilemma_id, :commenter_id)
  end
end
