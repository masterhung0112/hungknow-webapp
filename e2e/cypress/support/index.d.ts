declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(isRandom: boolean, defaultUserKey?: string): Cypress.Chainable<{ 
            data?: {username: string, password: string},
            error?: Error
        }>,
        expectPathname(pathName: string, options: Partial<Loggable & Timeoutable>): void
        uploadFile(fileName: string, mimeType: string): Chainable<Subject>
        selectCountry(idKey: string, typingValue: string): Cypress.Chainable<JQuery<HTMLElement>>
        selectState(idKey: string, typingValue: string): Cypress.Chainable<JQuery<HTMLElement>>
        generateFeatureRandomJpg(fileName: string): Cypress.Chainable<Subject>
        typeForce(text: string, options?: Partial<TypeOptions>): Chainable<Subject>
    }
}