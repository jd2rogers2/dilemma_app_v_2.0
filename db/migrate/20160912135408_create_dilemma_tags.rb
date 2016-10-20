class CreateDilemmaTags < ActiveRecord::Migration[5.0]
  def change
    create_table :dilemma_tags do |t|
      t.integer :tag_id
      t.integer :dilemma_id
    end
  end
end
