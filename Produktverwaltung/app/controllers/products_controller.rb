class ProductsController < ApplicationController

  def show
    @products = Product.all
  end

  def show_details
    @product = Product.find(params[:id])
  end

  def add
    if request.post?
      Product.create(name: params[:name], product_number: params[:product_number], price: params[:price])
      redirect_to("/products/show")
      end
  end

  def modify
    @product= Product.find(params[:id])
    update_params = {}
    update_params[:name] = params[:name] if params[:name].present?
    update_params[:product_number] = params[:product_number] if params[:product_number].present?
    update_params[:price] = params[:price] if params[:price].present?

    
    redirect_to("/products/show")
    
  end

  def delete
    @product= Product.find(params[:id])
    @product.delete()
    redirect_to("/products/show")
  end

end