import Signup from "../support/pages/sign-up-page"
import { faker } from '@faker-js/faker';



describe('Sign up test suit', () => {
    const firstname = faker.person.firstName() ;
    const lastname = faker.person.lastName() ;
    const email = faker.internet.email() ;
    const password = faker.internet.password({length:10 , pattern: /[A-Z]/, prefix: "1@Rn"});
    const signUp = new Signup();

    beforeEach(() => {
        signUp.visit();
        Cypress.on('uncaught:exception', () => {
            return false;
          });
    })

    it('Sign up with valid user information', () => {
        signUp.firstname(firstname);
        signUp.lastname(lastname);
        signUp.email(email);
        signUp.password(password); 
        signUp.agreementCheckBox();
        signUp.createAccountBtn();
        signUp.resendEmailBtn().should('be.visible')


        
    })
})