/*
 * THIS FILE IS AUTO GENERATED from 'lib/bf.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bennu/parse", "bennu/lang", "bennu/text", "nu-stream/stream", "nu-stream/gen",
    "neith/zipper", "neith/list"
], (function(require, exports, __o, __o0, __o1, stream, __o2, zipper, __o3) {
    "use strict";
    var rec = __o["rec"],
        run = __o["run"],
        eager = __o["eager"],
        either = __o["either"],
        next = __o["next"],
        many = __o["many"],
        between = __o0["between"],
        sepEndBy = __o0["sepEndBy"],
        character = __o1["character"],
        oneOf = __o1["oneOf"],
        noneOf = __o1["noneOf"],
        first = stream["first"],
        rest = stream["rest"],
        isEmpty = stream["isEmpty"],
        map = stream["map"],
        NIL = stream["NIL"],
        repeat = __o2["repeat"],
        listZipperIn = __o3["listZipperIn"],
        evaluateStream, evaluate, parse, x, x0, eof, id = (function(x) {
            return x;
        }),
        charCode = Function.prototype.call.bind(String.prototype.charCodeAt),
        fromCharCode = String.fromCharCode,
        op = oneOf("><+-.,"),
        other = many(noneOf("><+-.,[]")),
        block = between.bind(null, character("["), character("]")),
        program = rec((function(self) {
            return next(other, eager(sepEndBy(other, either(op, block(self)))));
        }));
    (parse = run.bind(null, program));
    var move = (function(op) {
        return (function(z, i) {
            return [op(z), i];
        });
    }),
        then = (function(a, b) {
            return (function(z, i) {
                var __o = a(z, i),
                    zi = __o[0],
                    ii = __o[1];
                return b(zi, ii);
            });
        }),
        seqa = (function(arr) {
            return Array.prototype.reduce.call(arr, then);
        }),
        seq = (function() {
            var args = arguments;
            return seqa(args);
        }),
        inc = move(zipper.modify.bind(null, ((x = 1), (function(y) {
            return (x + y);
        })))),
        dec = move(zipper.modify.bind(null, ((x0 = 1), (function(y) {
            return (y - x0);
        })))),
        right = move(zipper.right),
        left = move(zipper.left),
        get = ((eof = move(zipper.replace.bind(null, 0))), (function(z, i) {
            return (isEmpty(i) ? eof : [zipper.replace(first(i), z), rest(i)]);
        })),
        put = move((function(z) {
            console.log(fromCharCode(zipper.extract(z)));
            return z;
        })),
        loop = (function(body) {
            return (function loop(z, i) {
                return ((zipper.extract(z) === 0) ? [z, i] : seq(seqa(body), loop)(z, i));
            });
        }),
        semantics = (function(code) {
            return code.map((function(x) {
                switch (x) {
                    case "+":
                        return inc;
                    case "-":
                        return dec;
                    case ">":
                        return right;
                    case "<":
                        return left;
                    case ".":
                        return put;
                    case ",":
                        return get;
                    default:
                        return loop(semantics(x));
                }
            }));
        }),
        memory = listZipperIn(NIL, 0, repeat(Infinity, 0)),
        exec = (function(program, input) {
            return program(memory, map(charCode, input));
        });
    (evaluateStream = (function(program, input) {
        return exec(seqa(semantics(parse(program))), input);
    }));
    (evaluate = (function(program, input) {
        return evaluateStream(program, stream.from(input));
    }));
    (exports["evaluateStream"] = evaluateStream);
    (exports["evaluate"] = evaluate);
    (exports["parse"] = parse);
}));