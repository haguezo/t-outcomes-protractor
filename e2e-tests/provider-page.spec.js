helper = require('./helper.js');

describe('The provider page', () => {

    let awards = ['gold', 'silver', 'bronze', 'provisional'];
    let leadProvider;
    let mergedInProviders;

    if (browser.params.env === "live" || browser.params.env === "***-staging" || browser.params.env === "***-live") {
        leadProvider = { 'ukprn': '10005534', 'name': 'RNN Group' };
        mergedInProviders = [{ 'ukprn': '10001897', 'name': 'Dearne Valley College' }];
    }
    else if (browser.params.env === "***-test") {
        leadProvider = { 'ukprn': '10007761', 'name': 'Courtauld Institute of Art' };
        mergedInProviders = [{ 'ukprn': '10007035', 'name': 'Tresham College of Further and Higher Education' }];
    }
    else {
        leadProvider = { 'ukprn': '10002852', 'name': 'Halesowen College' };
        mergedInProviders = [{ 'ukprn': '10002917', 'name': 'Hartlepool College' }, { 'ukprn': '10003193', 'name': 'Hugh Baird College' }];
    }

    let providerName = '';
    let url = '';
    let filePrefix = 'TEFYearTwo';

    if (browser.params.env === "***-test" || browser.params.env === "***-clone-live" || browser.params.include2018updates === true) {
        filePrefix = '';
    }

    let documents = [
        {
            'type': 'statement',
            'link': 'statementLink',
            'none': 'noStatement',
            'showDetails': 'showStatementDetails',
            'details': 'statementDetails',
            'url': '/statements/' + filePrefix + 'Statement_',
            'filetype': '.pdf'
        },
        {

            'type': 'metrics',
            'link': 'metricsLink',
            'none': 'noMetrics',
            'showDetails': 'showMetricsDetails',
            'details': 'metricsDetails',
            'url': '/metrics/' + filePrefix + 'Metrics_',
            'filetype': '.xlsx'
        },
        {
            'type': 'map',
            'link': 'mapLink',
            'none': 'noMap',
            'showDetails': 'showMapDetails',
            'details': 'mapDetails',
            'url': '/maps/' + filePrefix + 'Maps_',
            'filetype': '.pdf'
        },
        {
            'type': 'submission',
            'link': 'submissionLink',
            'none': 'noSubmission',
            'showDetails': 'showSubmissionDetails',
            'details': 'submissionDetails',
            'url': '/submissions/' + filePrefix + 'Submission_',
            'filetype': '.pdf'
        }
    ]
    let downloadSection;

    using(awards, (data) => {

        describe('Filtering by "' + data + '" and selecting the first award from the provider list', () => {

            beforeAll(() => {
                helper.home();
                var awardButton = helper.getByTestId(data + 'Button');
                awardButton.click();

                var row = helper.getByTestId('providerList').all(by.tagName('tr')).get(1);
                var link = row.element(by.css('[data-test-id="providerLink"]'));
                providerName = link.getText();
                url = link.getAttribute('href');
                awardRating = row.element(by.css('[data-test-id="awardRating"]')).getAttribute('title');
                link.click();
            });

            it('should navigate to the Provider page for the ' + data + ' award', () => {
                expect(browser.getCurrentUrl()).toEqual(url);
            });

            it('should display the UKPRN', () => {
                expect(helper.getByTestId('ukprn').isDisplayed()).toBe(true)
            });

            it('should display the same UKPRN as in the url', () => {
                expect(browser.getCurrentUrl()).toContain(helper.getByTestId('ukprn').getText());
            });

            it('should display the provider name', () => {
                expect(helper.getByTestId('providerName').isDisplayed()).toBe(true);
                expect(helper.getByTestId('providerName').getText()).toEqual(providerName);
            });

            it('should display the award rating', () => {
                expect(element(by.tagName('rating-component')).isDisplayed()).toBe(true);
            });

            it('should display the ' + data + ' award rating', () => {
                expect(element(by.tagName('rating-component')).getAttribute('rating')).toEqual(awardRating);
            });

            if (browser.params.downloadComponent === 'downloads') {

                if (data === "provisional") {

                    it('should not display the downloads section', () => {
                        expect(helper.getByTestId('mainDownloads').isPresent()).toBe(false);
                    });
                }
                else {

                    it('should display the downloads section', () => {
                        expect(helper.getByTestId('mainDownloads').isDisplayed()).toBe(true);
                    });

                    it('should display the downloads section for the UKPRN', () => {
                        var pageUkprn = helper.getByTestId('ukprn').getText();
                        var mainDownloads = helper.getByTestId('mainDownloads');
                        var downloadsUkprn = mainDownloads.getAttribute('id');
                        expect(downloadsUkprn).toEqual(pageUkprn);
                    });

                    it('should display the download section header', () => {
                        var downloadsHeader = helper.getByTestId('mainDownloads').element(by.css('[data-test-id="downloadHeader"]'));
                        expect(downloadsHeader.isDisplayed()).toBe(true);
                    });

                    it('should display the provider name in the download section header', () => {
                        var downloadsHeader = helper.getByTestId('mainDownloads').element(by.css('[data-test-id="downloadHeader"]'));
                        expect(downloadsHeader.getText()).toContain(providerName);
                    });

                    it('should display the text "Further information - " in the download section header', () => {
                        var downloadsHeader = helper.getByTestId('mainDownloads').element(by.css('[data-test-id="downloadHeader"]'));
                        expect(downloadsHeader.getText()).toContain('Further information - ');
                    });
                }
            }
            else if (browser.params.downloadComponent === 'downloadlist') {

                if (data === "provisional") {

                    it('should not display the download list', () => {
                        expect(helper.getByTestId('downloadList').isPresent()).toBe(false);
                    });
                }
                else {

                    //it('should not display the superseded downloads component', () => {
                    //    expect(helper.getByTestId('mainDownloads').isPresent()).toBe(false);
                    //});

                    it('should display the download list', () => {
                        expect(helper.getByTestId('downloadList').isDisplayed()).toBe(true);
                    });

                    it('should display the download list header', () => {
                        var downloadsHeader = helper.getByTestId('downloadList').element(by.css('[data-test-id="downloadHeader"]'));
                        expect(downloadsHeader.isDisplayed()).toBe(true);
                    });

                    it('should display the text "Further information" in the download list header', () => {
                        var downloadsHeader = helper.getByTestId('downloadList').element(by.css('[data-test-id="downloadHeader"]'));
                        expect(downloadsHeader.getText()).toContain('Further information');
                    });

                    it('should not display the provider name in the download list header', () => {
                        var downloadsHeader = helper.getByTestId('downloadList').element(by.css('[data-test-id="downloadHeader"]'));
                        expect(downloadsHeader.getText()).not.toContain(providerName);
                    });
                }
            }

            afterAll(() => {
                helper.home();
            });
        });
    });

    describe('The lead provider in a merge ', () => {

        beforeAll(() => {
            helper.home();
            helper.getByTestId('providerInput').sendKeys(leadProvider.name);
            var row = helper.getByTestId('providerList').all(by.tagName('tr')).get(1);
            var link = row.element(by.css('[data-test-id="providerLink"]'));
            url = link.getAttribute('href');
            link.click();
        });


        it('should navigate to the Provider page for ' + leadProvider.name, () => {
            expect(browser.getCurrentUrl()).toEqual(url);
        });

        it('should display the website notes explaining the merge circumstances', () => {
            expect(helper.getByTestId('notes').isDisplayed()).toBe(true);
        });

        if (browser.params.downloadComponent === 'downloads') {

            it('should display the downloads section', () => {
                expect(helper.getByTestId('mainDownloads').isDisplayed()).toBe(true);
            });

            it('should display the downloads section for the UKPRN', () => {
                var pageUkprn = helper.getByTestId('ukprn').getText();
                var mainDownloads = helper.getByTestId('mainDownloads');
                var downloadsUkprn = mainDownloads.getAttribute('id');
                expect(downloadsUkprn).toEqual(pageUkprn);
            });

            it('should display the download section header', () => {
                var downloadsHeader = helper.getByTestId('mainDownloads').element(by.css('[data-test-id="downloadHeader"]'));
                expect(downloadsHeader.isDisplayed()).toBe(true);
            });

            it('should display the provider name ' + leadProvider.name + ' in the download section', () => {
                var downloadsHeader = helper.getByTestId('mainDownloads').element(by.css('[data-test-id="downloadHeader"]'));
                expect(downloadsHeader.getText()).toContain(leadProvider.name);
            });

            it('should display the download section header "Further information - ' + leadProvider.name + '"', () => {
                var downloadsHeader = helper.getByTestId('mainDownloads').element(by.css('[data-test-id="downloadHeader"]'));
                expect(downloadsHeader.getText()).toEqual('Further information - ' + leadProvider.name);
            });

            describe('Documents list', () => {
                using(documents, (doc) => {

                    beforeAll(() => {
                        downloadSection = helper.getByTestId('mainDownloads');
                    });

                    it('should display the ' + doc.type + ' link', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.link + '"]')).isDisplayed()).toBe(true);
                    });

                    it('should contain the url for the ' + doc.type + ' document', () => {
                        var documentUrl = browser.params.baseDocumentUrl + doc.url + leadProvider.ukprn + doc.filetype;
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.link + '"]')).getAttribute('href')).toEqual(documentUrl);
                    });

                    it('should display the "What is this?" link for the ' + doc.type + ' link', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).isDisplayed()).toBe(true);
                    });

                    it('should display the text "What is this?" for the ' + doc.type + ' link by default', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).getText()).toEqual('What is this?');
                    });

                    it('should not display the no ' + doc.type + ' message', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.none + '"]')).isPresent()).toBe(false);
                    });

                    it('should not display the ' + doc.type + ' "What is this?" details by default', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.details + '"]')).isPresent()).toBe(false);
                    });

                    it('should show the "What is this?" details when the "What is this?" link is clicked', () => {
                        downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).click();
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.details + '"]')).isDisplayed()).toBe(true);
                    });

                    it('should display the text "Hide" for the ' + doc.type + ' link after "What is this?" has been clicked', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).getText()).toEqual('Hide');
                    });

                    it('should hide the "What is this?" details when the "Hide" link is clicked', () => {
                        downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).click();
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.details + '"]')).isPresent()).toBe(false);
                    });

                    it('should display the text "What is this?" for the ' + doc.type + ' link after "Hide" has been clicked', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).getText()).toEqual('What is this?');
                    });
                });
            });
        }
        else if (browser.params.downloadComponent === 'downloadlist') {

            it('should display the download list', () => {
                expect(helper.getByTestId('downloadList').isDisplayed()).toBe(true);
            });

            it('should display the download list header', () => {
                var downloadsHeader = helper.getByTestId('downloadList').element(by.css('[data-test-id="downloadHeader"]'));
                expect(downloadsHeader.isDisplayed()).toBe(true);
            });

            it('should display the download list header "Further information"', () => {
                var downloadsHeader = helper.getByTestId('downloadList').element(by.css('[data-test-id="downloadHeader"]'));
                expect(downloadsHeader.getText()).toEqual('Further information');
            });

            describe('Documents list', () => {
                using(documents, (doc) => {

                    beforeAll(() => {
                        downloadSection = helper.getByTestId('downloadList');
                    });

                    it('should display the ' + doc.type + ' link', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.link + '"]')).isDisplayed()).toBe(true);
                    });

                    it('should contain the url for the ' + doc.type + ' document', () => {
                        var documentUrl = browser.params.baseDocumentUrl + doc.url + leadProvider.ukprn + doc.filetype;
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.link + '"]')).getAttribute('href')).toEqual(documentUrl);
                    })

                    it('should display the "What is this?" link for the ' + doc.type + ' link', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).isDisplayed()).toBe(true);
                    });

                    it('should display the text "What is this?" for the ' + doc.type + ' link by default', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).getText()).toEqual('What is this?');
                    });

                    it('should not display the no ' + doc.type + ' message', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.none + '"]')).isPresent()).toBe(false);
                    });

                    it('should not display the ' + doc.type + ' "What is this?" details by default', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.details + '"]')).isPresent()).toBe(false);
                    });

                    it('should show the "What is this?" details when the "What is this?" link is clicked', () => {
                        downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).click();
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.details + '"]')).isDisplayed()).toBe(true);
                    });

                    it('should display the text "Hide" for the ' + doc.type + ' link after "What is this?" has been clicked', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).getText()).toEqual('Hide');
                    });

                    it('should hide the "What is this?" details when the "Hide" link is clicked', () => {
                        downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).click();
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.details + '"]')).isPresent()).toBe(false);
                    });

                    it('should display the text "What is this?" for the ' + doc.type + ' link after "Hide" has been clicked', () => {
                        expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).getText()).toEqual('What is this?');
                    });
                });
            });
        }
    });

    using(mergedInProviders, (provider) => {

        if (browser.params.downloadComponent === 'downloads') {

            describe('The merged in provider ' + provider.name, () => {

                beforeAll(() => {
                    downloadSection = element(by.css('[id="' + provider.ukprn + '"]'));
                });

                it('should display the downloads section', () => {
                    expect(downloadSection.isDisplayed()).toBe(true);
                });

                it('should display the downloads section for the merged UKPRN ' + provider.ukprn, () => {
                    expect(downloadSection.getAttribute('id')).toEqual(provider.ukprn);
                });

                it('should display the download section header', () => {
                    var downloadsHeader = downloadSection.element(by.css('[data-test-id="downloadHeader"]'));
                    expect(downloadsHeader.isDisplayed()).toBe(true);
                });

                it('should display the provider name ' + provider.name + ' in the download section', () => {
                    var downloadsHeader = downloadSection.element(by.css('[data-test-id="downloadHeader"]'));
                    expect(downloadsHeader.getText()).toContain(provider.name);
                });

                it('should display the download section header "Further information - ' + provider.name + '"', () => {
                    var downloadsHeader = downloadSection.element(by.css('[data-test-id="downloadHeader"]'));
                    expect(downloadsHeader.getText()).toContain('Further information - ' + provider.name);
                });

                describe('Documents list', () => {

                    beforeAll(() => {
                        downloadSection = element(by.css('[id="' + provider.ukprn + '"]'));
                    })

                    using(documents, (doc) => {

                        if (doc.type === 'statement') {

                            it('should not display the ' + doc.type + ' link', () => {
                                expect(downloadSection.element(by.css('[data-test-id="' + doc.link + '"]')).isPresent()).toBe(false);
                            });

                            it('should not display the "What is this?" link for the ' + doc.type + ' link', () => {
                                expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).isPresent()).toBe(false);
                            });

                        }
                        else {

                            var testEnvironment = browser.params.env;

                            if (testEnvironment === "staging" || testEnvironment === "live") {

                                it('should display the ' + doc.type + ' link', () => {
                                    expect(downloadSection.element(by.css('[data-test-id="' + doc.link + '"]')).isDisplayed()).toBe(true);
                                });

                                it('should contain the url for the ' + doc.type + ' document', () => {
                                    var documentUrl = browser.params.baseDocumentUrl + doc.url + provider.ukprn + doc.filetype;
                                    expect(downloadSection.element(by.css('[data-test-id="' + doc.link + '"]')).getAttribute('href')).toEqual(documentUrl);
                                })
                            }
                            else {
                                it('should display the no ' + doc.type + ' message', () => {
                                    expect(downloadSection.element(by.css('[data-test-id="' + doc.none + '"]')).isDisplayed()).toBe(true);
                                });
                            }

                            it('should display the "What is this?" link for the ' + doc.type + ' link', () => {
                                expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).isDisplayed()).toBe(true);
                            });

                            it('should display the text "What is this?" for the ' + doc.type + ' link by default', () => {
                                expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).getText()).toEqual('What is this?');
                            });

                            it('should not display the ' + doc.type + ' "What is this?" details by default', () => {
                                expect(downloadSection.element(by.css('[data-test-id="' + doc.details + '"]')).isPresent()).toBe(false);
                            });

                            it('should show the "What is this?" details when the "What is this?" link is clicked', () => {
                                downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).click();
                                expect(downloadSection.element(by.css('[data-test-id="' + doc.details + '"]')).isDisplayed()).toBe(true);
                            });

                            it('should display the text "Hide" for the ' + doc.type + ' link after "What is this?" has been clicked', () => {
                                expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).getText()).toEqual('Hide');
                            });

                            it('should hide the "What is this?" details when the "Hide" link is clicked', () => {
                                downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).click();
                                expect(downloadSection.element(by.css('[data-test-id="' + doc.details + '"]')).isPresent()).toBe(false);
                            });

                            it('should display the text "What is this?" for the ' + doc.type + ' link after "Hide" has been clicked', () => {
                                expect(downloadSection.element(by.css('[data-test-id="' + doc.showDetails + '"]')).getText()).toEqual('What is this?');
                            });
                        }
                    });
                });
            });

        }
        else if (browser.params.downloadComponent === 'downloadlist') {

            describe('The merged in provider ' + provider.name, () => {

                using(documents, (doc) => {

                    let docLinkTestId = doc.link + '_' + provider.ukprn;

                    if (doc.type === 'statement') {

                        it('should not display the ' + doc.type + ' link', () => {
                            expect(helper.getByTestId(docLinkTestId).isPresent()).toBe(false);
                        });

                        it('should display the lead provider ' + doc.type + ' link', () => {
                            expect(helper.getByTestId(doc.link).isDisplayed()).toBe(true);
                        });

                        it('should display the "What is this?" link for the ' + doc.type + ' link', () => {
                            expect(helper.getByTestId(doc.showDetails).isDisplayed()).toBe(true);
                        });
                    }
                    else {

                        it('should display the ' + doc.type + ' link', () => {
                            expect(helper.getByTestId(docLinkTestId).isDisplayed()).toBe(true);
                        });

                        it('should contain the url for the ' + doc.type + ' document', () => {
                            var documentUrl = browser.params.baseDocumentUrl + doc.url + provider.ukprn + doc.filetype;
                            expect(helper.getByTestId(docLinkTestId).getAttribute('href')).toEqual(documentUrl);
                        })

                        it('should display the "What is this?" link for the ' + doc.type + ' link', () => {
                            expect(helper.getByTestId(doc.showDetails).isDisplayed()).toBe(true);
                        });

                        it('should display the text "What is this?" for the ' + doc.type + ' link by default', () => {
                            expect(helper.getByTestId(doc.showDetails).getText()).toEqual('What is this?');
                        });

                        it('should not display the ' + doc.type + ' "What is this?" details by default', () => {
                            expect(helper.getByTestId(doc.details).isPresent()).toBe(false);
                        });

                        it('should show the "What is this?" details when the "What is this?" link is clicked', () => {
                            helper.getByTestId(doc.showDetails).click();
                            expect(helper.getByTestId(doc.details).isDisplayed()).toBe(true);
                        });

                        it('should display the text "Hide" for the ' + doc.type + ' link after "What is this?" has been clicked', () => {
                            expect(helper.getByTestId(doc.showDetails).getText()).toEqual('Hide');
                        });

                        it('should hide the "What is this?" details when the "Hide" link is clicked', () => {
                            helper.getByTestId(doc.showDetails).click();
                            expect(helper.getByTestId(doc.details).isPresent()).toBe(false);
                        });

                        it('should display the text "What is this?" for the ' + doc.type + ' link after "Hide" has been clicked', () => {
                            expect(helper.getByTestId(doc.showDetails).getText()).toEqual('What is this?');
                        });
                    }
                });
            });
        }
    });
});