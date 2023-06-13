/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatorios e envia o formulario', function() {
        const longText = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste '
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('walmyr@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('walmyr@exemplo,com')
        cy.get('#open-text-area').type('Text')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('se um valor não-numérico for digitado, seu valor continuará vazio', function() {
        cy.get('#phone').type('dfdfdfdfdfd').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('walmyr@exemplo.com')
        cy.get('#open-text-area').type('Text')
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Walmyr').should('have.value', 'Walmyr').clear().should('have.value', '')
        cy.get('#lastName').type('Filho').should('have.value', 'Filho').clear().should('have.value', '')
        cy.get('#email').type('walmyr@exemplo.com').should('have.value', 'walmyr@exemplo.com').clear().should('have.value', '')
        cy.get('#phone').type('999999999').should('have.value', '999999999').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
  })