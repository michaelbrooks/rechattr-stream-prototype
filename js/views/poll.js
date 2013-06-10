(function () {

    var PollView = window.PollView = Marionette.ItemView.extend({
        template: '#poll-template',
        className: 'collapse',

        modelEvents: {
            'change': 'render'
        }
    });

})();