(function () {

    var QuestionView = window.QuestionView = Marionette.CompositeView.extend({
        template: '#question-template',
        className: 'collapse',

        itemViewContainer: '.answers',
        itemView: CommentView,

        renderItemView: function(view, index) {
            Marionette.CompositeView.prototype.renderItemView.call(this, view, index);

            view.$el.collapse('show');
        }
    });

})();