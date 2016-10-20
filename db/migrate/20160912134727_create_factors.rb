class CreateFactors < ActiveRecord::Migration[5.0]
  def change
    create_table :factors do |t|
      t.string :name
      t.integer :option_id
      t.integer :points
    end
  end
end
