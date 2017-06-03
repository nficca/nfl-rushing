class CreateRushings < ActiveRecord::Migration[5.1]
  def change
    create_table :rushings do |t|
      t.string :player, null: false
      t.string :team, null: false
      t.string :position, null: false
      t.float :attempts_per_game
      t.integer :attempts
      t.integer :yards
      t.float :average_yards_per_attempt
      t.float :yards_per_game
      t.integer :touchdowns
      t.string :longest_rush
      t.integer :first_downs
      t.float :first_down_percentage
      t.integer :twenty_yards_each
      t.integer :forty_yards_each
      t.integer :fumbles

      t.timestamps
    end
  end
end
