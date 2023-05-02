import homePage from "../../pages/homePage"
import listOfVideos from "../../pages/listOfVideos"


describe('Verify YouTube home page', () => {
    beforeEach(() => {
        cy.visit('')
        homePage.clickOnRejectCookie()
    })

    it('verify title of page', () => {
        cy.title().should('eq', 'YouTube')   
    })

    it.only('verify result of Search', () => {
        homePage.typeTextandClickEnter('Python')
        listOfVideos.checkIfVideosArePresent()
        listOfVideos.checkIfFirstVideoContainText('Python')
    })
})