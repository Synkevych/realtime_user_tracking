class AddVisitsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :visits, :integer
  end
end
