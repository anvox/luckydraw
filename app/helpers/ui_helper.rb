module UiHelper
  def render_random_circles
    number_of_circles = 40
    size_range = Array(4..20)
    opacity_range = Array(10..40)
    position_range = Array(1..100)

    cirlces = number_of_circles.times.map do
      {
        size: size_range.sample,
        opacity: opacity_range.sample,
        top: position_range.sample,
        left: position_range.sample,
      }
    end

    render partial: 'ui_components/random_circles', locals: { circles: cirlces }
  end
end
