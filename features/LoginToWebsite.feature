Feature: Login to Website
  As a user I want to login Website
  with my email and password
  
  Scenario: Login with an existing account
    Given: Printify Login page is open
    When: User enters email "rolands@website.com"
    And: User enters password "someTestPassword"
    Then: User is redirected to Welcome page