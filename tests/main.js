var bf = require('../dist_node/bf');


exports.cat = function(test) {
    test.deepEqual(
        bf.evaluate(',[.,]','abc'),
        'abc');
    test.done();
};



exports.hello = function(test) {
    test.deepEqual(
        bf.evaluate('++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.', ''),
        'abc');
    test.done();
};
