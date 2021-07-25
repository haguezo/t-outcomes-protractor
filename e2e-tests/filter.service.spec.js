using = require('jasmine-data-provider');
helper = require('./helper.js');

describe('The filter service (for remembering filtered values)', () => {

    var awards = ['gold', 'silver', 'bronze', 'provisional'];
    var nations = ['england', 'wales', 'scotland'];
    var providerText = 'uni';

    describe('The "Provider name" facet', () => {

        beforeAll(() => {
            helper.home();
        });

        it('should be empty by default', () => {
            expect(helper.getByTestId('providerInput').getText()).toBe('');
        });

        it('should display the filtered provider button when text is entered', () => {
            helper.getByTestId('providerInput').sendKeys(providerText);
            expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
        });

        it('should display the valid text "' + providerText + '" on the filtered provider button', () => {
            expect(helper.getByTestId('filteredProvider').getText()).toEqual(providerText);
        });

        it('should display the Clear filter button', () => {
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should display the "Showing results for: " message', () => {
            expect(helper.getByTestId('filterMessage').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filterMessage').getText()).toContain('Showing results for:');
        });

        it('should not display the "No results found." message', () => {
            expect(helper.getByTestId('noResultsMessage').isPresent()).toBe(false);
        });

        it('should display only providers containing "' + providerText + '" in the list', () => {
            var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
            rows.each((row) => {
                row.getText().then((text) => {
                    expect(text.toLowerCase()).toContain(providerText);
                });
            });
        });

        describe('Navigating to a Provider from the filtered Provider list', () => {

            beforeAll(() => {
                var row = helper.getByTestId('providerList').all(by.tagName('tr')).get(1);
                var providerLink = row.element(by.css('[data-test-id="providerLink"]'));
                providerLink.click();
            });

            it('should display the Provider page', () => {
                expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/provider/');
            });

            describe('Returning to the Provider list', () => {

                beforeAll(() => {
                    helper.getByTestId('findButtonTop').click();
                });

                it('should display the Provider list page', () => {
                    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/');
                });

                it('should still display the Provider name filter text', () => {
                    expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual(providerText);
                });

                it('should still display the filtered provider button when text is entered', () => {
                    expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
                });

                it('should still display the valid text "' + providerText + '" on the filtered provider button', () => {
                    expect(helper.getByTestId('filteredProvider').getText()).toEqual(providerText);
                });

                it('should still display the Clear filter button', () => {
                    expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                });

                it('should still display the "Showing results for: " message', () => {
                    expect(helper.getByTestId('filterMessage').isDisplayed()).toBe(true);
                    expect(helper.getByTestId('filterMessage').getText()).toContain('Showing results for:');
                });

                it('should still not display the "No results found." message', () => {
                    expect(helper.getByTestId('noResultsMessage').isPresent()).toBe(false);
                });

                it('should still display only providers containing "' + providerText + '" in the list', () => {
                    var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                    rows.each((row) => {
                        row.getText().then((text) => {
                            expect(text.toLowerCase()).toContain(providerText);
                        });
                    });
                });
            });
        });

        afterAll(() => {
            helper.getByTestId('filteredProvider').click();  // clear the filter
        });
    });

    describe('The "Award type" facet', () => {

        beforeAll(() => {
            helper.home();
        });

        using(awards, (award) => {

            describe('The provider list filtered by Award type "' + award + '"', () => {

                beforeAll(() => {
                    var awardLink = helper.getByTestId(award + 'Button');
                    awardLink.click();
                });

                it('should display the filtered by award button', () => {
                    expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
                });

                it('should display the value "' + award + ' in the filtered by button when the ' + award + ' award link is clicked', () => {
                    helper.getByTestId('filteredAward').getText().then((text) => {
                        expect(text.toLowerCase()).toEqual(award);
                    });
                });

                it('should display only ' + award + ' awards in the provider list', () => {
                    var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                    var dataToTitleCase = award.charAt(0).toUpperCase() + award.slice(1);
                    rows.each((row) => {
                        expect(row.element(by.css('.' + dataToTitleCase)).isDisplayed()).toBe(true);
                    });
                });

                using(awards, (innerAward) => {
                    if (innerAward !== award) {
                        it('should not display the ' + innerAward + ' award link when the ' + award + ' award link is clicked', () => {
                            expect(helper.getByTestId(innerAward + 'Button').isPresent()).toBe(false);
                        });
                    }
                });

                it('should display the "Clear filter" button in the filter', () => {
                    expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                });

                describe('Navigating to a Provider from the filtered Provider list', () => {

                    beforeAll(() => {
                        var row = helper.getByTestId('providerList').all(by.tagName('tr')).get(1);
                        var providerLink = row.element(by.css('[data-test-id="providerLink"]'));
                        providerLink.click();
                    });

                    it('should display the Provider page', () => {
                        expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/provider/');
                    });

                    describe('Returning to the Provider list page', () => {

                        beforeAll(() => {
                            helper.getByTestId('findButtonTop').click();
                        });

                        it('should display the Provider list page', () => {
                            expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/');
                        });

                        it('should still display the filtered by award button', () => {
                            expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
                        });

                        it('should still display the value "' + award + ' in the filtered by button', () => {
                            helper.getByTestId('filteredAward').getText().then((text) => {
                                expect(text.toLowerCase()).toEqual(award);
                            });
                        });

                        it('should still display only ' + award + ' awards in the provider list', () => {
                            var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                            var dataToTitleCase = award.charAt(0).toUpperCase() + award.slice(1);
                            rows.each((row) => {
                                expect(row.element(by.css('.' + dataToTitleCase)).isDisplayed()).toBe(true);
                            });
                        });

                        it('should still display the "Clear filter" button in the filter', () => {
                            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                        });
                    });

                    it('should navigate back to the Provider list page when "Search for another provider" is clicked', () => {
                        expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/');
                    });

                    it('should still display the filtered by award button', () => {
                        expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
                    });

                    it('should still display the value "' + award + ' in the filtered by button', () => {
                        helper.getByTestId('filteredAward').getText().then((text) => {
                            expect(text.toLowerCase()).toEqual(award);
                        });
                    });

                    it('should still display only ' + award + ' awards in the provider list', () => {
                        var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                        var dataToTitleCase = award.charAt(0).toUpperCase() + award.slice(1);
                        rows.each((row) => {
                            expect(row.element(by.css('.' + dataToTitleCase)).isDisplayed()).toBe(true);
                        });
                    });

                    it('should still display the "Clear filter" button in the filter', () => {
                        expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                    });
                });

                afterAll(() => {
                    helper.getByTestId('filteredAward').click();  // clear the filter
                });
            });
        });
    });

    describe('The "Nation" facet', () => {

        beforeAll(() => {
            helper.home();
        });

        using(nations, (data) => {

            describe('The provider list filtered by Nation "' + (data === "ni" ? "Northern Ireland" : data) + '"', () => {

                beforeAll(() => {
                    helper.getByTestId(data + 'Button').click();
                });

                it('should display the filtered by nation button when the ' + (data === "ni" ? "northern ireland" : data) + ' nation link is clicked', () => {
                    expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
                });

                it('should display the value "' + data + ' in the filtered by button when the ' + (data === "ni" ? "northern ireland" : data) + ' nation link is clicked', () => {
                    helper.getByTestId('filteredNation').getText().then((text) => {
                        expect(text.toLowerCase()).toEqual(data === "ni" ? "northern ireland" : data);
                    });
                });

                it('should display the "Clear filter" button in the filter', () => {
                    expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                });

                describe('Navigating to a Provider from the filtered Provider list', () => {

                    beforeAll(() => {
                        var row = helper.getByTestId('providerList').all(by.tagName('tr')).get(1);
                        var providerLink = row.element(by.css('[data-test-id="providerLink"]'));
                        providerLink.click();
                    });

                    it('should display the Provider page', () => {
                        expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/provider/');
                    });

                    describe('Returning to the Provider list page', () => {

                        beforeAll(() => {
                            helper.getByTestId('findButtonTop').click();
                        });

                        it('should display the Provider list page', () => {
                            expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/');
                        });

                        it('should still display the filtered by nation button when the ' + (data === "ni" ? "northern ireland" : data) + ' nation link is clicked', () => {
                            expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
                        });

                        it('should still display the value "' + data + ' in the filtered by button when the ' + (data === "ni" ? "northern ireland" : data) + ' nation link is clicked', () => {
                            helper.getByTestId('filteredNation').getText().then((text) => {
                                expect(text.toLowerCase()).toEqual(data === "ni" ? "northern ireland" : data);
                            });
                        });

                        it('should still display the "Clear filter" button in the filter', () => {
                            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                        });
                    });
                });

                afterAll(() => {
                    helper.getByTestId('filteredNation').click();  // clear the filter
                });
            });
        });
    });

    describe('Selecting multiple facets', () => {

        using(awards, (data) => {

            describe('The provider list filtered by Award type "' + data + '" and Nation "England"', () => {

                beforeAll(() => {
                    helper.home();
                    helper.getByTestId(data + 'Button').click();
                    helper.getByTestId('englandButton').click();
                });

                it('should display the filtered by award button', () => {
                    expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
                });

                it('should display the filtered by nation button', () => {
                    expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
                });

                it('should display the "Clear all" button', () => {
                    expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                });

                it('should display only ' + data + ' awards in the provider list', () => {
                    var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                    var dataToTitleCase = data.charAt(0).toUpperCase() + data.slice(1);
                    rows.each((row) => {
                        expect(row.element(by.css('.' + dataToTitleCase)).isDisplayed()).toBe(true);
                    });
                });

                describe('Navigating to a Provider from the filtered Provider list', () => {

                    beforeAll(() => {
                        var row = helper.getByTestId('providerList').all(by.tagName('tr')).get(1);
                        var providerLink = row.element(by.css('[data-test-id="providerLink"]'));
                        providerLink.click();
                    });

                    it('should display the Provider page', () => {
                        expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/provider/');
                    });

                    describe('Returning to the Provider list page', () => {

                        beforeAll(() => {
                            helper.getByTestId('findButtonTop').click();
                        });

                        it('should display the Provider list page', () => {
                            expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/');
                        });


                        it('should still display the filtered by award button', () => {
                            expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
                        });

                        it('should still display the filtered by nation button', () => {
                            expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
                        });

                        it('should still display the "Clear all" button when "Award type" is ' + data + ' and the "Nation" is England', () => {
                            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                        });

                        it('should still display only ' + data + ' awards in the provider list', () => {
                            var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                            var dataToTitleCase = data.charAt(0).toUpperCase() + data.slice(1);
                            rows.each((row) => {
                                expect(row.element(by.css('.' + dataToTitleCase)).isDisplayed()).toBe(true);
                            });
                        });

                        it('should not display the filtered by award and nation buttons after "Clear all" is clicked', () => {
                            helper.getByTestId('clearAll').click();
                            expect(helper.getByTestId('filteredAward').isPresent()).toBe(false);
                            expect(helper.getByTestId('filteredNation').isPresent()).toBe(false);
                        });
                    });
                });
            });
        });
    });

    describe('Selecting all facets', () => {

        beforeAll(() => {
            helper.home();
            helper.getByTestId('providerInput').sendKeys(providerText);
            helper.getByTestId('goldButton').click();
            helper.getByTestId('englandButton').click();
        });

        it('should display the provider name text in the text box', () => {
            expect(helper.getByTestId('providerInput').getAttribute('value')).toBe(providerText);
        });

        it('should display the filtered provider button when text is entered', () => {
            expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
        });

        it('should display the valid text "' + providerText + '" on the filtered provider button', () => {
            expect(helper.getByTestId('filteredProvider').getText()).toEqual(providerText);
        });

        it('should display the filtered by award button', () => {
            expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
        });

        it('should display the value "Gold" in the filtered by button when the "Gold" award link is clicked', () => {
            helper.getByTestId('filteredAward').getText().then((text) => {
                expect(text.toLowerCase()).toEqual('gold');
            });
        });

        it('should display the filtered by nation button when the "England" nation link is clicked', () => {
            expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
        });

        it('should display the value "England" in the filtered by button when the "England" nation link is clicked', () => {
            helper.getByTestId('filteredNation').getText().then((text) => {
                expect(text.toLowerCase()).toEqual('england');
            });
        });

        it('should display the Clear filter button', () => {
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should display the "Showing results for: " message', () => {
            expect(helper.getByTestId('filterMessage').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filterMessage').getText()).toContain('Showing results for:');
        });

        it('should not display the "No results found." message', () => {
            expect(helper.getByTestId('noResultsMessage').isPresent()).toBe(false);
        });

        it('should display only providers containing "' + providerText + '" in the list', () => {
            var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
            rows.each((row) => {
                row.getText().then((text) => {
                    expect(text.toLowerCase()).toContain(providerText);
                });
            });
        });

        it('should display only Gold awards in the provider list', () => {
            var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
            var dataToTitleCase = awards[0].charAt(0).toUpperCase() + awards[0].slice(1);
            rows.each((row) => {
                expect(row.element(by.css('.' + dataToTitleCase)).isDisplayed()).toBe(true);
            });
        });

        describe('Navigating to a Provider from the filtered Provider list', () => {

            beforeAll(() => {
                var row = helper.getByTestId('providerList').all(by.tagName('tr')).get(1);
                var providerLink = row.element(by.css('[data-test-id="providerLink"]'));
                providerLink.click();
            });

            it('should display the Provider page', () => {
                expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/provider/');
            });

            describe('Returning to the Provider list page', () => {

                beforeAll(() => {
                    helper.getByTestId('findButtonTop').click();
                });

                it('should display the Provider list page', () => {
                    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '#/');
                });

                it('should still display the provider name text in the text box', () => {
                    expect(helper.getByTestId('providerInput').getAttribute('value')).toBe(providerText);
                });

                it('should still display the filtered provider button', () => {
                    expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
                });

                it('should still display the valid text "' + providerText + '" on the filtered provider button', () => {
                    expect(helper.getByTestId('filteredProvider').getText()).toEqual(providerText);
                });

                it('should still display the filtered by award button', () => {
                    expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
                });

                it('should still display the value "Gold" in the filtered by button', () => {
                    helper.getByTestId('filteredAward').getText().then((text) => {
                        expect(text.toLowerCase()).toEqual('gold');
                    });
                });

                it('should still display the filtered by nation button', () => {
                    expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
                });

                it('should still display the value "England" in the filtered by button', () => {
                    helper.getByTestId('filteredNation').getText().then((text) => {
                        expect(text.toLowerCase()).toEqual('england');
                    });
                });

                it('should still display the Clear filter button', () => {
                    expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                });

                it('should still display the "Showing results for: " message', () => {
                    expect(helper.getByTestId('filterMessage').isDisplayed()).toBe(true);
                    expect(helper.getByTestId('filterMessage').getText()).toContain('Showing results for:');
                });

                it('should still not display the "No results found." message', () => {
                    expect(helper.getByTestId('noResultsMessage').isPresent()).toBe(false);
                });

                it('should still display only providers containing "' + providerText + '" in the list', () => {
                    var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                    rows.each((row) => {
                        row.getText().then((text) => {
                            expect(text.toLowerCase()).toContain(providerText);
                        });
                    });
                });

                it('should still display only Gold awards in the provider list', () => {
                    var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                    var dataToTitleCase = awards[0].charAt(0).toUpperCase() + awards[0].slice(1);
                    rows.each((row) => {
                        expect(row.element(by.css('.' + dataToTitleCase)).isDisplayed()).toBe(true);
                    });
                });
            });
        });
    });
});