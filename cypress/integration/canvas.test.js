import { isMainThread } from 'worker_threads'

describe('Canvas Tests', () => {
  it('Visits the app', () => {
    cy.visit('localhost:8000')
  })
})
