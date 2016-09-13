function $mol_test(code) {
    $mol_test_all.push(new $mol_test_case(code));
}
var $mol_test_all = [];
var $mol_test_run = function () {
    for (var _i = 0, $mol_test_all_1 = $mol_test_all; _i < $mol_test_all_1.length; _i++) {
        var test = $mol_test_all_1[_i];
        test.run();
    }
};
var $mol_test_case = (function () {
    function $mol_test_case(code) {
        if (typeof code === 'string') {
            this.code = new Function('test', code);
        }
        else {
            this.code = code;
        }
    }
    $mol_test_case.prototype.run = function () {
        this.code.call(null, this);
    };
    $mol_test_case.prototype.done = function () {
    };
    $mol_test_case.prototype.ok = function (value) {
        if (value)
            return;
        throw new Error("Not true (" + value + ")");
    };
    $mol_test_case.prototype.not = function (value) {
        if (!value)
            return;
        throw new Error("Not false (" + value + ")");
    };
    $mol_test_case.prototype.fail = function (message) {
        throw new Error(message);
    };
    $mol_test_case.prototype.equal = function (a, b) {
        if (a === b)
            return;
        throw new Error("Not equal (" + a + "," + b + ")");
    };
    $mol_test_case.prototype.unique = function (a, b) {
        if (a !== b)
            return;
        throw new Error("Not unique (" + a + "," + b + ")");
    };
    return $mol_test_case;
}());
//# sourceMappingURL=test.js.map
;
document.addEventListener('DOMContentLoaded', function (event) {
    $mol_test_run();
});
//# sourceMappingURL=test.env=web.stage=test.js.map
;
this['$'] = this['$'] || this;
this['$']['$mol'] = this['$'];
var __extends = function (Sub, Sup) {
    for (var prop in Sup)
        if (Sup.hasOwnProperty(prop))
            Sub[prop] = Sup[prop];
    Sub.prototype = Object.create(Sup.prototype);
    Sub.prototype.constructor = Sub;
    if (Sub.initializer)
        Sub.initializer();
};
//# sourceMappingURL=mol.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
$mol_test(function (test) {
    var firstAClass;
    var lastBClass;
    var A = (function () {
        function A() {
        }
        A.initializer = function () {
            firstAClass = firstAClass || this;
        };
        return A;
    }());
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        B.initializer = function () {
            _super.initializer.call(this);
            lastBClass = this;
        };
        return B;
    }(A));
    var C = (function (_super) {
        __extends(C, _super);
        function C() {
            _super.apply(this, arguments);
        }
        return C;
    }(B));
    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    }(C));
    test.equal(firstAClass, B);
    test.equal(lastBClass, D);
});
//# sourceMappingURL=mol.stage=test.js.map
;
var $jin = this.$jin = {}

;
var $jin;
(function ($jin) {
    function concater(funcs) {
        switch (funcs.length) {
            case 0:
                return function (value) { return value; };
            case 1:
                return funcs[0];
            default:
                var mid = Math.ceil(funcs.length / 2);
                var first = $jin.concater(funcs.slice(0, mid));
                var second = $jin.concater(funcs.slice(mid));
                return function (value) {
                    return first(value) + second(value);
                };
        }
    }
    $jin.concater = concater;
})($jin || ($jin = {}));
//# sourceMappingURL=jin-concater.js.map
;
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var base_class = (function () {
            function base_class() {
            }
            base_class.formatter = function (pattern) {
                var _this = this;
                if (this.patterns[pattern])
                    return this.patterns[pattern];
                var tokens = Object.keys(this.patterns)
                    .sort()
                    .reverse()
                    .map(function (token) { return token.replace(/([-+*.\[\]()\^])/g, '\\$1'); });
                var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
                var funcs = [];
                pattern.replace(lexer, function (str, text, token) {
                    if (text)
                        funcs.push(function () { return text; });
                    if (token)
                        funcs.push(_this.patterns[token]);
                });
                return this.patterns[pattern] = $jin.concater(funcs);
            };
            base_class.prototype.toString = function (pattern) {
                var Base = this.constructor;
                var formatter = Base.formatter(pattern);
                return formatter.call(Base, this);
            };
            base_class.patterns = {};
            return base_class;
        }());
        time.base_class = base_class;
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//# sourceMappingURL=base.js.map
;
function $jin_type(value) {
    var str = {}.toString.apply(value);
    var type = str.substring(8, str.length - 1);
    if (['Window', 'global'].indexOf(type) >= 0)
        type = 'Global';
    return type;
}
//# sourceMappingURL=type.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var duration_class = (function (_super) {
            __extends(duration_class, _super);
            function duration_class(config) {
                _super.call(this);
                this._year = config.year && Number(config.year) || 0;
                this._month = config.month && Number(config.month) || 0;
                this._day = config.day && Number(config.day) || 0;
                this._hour = config.hour && Number(config.hour) || 0;
                this._minute = config.minute && Number(config.minute) || 0;
                this._second = config.second && Number(config.second) || 0;
            }
            duration_class.make = function (duration) {
                if (!arguments.length)
                    duration = [];
                var type = $jin_type(duration);
                switch (type) {
                    case 'Number':
                        return new this({ second: duration / 1000 });
                    case 'Array':
                        return new this({
                            year: duration[0],
                            month: duration[1],
                            day: duration[2],
                            hour: duration[3],
                            minute: duration[4],
                            second: duration[5],
                        });
                    case 'Object':
                        if (duration instanceof this)
                            return duration;
                        return new this(duration);
                    case 'String':
                        if (duration === 'Z') {
                            return new this({});
                        }
                        var parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                        var found = parser.exec(duration);
                        if (found) {
                            return new this({
                                year: found[1],
                                month: found[2],
                                day: found[3],
                                hour: found[4],
                                minute: found[5],
                                second: found[6],
                            });
                        }
                        var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                        var found = parser.exec(duration);
                        if (found) {
                            return new this({
                                hour: found[1],
                                minute: found[2],
                            });
                        }
                        throw new Error('Can not parse time duration (' + duration + ')');
                    default:
                        throw new Error('Wrong type of time duration (' + type + ')');
                }
            };
            Object.defineProperty(duration_class.prototype, "year", {
                get: function () { return this._year; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "month", {
                get: function () { return this._month; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "day", {
                get: function () { return this._day; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "hour", {
                get: function () { return this._hour; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "minute", {
                get: function () { return this._minute; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "second", {
                get: function () { return this._second; },
                enumerable: true,
                configurable: true
            });
            duration_class.prototype.summ = function (config) {
                var Duration = this.constructor;
                var duration = Duration.make(config);
                return new Duration({
                    year: this.year + duration.year,
                    month: this.month + duration.month,
                    day: this.day + duration.day,
                    hour: this.hour + duration.hour,
                    minute: this.minute + duration.minute,
                    second: this.second + duration.second,
                });
            };
            duration_class.prototype.sub = function (config) {
                var Duration = this.constructor;
                var duration = Duration.make(config);
                return new Duration({
                    year: this.year - duration.year,
                    month: this.month - duration.month,
                    day: this.day - duration.day,
                    hour: this.hour - duration.hour,
                    minute: this.minute - duration.minute,
                    second: this.second - duration.second,
                });
            };
            duration_class.prototype.valueOf = function () {
                var day = this.year * 365 + this.month * 30.4 + this.day;
                var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
                return second * 1000;
            };
            duration_class.prototype.toJSON = function () { return this.toString(); };
            duration_class.prototype.toString = function (pattern) {
                if (pattern === void 0) { pattern = 'P#Y#M#DT#h#m#s'; }
                return _super.prototype.toString.call(this, pattern);
            };
            duration_class.patterns = {
                '#Y': function (duration) {
                    if (!duration.year)
                        return '';
                    return duration.year + 'Y';
                },
                '#M': function (duration) {
                    if (!duration.month)
                        return '';
                    return duration.month + 'M';
                },
                '#D': function (duration) {
                    if (!duration.day)
                        return '';
                    return duration.day + 'D';
                },
                '#h': function (duration) {
                    if (!duration.hour)
                        return '';
                    return duration.hour + 'H';
                },
                '#m': function (duration) {
                    if (!duration.minute)
                        return '';
                    return duration.minute + 'M';
                },
                '#s': function (duration) {
                    if (!duration.second)
                        return '';
                    return duration.second + 'S';
                },
                '+hh': function (duration) {
                    var hour = duration.hour;
                    var sign = '+';
                    if (hour < 0) {
                        sign = '-';
                        hour = -hour;
                    }
                    return (hour < 10)
                        ? (sign + '0' + hour)
                        : (sign + hour);
                },
                'mm': function (duration) {
                    return (duration.minute < 10)
                        ? ('0' + duration.minute)
                        : String(duration.minute);
                },
            };
            return duration_class;
        }($jin.time.base_class));
        time.duration_class = duration_class;
        time.duration = duration_class.make.bind(duration_class);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//# sourceMappingURL=duration.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var moment_class = (function (_super) {
            __extends(moment_class, _super);
            function moment_class(config) {
                _super.call(this);
                this._year = config.year && Number(config.year);
                this._month = config.month && Number(config.month);
                this._day = config.day && Number(config.day);
                this._hour = config.hour && Number(config.hour);
                this._minute = config.minute && Number(config.minute);
                this._second = config.second && Number(config.second);
                this._offset = config.offset && this.constructor.duration_class.make(config.offset);
                this._native = null;
            }
            moment_class.make = function (moment) {
                if (!arguments.length)
                    moment = new Date;
                var type = $jin_type(moment);
                switch (type) {
                    case 'Number':
                        moment = new Date(moment);
                    case 'Date':
                        var native = moment;
                        var offset = -native.getTimezoneOffset();
                        return new this({
                            year: native.getFullYear(),
                            month: native.getMonth(),
                            day: native.getDate() - 1,
                            hour: native.getHours(),
                            minute: native.getMinutes(),
                            second: native.getSeconds() + native.getMilliseconds() / 1000,
                            offset: {
                                hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                                minute: offset % 60
                            }
                        });
                    case 'String':
                        var parsed = /^(?:(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d))?)?)?(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d(?:\.\d\d\d)?))?)?(Z|[\+\-]\d\d(?::?(?:\d\d)?)?)?)?$/.exec(moment);
                        if (!parsed)
                            throw new Error('Can not parse time moment (' + moment + ')');
                        return new this({
                            year: parsed[1],
                            month: parsed[2] ? (Number(parsed[2]) - 1) : void 0,
                            day: parsed[3] ? (Number(parsed[3]) - 1) : void 0,
                            hour: parsed[4],
                            minute: parsed[5],
                            second: parsed[6],
                            offset: parsed[7]
                        });
                    case 'Array':
                        return new this({
                            year: moment[0],
                            month: moment[1],
                            day: moment[2],
                            hour: moment[3],
                            minute: moment[4],
                            second: moment[5],
                            offset: moment[6],
                        });
                    case 'Object':
                        if (moment instanceof this)
                            return moment;
                        return new this(moment);
                    default:
                        throw new Error('Wrong type of time moment (' + type + ')');
                }
            };
            Object.defineProperty(moment_class.prototype, "year", {
                get: function () { return this._year; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "month", {
                get: function () { return this._month; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "day", {
                get: function () { return this._day; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "hour", {
                get: function () { return this._hour; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "minute", {
                get: function () { return this._minute; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "second", {
                get: function () { return this._second; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "offset", {
                get: function () { return this._offset; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "native", {
                get: function () {
                    if (this._native)
                        return this._native;
                    var utc = this.toOffset('Z');
                    return this._native = new Date(Date.UTC(utc.year || 0, utc.month || 0, (utc.day || 0) + 1, utc.hour || 0, utc.minute || 0, utc.second && Math.ceil(utc.second) || 0, utc.second && (utc.second - Math.ceil(utc.second)) || 0));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "normal", {
                get: function () {
                    return this.constructor.make(this.native).merge({
                        year: (this._year === void 0) ? null : void 0,
                        month: (this._month === void 0) ? null : void 0,
                        day: (this._day === void 0) ? null : void 0,
                        hour: (this._hour === void 0) ? null : void 0,
                        minute: (this._minute === void 0) ? null : void 0,
                        second: (this._second === void 0) ? null : void 0,
                        offset: (this._offset === void 0) ? null : void 0,
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "weekDay", {
                get: function () {
                    return this.native.getDay();
                },
                enumerable: true,
                configurable: true
            });
            moment_class.prototype.merge = function (config) {
                var Moment = this.constructor;
                var moment = Moment.make(config);
                return new Moment({
                    year: (moment.year === void 0)
                        ? this._year
                        : (moment.year === null)
                            ? void 0
                            : moment.year,
                    month: (moment.month === void 0)
                        ? this._month
                        : (moment.month === null)
                            ? void 0
                            : moment.month,
                    day: (moment.day === void 0)
                        ? this._day
                        : (moment.day === null)
                            ? void 0
                            : moment.day,
                    hour: (moment.hour === void 0)
                        ? this._hour
                        : (moment.hour === null)
                            ? void 0
                            : moment.hour,
                    minute: (moment.minute === void 0)
                        ? this._minute
                        : (moment.minute === null)
                            ? void 0
                            : moment.minute,
                    second: (moment.second === void 0)
                        ? this._second
                        : (moment.second === null)
                            ? void 0
                            : moment.second,
                    offset: (moment.offset === void 0)
                        ? this._offset
                        : (moment.offset === null)
                            ? void 0
                            : moment.offset,
                });
            };
            moment_class.prototype.shift = function (config) {
                var Moment = this.constructor;
                var duration = Moment.duration_class.make(config);
                var moment = Moment.make().merge(this);
                var second = moment.second + duration.second;
                var native = new Date(moment.year + duration.year, moment.month + duration.month, moment.day + duration.day + 1, moment.hour + duration.hour, moment.minute + duration.minute, Math.floor(second), (second - Math.floor(second)) * 1000);
                if (isNaN(native.valueOf()))
                    throw new Error('Wrong time');
                return new Moment({
                    year: (this._year === void 0) ? void 0 : native.getFullYear(),
                    month: (this._month === void 0) ? void 0 : native.getMonth(),
                    day: (this._day === void 0) ? void 0 : native.getDate() - 1,
                    hour: (this._hour === void 0) ? void 0 : native.getHours(),
                    minute: (this._minute === void 0) ? void 0 : native.getMinutes(),
                    second: (this._second === void 0) ? void 0 : native.getSeconds() + native.getMilliseconds() / 1000,
                    offset: this.offset,
                });
            };
            moment_class.prototype.sub = function (config) {
                var Moment = this.constructor;
                var moment = Moment.make(config);
                var dur = {
                    year: (moment.year === void 0)
                        ? this.year
                        : (this.year || 0) - moment.year,
                    month: (moment.month === void 0)
                        ? this.month
                        : (this.month || 0) - moment.month,
                    day: (moment.day === void 0)
                        ? this.day
                        : (this.day || 0) - moment.day,
                    hour: (moment.hour === void 0)
                        ? this.hour
                        : (this.hour || 0) - moment.hour,
                    minute: (moment.minute === void 0)
                        ? this.minute
                        : (this.minute || 0) - moment.minute,
                    second: (moment.second === void 0)
                        ? this.second
                        : (this.second || 0) - moment.second,
                };
                return new Moment.duration_class(dur);
            };
            moment_class.prototype.toOffset = function (duration) {
                if (this._offset) {
                    var Moment = this.constructor;
                    return this
                        .shift(Moment.duration_class.make(duration).sub(this._offset))
                        .merge({ offset: duration });
                }
                else {
                    return this.merge({ offset: duration });
                }
            };
            moment_class.prototype.valueOf = function () { return this.native.getTime(); };
            moment_class.prototype.toJSON = function () { return this.toString(); };
            moment_class.prototype.toString = function (pattern) {
                if (pattern === void 0) { pattern = 'YYYY-MM-DDThh:mm:ss.sssZ'; }
                return _super.prototype.toString.call(this, pattern);
            };
            moment_class.duration_class = $jin.time.duration_class;
            moment_class.patterns = {
                'YYYY': function (moment) {
                    if (moment.year == null)
                        return '';
                    return String(moment.year);
                },
                'AD': function (moment) {
                    if (moment.year == null)
                        return '';
                    return String(Math.floor(moment.year / 100) + 1);
                },
                'YY': function (moment) {
                    if (moment.year == null)
                        return '';
                    return String(moment.year % 100);
                },
                'Month': function (moment) {
                    if (moment.month == null)
                        return '';
                    return moment.constructor.monthLong[moment.month];
                },
                'Mon': function (moment) {
                    if (moment.month == null)
                        return '';
                    return moment.constructor.monthShort[moment.month];
                },
                '-MM': function (moment) {
                    if (moment.month == null)
                        return '';
                    return '-' + moment.constructor.patterns['MM'](moment);
                },
                'MM': function (moment) {
                    if (moment.month == null)
                        return '';
                    var month = moment.month + 1;
                    return (month < 10)
                        ? ('0' + month)
                        : ('' + month);
                },
                'M': function (moment) {
                    if (moment.month == null)
                        return '';
                    return String(moment.month + 1);
                },
                'WeekDay': function (moment) {
                    if (moment.weekDay == null)
                        return '';
                    return moment.constructor.weekDayLong[moment.weekDay];
                },
                'WD': function (moment) {
                    if (moment.weekDay == null)
                        return '';
                    return moment.constructor.weekDayShort[moment.weekDay];
                },
                '-DD': function (moment) {
                    if (moment.day == null)
                        return '';
                    return '-' + moment.constructor.patterns['DD'](moment);
                },
                'DD': function (moment) {
                    if (moment.day == null)
                        return '';
                    var day = moment.day + 1;
                    return (day < 10)
                        ? ('0' + day)
                        : String(day);
                },
                'D': function (moment) {
                    if (moment.day == null)
                        return '';
                    return String(moment.day + 1);
                },
                'Thh': function (moment) {
                    if (moment.hour == null)
                        return '';
                    return 'T' + moment.constructor.patterns['hh'](moment);
                },
                'hh': function (moment) {
                    if (moment.hour == null)
                        return '';
                    return (moment.hour < 10)
                        ? ('0' + moment.hour)
                        : String(moment.hour);
                },
                'h': function (moment) {
                    if (moment.hour == null)
                        return '';
                    return String(moment.hour);
                },
                ':mm': function (moment) {
                    if (moment.minute == null)
                        return '';
                    return ':' + moment.constructor.patterns['mm'](moment);
                },
                'mm': function (moment) {
                    if (moment.minute == null)
                        return '';
                    return (moment.minute < 10)
                        ? ('0' + moment.minute)
                        : String(moment.minute);
                },
                'm': function (moment) {
                    if (moment.minute == null)
                        return '';
                    return String(moment.minute);
                },
                ':ss': function (moment) {
                    if (moment.second == null)
                        return '';
                    return ':' + moment.constructor.patterns['ss'](moment);
                },
                'ss': function (moment) {
                    if (moment.second == null)
                        return '';
                    var second = Math.floor(moment.second);
                    return (second < 10)
                        ? ('0' + second)
                        : String(second);
                },
                's': function (moment) {
                    if (moment.second == null)
                        return '';
                    return String(Math.floor(moment.second));
                },
                '.sss': function (moment) {
                    if (moment.second == null)
                        return '';
                    if (moment.second - Math.floor(moment.second) === 0)
                        return '';
                    return '.' + moment.constructor.patterns['sss'](moment);
                },
                'sss': function (moment) {
                    if (moment.second == null)
                        return '';
                    var millisecond = Math.floor((moment.second - Math.floor(moment.second)) * 1000);
                    return (millisecond < 10)
                        ? ('00' + millisecond)
                        : (millisecond < 100)
                            ? ('0' + millisecond)
                            : String(millisecond);
                },
                'Z': function (moment) {
                    var offset = moment.offset;
                    if (!offset)
                        return '';
                    return offset.toString('+hh:mm');
                }
            };
            moment_class.monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            moment_class.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            moment_class.weekDayLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            moment_class.weekDayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return moment_class;
        }($jin.time.base_class));
        time.moment_class = moment_class;
        time.moment = moment_class.make.bind(moment_class);
        time.moment['en'] = moment_class.make.bind(moment_class);
        var moment_class_ru = (function (_super) {
            __extends(moment_class_ru, _super);
            function moment_class_ru() {
                _super.apply(this, arguments);
            }
            moment_class_ru.monthLong = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            moment_class_ru.monthShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
            moment_class_ru.weekDayLong = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            moment_class_ru.weekDayShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            return moment_class_ru;
        }(moment_class));
        time.moment_class_ru = moment_class_ru;
        time.moment['ru'] = moment_class_ru.make.bind(moment_class_ru);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//# sourceMappingURL=moment.js.map
;
function $mol_log(path, values) {
    var filter = $mol_log.filter();
    if (filter == null)
        return;
    if (path.indexOf(filter) === -1)
        return;
    console.log.apply(console, [$jin.time.moment().toString('hh:mm:ss'), path].concat(values));
}
var $mol_log;
(function ($mol_log) {
    var _filter;
    function filter() {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] !== void 0) {
            if (diff[0] == null) {
                sessionStorage.removeItem('$mol_log.filter()');
            }
            else {
                sessionStorage.setItem('$mol_log.filter()', diff[0]);
            }
            _filter = diff[0];
        }
        if (_filter !== void 0)
            return _filter;
        return _filter = sessionStorage.getItem('$mol_log.filter()');
    }
    $mol_log.filter = filter;
})($mol_log || ($mol_log = {}));
//# sourceMappingURL=log.js.map
;
var $mol_object = (function () {
    function $mol_object() {
        this['destroyed()'] = false;
    }
    $mol_object.objectPath = function () {
        return this['name']
            || this['displayName']
            || (this['displayName'] = Function.prototype.toString.call(this).match(/^function ([a-z0-9_$]*)/)[1]);
    };
    $mol_object.prototype.objectClassNames = function () {
        if (this.hasOwnProperty('objectClassNames()'))
            return this['objectClassNames()'];
        var names = [];
        var current = this;
        while (typeof current === 'object') {
            if (!current.constructor['objectPath'])
                break;
            var name = current.constructor['objectPath']();
            if (!name)
                continue;
            names.push(name);
            if (current === null)
                break;
            current = Object.getPrototypeOf(current);
        }
        return this['objectClassNames()'] = names;
    };
    $mol_object.prototype.objectOwner = function (next) {
        if (this['objectOwner()'])
            return this['objectOwner()'];
        return this['objectOwner()'] = next;
    };
    $mol_object.prototype.objectField = function (next) {
        if (this['objectField()'])
            return this['objectField()'] || '';
        return this['objectField()'] = next;
    };
    $mol_object.prototype.objectPath = function (next) {
        var path = '';
        var owner = this.objectOwner();
        if (owner)
            path = owner.objectPath();
        var field = this.objectField();
        if (field)
            path += '.' + field;
        return path;
    };
    $mol_object.prototype.setup = function (script) {
        script(this);
        return this;
    };
    $mol_object.prototype.destroyed = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] === void 0)
            return this['destroyed()'];
        this['destroyed()'] = diff[0];
        this.log(['.destroyed()', diff[0]]);
        return diff[0];
    };
    $mol_object.prototype.log = function (values) {
        if ($mol_log.filter() == null)
            return;
        $mol_log(this.objectPath(), values);
    };
    $mol_object.toString = function () {
        return this.objectPath();
    };
    $mol_object.prototype.toString = function () {
        return this.objectPath();
    };
    return $mol_object;
}());
//# sourceMappingURL=object.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function () {
            return 1;
        };
        return X;
    }($mol_object));
    var x = new X().setup(function (obj) {
        obj.foo = function () { return 2; };
    });
    test.equal(x.foo(), 2);
});
$mol_test(function (test) {
    var x = new $mol_object;
    test.equal(x.objectPath(), '');
    x.objectField('foo()');
    test.equal(x.objectPath(), '.foo()');
    x.objectField('bar()');
    test.equal(x.objectPath(), '.foo()');
});
//# sourceMappingURL=object.stage=test.js.map
;
var $mol_set_shim = (function () {
    function $mol_set_shim() {
        this._index = {};
        this.size = 0;
    }
    $mol_set_shim.prototype.add = function (value) {
        var key = String(value);
        var list = this._index[key];
        if (list) {
            if (list.indexOf(value) !== -1)
                return this;
            list.push(value);
        }
        else {
            list = this._index[key] = [value];
        }
        ++this.size;
        return this;
    };
    $mol_set_shim.prototype.has = function (value) {
        var key = String(value);
        var list = this._index[key];
        if (!list)
            return false;
        return list.indexOf(value) !== -1;
    };
    $mol_set_shim.prototype.delete = function (value) {
        var key = String(value);
        var list = this._index[key];
        if (!list)
            return;
        var index = list.indexOf(value);
        if (index === -1)
            return;
        list.splice(index, 1);
        --this.size;
    };
    $mol_set_shim.prototype.forEach = function (handle) {
        for (var key in this._index) {
            if (!this._index.hasOwnProperty(key))
                continue;
            this._index[key].forEach(function (val, index) { return handle(val, val); });
        }
    };
    $mol_set_shim.prototype.keys = function () {
        var keys = [];
        this.forEach(function (val, key) {
            keys.push(key);
        });
        return keys;
    };
    $mol_set_shim.prototype.values = function () {
        var values = [];
        this.forEach(function (val, key) {
            values.push(val);
        });
        return values;
    };
    $mol_set_shim.prototype.entries = function () {
        var entries = [];
        this.forEach(function (val, key) {
            entries.push([val, key]);
        });
        return entries;
    };
    $mol_set_shim.prototype.clear = function () {
        this._index = {};
        this.size = 0;
    };
    return $mol_set_shim;
}());
//# sourceMappingURL=set.js.map
;
$mol_test(function (test) {
    var set = new $mol_set_shim;
    var obj1 = {};
    var obj2 = {};
    var obj3 = {};
    set.add(obj1);
    set.add(obj2);
    test.equal(set.size, 2);
    test.ok(set.has(obj1));
    test.ok(set.has(obj2));
    test.not(set.has(obj3));
    var entries = set.entries();
    test.equal(entries.length, 2);
    test.equal(entries[0][0], obj1);
    test.equal(entries[0][1], obj1);
    test.equal(entries[1][0], obj2);
    test.equal(entries[1][1], obj2);
    set.delete(obj2);
    test.not(set.has(obj2));
});
//# sourceMappingURL=set.stage=test.js.map
;
var $mol_set = ( typeof Set === 'function' ) ? Set : $mol_set_shim

;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_defer = (function (_super) {
    __extends($mol_defer, _super);
    function $mol_defer(run) {
        _super.call(this);
        this.run = run;
        $mol_defer.add(this);
    }
    $mol_defer.prototype.destroyed = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0])
            $mol_defer.drop(this);
        return _super.prototype.destroyed.apply(this, diff);
    };
    $mol_defer.schedule = function () {
        if (this.scheduled)
            return;
        this.scheduled = true;
        this.nativeSchedule();
    };
    $mol_defer.onSchedule = function () {
        this.scheduled = false;
        this.run();
    };
    $mol_defer.add = function (defer) {
        this.all.push(defer);
        this.schedule();
    };
    $mol_defer.drop = function (defer) {
        var index = this.all.indexOf(defer);
        if (index >= 0)
            this.all.splice(index, 1);
    };
    $mol_defer.run = function () {
        if (this.all.length === 0)
            return;
        this.schedule();
        for (var defer; defer = this.all.pop();)
            defer.run();
    };
    $mol_defer.all = [];
    $mol_defer.scheduled = false;
    return $mol_defer;
}($mol_object));
switch ('function') {
    case typeof setImmediate:
        $mol_defer.nativeSchedule = function () { return setImmediate(function () { return $mol_defer.onSchedule(); }); };
        break;
    case typeof postMessage:
        addEventListener('message', function (event) {
            if (event.data !== '$mol_defer')
                return;
            $mol_defer.onSchedule();
        });
        $mol_defer.nativeSchedule = function () { return postMessage('$mol_defer', '*'); };
        break;
    default:
        $mol_defer.nativeSchedule = function () { return setTimeout(function () { return $mol_defer.onSchedule(); }); };
        break;
}
//# sourceMappingURL=defer.js.map
;
var $mol_dict_shim = (function () {
    function $mol_dict_shim() {
        this._keys = {};
        this._values = {};
        this.size = 0;
    }
    $mol_dict_shim.prototype.set = function (key, value) {
        var keyStr = String(key);
        var keys = this._keys[keyStr];
        if (keys) {
            var index = keys.indexOf(key);
            if (index === -1) {
                index = keys.length;
                keys.push(key);
                ++this.size;
            }
            this._values[keyStr][index] = value;
        }
        else {
            this._keys[keyStr] = [key];
            this._values[keyStr] = [value];
            ++this.size;
        }
        return this;
    };
    $mol_dict_shim.prototype.get = function (key) {
        var keyStr = String(key);
        var list = this._keys[keyStr];
        if (!list)
            return void 0;
        var index = list.indexOf(key);
        if (index === -1)
            return void 0;
        return this._values[keyStr][index];
    };
    $mol_dict_shim.prototype.has = function (key) {
        var keyStr = String(key);
        var list = this._keys[keyStr];
        if (!list)
            return false;
        return list.indexOf(key) !== -1;
    };
    $mol_dict_shim.prototype.delete = function (key) {
        var keyStr = String(key);
        var keys = this._keys[keyStr];
        if (!keys)
            return;
        var index = keys.indexOf(key);
        if (index === -1)
            return;
        keys.splice(index, 1);
        this._values[keyStr].splice(index, 1);
        --this.size;
    };
    $mol_dict_shim.prototype.forEach = function (handle) {
        for (var keyStr in this._keys) {
            if (!this._keys.hasOwnProperty(keyStr))
                continue;
            var values = this._values[keyStr];
            this._keys[keyStr].forEach(function (key, index) {
                handle(values[index], key);
            });
        }
    };
    $mol_dict_shim.prototype.keys = function () {
        var keys = [];
        this.forEach(function (val, key) {
            keys.push(key);
        });
        return keys;
    };
    $mol_dict_shim.prototype.values = function () {
        var values = [];
        this.forEach(function (val, key) {
            values.push(val);
        });
        return values;
    };
    $mol_dict_shim.prototype.entries = function () {
        var entries = [];
        this.forEach(function (val, key) {
            entries.push([val, key]);
        });
        return entries;
    };
    $mol_dict_shim.prototype.clear = function () {
        this._keys = {};
        this._values = {};
        this.size = 0;
    };
    return $mol_dict_shim;
}());
//# sourceMappingURL=dict.js.map
;
$mol_test(function (test) {
    var dict = new $mol_dict_shim;
    var obj1 = {};
    var obj2 = {};
    var obj3 = {};
    dict.set(obj1, 1);
    dict.set(obj2, 2);
    test.equal(dict.size, 2);
    test.ok(dict.has(obj1));
    test.ok(dict.has(obj2));
    test.not(dict.has(obj3));
    test.equal(dict.get(obj1), 1);
    test.equal(dict.get(obj2), 2);
    test.equal(dict.get(obj3), void 0);
    var entries = dict.entries();
    test.equal(entries.length, 2);
    test.equal(entries[0][0], 1);
    test.equal(entries[0][1], obj1);
    test.equal(entries[1][0], 2);
    test.equal(entries[1][1], obj2);
    dict.delete(obj2);
    test.not(dict.has(obj2));
});
//# sourceMappingURL=dict.stage=test.js.map
;
var $mol_dict = ( typeof Map === 'function' ) ? Map : $mol_dict_shim

;
var $mol_state_stack = new $mol_dict();
//# sourceMappingURL=stack.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_atom = (function (_super) {
    __extends($mol_atom, _super);
    function $mol_atom(host, field, handler, fail, key) {
        _super.call(this);
        this.host = host;
        this.field = field;
        this.handler = handler;
        this.fail = fail;
        this.key = key;
        this.mastersDeep = 0;
        this.planned = false;
    }
    $mol_atom.prototype.destroyed = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0]) {
            this.unlink();
            var value = this.host[this.field];
            if (value instanceof $mol_object) {
                if ((value.objectOwner() === this.host) && (value.objectField() === this.field)) {
                    value.destroyed(true);
                }
            }
            this.host[this.field] = void 0;
            this.host['$mol_atom_state'][this.field] = void 0;
            this['destroyed()'] = true;
            this.log(['.destroyed()', true, 'atom']);
            return true;
        }
        else {
            return this['destroyed()'];
        }
    };
    $mol_atom.prototype.unlink = function () {
        this.disobeyAll();
        this.notifySlaves();
    };
    $mol_atom.prototype.objectPath = function () {
        return this.host.objectPath() + '.' + this.field;
    };
    $mol_atom.prototype.get = function () {
        if ($mol_atom.stack.indexOf(this) !== -1) {
            throw new Error('Recursive dependency! ' + this.objectPath());
        }
        var slave = $mol_atom.stack[$mol_atom.stack.length - 1];
        if (slave)
            this.lead(slave);
        if (slave)
            slave.obey(this);
        var value = this.host[this.field];
        if (value === void 0) {
            value = this.pull();
        }
        if (value instanceof Error)
            throw value;
        else
            return value;
    };
    $mol_atom.prototype.pull = function () {
        var _this = this;
        this.log(['pull']);
        if (this.planned) {
            var level = $mol_atom.plan[this.mastersDeep];
            if (level) {
                var index = level.indexOf(this);
                if (index !== -1)
                    level.splice(index, 1);
            }
            this.planned = false;
        }
        var oldMasters = this.masters;
        if (oldMasters)
            oldMasters.forEach(function (master) {
                master.dislead(_this);
            });
        this.masters = null;
        this.mastersDeep = 0;
        var index = $mol_atom.stack.length;
        $mol_atom.stack.push(this);
        if (this.key !== void 0) {
            var next = this.handler.call(this.host, this.key);
        }
        else {
            var next = this.handler.call(this.host);
        }
        if (next === void 0)
            next = this.host[this.field];
        $mol_atom.stack.length = index;
        return this.push(next);
    };
    $mol_atom.prototype.set = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (this.key !== void 0) {
            var next = (_a = this.handler).call.apply(_a, [this.host, this.key].concat(diff));
        }
        else {
            var next = (_b = this.handler).call.apply(_b, [this.host].concat(diff));
        }
        if (next === void 0)
            return this.host[this.field];
        return this.push(next);
        var _a, _b;
    };
    $mol_atom.prototype.push = function (next) {
        var prev = this.host[this.field];
        if (next instanceof Error && this.fail) {
            if (this.key !== void 0) {
                next = this.fail.call(this.host, this.key, this.host, next);
            }
            else {
                next = this.fail.call(this.host, this.host, next);
            }
        }
        if (prev !== next) {
            if (next instanceof $mol_object) {
                next['objectField'](this.field);
                next['objectOwner'](this.host);
            }
            this.host[this.field] = next;
            this.log(['push', next, prev]);
            this.notifySlaves();
        }
        return next;
    };
    $mol_atom.prototype.notifySlaves = function () {
        if (this.slaves) {
            this.slaves.forEach(function (slave) {
                if ($mol_atom.stack[$mol_atom.stack.length - 1] === slave)
                    return;
                slave.update();
            });
        }
    };
    $mol_atom.prototype.update = function () {
        if (this.planned)
            return;
        this.planned = true;
        this.log(['update']);
        $mol_atom.actualize(this);
        return void 0;
    };
    $mol_atom.prototype.lead = function (slave) {
        if (!this.slaves)
            this.slaves = new $mol_set();
        this.slaves.add(slave);
    };
    $mol_atom.prototype.dislead = function (slave) {
        if (!this.slaves)
            return;
        this.slaves.delete(slave);
        if (!this.slaves.size) {
            this.slaves = null;
            $mol_atom.reaping.add(this);
        }
    };
    $mol_atom.prototype.obey = function (master) {
        if (!this.masters)
            this.masters = new $mol_set();
        this.masters.add(master);
        var masterDeep = master.mastersDeep;
        if (this.mastersDeep <= masterDeep) {
            this.mastersDeep = masterDeep + 1;
        }
    };
    $mol_atom.prototype.disobey = function (master) {
        if (!this.masters)
            return;
        this.masters.delete(master);
        if (!this.masters.size)
            this.masters = null;
    };
    $mol_atom.prototype.disobeyAll = function () {
        var _this = this;
        if (!this.masters)
            return;
        this.masters.forEach(function (master) { return master.dislead(_this); });
        this.masters = null;
        this.mastersDeep = 0;
    };
    $mol_atom.prototype.value = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] === void 0) {
            if (diff.length > 1)
                return this.push(diff[1]);
            if (diff.length > 0)
                return this.update();
            return this.get();
        }
        else {
            return this.set.apply(this, diff);
        }
    };
    $mol_atom.actualize = function (atom) {
        var deep = atom.mastersDeep;
        var plan = $mol_atom.plan;
        var level = plan[deep];
        if (!level)
            level = plan[deep] = [];
        level.push(atom);
        if (deep < this.planStart)
            this.planStart = deep;
        $mol_atom.schedule();
    };
    $mol_atom.schedule = function () {
        var _this = this;
        if (this.scheduled)
            return;
        new $mol_defer(function () {
            if (!_this.scheduled)
                return;
            _this.scheduled = false;
            _this.sync();
        });
        this.scheduled = true;
    };
    $mol_atom.sync = function () {
        var _this = this;
        $mol_log('$mol_atom.sync', []);
        this.schedule();
        for (var i = this.planStart; i < this.plan.length; ++i) {
            var level = this.plan[i];
            if (!level)
                continue;
            if (level.length === 0)
                continue;
            var atom = level.pop();
            if (!atom.destroyed()) {
                atom.planned = false;
                atom.pull();
            }
            i = this.planStart - 1;
        }
        this.reaping.forEach(function (atom) {
            _this.reaping.delete(atom);
            if (!atom.slaves)
                atom.destroyed(true);
        });
        this.scheduled = false;
    };
    $mol_atom.restore = function () {
        this.stack.splice(0, this.stack.length);
    };
    $mol_atom.stack = [];
    $mol_atom.plan = [];
    $mol_atom.planStart = 0;
    $mol_atom.reaping = new $mol_set();
    $mol_atom.scheduled = false;
    return $mol_atom;
}($mol_object));
$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
var $mol_atom_wait = (function (_super) {
    __extends($mol_atom_wait, _super);
    function $mol_atom_wait(message) {
        if (message === void 0) { message = 'Wait...'; }
        _super.call(this, message);
        this.message = message;
        this.name = '$mol_atom_wait';
    }
    return $mol_atom_wait;
}(Error));
//# sourceMappingURL=atom.js.map
;
window.addEventListener('error', function (event) {
    var error = event.error;
    var stack = $mol_atom.stack;
    if (error instanceof $mol_atom_wait) {
        event.preventDefault();
    }
    while (stack.length) {
        var atom = stack.pop();
        if (error instanceof Error) {
            error = atom.push(error);
        }
    }
});
//# sourceMappingURL=atom.env=web.js.map
;
function $mol_maybe(value) {
    return (value == null) ? [] : [value];
}
//# sourceMappingURL=maybe.js.map
;
$mol_test(function (test) {
    test.equal($mol_maybe(0)[0], 0);
    test.equal($mol_maybe(false)[0], false);
    test.equal($mol_maybe(null)[0], void 0);
    test.equal($mol_maybe(void 0)[0], void 0);
    test.equal($mol_maybe(void 0).map(function (v) { return v.toString(); })[0], void 0);
    test.equal($mol_maybe(0).map(function (v) { return v.toString(); })[0], '0');
});
//# sourceMappingURL=maybe.stage=test.js.map
;
function $mol_prop(config) {
    return function (obj, name, descr) {
        var value = descr.value;
        if (value.length) {
            descr.value = function (key) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                var host = this;
                var field = name + "(" + JSON.stringify(key) + ")";
                var atoms = host['$mol_atom_state'];
                if (!atoms)
                    atoms = host['$mol_atom_state'] = {};
                var info = atoms[field];
                if (!info)
                    atoms[field] = info = new $mol_atom(host, field, value, config && config.fail, key);
                return info.value.apply(info, diff);
            };
        }
        else {
            descr.value = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var host = this;
                var field = name + "()";
                var atoms = host['$mol_atom_state'];
                if (!atoms)
                    atoms = host['$mol_atom_state'] = {};
                var info = atoms[field];
                if (!info)
                    atoms[field] = info = new $mol_atom(host, field, value, config && config.fail);
                return info.value.apply(info, diff);
            };
        }
        descr.value['value'] = value;
    };
}
//# sourceMappingURL=prop.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function (id) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            if (diff[0] === void 0)
                return new Number(123);
            return new Number(diff[0]);
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        return X;
    }($mol_object));
    var x = new X;
    test.equal(x.foo(0).valueOf(), 123);
    test.equal(x.foo(0), x.foo(0));
    test.unique(x.foo(0), x.foo(1));
    x.foo(0, 321);
    test.equal(x.foo(0).valueOf(), 321);
    x.foo(0, void 0);
    $mol_defer.run();
    test.equal(x.foo(0).valueOf(), 123);
});
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function (ids) {
            return Math.random();
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        return X;
    }($mol_object));
    var x = new X;
    test.equal(x.foo([0, 1]), x.foo([0, 1]));
    test.unique(x.foo([0, 1]), x.foo([0, 2]));
});
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return diff[0] || 1;
        };
        X.prototype.bar = function () {
            return this.foo() + 1;
        };
        X.prototype.xxx = function () {
            return this.bar() + 1;
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        __decorate([
            $mol_prop()
        ], X.prototype, "bar", null);
        __decorate([
            $mol_prop()
        ], X.prototype, "xxx", null);
        return X;
    }($mol_object));
    var x = new X;
    test.equal(x.bar(), 2);
    test.equal(x.xxx(), 3);
    x.foo(5);
    test.equal(x.bar(), 2);
    test.equal(x.xxx(), 3);
    $mol_defer.run();
    test.equal(x.bar(), 6);
    test.equal(x.xxx(), 7);
});
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function () {
            return this.foo() + 1;
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        return X;
    }($mol_object));
    var x = new X;
    try {
        x.foo();
        test.fail('Not tracked recursive dependency');
    }
    catch (error) {
        $mol_atom.restore();
        test.equal(error.message, 'Recursive dependency! .foo()');
    }
});
$mol_test(function (test) {
    var foo;
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        B.prototype.showing = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff[0] === void 0)
                return true;
            return diff[0];
        };
        B.prototype.foo = function () {
            return foo = new $mol_object;
        };
        B.prototype.bar = function () {
            return this.showing() ? this.foo() : null;
        };
        __decorate([
            $mol_prop()
        ], B.prototype, "showing", null);
        __decorate([
            $mol_prop()
        ], B.prototype, "foo", null);
        __decorate([
            $mol_prop()
        ], B.prototype, "bar", null);
        return B;
    }($mol_object));
    var b = new B;
    var bar = b.bar();
    test.ok(bar);
    b.showing(false);
    $mol_defer.run();
    test.ok(foo.destroyed());
    test.ok(bar.destroyed());
    test.not(b.bar());
    b.showing(true);
    $mol_defer.run();
    test.unique(b.bar(), bar);
});
//# sourceMappingURL=prop.stage=test.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $mol_state_local = (function (_super) {
    __extends($mol_state_local, _super);
    function $mol_state_local() {
        _super.apply(this, arguments);
    }
    $mol_state_local.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        if (diff[0] === void 0)
            return JSON.parse(localStorage.getItem(key) || 'null');
        if (diff[0] === null)
            localStorage.removeItem(key);
        else
            localStorage.setItem(key, JSON.stringify(diff[0]));
        return diff[0];
    };
    $mol_state_local.prototype.prefix = function () { return ''; };
    $mol_state_local.prototype.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this.prefix() + '.' + key].concat(diff));
    };
    __decorate([
        $mol_prop()
    ], $mol_state_local, "value", null);
    return $mol_state_local;
}($mol_object));
window.addEventListener('storage', function (event) { return $mol_state_local.value(event.key, void 0); });
//# sourceMappingURL=local.js.map
;
$mol_test(function (test) {
    var key = '$mol_state_local_test:' + Math.random();
    test.equal($mol_state_local.value(key), null);
    $mol_state_local.value(key, 123);
    test.equal($mol_state_local.value(key), 123);
    $mol_state_local.value(key, null);
    test.equal($mol_state_local.value(key), null);
});
//# sourceMappingURL=local.stage=test.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $mol_state_session = (function (_super) {
    __extends($mol_state_session, _super);
    function $mol_state_session() {
        _super.apply(this, arguments);
    }
    $mol_state_session.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        if (diff[0] === void 0)
            return JSON.parse(sessionStorage.getItem(key) || 'null');
        if (diff[0] === null)
            localStorage.removeItem(key);
        else
            sessionStorage.setItem(key, JSON.stringify(diff[0]));
        return diff[0];
    };
    $mol_state_session.prototype.prefix = function () { return ''; };
    $mol_state_session.prototype.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this.prefix() + '.' + key].concat(diff));
    };
    __decorate([
        $mol_prop()
    ], $mol_state_session, "value", null);
    return $mol_state_session;
}($mol_object));
//# sourceMappingURL=session.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $mol_state_arg = (function (_super) {
    __extends($mol_state_arg, _super);
    function $mol_state_arg(prefix) {
        if (prefix === void 0) { prefix = ''; }
        _super.call(this);
        this.prefix = prefix;
    }
    $mol_state_arg.href = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] !== void 0)
            history.replaceState(null, document.title, diff[0]);
        return window.location.search + window.location.hash;
    };
    $mol_state_arg.dict = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] !== void 0)
            this.href(this.make(diff[0]));
        var href = this.href();
        var chunks = href.split(/[\/\?#!&;]/g);
        var params = {};
        chunks.forEach(function (chunk) {
            if (!chunk)
                return;
            var vals = chunk.split(/[:=]/).map(decodeURIComponent);
            params[vals.shift()] = vals;
        });
        return params;
    };
    $mol_state_arg.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        if (diff[0] === void 0)
            return this.dict()[key] || null;
        this.href(this.link((_a = {}, _a[key] = diff[0], _a)));
        return diff[0];
        var _a;
    };
    $mol_state_arg.link = function (next) {
        var params = {};
        var prev = this.dict();
        for (var key in prev) {
            params[key] = prev[key];
        }
        for (var key in next) {
            params[key] = next[key];
        }
        return this.make(params);
    };
    $mol_state_arg.make = function (next) {
        var chunks = [];
        for (var key in next) {
            if (null == next[key])
                continue;
            chunks.push([key].concat(next[key]).map(encodeURIComponent).join('='));
        }
        return '#' + chunks.join('#');
    };
    $mol_state_arg.prototype.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_arg.value.apply($mol_state_arg, [this.prefix + key].concat(diff));
    };
    $mol_state_arg.prototype.sub = function (postfix) {
        return new $mol_state_arg(this.prefix + postfix + '.');
    };
    $mol_state_arg.prototype.link = function (next) {
        var prefix = this.prefix;
        var dict = {};
        for (var key in next) {
            dict[prefix + key] = next[key];
        }
        return $mol_state_arg.link(dict);
    };
    __decorate([
        $mol_prop()
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_prop()
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_prop()
    ], $mol_state_arg, "value", null);
    return $mol_state_arg;
}($mol_object));
window.addEventListener('hashchange', function (event) { return $mol_state_arg.href(void 0); });
//# sourceMappingURL=arg.env=web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_model = (function (_super) {
    __extends($mol_model, _super);
    function $mol_model() {
        _super.apply(this, arguments);
    }
    $mol_model.session = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_session.value.apply($mol_state_session, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.session = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_session.value.apply($mol_state_session, [this + "." + key].concat(diff));
    };
    $mol_model.local = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.local = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this + "." + key].concat(diff));
    };
    $mol_model.argument = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_arg.value.apply($mol_state_arg, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.argument = function () {
        var owner = this.objectOwner();
        if (owner instanceof $mol_model)
            return owner.argument();
        return new $mol_state_arg;
    };
    return $mol_model;
}($mol_object));
//# sourceMappingURL=model.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $mol_viewer_selection = (function (_super) {
    __extends($mol_viewer_selection, _super);
    function $mol_viewer_selection() {
        _super.apply(this, arguments);
    }
    $mol_viewer_selection.focused = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        return diff[0] || null;
    };
    $mol_viewer_selection.position = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff.length) {
            if (!diff[0])
                return diff[0];
            var start = diff[0].start;
            var end = diff[0].end;
            if (!(start <= end))
                throw new Error("Wrong offsets (" + start + "," + end + ")");
            var root = document.getElementById(diff[0].id);
            root.focus();
            var range = new Range;
            var cur = root.firstChild;
            while (cur !== root) {
                while (cur.firstChild)
                    cur = cur.firstChild;
                if (cur.nodeValue) {
                    var length = cur.nodeValue.length;
                    if (length >= start)
                        break;
                    start -= length;
                }
                while (!cur.nextSibling) {
                    cur = cur.parentNode;
                    if (cur === root) {
                        start = root.childNodes.length;
                        break;
                    }
                }
            }
            range.setStart(cur, start);
            var cur = root.firstChild;
            while (cur !== root) {
                while (cur.firstChild)
                    cur = cur.firstChild;
                if (cur.nodeValue) {
                    var length = cur.nodeValue.length;
                    if (length >= end)
                        break;
                    end -= length;
                }
                while (!cur.nextSibling) {
                    cur = cur.parentNode;
                    if (cur === root) {
                        end = root.childNodes.length;
                        break;
                    }
                }
            }
            range.setEnd(cur, end);
            var sel = document.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            return diff[0];
        }
        else {
            var sel = document.getSelection();
            if (sel.rangeCount === 0)
                return null;
            var range = sel.getRangeAt(0);
            var el = range.commonAncestorContainer;
            while (el && !el.id)
                el = el.parentElement;
            if (!el)
                return { id: null, start: 0, end: 0 };
            var meter = new Range;
            meter.selectNodeContents(el);
            meter.setEnd(range.startContainer, range.startOffset);
            var startOffset = meter.toString().length;
            meter.setEnd(range.endContainer, range.endOffset);
            var endOffset = meter.toString().length;
            return { id: el.id, start: startOffset, end: endOffset };
        }
    };
    __decorate([
        $mol_prop()
    ], $mol_viewer_selection, "focused", null);
    __decorate([
        $mol_prop()
    ], $mol_viewer_selection, "position", null);
    return $mol_viewer_selection;
}($mol_object));
document.addEventListener('selectionchange', function (event) {
    $mol_viewer_selection.position(void 0);
});
document.addEventListener('focusin', function (event) {
    $mol_viewer_selection.focused(event.srcElement);
});
document.addEventListener('focusout', function (event) {
    $mol_viewer_selection.focused(null);
});
//# sourceMappingURL=selection.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
$mol_maybe;
var $mol_viewer = (function (_super) {
    __extends($mol_viewer, _super);
    function $mol_viewer() {
        _super.apply(this, arguments);
    }
    $mol_viewer.root = function (id) {
        return new this;
    };
    $mol_viewer.prototype.tagName = function () { return 'div'; };
    $mol_viewer.prototype.nameSpace = function () { return 'http://www.w3.org/1999/xhtml'; };
    $mol_viewer.prototype.childs = function () {
        return null;
    };
    $mol_viewer.prototype.childsInner = function () { return this.childs(); };
    $mol_viewer.prototype.DOMNode = function () {
        var _this = this;
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        var path = this.objectPath();
        var next = diff[0];
        if (!next) {
            next = this['DOMNode()'];
            if (next)
                return next;
            next = document.getElementById(path);
            if (!next) {
                next = document.createElementNS(this.nameSpace(), this.tagName());
            }
        }
        next.id = path;
        next['$mol_viewer'] = this;
        this['DOMNode()'] = next;
        var ownerProto = this.objectOwner() && Object.getPrototypeOf(this.objectOwner());
        if (ownerProto && ownerProto['objectClassNames']) {
            for (var _a = 0, _b = ownerProto['objectClassNames'](); _a < _b.length; _a++) {
                var className = _b[_a];
                var attrName = className.replace(/\$/g, '') + '_' + this.objectField().replace(/\(.*/, '');
                next.setAttribute(attrName, '');
                if (className === '$mol_viewer')
                    break;
            }
        }
        var proto = Object.getPrototypeOf(this);
        for (var _c = 0, _d = proto['objectClassNames'](); _c < _d.length; _c++) {
            var className = _d[_c];
            next.setAttribute(className.replace(/\$/g, ''), '');
            if (className === '$mol_viewer')
                break;
        }
        this.event_keys().forEach(function (name) {
            next.addEventListener(name, function (event) {
                _this.event(name, event);
                $mol_defer.run();
            });
        });
        this.DOMNodeState(void 0);
        this.DOMNodeContent(void 0);
        return next;
    };
    $mol_viewer.prototype.DOMNodeContent = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        var node = this.DOMNode();
        var childs = this.childsInner();
        if (childs != null) {
            var childViews = childs;
            var nextNode = node.firstChild;
            for (var i = 0; i < childViews.length; ++i) {
                var view = childViews[i];
                if (view == null)
                    continue;
                if (typeof view === 'object') {
                    var existsNode = (view instanceof $mol_viewer) ? view.DOMNode() : view;
                    while (true) {
                        if (!nextNode) {
                            node.appendChild(existsNode);
                            break;
                        }
                        if (nextNode == existsNode) {
                            nextNode = nextNode.nextSibling;
                            break;
                        }
                        else {
                            node.insertBefore(existsNode, nextNode);
                            break;
                        }
                    }
                }
                else {
                    if (nextNode && nextNode.nodeName === '#text') {
                        nextNode.nodeValue = String(view);
                        nextNode = nextNode.nextSibling;
                    }
                    else {
                        var textNode = document.createTextNode(String(view));
                        node.insertBefore(textNode, nextNode);
                    }
                }
            }
            while (nextNode) {
                var currNode = nextNode;
                nextNode = currNode.nextSibling;
                node.removeChild(currNode);
            }
        }
        return null;
    };
    $mol_viewer.prototype.DOMNodeState = function () {
        var _this = this;
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        var childs = this.DOMNodeContent();
        var node = this.DOMNode();
        this.attr_keys().forEach(function (name) {
            var n = _this.attr(name);
            if ((n == null) || (n === false)) {
                node.removeAttribute(name);
            }
            else if (n === true) {
                node.setAttribute(name, name);
            }
            else {
                node.setAttribute(name, String(n));
            }
        });
        this.field_keys().forEach(function (path) {
            var names = path.split('.');
            var obj = node;
            for (var i = 0; i < names.length - 1; ++i) {
                if (names[i])
                    obj = obj[names[i]];
            }
            var field = names[names.length - 1];
            var val = _this.field(path);
            if (obj[field] !== val)
                obj[field] = val;
        });
        return null;
    };
    $mol_viewer.prototype.attr_keys = function () { return ['mol_viewer_error']; };
    $mol_viewer.prototype.attr = function (name) {
        if (name === 'mol_viewer_error')
            return false;
        return '';
    };
    $mol_viewer.prototype.event_keys = function () { return []; };
    $mol_viewer.prototype.event = function (name) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return null;
    };
    $mol_viewer.prototype.field_keys = function () { return []; };
    $mol_viewer.prototype.field = function (path) { return null; };
    $mol_viewer.prototype.focused = function () {
        return $mol_viewer_selection.focused() === this.DOMNode();
    };
    $mol_viewer.prototype.destroyed = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0]) {
            var atoms = this['$mol_atom_state'];
            if (atoms) {
                for (var key in atoms) {
                    if (!atoms.hasOwnProperty(key))
                        continue;
                    if (!atoms[key])
                        continue;
                    atoms[key].destroyed(true);
                }
            }
        }
        return _super.prototype.destroyed.apply(this, diff);
    };
    __decorate([
        $mol_prop()
    ], $mol_viewer.prototype, "DOMNodeContent", null);
    __decorate([
        $mol_prop({
            fail: function (self, error) {
                var node = self.DOMNode();
                if (node) {
                    node.setAttribute('mol_viewer_error', error.name);
                }
                return error;
            }
        })
    ], $mol_viewer.prototype, "DOMNodeState", null);
    __decorate([
        $mol_prop()
    ], $mol_viewer, "root", null);
    return $mol_viewer;
}($mol_model));
document.addEventListener('DOMContentLoaded', function (event) {
    var nodes = document.querySelectorAll('[mol_viewer_root]');
    for (var i = nodes.length - 1; i >= 0; --i) {
        var view = window['$'][nodes[i].getAttribute('mol_viewer_root')].root(i);
        view.DOMNode(nodes[i]);
    }
    $mol_defer.run();
});
//# sourceMappingURL=viewer.env=web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
$mol_test(function (test) {
    var $mol_viewer_test_item = (function (_super) {
        __extends($mol_viewer_test_item, _super);
        function $mol_viewer_test_item() {
            _super.apply(this, arguments);
        }
        return $mol_viewer_test_item;
    }($mol_viewer));
    var $mol_viewer_test_block = (function (_super) {
        __extends($mol_viewer_test_block, _super);
        function $mol_viewer_test_block() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test_block.prototype.element = function (id) {
            return new $mol_viewer_test_item();
        };
        __decorate([
            $mol_prop()
        ], $mol_viewer_test_block.prototype, "element", null);
        return $mol_viewer_test_block;
    }($mol_viewer));
    var x = new $mol_viewer_test_block();
    test.equal(x.DOMNode().id, '');
    test.equal(x.element(0).DOMNode().id, '.element(0)');
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    test.equal(x.DOMNode(), x.DOMNode());
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.childs = function () {
            return ['lol', 5];
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    var node = x.DOMNode();
    $mol_defer.run();
    test.equal(node.innerHTML, 'lol5');
});
$mol_test(function (test) {
    var $mol_viewer_test_item = (function (_super) {
        __extends($mol_viewer_test_item, _super);
        function $mol_viewer_test_item() {
            _super.apply(this, arguments);
        }
        return $mol_viewer_test_item;
    }($mol_viewer));
    var $mol_viewer_test_block = (function (_super) {
        __extends($mol_viewer_test_block, _super);
        function $mol_viewer_test_block() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test_block.prototype.element = function (id) {
            return new $mol_viewer_test_item();
        };
        __decorate([
            $mol_prop()
        ], $mol_viewer_test_block.prototype, "element", null);
        return $mol_viewer_test_block;
    }($mol_viewer));
    var x = new $mol_viewer_test_block();
    test.equal(x.DOMNode().getAttribute('mol_viewer_test_block'), '');
    test.equal(x.DOMNode().getAttribute('mol_viewer'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer_test_block_element'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer_element'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer_test_item'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer'), '');
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.attr_keys = function () {
            return _super.prototype.attr_keys.call(this).concat('href', 'required');
        };
        $mol_viewer_test.prototype.attr = function (name) {
            switch (name) {
                case 'href': return '#haha';
            }
            return _super.prototype.attr.call(this, name);
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    var node = x.DOMNode();
    $mol_defer.run();
    test.equal(node.getAttribute('href'), '#haha');
    test.equal(node.getAttribute('required'), '');
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.field_keys = function () {
            return _super.prototype.field_keys.call(this).concat('style.top');
        };
        $mol_viewer_test.prototype.field = function (name) {
            switch (name) {
                case 'style.top': return '10px';
            }
            return _super.prototype.field.call(this, name);
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    var node = x.DOMNode();
    $mol_defer.run();
    test.equal(node.style.top, '10px');
});
$mol_test(function (test) {
    var clicked = false;
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.event_keys = function () {
            return _super.prototype.event_keys.call(this).concat('click');
        };
        $mol_viewer_test.prototype.event = function (name) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (name) {
                case 'click': return this.eventClick.apply(this, diff);
            }
            return _super.prototype.event.apply(this, [name].concat(diff));
        };
        $mol_viewer_test.prototype.eventClick = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            clicked = true;
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    var node = x.DOMNode();
    node.click();
    test.ok(clicked);
});
//# sourceMappingURL=viewer.stage=test.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_stringer = (function (_super) {
        __extends($mol_stringer, _super);
        function $mol_stringer() {
            _super.apply(this, arguments);
        }
        $mol_stringer.prototype.tagName = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "input";
        };
        $mol_stringer.prototype.hint = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_stringer.prototype.type = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "text";
        };
        $mol_stringer.prototype.attr = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "placeholder": return this.hint.apply(this, diff);
                case "type": return this.type.apply(this, diff);
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_stringer.prototype.attr_keys = function () {
            return (_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []).concat(["placeholder", "type"]);
        };
        $mol_stringer.prototype.disabled = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (false);
        };
        $mol_stringer.prototype.value = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_stringer.prototype.valueChanged = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.value.apply(this, diff);
        };
        $mol_stringer.prototype.field = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "disabled": return this.disabled.apply(this, diff);
                case "value": return this.valueChanged.apply(this, diff);
                default: return _super.prototype["field"] && _super.prototype["field"].call(this, key);
            }
        };
        $mol_stringer.prototype.field_keys = function () {
            return (_super.prototype["field_keys"] && _super.prototype["field_keys"].call(this) || []).concat(["disabled", "value"]);
        };
        $mol_stringer.prototype.eventChange = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_stringer.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "input": return this.eventChange.apply(this, diff);
                default: return _super.prototype["event"] && _super.prototype["event"].call(this, key);
            }
        };
        $mol_stringer.prototype.event_keys = function () {
            return (_super.prototype["event_keys"] && _super.prototype["event_keys"].call(this) || []).concat(["input"]);
        };
        __decorate([
            $mol_prop()
        ], $mol_stringer.prototype, "eventChange", null);
        return $mol_stringer;
    }($mol_viewer));
    $.$mol_stringer = $mol_stringer;
})($ || ($ = {}));
//# sourceMappingURL=stringer.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_stringer = (function (_super) {
            __extends($mol_stringer, _super);
            function $mol_stringer() {
                _super.apply(this, arguments);
            }
            $mol_stringer.prototype.eventChange = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.value(diff[0].srcElement.value.trim());
            };
            return $mol_stringer;
        }($.$mol_stringer));
        $mol.$mol_stringer = $mol_stringer;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=stringer.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_scroller = (function (_super) {
        __extends($mol_scroller, _super);
        function $mol_scroller() {
            _super.apply(this, arguments);
        }
        $mol_scroller.prototype.scrollTop = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (0);
        };
        $mol_scroller.prototype.scrollLeft = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (0);
        };
        $mol_scroller.prototype.field = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "scrollTop": return this.scrollTop.apply(this, diff);
                case "scrollLeft": return this.scrollLeft.apply(this, diff);
                default: return _super.prototype["field"] && _super.prototype["field"].call(this, key);
            }
        };
        $mol_scroller.prototype.field_keys = function () {
            return (_super.prototype["field_keys"] && _super.prototype["field_keys"].call(this) || []).concat(["scrollTop", "scrollLeft"]);
        };
        $mol_scroller.prototype.eventScroll = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_scroller.prototype.eventWheel = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_scroller.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "scroll": return this.eventScroll.apply(this, diff);
                case "overflow": return this.eventScroll.apply(this, diff);
                case "underflow": return this.eventScroll.apply(this, diff);
                case "wheel": return this.eventWheel.apply(this, diff);
                default: return _super.prototype["event"] && _super.prototype["event"].call(this, key);
            }
        };
        $mol_scroller.prototype.event_keys = function () {
            return (_super.prototype["event_keys"] && _super.prototype["event_keys"].call(this) || []).concat(["scroll", "overflow", "underflow", "wheel"]);
        };
        __decorate([
            $mol_prop()
        ], $mol_scroller.prototype, "eventScroll", null);
        __decorate([
            $mol_prop()
        ], $mol_scroller.prototype, "eventWheel", null);
        return $mol_scroller;
    }($mol_viewer));
    $.$mol_scroller = $mol_scroller;
})($ || ($ = {}));
//# sourceMappingURL=scroller.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_scroller = (function (_super) {
            __extends($mol_scroller, _super);
            function $mol_scroller() {
                _super.apply(this, arguments);
            }
            $mol_scroller.prototype.scrollTop = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ['scrollTop()'].concat(diff)) || 0;
            };
            $mol_scroller.prototype.scrollLeft = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.local.apply(this, ['scrollLeft()'].concat(diff)) || 0;
            };
            $mol_scroller.prototype.eventScroll = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var el = diff[0].target;
                this.scrollTop(el.scrollTop);
                this.scrollLeft(el.scrollLeft);
                diff[0].preventDefault();
            };
            $mol_scroller.prototype.eventWheel = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (diff[0].defaultPrevented)
                    return;
                var target = this.DOMNode();
                if ((target.scrollHeight > target.offsetHeight) || (target.scrollWidth > target.offsetWidth)) {
                    diff[0].preventDefault();
                    target.scrollTop -= diff[0].wheelDeltaY;
                    target.scrollLeft -= diff[0].wheelDeltaX;
                }
            };
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "scrollTop", null);
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "scrollLeft", null);
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "eventScroll", null);
            __decorate([
                $mol_prop()
            ], $mol_scroller.prototype, "eventWheel", null);
            return $mol_scroller;
        }($.$mol_scroller));
        $mol.$mol_scroller = $mol_scroller;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=scroller.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_lister = (function (_super) {
        __extends($mol_lister, _super);
        function $mol_lister() {
            _super.apply(this, arguments);
        }
        $mol_lister.prototype.rowHeightMin = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (32);
        };
        $mol_lister.prototype.rows = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_lister.prototype.rowsVisible = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.rows.apply(this, diff);
        };
        $mol_lister.prototype.gap = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (0);
        };
        $mol_lister.prototype.gapper = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister_gapper().setup(function (__) {
                __.size = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.gap.apply(_this, diff);
                };
            });
        };
        $mol_lister.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.rowsVisible.apply(this, diff)).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.gapper.apply(this, diff)).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_lister.prototype, "gapper", null);
        return $mol_lister;
    }($.$mol_scroller));
    $.$mol_lister = $mol_lister;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_lister_gapper = (function (_super) {
        __extends($mol_lister_gapper, _super);
        function $mol_lister_gapper() {
            _super.apply(this, arguments);
        }
        $mol_lister_gapper.prototype.size = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (0);
        };
        $mol_lister_gapper.prototype.heightStyle = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "0";
        };
        $mol_lister_gapper.prototype.field = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "style.height": return this.heightStyle.apply(this, diff);
                default: return _super.prototype["field"] && _super.prototype["field"].call(this, key);
            }
        };
        $mol_lister_gapper.prototype.field_keys = function () {
            return (_super.prototype["field_keys"] && _super.prototype["field_keys"].call(this) || []).concat(["style.height"]);
        };
        return $mol_lister_gapper;
    }($mol_viewer));
    $.$mol_lister_gapper = $mol_lister_gapper;
})($ || ($ = {}));
//# sourceMappingURL=lister.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_lister = (function (_super) {
            __extends($mol_lister, _super);
            function $mol_lister() {
                _super.apply(this, arguments);
            }
            $mol_lister.prototype.rowsVisible = function () {
                var count = Math.ceil((this.scrollTop() + screen.height) / this.rowHeightMin());
                return this.rows().slice(0, count);
            };
            $mol_lister.prototype.gap = function () {
                var all = this.rows().length;
                var visible = this.rowsVisible().length;
                return (all - visible) * this.rowHeightMin();
            };
            return $mol_lister;
        }($.$mol_lister));
        $mol.$mol_lister = $mol_lister;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_lister_gapper = (function (_super) {
            __extends($mol_lister_gapper, _super);
            function $mol_lister_gapper() {
                _super.apply(this, arguments);
            }
            $mol_lister_gapper.prototype.heightStyle = function () {
                return this.size() + 'px';
            };
            return $mol_lister_gapper;
        }($.$mol_lister_gapper));
        $mol.$mol_lister_gapper = $mol_lister_gapper;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=lister.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_rower = (function (_super) {
        __extends($mol_rower, _super);
        function $mol_rower() {
            _super.apply(this, arguments);
        }
        return $mol_rower;
    }($mol_viewer));
    $.$mol_rower = $mol_rower;
})($ || ($ = {}));
//# sourceMappingURL=rower.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_clicker = (function (_super) {
        __extends($mol_clicker, _super);
        function $mol_clicker() {
            _super.apply(this, arguments);
        }
        $mol_clicker.prototype.tagName = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "button";
        };
        $mol_clicker.prototype.enabled = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (true);
        };
        $mol_clicker.prototype.eventClick = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_clicker.prototype.event = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "click": return this.eventClick.apply(this, diff);
                default: return _super.prototype["event"] && _super.prototype["event"].call(this, key);
            }
        };
        $mol_clicker.prototype.event_keys = function () {
            return (_super.prototype["event_keys"] && _super.prototype["event_keys"].call(this) || []).concat(["click"]);
        };
        $mol_clicker.prototype.disabled = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (false);
        };
        $mol_clicker.prototype.attr = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            switch (key) {
                case "disabled": return this.disabled.apply(this, diff);
                default: return _super.prototype["attr"] && _super.prototype["attr"].call(this, key);
            }
        };
        $mol_clicker.prototype.attr_keys = function () {
            return (_super.prototype["attr_keys"] && _super.prototype["attr_keys"].call(this) || []).concat(["disabled"]);
        };
        __decorate([
            $mol_prop()
        ], $mol_clicker.prototype, "eventClick", null);
        return $mol_clicker;
    }($mol_viewer));
    $.$mol_clicker = $mol_clicker;
})($ || ($ = {}));
//# sourceMappingURL=clicker.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_clicker = (function (_super) {
            __extends($mol_clicker, _super);
            function $mol_clicker() {
                _super.apply(this, arguments);
            }
            $mol_clicker.prototype.disabled = function () {
                return !this.enabled();
            };
            return $mol_clicker;
        }($.$mol_clicker));
        $mol.$mol_clicker = $mol_clicker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=clicker.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_clicker_major = (function (_super) {
        __extends($mol_clicker_major, _super);
        function $mol_clicker_major() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_major;
    }($.$mol_clicker));
    $.$mol_clicker_major = $mol_clicker_major;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_clicker_minor = (function (_super) {
        __extends($mol_clicker_minor, _super);
        function $mol_clicker_minor() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_minor;
    }($.$mol_clicker));
    $.$mol_clicker_minor = $mol_clicker_minor;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_clicker_warn = (function (_super) {
        __extends($mol_clicker_warn, _super);
        function $mol_clicker_warn() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_warn;
    }($.$mol_clicker));
    $.$mol_clicker_warn = $mol_clicker_warn;
})($ || ($ = {}));
//# sourceMappingURL=clicker_types.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $mol_http_request = (function (_super) {
    __extends($mol_http_request, _super);
    function $mol_http_request() {
        _super.apply(this, arguments);
    }
    $mol_http_request.prototype.uri = function () { return ''; };
    $mol_http_request.prototype.method = function () { return 'get'; };
    $mol_http_request.prototype.body = function () { return null; };
    $mol_http_request.prototype.native = function () {
        var _this = this;
        if (this['native()'])
            return this['native()'];
        var next = this['native()'] = new XMLHttpRequest;
        next.open(this.method(), this.uri());
        next.onload = function (event) {
            if (Math.floor(next.status / 100) === 2) {
                _this.response(void 0, next);
            }
            else {
                _this.response(void 0, new Error(next.responseText));
            }
            $mol_defer.run();
        };
        next.onerror = function (event) {
            _this.response(void 0, event.error || new Error('Unknown HTTP error'));
            $mol_defer.run();
        };
        next.send(this.body());
        return next;
    };
    $mol_http_request.prototype.destroyed = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0]) {
            var native = this['native()'];
            if (native)
                native.abort();
        }
        return _super.prototype.destroyed.apply(this, diff);
    };
    $mol_http_request.prototype.response = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] !== void 0)
            return diff[0];
        this.native();
        throw new $mol_atom_wait(this.method() + " " + this.uri());
    };
    $mol_http_request.prototype.text = function () {
        return this.response().responseText;
    };
    $mol_http_request.prototype.xml = function () {
        return this.response().responseXML.documentElement;
    };
    $mol_http_request.prototype.json = function () {
        return JSON.parse(this.text());
    };
    $mol_http_request.prototype.csv = function () {
        var lines = this.text().split(/\r?\n/g);
        var header = lines.shift().split(';');
        var next = [];
        lines.forEach(function (line) {
            if (!line)
                return;
            var row = {};
            line.split(';').forEach(function (val, index) {
                row[header[index]] = val;
            });
            next.push(row);
        });
        return next;
    };
    __decorate([
        $mol_prop()
    ], $mol_http_request.prototype, "response", null);
    return $mol_http_request;
}($mol_object));
//# sourceMappingURL=request.env=web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $mol_http_resource = (function (_super) {
    __extends($mol_http_resource, _super);
    function $mol_http_resource() {
        _super.apply(this, arguments);
    }
    $mol_http_resource.item = function (uri) {
        return new this().setup(function (obj) {
            obj.uri = function () { return uri; };
        });
    };
    $mol_http_resource.prototype.uri = function () { return ''; };
    $mol_http_resource.prototype.request = function (method) {
        var _this = this;
        return new $mol_http_request().setup(function (obj) {
            obj.method = function () { return method; };
            obj.uri = function () { return _this.uri(); };
        });
    };
    $mol_http_resource.prototype.latency = function () {
        return 200;
    };
    $mol_http_resource.prototype.downloader = function () {
        var _this = this;
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        setTimeout(function () {
            _this.downloader(void 0, _this.request('get'));
        }, this.latency());
        throw new $mol_atom_wait('Throttling...');
    };
    $mol_http_resource.prototype.uploader = function () {
        var body = this.jsonNext();
        if (body === void 0)
            return null;
        return this.request('put').setup(function (obj) {
            obj.body = function () { return body; };
        });
    };
    $mol_http_resource.prototype.uploaded = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (!this.uploader())
            return null;
        return this.json(void 0, this.uploader().json());
    };
    $mol_http_resource.prototype.json = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] === void 0) {
            return this.downloader.apply(this, diff).json();
        }
        else {
            this.jsonNext(diff[0]);
        }
    };
    $mol_http_resource.prototype.jsonNext = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        return diff[0];
    };
    $mol_http_resource.prototype.refresh = function () {
        this.downloader(void 0);
        this.jsonNext(void 0, void 0);
    };
    __decorate([
        $mol_prop()
    ], $mol_http_resource.prototype, "downloader", null);
    __decorate([
        $mol_prop()
    ], $mol_http_resource.prototype, "uploader", null);
    __decorate([
        $mol_prop()
    ], $mol_http_resource.prototype, "uploaded", null);
    __decorate([
        $mol_prop()
    ], $mol_http_resource.prototype, "json", null);
    __decorate([
        $mol_prop()
    ], $mol_http_resource.prototype, "jsonNext", null);
    __decorate([
        $mol_prop()
    ], $mol_http_resource, "item", null);
    return $mol_http_resource;
}($mol_object));
//# sourceMappingURL=resource.env=web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_range_common = (function (_super) {
    __extends($mol_range_common, _super);
    function $mol_range_common() {
        _super.apply(this, arguments);
        this.length = 0;
    }
    $mol_range_common.prototype.get = function (id) {
        return;
    };
    Object.defineProperty($mol_range_common.prototype, '0', {
        get: function () {
            throw new Error('Direct access to items not supported. Use get( id : number ) method instead.');
        },
        enumerable: true,
        configurable: true
    });
    $mol_range_common.prototype.forEach = function (handle) {
        var length = this.length;
        for (var i = 0; i < length; ++i) {
            handle(this.get(i), i);
        }
    };
    $mol_range_common.prototype.valueOf = function () {
        var list = [];
        this.forEach(function (val) { return list.push(val); });
        return list;
    };
    $mol_range_common.prototype.concat = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var ranges = args.map(function (range) { return range.valueOf(); });
        return (_a = this.valueOf()).concat.apply(_a, ranges);
        var _a;
    };
    $mol_range_common.prototype.slice = function (start, end) {
        if (start === void 0) { start = 0; }
        var source = this;
        return new $mol_range_lazy({
            get: function (id) {
                return source.get(id + start);
            },
            get length() {
                return Math.min(end, source.length) - start;
            }
        });
    };
    $mol_range_common.prototype.join = function (delim) {
        if (delim === void 0) { delim = ','; }
        var list = [];
        this.forEach(function (val) { return list.push(val); });
        return list.join(delim);
    };
    $mol_range_common.prototype.every = function (check) {
        var res = true;
        this.forEach(function (val, id) {
            if (!res)
                return;
            res = check(val, id);
        });
        return res;
    };
    $mol_range_common.prototype.some = function (check) {
        var res = false;
        this.forEach(function (val, id) {
            if (res)
                return;
            res = check(val, id);
        });
        return res;
    };
    return $mol_range_common;
}(Array));
var $mol_range_lazy = (function (_super) {
    __extends($mol_range_lazy, _super);
    function $mol_range_lazy(source) {
        if (source === void 0) { source = {
            get: function (id) { return; },
            length: 0
        }; }
        _super.call(this);
        this.source = source;
    }
    $mol_range_lazy.prototype.get = function (id) {
        return this.source.get(id);
    };
    Object.defineProperty($mol_range_lazy.prototype, "length", {
        get: function () {
            return this.source.length;
        },
        enumerable: true,
        configurable: true
    });
    return $mol_range_lazy;
}($mol_range_common));
//# sourceMappingURL=range.js.map
;
$mol_test(function (test) {
    var list = new $mol_range_lazy({
        get: function (id) { return id * 2; },
        get length() { return 5; },
    });
    test.equal(list.valueOf()[2], 4);
    test.equal(list.valueOf()[5], void 0);
});
$mol_test(function (test) {
    var list = new $mol_range_lazy({
        get: function (id) { return id * 2; },
        get length() { return Number.POSITIVE_INFINITY; },
    });
    list = list.slice(2, 5);
    test.equal(list.join(), '4,6,8');
});
$mol_test(function (test) {
    var list1 = new $mol_range_lazy({
        get: function (id) { return id * 2; },
        get length() { return 3; },
    });
    var list2 = new $mol_range_lazy({
        get: function (id) { return id * 3; },
        get length() { return 3; },
    });
    var list3 = new $mol_range_lazy({
        get: function (id) { return id * 4; },
        get length() { return 3; },
    });
    test.equal(list1.concat(list2, list3).join(), '0,2,4,0,3,6,0,4,8');
});
$mol_test(function (test) {
    var list = new $mol_range_lazy({
        get: function (id) { return id * 2; },
        get length() { return 3; }
    });
    test.equal(list.every(function (v) { return v >= 0; }), true);
    test.equal(list.every(function (v) { return v > 0; }), false);
});
$mol_test(function (test) {
    var list = new $mol_range_lazy({
        get: function (id) { return id * 2; },
        get length() { return 3; }
    });
    test.equal(list.some(function (v) { return v > 100; }), false);
    test.equal(list.some(function (v) { return v === 0; }), true);
});
//# sourceMappingURL=range.stage=test.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_users = (function (_super) {
        __extends($mol_app_users, _super);
        function $mol_app_users() {
            _super.apply(this, arguments);
        }
        $mol_app_users.prototype.searchQuery = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_users.prototype.filter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.hint = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return "Search users on GitHub";
                };
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.searchQuery.apply(_this, diff);
                };
            });
        };
        $mol_app_users.prototype.userRows = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat();
        };
        $mol_app_users.prototype.lister = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister().setup(function (__) {
                __.rowHeightMin = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return (65);
                };
                __.rows = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.userRows.apply(_this, diff);
                };
            });
        };
        $mol_app_users.prototype.eventReload = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_app_users.prototype.reloader = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_minor().setup(function (__) {
                __.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Reload").map(function (val) { return val.valueOf(); })[0]);
                };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventReload.apply(_this, diff);
                };
            });
        };
        $mol_app_users.prototype.loaded = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (false);
        };
        $mol_app_users.prototype.eventAdd = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_app_users.prototype.adder = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_minor().setup(function (__) {
                __.enabled = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.loaded.apply(_this, diff);
                };
                __.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Add").map(function (val) { return val.valueOf(); })[0]);
                };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventAdd.apply(_this, diff);
                };
            });
        };
        $mol_app_users.prototype.changed = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (false);
        };
        $mol_app_users.prototype.eventSave = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_app_users.prototype.saver = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_major().setup(function (__) {
                __.enabled = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.changed.apply(_this, diff);
                };
                __.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Save").map(function (val) { return val.valueOf(); })[0]);
                };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventSave.apply(_this, diff);
                };
            });
        };
        $mol_app_users.prototype.saverResult = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return "";
        };
        $mol_app_users.prototype.messager = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.saverResult.apply(_this, diff)).map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_app_users.prototype.controller = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_rower().setup(function (__) {
                __.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe(_this.reloader.apply(_this, diff)).map(function (val) { return val.valueOf(); })[0], $mol_maybe(_this.adder.apply(_this, diff)).map(function (val) { return val.valueOf(); })[0], $mol_maybe(_this.saver.apply(_this, diff)).map(function (val) { return val.valueOf(); })[0], $mol_maybe(_this.messager.apply(_this, diff)).map(function (val) { return val.valueOf(); })[0]);
                };
            });
        };
        $mol_app_users.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.filter.apply(this, diff)).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.lister.apply(this, diff)).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.controller.apply(this, diff)).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "searchQuery", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "filter", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "lister", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "eventReload", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "reloader", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "eventAdd", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "adder", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "eventSave", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "saver", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "messager", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users.prototype, "controller", null);
        return $mol_app_users;
    }($mol_viewer));
    $.$mol_app_users = $mol_app_users;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_users_item = (function (_super) {
        __extends($mol_app_users_item, _super);
        function $mol_app_users_item() {
            _super.apply(this, arguments);
        }
        $mol_app_users_item.prototype.title = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_users_item.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.title.apply(_this, diff);
                };
            });
        };
        $mol_app_users_item.prototype.eventDrop = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : (null);
        };
        $mol_app_users_item.prototype.dropper = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_minor().setup(function (__) {
                __.childs = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return [].concat($mol_maybe("Drop").map(function (val) { return val.valueOf(); })[0]);
                };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventDrop.apply(_this, diff);
                };
            });
        };
        $mol_app_users_item.prototype.childs = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [].concat($mol_maybe(this.titler.apply(this, diff)).map(function (val) { return val.valueOf(); })[0], $mol_maybe(this.dropper.apply(this, diff)).map(function (val) { return val.valueOf(); })[0]);
        };
        __decorate([
            $mol_prop()
        ], $mol_app_users_item.prototype, "title", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users_item.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users_item.prototype, "eventDrop", null);
        __decorate([
            $mol_prop()
        ], $mol_app_users_item.prototype, "dropper", null);
        return $mol_app_users_item;
    }($.$mol_rower));
    $.$mol_app_users_item = $mol_app_users_item;
})($ || ($ = {}));
//# sourceMappingURL=users.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $mol_app_users = $.$mol_app_users;
var $mol_app_users_github = (function (_super) {
    __extends($mol_app_users_github, _super);
    function $mol_app_users_github() {
        _super.apply(this, arguments);
    }
    $mol_app_users_github.search = function (query) {
        return new this().setup(function (obj) {
            obj.uri = function () { return 'https://api.github.com/search/users?per_page=100&q=' + encodeURIComponent(query); };
        });
    };
    $mol_app_users_github.prototype.users = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff.length === 0) {
            return this.json().items.map(function (_a) {
                var login = _a.login;
                return login;
            });
        }
        this.json(diff[0] && { items: diff[0].map(function (login) { return ({ login: login }); }) });
    };
    $mol_app_users_github.prototype.latency = function () {
        return 1000;
    };
    __decorate([
        $mol_prop()
    ], $mol_app_users_github.prototype, "users", null);
    __decorate([
        $mol_prop()
    ], $mol_app_users_github, "search", null);
    return $mol_app_users_github;
}($mol_http_resource));
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_users = (function (_super) {
            __extends($mol_app_users, _super);
            function $mol_app_users() {
                _super.apply(this, arguments);
            }
            $mol_app_users.prototype.searchQuery = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return String((_a = this.argument()).value.apply(_a, ['query'].concat(diff)) || '');
                var _a;
            };
            $mol_app_users.prototype.master = function () {
                var query = this.searchQuery();
                if (!query)
                    return null;
                return $mol_app_users_github.search(query);
            };
            $mol_app_users.prototype.childs = function () {
                var next = [this.filter()];
                if (this.master())
                    next = [].concat(next, this.lister(), this.controller());
                return next;
            };
            $mol_app_users.prototype.users = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0] || this.usersMaster();
            };
            $mol_app_users.prototype.usersMaster = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (!this.searchQuery())
                    return [];
                return (_a = this.master()).users.apply(_a, diff);
                var _a;
            };
            $mol_app_users.prototype.saverResult = function () {
                if (!this.master())
                    return null;
                if (!this.master().uploaded())
                    return null;
                if (this.changed())
                    return null;
                return 'Saved.';
            };
            $mol_app_users.prototype.eventReload = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.master().refresh();
            };
            $mol_app_users.prototype.eventAdd = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.users(this.users().concat(''));
            };
            $mol_app_users.prototype.eventUserDrop = function (id) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                this.users(this.users().filter(function (name, i) { return (i !== id); }));
            };
            $mol_app_users.prototype.changed = function () {
                return JSON.stringify(this.usersMaster()) !== JSON.stringify(this.users());
            };
            $mol_app_users.prototype.loaded = function () {
                return Boolean(this.users());
            };
            $mol_app_users.prototype.eventSave = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (!this.changed())
                    return;
                this.usersMaster(this.users());
            };
            $mol_app_users.prototype.userRows = function () {
                var _this = this;
                return new $mol_range_lazy({
                    get: function (id) { return _this.userRow(id); },
                    length: this.users().length,
                });
            };
            $mol_app_users.prototype.userRow = function (id) {
                var _this = this;
                return new $.$mol_app_users_item().setup(function (obj) {
                    obj.title = function () {
                        var diff = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            diff[_i - 0] = arguments[_i];
                        }
                        return _this.userName.apply(_this, [id].concat(diff));
                    };
                    obj.eventDrop = function () {
                        var diff = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            diff[_i - 0] = arguments[_i];
                        }
                        return _this.eventUserDrop.apply(_this, [id].concat(diff));
                    };
                });
            };
            $mol_app_users.prototype.userName = function (id) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                if (diff[0] === void 0)
                    return this.users()[id] || '';
                this.users(this.users().map(function (name, i) { return (i === id) ? diff[0] : name; }));
                return diff[0];
            };
            __decorate([
                $mol_prop()
            ], $mol_app_users.prototype, "users", null);
            __decorate([
                $mol_prop({
                    fail: function (view, error) {
                        if (error instanceof $mol_atom_wait)
                            return error;
                        return error.message;
                    }
                })
            ], $mol_app_users.prototype, "saverResult", null);
            __decorate([
                $mol_prop()
            ], $mol_app_users.prototype, "userRows", null);
            __decorate([
                $mol_prop()
            ], $mol_app_users.prototype, "userRow", null);
            __decorate([
                $mol_prop()
            ], $mol_app_users.prototype, "userName", null);
            return $mol_app_users;
        }($.$mol_app_users));
        $mol.$mol_app_users = $mol_app_users;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//# sourceMappingURL=users.view.js.map
//# sourceMappingURL=index.env=web.stage=test.js.map