describe('URL Shortener App', () => {

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'urlsSample'
    }).as('urlsSample')
    cy.visit('http://localhost:3000/').wait('@urlsSample')
  })

  it('When a user visits the page, they can view the page title, form and the existing shortened URLs', () => {

    //page title
    cy.get('h1').should('contain', 'URL Shortener')

    //form
    cy.get('form').should('exist')
    cy.get('form').children().should('have.length', 3)
    cy.get('[placeholder="Title..."]').should('have.attr', 'type', 'text')
    cy.get('[placeholder="URL to Shorten..."]').should('have.attr', 'type', 'text')
    cy.get('button').should('contain', 'Shorten Please!')

    //existing URLS
    cy.get('section').children().should('have.length', 4)
    cy.get('section').children()
    .first()
    .within(() => {
      cy.contains('.url', 1)
      cy.get('h3').should('contain', 'Awesome photo')
      cy.get('a').should('contain', 'http://localhost:3001/useshorturl/1')
      cy.get('p').should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    })

    cy.get('section').children()
    .last()
    .within(() => {
      cy.contains('.url', 4)
      cy.get('h3').should('contain', 'Heather....help me')
      cy.get('a').should('contain', 'http://localhost:3001/useshorturl/4')
      cy.get('p').should('contain', 'https://heatheramidoingthisright.com/we-shall-find-out')
    })
  })

  it('When a user fills out the form, the information is reflected in the input field values', () => {

    cy.get('[name=title]').type('Cypress Test')
    cy.get('[name=title]').should('have.attr', 'value', 'Cypress Test')
    cy.get('[name=urlToShorten]').type('cypresstest.com/very-long-url')
    cy.get('[name=urlToShorten]').should('have.attr', 'value', 'cypresstest.com/very-long-url')
    
  })

  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'postSample'
    }).as('postSample')

    cy.get('section').children().should('have.length', 4)
    cy.get('[name=title]').type('Cypress Test')
    cy.get('[name=title]').should('have.attr', 'value', 'Cypress Test')
    cy.get('[name=urlToShorten]').type('cypresstest.com/very-long-url')
    cy.get('[name=urlToShorten]').should('have.attr', 'value', 'cypresstest.com/very-long-url')
    cy.get('button').click().wait('@postSample')

    cy.get('section').children().should('have.length', 5)
    cy.get('section').children()
    .last()
    .within(() => {
      cy.contains('.url', 5)
      cy.get('h3').should('contain', 'Cypress Test')
      cy.get('a').should('contain', 'http://localhost:3001/useshorturl/5')
      cy.get('p').should('contain', 'cypresstest.com/very-long-url')
    })
  })

})