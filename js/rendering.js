(function() {

    var Rendering = window.Rendering = function(config) {

        this.polls = new Backbone.Collection();
        this.questions = new Backbone.Collection();
        this.comments = new Backbone.Collection();
    };

    Rendering.prototype.renderQuestion = function(question) {
        question = new Backbone.Model(question);
        this.questions.add(question);

        var view = new QuestionView({
            model: question
        });

        this.el.append(view.render().el);
    };

    Rendering.prototype.renderAnswer = function(answer) {
        this.el.append('<div>' + answer.text + '</div>');
    };

    Rendering.prototype.renderPoll = function(poll) {
        poll = new Backbone.Model(poll);
        this.polls.add(poll);

        var view = new PollView({
            model: poll
        });

        this.el.append(view.render().el);
    };

    Rendering.prototype.renderChoice = function(choice) {
        var poll = this.polls.get(choice.poll.id);

        var answers = poll.get('answers');
        answers[choice.choice] += 1;

        poll.trigger('change');
    };

    Rendering.prototype.renderComment = function(comment) {
        comment = new Backbone.Model(comment);
        this.comments.add(comment);

        var view = new CommentView({
            model: comment
        });

        this.el.append(view.render().el);
    };

    Rendering.prototype.render = function(el) {
        this.el = el;
    };

    _.extend(Rendering.prototype, Backbone.Events);

})();