(function () {

    var rendering = new Rendering({

    });

    var gen = new Generator({
        intervals: {
            question: 30,
            answer: 15,
            comment: 15,
            choice: 10,
            poll: 30
        }
    });

    gen.on('question', $.proxy(rendering.renderQuestion, rendering));
    gen.on('answer', $.proxy(rendering.renderAnswer, rendering));
    gen.on('poll', $.proxy(rendering.renderPoll, rendering));
    gen.on('choice', $.proxy(rendering.renderChoice, rendering));
    gen.on('comment', $.proxy(rendering.renderComment, rendering));

    $(document).ready(function () {
        rendering.render($('.stream'));
        gen.start();
    });
})();