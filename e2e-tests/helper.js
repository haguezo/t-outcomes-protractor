module.exports = {
	getByTestId: function(id) {
		return element(by.css('[data-test-id="' + id + '"]'));
	},

	home: function () {
        browser.get(browser.baseUrl);
    },

    hasClass: function (element, className) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(className) !== -1;
        });
    }
};