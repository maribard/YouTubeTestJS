import homePage from "../../pages/homePage"
import listOfVideos from "../../pages/listOfVideos"
import videoPlayer from "../../pages/videoPlayer"


describe('Verify YouTube home page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      })

    // Cypress.on('fail', (error, runnable) => {
    //     if (!error.message.includes('.ytp-ad-skip-button')) {
    //         throw error
    //     }
    // })

    beforeEach(() => {
        cy.visit('')
        homePage.clickOnRejectCookie()
        cy.wait(4000)
    })

    it('verify if slide bar can be move to the midle of video', () => {
        homePage.typeTextandClickEnter('Python')
        listOfVideos.clickOnFirstVideo()
        videoPlayer.clickSkipAdsBtn()

        cy.get(".ytp-progress-bar")
            .invoke('attr', 'aria-valuemax')
            .then(valMax => {
                cy.get(".ytp-progress-bar")
                    .invoke('attr', 'aria-valuenow')
                    .then(valNow => {
                
                        expect(parseInt(valNow)).be.lessThan(parseInt(valMax)/10)
                        cy.get(".ytp-progress-bar").click(350)
                        videoPlayer.clickSkipAdsBtn()

                        cy.get(".ytp-progress-bar")
                            .invoke('attr', 'aria-valuenow')
                            .then(valNowNew => {
                                expect(parseInt(valNowNew)).be.greaterThan(parseInt(valMax)/10)
                    })
                })
            })
    })

    it('verify if possible mute video', () => {
        homePage.typeTextandClickEnter('Python')
        listOfVideos.clickOnFirstVideo()
        videoPlayer.clickSkipAdsBtn()

        videoPlayer.elements.muteVideoBtn()
            .invoke('attr', 'data-title-no-tooltip')
            .should('equal', 'Wycisz')
        videoPlayer.clickMuteVideoBtn()

        videoPlayer.elements.muteVideoBtn()
            .invoke('attr', 'data-title-no-tooltip')
            .should('equal', 'Wyłącz wyciszenie')
    })

    it('verify information about video', () => {
        homePage.typeTextandClickEnter('Python')
        listOfVideos.clickOnFirstVideo()
        videoPlayer.clickSkipAdsBtn()
        videoPlayer.getTitleOfVideo().should('contain.text', 'Kurs Python') 
        videoPlayer.getDurationOfVideo().should('not.be.empty')
        videoPlayer.getNameOfChannel().should('contain.text', 'Kanał o Wszystkim')
        videoPlayer.getAmountOfViewsAsInt().should(value => {
            const amount = value.text().toString().split('tys', 1)[0]
            expect(parseInt(amount, 10)).be.greaterThan(316)
        })
        videoPlayer.getDateOfUpload().should(value => {
            const year = value.text().toString().split(' ', 1)[0]
            expect(parseInt(year, 10)).be.greaterThan(2)
        })
        videoPlayer.geAmountOfLikes().should(value => {
            const likes = value.text().toString().split('tys', 1)[0]
            expect(parseInt(likes, 10)).be.gte(5)
        })

    })

    it('verify if possible swith to the next video', () => {
        homePage.typeTextandClickEnter('Python')
        listOfVideos.clickOnFirstVideo()
        videoPlayer.clickSkipAdsBtn()
        videoPlayer.clickNextVideoBtn()
        videoPlayer.clickSkipAdsBtn()
        videoPlayer.getTitleOfVideo().should('contain.text', 'operatory matematyczne') 
    })

    
    it.only('verify if possible swith to the next video and stop after 10 sec', function(){
        homePage.typeTextandClickEnter('Python')
        listOfVideos.clickOnFirstVideo()
        videoPlayer.clickSkipAdsBtn()
        videoPlayer.clickNextVideoBtn()
        let timeLocator = videoPlayer.getCurrentTimeVideo()
        cy.waitForVideoReachesGivenSec(10).then(resp => {
            expect(parseInt(resp, 10)).be.gte(10)
        })
        videoPlayer.clickPauseVideo()
        videoPlayer.getElementPauseVideo().invoke('attr', 'data-title-no-tooltip').should('equal', 'Odtwórz')
    })
})
