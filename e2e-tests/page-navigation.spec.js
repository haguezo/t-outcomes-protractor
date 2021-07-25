var helper = require('./helper.js');
var nav = require('./page-navigation.js');
using = require('jasmine-data-provider');

describe('The page navigation', () => {

    var pages = ['2', '3', '4'];

    beforeAll(() => {
        helper.home();
    });

    it('should default to the first page (page 1)', () => {
        expect(nav.currentPage()).toEqual('1');
    });

    it('should not change the current page if the page number does not exist', () => {
        nav.goToPage(0);
        expect(nav.currentPage()).toEqual('1');
    });

    it('should go to the next page (page 2) on clicking Next', () => {
        nav.next();
        expect(nav.currentPage()).toEqual('2');
    });

    it('should return to the first page (page 1) on clicking the "1" button', () => {
        nav.goToPage(1);
        expect(nav.currentPage()).toEqual('1');
    });

    it('should return to the previous page on clicking the "Previous" button', () => {
        nav.next();
        expect(nav.currentPage()).toEqual('2');  // pre-assert
        nav.previous();
        expect(nav.currentPage()).toEqual('1');
    });

    it('should go to the last page', () => {
        var lastPageNumber = nav.lastPageNumber();
        nav.last();
        expect(nav.currentPage()).toEqual(lastPageNumber);
    });

    it('should return to the first page (page 1) on clicking the "1" button after going to the last page', () => {
        var lastPageNumber = nav.lastPageNumber();
        expect(nav.currentPage()).toEqual(lastPageNumber);  // pre-assert
        nav.goToPage(1);
        expect(nav.currentPage()).toEqual('1');
    });

    using(pages, (page) => {

        describe('Navigating to a provider when starting on page ' + page, () => {

            it('should go to page ' + page + ' on clicking the "' + page + '" button', () => {
                nav.goToPage(page);
                expect(nav.currentPage()).toEqual(page);
            });

            it('should allow a link to be clicked and then navigate to the Provider page', () => {
                var row = nav.getByTestId('providerList').all(by.tagName('tr')).get(1);
                var link = row.element(by.css('[data-test-id="providerLink"]'));
                link.click();
                expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/provider/');
            });

            it('should return to the Provider list page', () => {
                browser.navigate().back();
                expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/');
            });

            it('should still display page ' + page, () => {
                expect(nav.currentPage()).toEqual(page);
            });
        });
    });
});