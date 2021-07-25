helper = require('./helper.js');

describe('The error page', () => {

    var feedbackEmail = 'websitefeedback@*********.org.uk';

    beforeAll(() => {

        browser.get(browser.baseUrl + '#/error');

        if (browser.params.env === "live" || browser.params.env === "***-staging" || browser.params.env === "***-live") {

            var cookiesConfirm = element(by.id('cookies-confirm'));

            cookiesConfirm.isDisplayed().then(function (isDisplayed) {
                if (isDisplayed) {
                    cookiesConfirm.click();
                }
            });
        }
    });

    it('should be displayed', () => {
        expect(expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/error'));
    });

    describe('The website feedback link', () => {

        it('should be displayed', () => {
            expect(helper.getByTestId('feedbackemail').isDisplayed()).toBe(true);
        });

        it('should be a "mailto" link', () => {
            expect(helper.getByTestId('feedbackemail').getAttribute('href')).toEqual('mailto:' + feedbackEmail);
        });
    });

    describe('The home link', () => {

        it('should be displayed', () => {
            expect(helper.getByTestId('homelink').isDisplayed()).toBe(true);
        });

        it('should navigate to the home page when clicked', () => {
            helper.getByTestId('homelink').click();
            expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/');
        });
    });
});