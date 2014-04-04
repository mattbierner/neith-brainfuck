/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/bf.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("akh")["base"],
    sequence = __o["sequence"],
    sequencea = __o["sequencea"],
    State = require("akh")["state"],
    ZipperT = require("zipper-m")["trans"]["zipper"],
    __o0 = require("bennu")["parse"],
    rec = __o0["rec"],
    run = __o0["run"],
    eager = __o0["eager"],
    either = __o0["either"],
    next = __o0["next"],
    many = __o0["many"],
    __o1 = require("bennu")["lang"],
    between = __o1["between"],
    sepEndBy = __o1["sepEndBy"],
    __o2 = require("bennu")["text"],
    character = __o2["character"],
    oneOf = __o2["oneOf"],
    noneOf = __o2["noneOf"],
    stream = require("nu-stream")["stream"],
    first = stream["first"],
    rest = stream["rest"],
    isEmpty = stream["isEmpty"],
    map = stream["map"],
    NIL = stream["NIL"],
    __o3 = require("nu-stream")["gen"],
    repeat = __o3["repeat"],
    zipper = require("neith")["zipper"],
    __o4 = require("neith")["list"],
    listZipperIn = __o4["listZipperIn"],
    __add = (function(x, y) {
        return (x + y);
    }),
    __subr = (function(x, y) {
        return (y - x);
    }),
    evaluateStream, evaluate, parse, eof, charCode = Function.prototype.call.bind(String.prototype.charCodeAt),
    fromCharCode = String.fromCharCode,
    op = oneOf("><+-.,"),
    other = many(noneOf("><+-.,[]")),
    block = between.bind(null, character("["), character("]")),
    program = rec((function(self) {
        return next(other, eager(sepEndBy(other, either(op, block(self)))));
    }));
(parse = run.bind(null, program));
var M = ZipperT(State),
    inc = M.move(zipper.modify.bind(null, (function(y) {
        return (1 + y);
    }))),
    dec = M.move(zipper.modify.bind(null, (function(y) {
        return (y - 1);
    }))),
    right = M.move(zipper.right),
    left = M.move(zipper.left),
    set = (function(x) {
        return M.move(zipper.replace.bind(null, x));
    }),
    loop = (function(body) {
        var loop0 = M.extract.chain((function(x) {
            return ((x === 0) ? M.of(null) : sequence(body, loop0));
        }));
        return loop0;
    }),
    get = ((eof = M.move(zipper.replace.bind(null, 0))), M.lift(State.get)
        .chain((function(i) {
            return (isEmpty(i) ? eof : sequence(set(first(i)), M.lift(M.inner.modify(rest))));
        }))),
    put = M.extract.map((function(x) {
        console.log(fromCharCode(x));
        return x;
    })),
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
                    {
                        var body = sequencea(semantics(x)),
                            loop0 = M.extract.chain((function(x0) {
                                return ((x0 === 0) ? M.of(null) : sequence(body, loop0));
                            }));
                        return loop0;
                    }
            }
        }));
    }),
    memory = listZipperIn(NIL, 0, repeat(Infinity, 0)),
    exec = (function(program0, input) {
        return State.evalState(ZipperT.runZipperT(program0, memory), map(charCode, input));
    });
(evaluateStream = (function(program0, input) {
    return exec(sequencea(semantics(parse(program0))), input);
}));
(evaluate = (function(program0, input) {
    return evaluateStream(program0, stream.from(input));
}));
(exports["evaluateStream"] = evaluateStream);
(exports["evaluate"] = evaluate);
(exports["parse"] = parse);