require 'test_helper'

class DilemmasControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get dilemmas_new_url
    assert_response :success
  end

  test "should get create" do
    get dilemmas_create_url
    assert_response :success
  end

  test "should get edit" do
    get dilemmas_edit_url
    assert_response :success
  end

  test "should get update" do
    get dilemmas_update_url
    assert_response :success
  end

  test "should get show" do
    get dilemmas_show_url
    assert_response :success
  end

  test "should get index" do
    get dilemmas_index_url
    assert_response :success
  end

end
