class CreateComments < ActiveRecord::Migration

  def change
  	create_table :comments do |t|
  		t.string :content
  		t.references :user
  		t.references :splash

  		t.timestamps
  	end
  end
end
