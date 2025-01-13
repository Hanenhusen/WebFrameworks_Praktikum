require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get products_index_url
    assert_response :success
  end

  test "should get show" do
    get products_show_url
    assert_response :success
  end

  test "should get show_details" do
    get products_show_details_url
    assert_response :success
  end

  test "should get add" do
    get products_add_url
    assert_response :success
  end

  test "should get modify" do
    get products_modify_url
    assert_response :success
  end

  test "should get delete" do
    get products_delete_url
    assert_response :success
  end
end
