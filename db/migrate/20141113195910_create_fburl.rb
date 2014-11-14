class CreateFburl < ActiveRecord::Migration
  def change
      add_column :users, :fb_url, :string
      add_column :splashes, :fb_url, :string
  end
end
