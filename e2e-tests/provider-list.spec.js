using = require('jasmine-data-provider');
helper = require('./helper.js');

describe('The provider list page', () => {

    var leadProvider;
    var mergedInProviders;

    if (browser.params.env === "live" || browser.params.env === "***-staging"  || browser.params.env === "***-live") {
        leadProvider = 'RNN Group';
        mergedInProviders = ['Dearne Valley Colleg'];
    }
    else if (browser.params.env === "***-test") {
        leadProvider = 'Courtauld Institute of Art';
        mergedInProviders = ['Tresham College of F'];
    }
    else {
        leadProvider = 'Halesowen';
        mergedInProviders = ['Hartlepool College', 'Hugh Baird College'];
    }

    beforeAll(() => {
        helper.home();
    });

    it('should display the home page', () => {
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '#/');
    });

    it('should display the filter', () => {
        expect(helper.getByTestId('filter').isDisplayed()).toBe(true);
    });

    it('should display a filter message', () => {
        expect(helper.getByTestId('filterMessage').isDisplayed()).toBe(true);
    });

    it('should display the list of providers', () => {
        expect(helper.getByTestId('providerList').isDisplayed()).toBe(true);
    });

    it('should display page navigation', () => {
        expect(helper.getByTestId('pageNavigation').isDisplayed()).toBe(true);
    });

    describe('The filter', () => {

        it('should be enabled', () => {
            expect(helper.getByTestId('filter').isEnabled()).toBe(true);
        });

        describe('The Award type facet', () => {

            it('should display the Gold link', () => {
                expect(helper.getByTestId('goldButton').isDisplayed()).toBe(true);
            });

            it('should display the Silver link', () => {
                expect(helper.getByTestId('silverButton').isDisplayed()).toBe(true);
            });

            it('should display the Bronze link', () => {
                expect(helper.getByTestId('bronzeButton').isDisplayed()).toBe(true);
            });

            it('should display the Provisional link', () => {
                expect(helper.getByTestId('provisionalButton').isDisplayed()).toBe(true);
            });

            it('should display the Gold link as enabled', () => {
                expect(helper.getByTestId('goldButton').isEnabled()).toBe(true);
            });

            it('should display the Silver link as enabled', () => {
                expect(helper.getByTestId('silverButton').isEnabled()).toBe(true);
            });

            it('should display the Bronze link as enabled', () => {
                expect(helper.getByTestId('bronzeButton').isEnabled()).toBe(true);
            });

            it('should display the Provisional link as enabled', () => {
                expect(helper.getByTestId('provisionalButton').isEnabled()).toBe(true);
            });

            it('should display the Gold badge', () => {
                expect(helper.getByTestId('goldBadge').isDisplayed()).toBe(true);
            });

            it('should display the Silver badge', () => {
                expect(helper.getByTestId('silverBadge').isDisplayed()).toBe(true);
            });

            it('should display the Bronze badge', () => {
                expect(helper.getByTestId('bronzeBadge').isDisplayed()).toBe(true);
            });

            it('should display the Provisional badge', () => {
                expect(helper.getByTestId('provisionalBadge').isDisplayed()).toBe(true);
            });
        });

        describe('The Nation facet', () => {

            it('should display the England link', () => {
                expect(helper.getByTestId('englandButton').isDisplayed()).toBe(true);
            });

            it('should display the Wales link', () => {
                expect(helper.getByTestId('walesButton').isDisplayed()).toBe(true);
            });

            it('should display the Scotland link', () => {
                expect(helper.getByTestId('scotlandButton').isDisplayed()).toBe(true);
            });

            //it('should display not the Northern Ireland link', () => {
            //    expect(helper.getByTestId('niButton').isDisplayed()).toBe(false);
            //});

            it('should display the England link as enabled', () => {
                expect(helper.getByTestId('englandButton').isEnabled()).toBe(true);
            });

            it('should display the Wales link as enabled', () => {
                expect(helper.getByTestId('walesButton').isEnabled()).toBe(true);
            });

            it('should display the Scotland link as enabled', () => {
                expect(helper.getByTestId('scotlandButton').isEnabled()).toBe(true);
            });

            //it('should display the Northern Ireland link as enabled', () => {
            //    expect(helper.getByTestId('niButton').isEnabled()).toBe(true);
            //});
        });
    });

    describe('The filter message', () => {

        it('should display the "Showing all results" message', () => {
            var filterMessage = helper.getByTestId('filterMessage');
            expect(filterMessage.getText()).toContain('Showing all results');
        });

        it('should not display the filtered Provider button', () => {
            expect(helper.getByTestId('filteredProvider').isPresent()).toBe(false);
        });

        it('should not display the filtered Award type button', () => {
            expect(helper.getByTestId('filteredAward').isPresent()).toBe(false);
        });

        it('should not display the filtered Nation button', () => {
            expect(helper.getByTestId('filteredNation').isPresent()).toBe(false);
        });

        it('should not display the Clear all button', () => {
            expect(helper.getByTestId('clearAll').isPresent()).toBe(false);
        });
    });

    describe('Mergers where the lead is ' + leadProvider + ' and ' + mergedInProviders[0] + ' and ' + mergedInProviders[1] + ' are merged in', () => {

        describe('Lead provider ' + leadProvider, () => {

            beforeAll(() => {
                helper.getByTestId('providerInput').sendKeys(leadProvider);
            });

            it('should display the lead provider ' + leadProvider, () => {
                var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                expect(rows.count()).toEqual(1);

                var row = helper.getByTestId('providerList').all(by.tagName('tr')).get(1);
                var link = row.element(by.css('[data-test-id="providerLink"]'));
                expect(link.getText()).toContain(leadProvider);
            });

            afterAll(() => {
                helper.getByTestId('clearAll').click();
            });
        });

        using(mergedInProviders, (provider) => {

            describe('Merged provider ' + provider, () => {

                beforeAll(() => {
                    helper.getByTestId('providerInput').clear().then(function () {
                        helper.getByTestId('providerInput').sendKeys(provider);
                    });
                });

                it('should filter on the merged provider', () => {
                    expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual(provider);
                });

                it('should display the filtered provider button', () => {
                    expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
                });

                it('should display the merged provider ' + provider + ' on the filtered provider button', () => {
                    expect(helper.getByTestId('filteredProvider').getText()).toEqual(provider);
                });

                it('should display the "Clear filter" button', () => {
                    expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                });

                it('should not display the merged provider', () => {
                    var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                    expect(rows.count()).toEqual(0);
                });

                it('should display the "No results found." message', () => {
                    expect(helper.getByTestId('noResultsMessage').isDisplayed()).toBe(true);
                });

                afterAll(() => {
                    helper.getByTestId('clearAll').click();
                });
            });
        });
    });
});