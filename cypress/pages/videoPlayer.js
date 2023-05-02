class videoPlayer{
    elements = {
        skipAdsBtn: () => cy.get('.ytp-ad-skip-button'),
        videoPlayerStream: () => cy.get('#movie_player > div:nth-child(1) > video:nth-child(1)'),
        muteVideoBtn: () => cy.get('div.ytp-chrome-bottom:nth-child(35) > div:nth-child(2) > '
        + 'div:nth-child(1) > span:nth-child(4) > button:nth-child(1)'),
        titleOfVideo: () => cy.get('h1.style-scope:nth-child(2) > yt-formatted-string:nth-child(1)'),
        durationOfVideo: () => cy.get('div.ytp-chrome-bottom:nth-child(35) > div:nth-child(2) > div:nth-child(1)'
        +' > div:nth-child(5) > span:nth-child(2) > span:nth-child(3)'),
        nameOfChannel: () => cy.get('ytd-video-owner-renderer.ytd-watch-metadata > div:nth-child(2) '
        +'> ytd-channel-name:nth-child(1) > div:nth-child(1) > div:nth-child(1) > yt-formatted-string:nth-child(1) > a:nth-child(1)'),
        amountOfViews: () => cy.get('#info > span:nth-child(1)'),
        dateOfUpload: () => cy.get('#info > span:nth-child(3)'),
        amountOfLikes: () => cy.get('#segmented-like-button > ytd-toggle-button-renderer > yt-button-shape > button > '
        + 'div.cbox.yt-spec-button-shape-next--button-text-content > span'),
        nextVideoBtn: () => cy.get('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > '
        + 'div.ytp-left-controls > a.ytp-next-button.ytp-button'),
        playBtn: () => cy.get('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button'),
        currentTimeVideo: () => { return cy.get('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls'
        + ' > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-current')}
    }

    clickSkipAdsBtn(){
        this.elements.skipAdsBtn().click({force: true})
    }

    checkIfVisible(){
        this.elements.videoPlayerStream().should('be.visible')
    }

    clickMuteVideoBtn(){
        this.elements.muteVideoBtn().click()
    }

    getTitleOfVideo(){
        return this.elements.titleOfVideo()
    }

    getDurationOfVideo(){
        return this.elements.durationOfVideo()
    }
       
    getNameOfChannel(){
        return this.elements.nameOfChannel()
    }

    getAmountOfViewsAsInt() {
        return this.elements.amountOfViews()
    }

    getDateOfUpload() {
        return this.elements.dateOfUpload()
    }

    geAmountOfLikes() {
        return this.elements.amountOfLikes()
    }

    clickNextVideoBtn() {
        this.elements.nextVideoBtn().click({force: true})
    }
    
    clickPauseVideo() {
        this.elements.playBtn().click()
    }

    getElementPauseVideo() {
        return this.elements.playBtn()
    }

    pauseVideoAfterGivenSeconds(seconds) {
        cy.wait(seconds)
        this.getCurrentTimeVideo().should(value => {
            const time = value.text().toString().split(':',2)[1]
            expect(parseInt(time, 10)).be.greaterThan(10)
        })
        this.clickPauseVideo()
    }

    getCurrentTimeVideo(){
        return this.elements.currentTimeVideo()
    }
}   

module.exports = new videoPlayer();