class AddLastSeenAtAndEmojiToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :last_seen_at, :integer
    add_column :users, :emoji, :integer
  end
end
