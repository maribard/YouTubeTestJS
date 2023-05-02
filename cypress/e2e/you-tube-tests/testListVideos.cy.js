import homePage from "../../pages/homePage"
import listOfVideos from "../../pages/listOfVideos"
import videoPlayer from "../../pages/videoPlayer"


describe('Verify YouTube home page', () => {
    beforeEach(() => {
        cy.visit('')
        homePage.clickOnRejectCookie()
    })

    it.only('verify if first video plays', () => {
        homePage.typeTextandClickEnter('Python')
        listOfVideos.clickOnFirstVideo()
        videoPlayer.clickSkipAdsBtn()
        videoPlayer.checkIfVisible()
    })
})

