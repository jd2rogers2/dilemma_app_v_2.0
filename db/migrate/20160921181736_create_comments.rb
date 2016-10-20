class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :commenter_id
      t.integer :dilemma_id
    end
  end
end
