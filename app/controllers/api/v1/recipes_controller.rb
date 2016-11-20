class Api::V1::RecipesController < ApplicationController
  respond_to :json

  def index
    respond_with(Recipe.all)
  end

  def show
    respond_with(Recipe.find(params[:id]))
  end

  def main
    respond_with(Recipe.order(total_rating: :desc))
  end
end
