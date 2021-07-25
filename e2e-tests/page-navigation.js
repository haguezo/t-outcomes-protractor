module.exports = {

    getByTestId: function (id) {
        return element(by.css('[data-test-id="' + id + '"]'));
    },

    currentPage: function () {
        var currentPage = element(by.css('pagination-controls[data-test-id="pageNavigation"] li.current span:nth-of-type(2)'));
        return currentPage.getText();
    },

    next: function () {
        var next = element(by.css('pagination-controls[data-test-id="pageNavigation"] li.pagination-next'));

        this.hasClass(next, 'disabled').then(function (isDisabled) {
            if (!isDisabled) {
                next.element(by.css('a')).click();
            }
        });
    },

    previous: function () {
        var next = element(by.css('pagination-controls[data-test-id="pageNavigation"] li.pagination-previous'));

        this.hasClass(next, 'disabled').then(function (isDisabled) {
            if (!isDisabled) {
                next.element(by.css('a')).click();
            }
        });
    },

    goToPage: function (pageNumber) {
        var xPathLocator = '//pagination-controls[@data-test-id="pageNavigation"]//li/a/span[text() = "' + pageNumber + '"]';
        element(by.xpath(xPathLocator)).isPresent().then(function (isPresent) {
            if (isPresent) {
                element(by.xpath(xPathLocator)).click();
            }
        });
    },

    last: function () {
        var cssLocator = 'pagination-controls[data-test-id="pageNavigation"] li:nth-last-child(2)';
        element(by.css(cssLocator)).isPresent().then(function (isPresent) {
            if (isPresent) {
                element(by.css(cssLocator)).click();
            }
        });
    },

    lastPageNumber: function () {
        var cssLocator = 'pagination-controls[data-test-id="pageNavigation"] li:nth-last-child(2) span:nth-of-type(2)';
        return element(by.css(cssLocator)).isPresent().then(function (isPresent) {
            if (isPresent) {
                return element(by.css(cssLocator)).getText();
            }
        });

    },

    hasClass: function (element, css) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(css) !== -1;
        });
    }
};