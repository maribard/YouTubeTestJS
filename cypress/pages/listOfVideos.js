class listOfVideos{
    elements = {
        conteinerVideos: () => cy.get('ytd-search.style-scope'),
        firstVideoTitle: () => cy.get('ytd-playlist-renderer.style-scope:nth-child(1) > '
        + 'div:nth-child(2) > a:nth-child(1) > h3:nth-child(1) > span:nth-child(2)'),
        firstVideo: () => cy.get('span[title="Kurs Python - Programowanie"]')
    }

    checkIfVideosArePresent(){
        this.elements.conteinerVideos().should('be.visible')
    }

    checkIfFirstVideoContainText(text){
        this.elements.firstVideoTitle().should('contain.text', text)
    }

    clickOnFirstVideo(){
        this.elements.firstVideo().click({force: true})
    }
       
}

module.exports = new listOfVideos();