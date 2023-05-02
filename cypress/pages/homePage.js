class homePage{
    elements = {
        rejectCookieBtn: () => cy.get('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox'
        + ' > div.eom-buttons.style-scope.ytd-consent-bump-v2-lightbox > div:nth-child(1) > ytd-button-renderer:nth-child(2) > yt-button-shape > button'),   
        inputSearchBox: () => cy.get('input[placeholder="Szukaj"]')
    }

    clickOnRejectCookie(){
        this.elements.rejectCookieBtn().click()
    }
    typeTextandClickEnter(text){
         this.elements.inputSearchBox().type(text).type('{enter}')
    }    
}

module.exports = new homePage();