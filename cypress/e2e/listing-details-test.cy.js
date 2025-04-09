
import ListingDetails from '../support/pages/listing-details'


describe('Listing Details Test Suit', () => {

    const listingDetails = new ListingDetails()
    beforeEach(() => {
        listingDetails.visit()

    })

    it('Sample Test Case', () => {
          
        listingDetails.getDateByNumber('8').click()
    })
})