class CreateSplash < ActiveRecord::Migration

  def change
    create_table :splashes do |t|
      t.string :content
      t.float :latitude, :longitude

      t.references :splish_splasher

      t.timestamps
    end
  end
end
