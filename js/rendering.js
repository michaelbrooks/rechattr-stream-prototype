(function() {

    var Rendering = window.Rendering = function(config) {

        this.polls = new Backbone.Collection();
        this.questions = new Backbone.Collection();
        this.comments = new Backbone.Collection();
        this.answers = new Backbone.Collection();
    };

    Rendering.prototype.renderQuestion = function(question) {
        question = new Backbone.Model(question);
        this.questions.add(question);

        question.answers = new Backbone.Collection();

        var view = new QuestionView({
            model: question,
            collection: question.answers
        });

        this.el.append(view.render().el);
    };

    Rendering.prototype.renderAnswer = function(answer) {
        answer = new Backbone.Model(answer);
        this.answers.add(answer);

        var question = this.questions.get(answer.get('question'));
        question.answers.add(answer);
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
        var poll = this.polls.get(choice.poll);

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