(function () {

    var QuestionView = window.QuestionView = Marionette.CompositeView.extend({
        template: '#question-template',
        className: 'question',

        itemViewContainer: '.answers',
        itemView: CommentView
    });

})();