class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :name
      t.string :product_number
      t.decimal :price

      t.timestamps
    end
  end
end
