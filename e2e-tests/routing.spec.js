helper = require('./helper.js');

describe('The routing', () => {

    var ukprn = { valid: '10002852', invalid: 'xyz' };
    var invalid = 'unknownroute';

    it('should display the provider list when route is empty', () => {
        helper.home();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/');
    });

    it('should display the error message when the route is error', () => {
        browser.get(browser.baseUrl + '#/error');
        expect(helper.getByTestId('error').isDisplayed()).toBe(true);
    });

    it('should display the provider page when route is provider/' + ukprn.valid + ' where ukprn is valid', () => {
        browser.get(browser.baseUrl + '#/provider/' + ukprn.valid);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/provider/' + ukprn.valid);
    });

    it('should display the provider page when route is provider/' + ukprn.invalid + ' where ukprn is invalid', () => {
        browser.get(browser.baseUrl + '#/provider/' + ukprn.invalid);
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/provider/' + ukprn.invalid);
    });

    it('should display the "No provider found." message on the provider page when the ukprn is invalid', () => {
        browser.get(browser.baseUrl + '#/provider/' + ukprn.invalid);
        expect(helper.getByTestId('noProviderFound').isDisplayed()).toBe(true);
    });
});