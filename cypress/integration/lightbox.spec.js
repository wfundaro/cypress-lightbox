/// <reference types="cypress" />

describe("LightBox test", () => {
  before(() => {
    cy.visit("../../components/lightbox.html");
  });

  it('Check Display overlay and lightbox', () => {
    // cy.dataCy("overlay-click").should("not.have.css", "display", "none");
    cy.dataCy("overlay-click").should('be.visible');
    // check if lightbox is not display
    // cy.dataCy("content-lightbox").should("have.css", "display", "none");
    cy.dataCy("content-lightbox").should('not.be.visible');
    // cy.dataCy('overlay-visible').should('not.be.visible');
    cy.dataCy('overlay-click').trigger('mouseover');
  });

  it('Overlay click and lightbox is display', () => {
    //Click on overlay
    cy.dataCy("overlay-click").click();

    //check if lightbox display is display
    // cy.dataCy("content-lightbox").should("have.css", "display", "flex");
    cy.dataCy("content-lightbox").should('be.visible');
  });

  it('Click outside lightbox', () => {
    //click outside lightbox
    cy.dataCy("lightbox").clickOutside();

    //check if lightbox display none
    // cy.dataCy("content-lightbox").should("have.css", "display", "none");
    cy.dataCy("content-lightbox").should('not.be.visible');
  });

  it('Reopen lightbox',()=>{
    //reopen lightbox
    cy.dataCy("overlay-click").click();
  });

  it('Check if like button exist and not like', ()=>{
    //check if favorite button exist and not click
    cy.dataCy("like-button").should("have.css", "display", "block");
  });

  it('Check like count = 0 on overlay',()=>{
    //check if likes count = 0 overlay
    cy.dataCy("overlay-likes-count").should("have.text", "0");
  });

  it('Check if lightbox like count = 0',()=> {
    //check if likes count = 0 lightbox
    cy.dataCy("likes-count").should("have.text", "0");
  });

  describe('Like test', ()=>{
    it('Click on like button',()=>{
        //click on love button
        cy.dataCy("like-button").click(); 
        cy.dataCy("like-button").should("have.css", "display", "none");              
      });

    it('Check like count overlay and lightbox',()=>{
        //check if like = 1 on overlay and Lightbox
        cy.dataCy("overlay-likes-count").should("have.text", "1");
        cy.dataCy("likes-count").should("have.text", "1");
    });

    it('Dislike test',()=>{
        cy.dataCy("dislike-button").click();
    });

    it('Check like count = 0', ()=>{
        cy.dataCy("overlay-likes-count").should("have.text", "0");
        cy.dataCy("likes-count").should("have.text", "0");
    });
  });

  describe('Publish comment test',()=>{
    it('Check if publish button is disable',()=>{
        cy.dataCy("publish-button").should("be.disabled");
    });

    it('Add comment',()=>{
        cy.dataCy("comments-entry").clear().type("Awesome!");
    });

    it('Check if publish button is enabled',()=>{
        cy.dataCy("publish-button").should("not.be.disabled");
    });

    it('Publish button click',()=>{
        cy.dataCy("publish-button").click();
    });

    it('Check if find comment = Awesome!',()=>{
        cy.dataCy("comment-body-0").should("have.text", "Awesome!");
    });

    it('Check if comment visible',()=>{
        cy.dataCy("content-comments").should("have.css", "display", "flex");
        cy.dataCy("content-comments").should('be.visible');
    });

    it('Click on hide comments',()=>{
        cy.dataCy("hide-comment-button").click();
    });

    it('Check if comment hidden',()=>{
        cy.dataCy("content-comments").should("have.css", "display", "none");
        cy.dataCy("content-comments").should('not.be.visible');
    });

    it('check comment count overlay and lightbox',()=>{
        cy.dataCy("overlay-comments-count").should("have.text", "1");
        cy.dataCy("hide-comment-button").should("have.text", "Show 1 comment");
    });

    it('Add 2 other comments',()=>{
        cy.dataCy("comments-entry").clear().type("Awesome2!");
        // click on publish button
        cy.dataCy("publish-button").click();

        //add comment == Awesome3!
        cy.dataCy("comments-entry").clear().type("Awesome3!");
        // click on publish button
        cy.dataCy("publish-button").click();
    });

    it('Check comment count overlay and lightbox = 3',()=>{
        cy.dataCy("overlay-comments-count").should("have.text", "3");
        cy.dataCy("hide-comment-button").should("have.text", "Hide 3 comments");
    });

    it('Delete comment 2',()=>{
        cy.dataCy('comment-body-1').should('have.text',"Awesome2!");
        cy.dataCy("delete-comment").eq(1).click();
        cy.dataCy('comment-body-1').should('have.text',"Awesome3!");
    });

    it('Check comment count after delete = 2',()=>{
        cy.dataCy("overlay-comments-count").should("have.text", "2");
        cy.dataCy("hide-comment-button").should("have.text", "Hide 2 comments");
    });
  });
});
