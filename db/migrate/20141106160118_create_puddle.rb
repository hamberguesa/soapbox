class CreatePuddle < ActiveRecord::Migration

     def change
      create_table :puddles do |t|
        t.references :jumper
        t.references :splash

        t.timestamps
    end

  end
end
