using = require('jasmine-data-provider');
helper = require('./helper.js');

describe('The filter on the Provider list helper', () => {

    var awards = ['gold', 'silver', 'bronze', 'provisional'];
    var nations = ['england', 'wales', 'scotland'];
    var invalidText = 'xyz';
    var validText = 'derby';

    beforeAll(() => {
        helper.home();
    });

    // Note: the "Clear filter" button was removed when the change request was made to move the filter message above the filter
    it('should not display the removed "Clear filter" button (removed as a result of change request to move filter message)', () => {
        expect(helper.getByTestId('clearFilterButton').isPresent()).toBe(false);
    });

    it('should not display the "Clear filter" button by default in the filter', () => {
        expect(helper.getByTestId('clearAll').isPresent()).toBe(false);
    });

    it('should not display the filtered by award button by default', () => {
        expect(helper.getByTestId('filteredAward').isPresent()).toBe(false);
    });

    it('should not display the filtered by nation button by default', () => {
        expect(helper.getByTestId('filteredNation').isPresent()).toBe(false);
    });

    it('should not display the clear all button by default', () => {
        expect(helper.getByTestId('clearAll').isPresent()).toBe(false);
    });

    describe('The "Provider name" facet', () => {

        it('should be displayed', () => {
            expect(helper.getByTestId('providerInput').isDisplayed()).toBe(true);
        });

        it('should be enabled', () => {
            expect(helper.getByTestId('providerInput').isEnabled()).toBe(true);
        });

        it('should be empty by default', () => {
            expect(helper.getByTestId('providerInput').getText()).toBe('');
        });

        describe('Entering spaces only', () => {

            beforeAll(() => {
                helper.getByTestId('providerInput').sendKeys('     ');
            })

            it('should not display the filtered provider button', () => {
                expect(helper.getByTestId('filteredProvider').isPresent()).toBe(false);
            });

            it('should not display the Clear filter button', () => {
                expect(helper.getByTestId('clearAll').isPresent()).toBe(false);
            });
        });

        describe('Entering invalid text', () => {

            beforeAll(() => {
                browser.refresh();
                helper.getByTestId('providerInput').sendKeys(invalidText);
            });

            it('should display the filtered provider button', () => {
                expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
            });

            it('should display the invalid text "' + invalidText + '" on the filtered provider button', () => {
                expect(helper.getByTestId('filteredProvider').getText()).toEqual(invalidText);
            });

            it('should display the Clear filter button', () => {
                expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
            });

            it('should display the "Showing results for: " message', () => {
                expect(helper.getByTestId('filterMessage').isDisplayed()).toBe(true);
                expect(helper.getByTestId('filterMessage').getText()).toContain('Showing results for:');
            });

            it('should display the "No results found." message', () => {
                expect(helper.getByTestId('noResultsMessage').isDisplayed()).toBe(true);
                expect(helper.getByTestId('noResultsMessage').getText()).toContain('No results found.');
            });

            it('should not display any providers in the list', () => {
                var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                expect(rows.count()).toEqual(0);
            });
        });

        describe('Enter valid text', () => {

            beforeAll(() => {
                browser.refresh();
                helper.getByTestId('providerInput').sendKeys(validText);
            });

            it('should display the filtered provider button', () => {
                expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
            });

            it('should display the valid text "' + validText + '" on the filtered provider button', () => {
                expect(helper.getByTestId('filteredProvider').getText()).toEqual(validText);
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

            it('should display the "Showing results for:" message', () => {
                expect(helper.getByTestId('filterMessage').isDisplayed()).toBe(true);
                expect(helper.getByTestId('filterMessage').getText()).toContain('Showing results for:');
            });

            it('should display only providers containing "' + validText + '" in the list', () => {
                var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                rows.each((row) => {
                    row.getText().then((text) => {
                        expect(text.toLowerCase()).toContain(validText);
                    });
                });
            });
        });


    });

    describe('The "Award type" facet', () => {

        beforeAll(() => {
            browser.refresh();
        });

        using(awards, (data) => {

            it('should display the ' + data + ' award link', () => {
                expect(helper.getByTestId(data + 'Button').isDisplayed()).toBe(true);
            });

            describe('Clicking the ' + data + ' award link', () => {

                beforeAll(() => {
                    var link = helper.getByTestId(data + 'Button');
                    link.click();
                });

                it('should display the filtered by award button when the ' + data + ' award link is clicked', () => {
                    expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
                });

                it('should display the value "' + data + ' in the filtered by button when the ' + data + ' award link is clicked', () => {
                    helper.getByTestId('filteredAward').getText().then((text) => {
                        expect(text.toLowerCase()).toEqual(data);
                    });
                });

                using(awards, (innerData) => {
                    if (innerData !== data) {
                        it('should not display the ' + innerData + ' award link when the ' + data + ' award link is clicked', () => {
                            expect(helper.getByTestId(innerData + 'Button').isPresent()).toBe(false);
                        });
                    }
                });

                it('should display the "Clear filter" button in the filter', () => {
                    expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                });

                it('should display only ' + data + ' awards in the provider list', () => {
                    var rows = helper.getByTestId('providerList').all(by.css('.providerName'));
                    var dataToTitleCase = data.charAt(0).toUpperCase() + data.slice(1);
                    rows.each((row) => {
                        expect(row.element(by.css('.' + dataToTitleCase)).isDisplayed()).toBe(true);
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
            browser.refresh();
        });

        using(nations, (data) => {

            it('should display the ' + data + ' nation link', () => {
                expect(helper.getByTestId(data + 'Button').isDisplayed()).toBe(true);
            });

            describe('Clicking the ' + data + ' nation link', () => {

                beforeAll(() => {
                    var link = helper.getByTestId(data + 'Button');
                    link.click();
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

                it('should display the "Clear all" button when "Award type" is ' + data + ' and the "Nation" is England', () => {
                    expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                });

                it('should display the filtered by award button', () => {
                    expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
                });

                it('should display the filtered by nation button', () => {
                    expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
                });
                
                it('should display only ' + data + ' awards in the provider list', () => {
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

    describe('The "Clear filter" button', () => {

        beforeAll(() => {
            browser.refresh();
        });

        it('should not display by default', () => {
            expect(helper.getByTestId('clearAll').isPresent()).toBe(false);
        });

        it('should display when just "Provider name" is entered', () => {
            helper.getByTestId('providerInput').sendKeys(validText);
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should clear the "Provider name" input and the filtered provider name button when clicked', () => {
            expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual(validText);
            expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
            helper.getByTestId('clearAll').click();
            expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual('');
            expect(helper.getByTestId('filteredProvider').isPresent()).toBe(false);
        });

        using(awards, (data) => {
            it('should display when just "Award type ' + data + '" is selected', () => {
                helper.getByTestId(data + 'Button').click();
                expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
            });

            it('should clear the filtered award button and display all award types in the filter when clicked', () => {
                expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
                helper.getByTestId('clearAll').click();
                expect(helper.getByTestId('filteredAward').isPresent()).toBe(false);
                awards.forEach((award) => {
                    expect(helper.getByTestId(award + 'Button').isDisplayed()).toBe(true);
                });
            });
        });

        using(nations, (data) => {
            it('should display when just "Nation ' + (data === "ni" ? "northern ireland" : data) + '" is selected', () => {
                helper.getByTestId(data + 'Button').click();
                expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
            });

            it('should clear the filtered nation button and display all nations in the filter when clicked', () => {
                expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
                helper.getByTestId('clearAll').click();
                expect(helper.getByTestId('filteredNation').isPresent()).toBe(false);
                nations.forEach((nation) => {
                    expect(helper.getByTestId(nation + 'Button').isDisplayed()).toBe(true);
                });
            });
        });

        it('should display when "Provider name" and "Award type" are selected', () => {
            helper.getByTestId('providerInput').sendKeys(validText);
            helper.getByTestId('goldButton').click();
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should clear the "Provider name" input, the filtered provider name and award type buttons when clicked', () => {
            expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual(validText);
            expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
            helper.getByTestId('clearAll').click();
            expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual('');
            expect(helper.getByTestId('filteredProvider').isPresent()).toBe(false);
            expect(helper.getByTestId('filteredAward').isPresent()).toBe(false);
        });

        it('should display when "Provider name" and "Nation" are selected', () => {
            helper.getByTestId('providerInput').sendKeys(validText);
            helper.getByTestId('englandButton').click();
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should clear the "Provider name" input, the filtered provider name and nation buttons when clicked', () => {
            expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual(validText);
            expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
            helper.getByTestId('clearAll').click();
            expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual('');
            expect(helper.getByTestId('filteredProvider').isPresent()).toBe(false);
            expect(helper.getByTestId('filteredNation').isPresent()).toBe(false);
        });

        it('should display when "Award type" and "Nation" are selected', () => {
            helper.getByTestId('goldButton').click();
            helper.getByTestId('englandButton').click();
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should clear the filtered award and nation buttons when clicked', () => {
            expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
            helper.getByTestId('clearAll').click();
            expect(helper.getByTestId('filteredAward').isPresent()).toBe(false);
            expect(helper.getByTestId('filteredNation').isPresent()).toBe(false);
        });

        it('should display when all facets are selected', () => {
            helper.getByTestId('providerInput').sendKeys(validText);
            helper.getByTestId('goldButton').click();
            helper.getByTestId('englandButton').click();
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should clear the all filtered buttons when clicked', () => {
            expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual(validText);
            expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
            helper.getByTestId('clearAll').click();
            expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual('');
            expect(helper.getByTestId('filteredProvider').isPresent()).toBe(false);
            expect(helper.getByTestId('filteredAward').isPresent()).toBe(false);
            expect(helper.getByTestId('filteredNation').isPresent()).toBe(false);
        });
    });

    describe('The "Clear all" button', () => {

        beforeAll(() => {
            browser.refresh();
        });

        it('should not display by default', () => {
            expect(helper.getByTestId('clearAll').isPresent()).toBe(false);
        });

        it('should display when just "Provider name" is entered', () => {
            helper.getByTestId('providerInput').sendKeys(validText);
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
            helper.getByTestId('clearAll').click();
        });

        using(awards, (data) => {
            it('should display when just "Award type ' + data + '" is selected', () => {
                helper.getByTestId(data + 'Button').click();
                expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                helper.getByTestId('clearAll').click();
            });
        });

        using(nations, (data) => {
            it('should display when just "Nation ' + (data === "ni" ? "northern ireland" : data) + '" is selected', () => {
                helper.getByTestId(data + 'Button').click();
                expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
                helper.getByTestId('clearAll').click();
            });
        });

        it('should display when "Provider name" and "Award type" are selected', () => {
            helper.getByTestId('providerInput').sendKeys(validText);
            helper.getByTestId('goldButton').click();
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should clear provider name, filtered provider and award type buttons on clicking', () => {
            expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual(validText);
            expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
            helper.getByTestId('clearAll').click();
            expect(helper.getByTestId('providerInput').getAttribute('value')).toEqual('');
            expect(helper.getByTestId('filteredProvider').isPresent()).toBe(false);
            expect(helper.getByTestId('filteredAward').isPresent()).toBe(false);
        });

        it('should display when "Provider name" and "Nation" are selected', () => {
            helper.getByTestId('providerInput').sendKeys(validText);
            helper.getByTestId('englandButton').click();
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should clear filtered provider and nation buttons on clicking', () => {
            expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
            helper.getByTestId('clearAll').click();
            expect(helper.getByTestId('filteredProvider').isPresent()).toBe(false);
            expect(helper.getByTestId('filteredNation').isPresent()).toBe(false);
        });

        it('should display when "Award type" and "Nation" are selected', () => {
            helper.getByTestId('goldButton').click();
            helper.getByTestId('englandButton').click();
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should clear filtered award type and nation buttons on clicking', () => {
            expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
            helper.getByTestId('clearAll').click();
            expect(helper.getByTestId('filteredAward').isPresent()).toBe(false);
            expect(helper.getByTestId('filteredNation').isPresent()).toBe(false);
        });

        it('should display when all facets are selected', () => {
            helper.getByTestId('providerInput').sendKeys(validText);
            helper.getByTestId('goldButton').click();
            helper.getByTestId('englandButton').click();
            expect(helper.getByTestId('clearAll').isDisplayed()).toBe(true);
        });

        it('should clear filtered provider, award type and nation buttons on clicking', () => {
            expect(helper.getByTestId('filteredProvider').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filteredAward').isDisplayed()).toBe(true);
            expect(helper.getByTestId('filteredNation').isDisplayed()).toBe(true);
            helper.getByTestId('clearAll').click();
            expect(helper.getByTestId('filteredProvider').isPresent()).toBe(false);
            expect(helper.getByTestId('filteredAward').isPresent()).toBe(false);
            expect(helper.getByTestId('filteredNation').isPresent()).toBe(false);
        });
    });
});