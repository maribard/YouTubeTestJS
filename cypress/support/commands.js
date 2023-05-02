Cypress.Commands.add('subValues', (a, b) => { return a - b });

Cypress.Commands.add('waitForVideoReachesGivenSec', (status, count = 0) => { 
    if (count === status+10) {
        throw 'Never finished'
      }

    return cy.get('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls'
    + ' > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-current').then(resp => {
      const time = resp.text().toString().split(':',2)[1]
      if ((parseInt(time, 10)) <= status) {
        cy.wait(1000)                       
        cy.waitForVideoReachesGivenSec(status, ++count)      
      } else {
        return time
      }
    })
});
