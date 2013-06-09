(function () {

    var idInc = 0;
    var users = [];

    var Generator = window.Generator = function (config) {

        this.questions = [];
        this.polls = [];

        this._timeout = {};
        this.intervals = config['intervals'];

        while (users.length < 5) {
            users.push({
                name:  randomText(6, 12),
                screenname: '@' + randomText(5, 10)
            });
        }
    };

    Generator.prototype.start = function () {
        var self = this;
        _.each(this.intervals, function (interval, type) {
            self.nextEvent(type);
        });
    };

    Generator.prototype.stop = function () {
        var self = this;
        _.each(this._timeout, function (timeout, type) {
            clearTimeout(timeout);
            self._timeout[type] = null;
        });
    };

    Generator.prototype.nextEvent = function (type) {
        if (this._timeout[type]) {
            return;
        }

        var intervalSeconds = randomInterval(1 / this.intervals[type]);
        console.log(type + ' scheduled in ' + intervalSeconds + ' seconds');

        var self = this;
        this._timeout[type] = setTimeout(function () {
            self.emit(type);
        }, intervalSeconds * 1000);
    };

    Generator.prototype.emit = function (type) {
        this._timeout[type] = null;

        //Generate the event content
        var content = this.randomContent(type);

        if (content) {
            //Trigger the event
            this.trigger(type, content);
        }

        this.nextEvent(type);
    };

    //http://stackoverflow.com/questions/2206199/how-do-i-generate-discrete-random-events-with-a-poisson-distribution
    //http://stackoverflow.com/questions/2106503/pseudorandom-number-generator-exponential-distribution
    function randomInterval(lambda) {
        return (Math.log(1.0 - Math.random()) / (-lambda));
    }

    Generator.prototype.randomContentType = function () {
        var types = ['question', 'poll', 'choice', 'comment', 'answer'];

        var index = Math.floor(Math.random() * types.length);
        return types[index];
    };

    Generator.prototype.randomContent = function (contentType) {
        var generators = {
            'question': 'randomQuestion',
            'poll': 'randomPoll',
            'choice': 'randomChoice',
            'comment': 'randomComment',
            'answer': 'randomAnswer'
        };

        var content = this[generators[contentType]]();

        if (content) {
            content.id = idInc++;
            content.type = contentType;
            content.time = new Date();

            if (contentType == 'question') {
                this.questions.push(content);
            } else if (contentType == 'poll') {
                this.polls.push(content);
            }
        }

        return content;
    };

    Generator.prototype.randomQuestion = function () {
        return {
            text: randomText(30, 150, '?')
        };
    };

    Generator.prototype.randomPoll = function () {
        return {
            text: randomText(30, 150, '?'),
            choices: randomChoices(3, 5)
        }
    };

    Generator.prototype.randomChoice = function() {
        if (!this.polls.length) {
            return;
        }

        var poll = Math.floor(Math.random() * this.polls.length);
        poll = this.polls[poll];

        var choice = Math.floor(Math.random() * poll.choices.length);

        return {
            poll: poll,
            choice: choice
        };
    };

    Generator.prototype.randomComment = function () {
        return {
            text: randomText(30, 150, '.!?'),
            author: 'Michael',
            screenname: '@mjbrks'
        };
    };

    Generator.prototype.randomAnswer = function () {
        if (!this.questions.length) {
            return;
        }

        var question = Math.floor(Math.random() * this.questions.length);
        question = this.questions[question];

        return {
            text: randomText(30, 150, '.!?'),
            author: 'Michael',
            screenname: '@mjbrks',
            question: question
        };
    };

    var randomUser = function (into) {
        var user = users[Math.floor(Math.random() * users.length)];
        _.extend(into, user);
    };

    var randomChoices = function (minAnswers, maxAnswers) {
        var numAnswers = minAnswers + Math.random() * (maxAnswers - minAnswers);
        var answers = [];
        while (answers.length < numAnswers) {
            answers.push(randomText(3, 15));
        }
        return answers;
    };

    var randomText = function (minLength, maxLength, punctuation) {
        var vowels = 'aeiouy';
        var consonants = 'bcdfghjklmnpqrstvwxz';
        var letters;

        var length = minLength + Math.random() * (maxLength - minLength);
        var result = '';

        var wordLen = 0;
        while (result.length < length) {
            if (wordLen > 1 && Math.random() < 0.3) {
                result += ' ';
                wordLen = 0;
            } else {
                if (result.length % 2 == 0) {
                    letters = consonants;
                } else {
                    letters = vowels;
                }

                result += letters[Math.floor(Math.random() * letters.length)];

                if (result.length == 1) {
                    result = result.toUpperCase();
                }

                wordLen++;
            }
        }

        result = $.trim(result);

        if (punctuation) {
            result += punctuation[Math.floor(Math.random() * punctuation.length)];
        }

        return result;
    };

    _.extend(Generator.prototype, Backbone.Events);
})();