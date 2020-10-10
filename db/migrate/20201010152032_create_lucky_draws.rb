class CreateLuckyDraws < ActiveRecord::Migration[6.0]
  def up
    create_table :lucky_draws do |t|
      t.string :title
      t.string :slug, :null => false

      t.timestamps
    end

    add_index :lucky_draws, :slug, :unique => true
  end

  def down
    drop_table :lucky_draws
  end
end
