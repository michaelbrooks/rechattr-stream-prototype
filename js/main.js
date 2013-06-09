(function () {

    var rendering = new Rendering({

    });

    var gen = new Generator({
        intervals: {
            question: 10,
            answer: 8,
            comment: 4,
            poll: 10
        }
    });

    gen.on('question', $.proxy(rendering.renderQuestion, rendering));
    gen.on('answer', $.proxy(rendering.renderAnswer, rendering));
    gen.on('poll', $.proxy(rendering.renderPoll, rendering));
    gen.on('comment', $.proxy(rendering.renderComment, rendering));

    $(document).ready(function () {
        rendering.render($('.stream'));
        gen.start();
    });
})();