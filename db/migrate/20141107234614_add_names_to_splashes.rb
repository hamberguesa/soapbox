class AddNamesToSplashes < ActiveRecord::Migration
  def change
  	add_column :splashes, :author_name, :string
  end
end
