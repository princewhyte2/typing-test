describe("Typing app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000")
  })
  it("front page can be opened", function () {
    cy.contains("Typing-test...")
    cy.contains("This is a simple app for users to test and improve their typing skills")
  })

  it("Should test general App flow", function () {
    //clicking on the "challenge-btn" should open the challenge page
    cy.get("[data-testid='challenge-btn']").click()
    //check url contains challenge/select-paragraph
    cy.url().should("include", "challenge/select-paragraph")

    //clear inital paragraph value
    cy.get("[data-testid='init-paragraph']").clear()

    //set initial paragraph value
    cy.get("[data-testid='init-paragraph']").type("row force slightly rising join more hair")

    //click on use paragraph button
    cy.get("[data-testid='use-para']").click()

    //check url contains challenge/select-timer
    cy.url().should("include", "challenge/select-timer")

    //ensure initial timer is set to 60 seconds
    cy.contains("60 secs")

    //click on go-to-challenge-btn
    cy.get("[data-testid='go-to-challenge-btn']").click()

    //check url contains challenge/test
    cy.url().should("include", "challenge/test")

    // should have 60 seconds left displayed
    cy.contains("60")

    //initial paragraph should be displayed
    cy.contains("row force slightly rising join more hair")

    // press enter on the user-paragraph
    cy.get("[data-testid='user-paragraph']").type("{enter}")

    // set paragraph to "row force slightly rising join more hair"
    cy.get("[data-testid='user-paragraph']").type("row force slightly rising join more hair")

    // press enter on the user-paragraph
    cy.get("[data-testid='user-paragraph']").type("{enter}")

    //should contain 100% accuracy
    cy.contains("100%")

    //click on game-over-btn
    cy.get("[data-testid='game-over-btn']").click()

    //contains instruction
    cy.contains("Instruction")
  })
})
