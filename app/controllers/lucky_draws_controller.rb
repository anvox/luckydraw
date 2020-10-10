class LuckyDrawsController < ApplicationController
  def show
    @lucky_draw = LuckyDraw.find_by!(slug: params[:slug])
  end

  def create
    lucky_draw = LuckyDraw.create(title: params[:title])

    redirect_to draw_path(slug: lucky_draw.slug)
  end
end
