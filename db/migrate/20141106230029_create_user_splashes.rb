class CreateUserSplashes < ActiveRecord::Migration

  def change
  	create_table :user_splashes do |t|
  		t.references :user 
  		t.references :splash
  		t.boolean :favorited

  		t.timestamps
  	end
  end

end
