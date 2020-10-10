class LuckyDraw < ApplicationRecord
  include FriendlyId
  friendly_id :slug_candidates, use: :slugged

  private

  def slug_candidates
    [
      :title,
      [:title, :id]
    ]
  end
end
