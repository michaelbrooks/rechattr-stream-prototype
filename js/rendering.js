(function() {

    var Rendering = window.Rendering = function(config) {
    };

    Rendering.prototype.renderQuestion = function(question) {
        this.el.append('<div>' + question.text + '</div>');
    };

    Rendering.prototype.renderAnswer = function(answer) {
        this.el.append('<div>' + answer.text + '</div>');
    };

    Rendering.prototype.renderPoll = function(poll) {
        this.el.append('<div>' + poll.text + '</div>');
    };

    Rendering.prototype.renderChoice = function(choice) {
        console.log(choice.poll.choices[choice.choice]);
    };

    Rendering.prototype.renderComment = function(comment) {
        this.el.append('<div>' + comment.text + '</div>');
    };

    Rendering.prototype.render = function(el) {
        this.el = el;
    };

    _.extend(Rendering.prototype, Backbone.Events);

})();