Feature: Login to Website
  As a user I want to login Website
  with my email and password
  
  @focus
  Scenario: Open a BP page from catalog
    Given User opens printify catalog page
    When User clicks on the first BP card
    Then User should be redirected to the BP page