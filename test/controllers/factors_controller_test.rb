require 'test_helper'

class FactorsControllerTest < ActionDispatch::IntegrationTest
  test "should get destroy" do
    get factors_destroy_url
    assert_response :success
  end

end
