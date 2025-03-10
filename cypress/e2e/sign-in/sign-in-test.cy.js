import { signIn } from "aws-amplify/auth";
import SignInPage from "../../support/pages/sign-in-page";

describe('GGMS - SIGN IN TEST SUIT' , () => {

    beforeEach(() => {
        cy.visit("https://mergestack-com.site-dev.ggms.com/sign-in/");
        cy.fixtures("sign-in").then((data) => {
            this.data = data
        })
    })

    it("User should be able to login successfully", () => {
       SignInPage.login(this.data.username, this.data.password)
    })
})