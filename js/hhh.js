! function() {
    var require, requirejs, define, root = {
            jQuery: window.jQuery
        },
        HULL_ENV = "client";
    (function() {
        var requirejs, require, define;
        ! function(global) {
            function isFunction(a) {
                return "[object Function]" === ostring.call(a)
            }

            function isArray(a) {
                return "[object Array]" === ostring.call(a)
            }

            function each(a, b) {
                if (a) {
                    var c;
                    for (c = 0; c < a.length && (!a[c] || !b(a[c], c, a)); c += 1);
                }
            }

            function eachReverse(a, b) {
                if (a) {
                    var c;
                    for (c = a.length - 1; c > -1 && (!a[c] || !b(a[c], c, a)); c -= 1);
                }
            }

            function hasProp(a, b) {
                return hasOwn.call(a, b)
            }

            function getOwn(a, b) {
                return hasProp(a, b) && a[b]
            }

            function eachProp(a, b) {
                var c;
                for (c in a)
                    if (hasProp(a, c) && b(a[c], c)) break
            }

            function mixin(a, b, c, d) {
                return b && eachProp(b, function(b, e) {
                    (c || !hasProp(a, e)) && (d && "string" != typeof b ? (a[e] || (a[e] = {}), mixin(a[e], b, c, d)) : a[e] = b)
                }), a
            }

            function bind(a, b) {
                return function() {
                    return b.apply(a, arguments)
                }
            }

            function scripts() {
                return document.getElementsByTagName("script")
            }

            function defaultOnError(a) {
                throw a
            }

            function getGlobal(a) {
                if (!a) return a;
                var b = global;
                return each(a.split("."), function(a) {
                    b = b[a]
                }), b
            }

            function makeError(a, b, c, d) {
                var e = new Error(b + "\nhttp://requirejs.org/docs/errors.html#" + a);
                return e.requireType = a, e.requireModules = d, c && (e.originalError = c), e
            }

            function newContext(a) {
                function b(a) {
                    var b, c;
                    for (b = 0; a[b]; b += 1)
                        if (c = a[b], "." === c) a.splice(b, 1), b -= 1;
                        else if (".." === c) {
                        if (1 === b && (".." === a[2] || ".." === a[0])) break;
                        b > 0 && (a.splice(b - 1, 2), b -= 2)
                    }
                }

                function c(a, c, d) {
                    var e, f, g, h, i, j, k, l, m, n, o, p = c && c.split("/"),
                        q = p,
                        r = x.map,
                        s = r && r["*"];
                    if (a && "." === a.charAt(0) && (c ? (q = getOwn(x.pkgs, c) ? p = [c] : p.slice(0, p.length - 1), a = q.concat(a.split("/")), b(a), f = getOwn(x.pkgs, e = a[0]), a = a.join("/"), f && a === e + "/" + f.main && (a = e)) : 0 === a.indexOf("./") && (a = a.substring(2))), d && r && (p || s)) {
                        for (h = a.split("/"), i = h.length; i > 0; i -= 1) {
                            if (k = h.slice(0, i).join("/"), p)
                                for (j = p.length; j > 0; j -= 1)
                                    if (g = getOwn(r, p.slice(0, j).join("/")), g && (g = getOwn(g, k))) {
                                        l = g, m = i;
                                        break
                                    }
                            if (l) break;
                            !n && s && getOwn(s, k) && (n = getOwn(s, k), o = i)
                        }!l && n && (l = n, m = o), l && (h.splice(0, m, l), a = h.join("/"))
                    }
                    return a
                }

                function d(a) {
                    isBrowser && each(scripts(), function(b) {
                        return b.getAttribute("data-requiremodule") === a && b.getAttribute("data-requirecontext") === u.contextName ? (b.parentNode.removeChild(b), !0) : void 0
                    })
                }

                function e(a) {
                    var b = getOwn(x.paths, a);
                    return b && isArray(b) && b.length > 1 ? (b.shift(), u.require.undef(a), u.require([a]), !0) : void 0
                }

                function f(a) {
                    var b, c = a ? a.indexOf("!") : -1;
                    return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a]
                }

                function g(a, b, d, e) {
                    var g, h, i, j, k = null,
                        l = b ? b.name : null,
                        m = a,
                        n = !0,
                        o = "";
                    return a || (n = !1, a = "_@r" + (E += 1)), j = f(a), k = j[0], a = j[1], k && (k = c(k, l, e), h = getOwn(C, k)), a && (k ? o = h && h.normalize ? h.normalize(a, function(a) {
                        return c(a, l, e)
                    }) : c(a, l, e) : (o = c(a, l, e), j = f(o), k = j[0], o = j[1], d = !0, g = u.nameToUrl(o))), i = !k || h || d ? "" : "_unnormalized" + (F += 1), {
                        prefix: k,
                        name: o,
                        parentMap: b,
                        unnormalized: !!i,
                        url: g,
                        originalName: m,
                        isDefine: n,
                        id: (k ? k + "!" + o : o) + i
                    }
                }

                function h(a) {
                    var b = a.id,
                        c = getOwn(y, b);
                    return c || (c = y[b] = new u.Module(a)), c
                }

                function i(a, b, c) {
                    var d = a.id,
                        e = getOwn(y, d);
                    !hasProp(C, d) || e && !e.defineEmitComplete ? (e = h(a), e.error && "error" === b ? c(e.error) : e.on(b, c)) : "defined" === b && c(C[d])
                }

                function j(a, b) {
                    var c = a.requireModules,
                        d = !1;
                    b ? b(a) : (each(c, function(b) {
                        var c = getOwn(y, b);
                        c && (c.error = a, c.events.error && (d = !0, c.emit("error", a)))
                    }), d || req.onError(a))
                }

                function k() {
                    globalDefQueue.length && (apsp.apply(B, [B.length - 1, 0].concat(globalDefQueue)), globalDefQueue = [])
                }

                function l(a) {
                    delete y[a], delete z[a]
                }

                function m(a, b, c) {
                    var d = a.map.id;
                    a.error ? a.emit("error", a.error) : (b[d] = !0, each(a.depMaps, function(d, e) {
                        var f = d.id,
                            g = getOwn(y, f);
                        !g || a.depMatched[e] || c[f] || (getOwn(b, f) ? (a.defineDep(e, C[f]), a.check()) : m(g, b, c))
                    }), c[d] = !0)
                }

                function n() {
                    var a, b, c, f, g = 1e3 * x.waitSeconds,
                        h = g && u.startTime + g < (new Date).getTime(),
                        i = [],
                        k = [],
                        l = !1,
                        o = !0;
                    if (!s) {
                        if (s = !0, eachProp(z, function(c) {
                                if (a = c.map, b = a.id, c.enabled && (a.isDefine || k.push(c), !c.error))
                                    if (!c.inited && h) e(b) ? (f = !0, l = !0) : (i.push(b), d(b));
                                    else if (!c.inited && c.fetched && a.isDefine && (l = !0, !a.prefix)) return o = !1
                            }), h && i.length) return c = makeError("timeout", "Load timeout for modules: " + i, null, i), c.contextName = u.contextName, j(c);
                        o && each(k, function(a) {
                            m(a, {}, {})
                        }), h && !f || !l || !isBrowser && !isWebWorker || w || (w = setTimeout(function() {
                            w = 0, n()
                        }, 50)), s = !1
                    }
                }

                function o(a) {
                    hasProp(C, a[0]) || h(g(a[0], null, !0)).init(a[1], a[2])
                }

                function p(a, b, c, d) {
                    a.detachEvent && !isOpera ? d && a.detachEvent(d, b) : a.removeEventListener(c, b, !1)
                }

                function q(a) {
                    var b = a.currentTarget || a.srcElement;
                    return p(b, u.onScriptLoad, "load", "onreadystatechange"), p(b, u.onScriptError, "error"), {
                        node: b,
                        id: b && b.getAttribute("data-requiremodule")
                    }
                }

                function r() {
                    var a;
                    for (k(); B.length;) {
                        if (a = B.shift(), null === a[0]) return j(makeError("mismatch", "Mismatched anonymous define() module: " + a[a.length - 1]));
                        o(a)
                    }
                }
                var s, t, u, v, w, x = {
                        waitSeconds: 7,
                        baseUrl: "./",
                        paths: {},
                        pkgs: {},
                        shim: {},
                        config: {}
                    },
                    y = {},
                    z = {},
                    A = {},
                    B = [],
                    C = {},
                    D = {},
                    E = 1,
                    F = 1;
                return v = {
                    require: function(a) {
                        return a.require ? a.require : a.require = u.makeRequire(a.map)
                    },
                    exports: function(a) {
                        return a.usingExports = !0, a.map.isDefine ? a.exports ? a.exports : a.exports = C[a.map.id] = {} : void 0
                    },
                    module: function(a) {
                        return a.module ? a.module : a.module = {
                            id: a.map.id,
                            uri: a.map.url,
                            config: function() {
                                var b, c = getOwn(x.pkgs, a.map.id);
                                return b = c ? getOwn(x.config, a.map.id + "/" + c.main) : getOwn(x.config, a.map.id), b || {}
                            },
                            exports: C[a.map.id]
                        }
                    }
                }, t = function(a) {
                    this.events = getOwn(A, a.id) || {}, this.map = a, this.shim = getOwn(x.shim, a.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
                }, t.prototype = {
                    init: function(a, b, c, d) {
                        d = d || {}, this.inited || (this.factory = b, c ? this.on("error", c) : this.events.error && (c = bind(this, function(a) {
                            this.emit("error", a)
                        })), this.depMaps = a && a.slice(0), this.errback = c, this.inited = !0, this.ignore = d.ignore, d.enabled || this.enabled ? this.enable() : this.check())
                    },
                    defineDep: function(a, b) {
                        this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b)
                    },
                    fetch: function() {
                        if (!this.fetched) {
                            this.fetched = !0, u.startTime = (new Date).getTime();
                            var a = this.map;
                            return this.shim ? void u.makeRequire(this.map, {
                                enableBuildCallback: !0
                            })(this.shim.deps || [], bind(this, function() {
                                return a.prefix ? this.callPlugin() : this.load()
                            })) : a.prefix ? this.callPlugin() : this.load()
                        }
                    },
                    load: function() {
                        var a = this.map.url;
                        D[a] || (D[a] = !0, u.load(this.map.id, a))
                    },
                    check: function() {
                        if (this.enabled && !this.enabling) {
                            var a, b, c = this.map.id,
                                d = this.depExports,
                                e = this.exports,
                                f = this.factory;
                            if (this.inited) {
                                if (this.error) this.emit("error", this.error);
                                else if (!this.defining) {
                                    if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                        if (isFunction(f)) {
                                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                                e = u.execCb(c, f, d, e)
                                            } catch (g) {
                                                a = g
                                            } else e = u.execCb(c, f, d, e);
                                            if (this.map.isDefine && (b = this.module, b && void 0 !== b.exports && b.exports !== this.exports ? e = b.exports : void 0 === e && this.usingExports && (e = this.exports)), a) return a.requireMap = this.map, a.requireModules = this.map.isDefine ? [this.map.id] : null, a.requireType = this.map.isDefine ? "define" : "require", j(this.error = a)
                                        } else e = f;
                                        this.exports = e, this.map.isDefine && !this.ignore && (C[c] = e, req.onResourceLoad && req.onResourceLoad(u, this.map, this.depMaps)), l(c), this.defined = !0
                                    }
                                    this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                                }
                            } else this.fetch()
                        }
                    },
                    callPlugin: function() {
                        var a = this.map,
                            b = a.id,
                            d = g(a.prefix);
                        this.depMaps.push(d), i(d, "defined", bind(this, function(d) {
                            var e, f, k, m = this.map.name,
                                n = this.map.parentMap ? this.map.parentMap.name : null,
                                o = u.makeRequire(a.parentMap, {
                                    enableBuildCallback: !0
                                });
                            return this.map.unnormalized ? (d.normalize && (m = d.normalize(m, function(a) {
                                return c(a, n, !0)
                            }) || ""), f = g(a.prefix + "!" + m, this.map.parentMap), i(f, "defined", bind(this, function(a) {
                                this.init([], function() {
                                    return a
                                }, null, {
                                    enabled: !0,
                                    ignore: !0
                                })
                            })), k = getOwn(y, f.id), void(k && (this.depMaps.push(f), this.events.error && k.on("error", bind(this, function(a) {
                                this.emit("error", a)
                            })), k.enable()))) : (e = bind(this, function(a) {
                                this.init([], function() {
                                    return a
                                }, null, {
                                    enabled: !0
                                })
                            }), e.error = bind(this, function(a) {
                                this.inited = !0, this.error = a, a.requireModules = [b], eachProp(y, function(a) {
                                    0 === a.map.id.indexOf(b + "_unnormalized") && l(a.map.id)
                                }), j(a)
                            }), e.fromText = bind(this, function(c, d) {
                                var f = a.name,
                                    i = g(f),
                                    k = useInteractive;
                                d && (c = d), k && (useInteractive = !1), h(i), hasProp(x.config, b) && (x.config[f] = x.config[b]);
                                try {
                                    req.exec(c)
                                } catch (l) {
                                    return j(makeError("fromtexteval", "fromText eval for " + b + " failed: " + l, l, [b]))
                                }
                                k && (useInteractive = !0), this.depMaps.push(i), u.completeLoad(f), o([f], e)
                            }), void d.load(a.name, o, e, x))
                        })), u.enable(d, this), this.pluginMaps[d.id] = d
                    },
                    enable: function() {
                        z[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(a, b) {
                            var c, d, e;
                            if ("string" == typeof a) {
                                if (a = g(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[b] = a, e = getOwn(v, a.id)) return void(this.depExports[b] = e(this));
                                this.depCount += 1, i(a, "defined", bind(this, function(a) {
                                    this.defineDep(b, a), this.check()
                                })), this.errback && i(a, "error", bind(this, this.errback))
                            }
                            c = a.id, d = y[c], hasProp(v, c) || !d || d.enabled || u.enable(a, this)
                        })), eachProp(this.pluginMaps, bind(this, function(a) {
                            var b = getOwn(y, a.id);
                            b && !b.enabled && u.enable(a, this)
                        })), this.enabling = !1, this.check()
                    },
                    on: function(a, b) {
                        var c = this.events[a];
                        c || (c = this.events[a] = []), c.push(b)
                    },
                    emit: function(a, b) {
                        each(this.events[a], function(a) {
                            a(b)
                        }), "error" === a && delete this.events[a]
                    }
                }, u = {
                    config: x,
                    contextName: a,
                    registry: y,
                    defined: C,
                    urlFetched: D,
                    defQueue: B,
                    Module: t,
                    makeModuleMap: g,
                    nextTick: req.nextTick,
                    onError: j,
                    configure: function(a) {
                        a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/");
                        var b = x.pkgs,
                            c = x.shim,
                            d = {
                                paths: !0,
                                config: !0,
                                map: !0
                            };
                        eachProp(a, function(a, b) {
                            d[b] ? "map" === b ? (x.map || (x.map = {}), mixin(x[b], a, !0, !0)) : mixin(x[b], a, !0) : x[b] = a
                        }), a.shim && (eachProp(a.shim, function(a, b) {
                            isArray(a) && (a = {
                                deps: a
                            }), !a.exports && !a.init || a.exportsFn || (a.exportsFn = u.makeShimExports(a)), c[b] = a
                        }), x.shim = c), a.packages && (each(a.packages, function(a) {
                            var c;
                            a = "string" == typeof a ? {
                                name: a
                            } : a, c = a.location, b[a.name] = {
                                name: a.name,
                                location: c || a.name,
                                main: (a.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                            }
                        }), x.pkgs = b), eachProp(y, function(a, b) {
                            a.inited || a.map.unnormalized || (a.map = g(b))
                        }), (a.deps || a.callback) && u.require(a.deps || [], a.callback)
                    },
                    makeShimExports: function(a) {
                        function b() {
                            var b;
                            return a.init && (b = a.init.apply(global, arguments)), b || a.exports && getGlobal(a.exports)
                        }
                        return b
                    },
                    makeRequire: function(b, e) {
                        function f(c, d, i) {
                            var k, l, m;
                            return e.enableBuildCallback && d && isFunction(d) && (d.__requireJsBuild = !0), "string" == typeof c ? isFunction(d) ? j(makeError("requireargs", "Invalid require call"), i) : b && hasProp(v, c) ? v[c](y[b.id]) : req.get ? req.get(u, c, b, f) : (l = g(c, b, !1, !0), k = l.id, hasProp(C, k) ? C[k] : j(makeError("notloaded", 'Module name "' + k + '" has not been loaded yet for context: ' + a + (b ? "" : ". Use require([])")))) : (r(), u.nextTick(function() {
                                r(), m = h(g(null, b)), m.skipMap = e.skipMap, m.init(c, d, i, {
                                    enabled: !0
                                }), n()
                            }), f)
                        }
                        return e = e || {}, mixin(f, {
                            isBrowser: isBrowser,
                            toUrl: function(a) {
                                var d, e = a.lastIndexOf("."),
                                    f = a.split("/")[0],
                                    g = "." === f || ".." === f;
                                return -1 !== e && (!g || e > 1) && (d = a.substring(e, a.length), a = a.substring(0, e)), u.nameToUrl(c(a, b && b.id, !0), d, !0)
                            },
                            defined: function(a) {
                                return hasProp(C, g(a, b, !1, !0).id)
                            },
                            specified: function(a) {
                                return a = g(a, b, !1, !0).id, hasProp(C, a) || hasProp(y, a)
                            }
                        }), b || (f.undef = function(a) {
                            k();
                            var c = g(a, b, !0),
                                e = getOwn(y, a);
                            d(a), delete C[a], delete D[c.url], delete A[a], e && (e.events.defined && (A[a] = e.events), l(a))
                        }), f
                    },
                    enable: function(a) {
                        var b = getOwn(y, a.id);
                        b && h(a).enable()
                    },
                    completeLoad: function(a) {
                        var b, c, d, f = getOwn(x.shim, a) || {},
                            g = f.exports;
                        for (k(); B.length;) {
                            if (c = B.shift(), null === c[0]) {
                                if (c[0] = a, b) break;
                                b = !0
                            } else c[0] === a && (b = !0);
                            o(c)
                        }
                        if (d = getOwn(y, a), !b && !hasProp(C, a) && d && !d.inited) {
                            if (!(!x.enforceDefine || g && getGlobal(g))) return e(a) ? void 0 : j(makeError("nodefine", "No define call for " + a, null, [a]));
                            o([a, f.deps || [], f.exportsFn])
                        }
                        n()
                    },
                    nameToUrl: function(a, b, c) {
                        var d, e, f, g, h, i, j, k, l;
                        if (req.jsExtRegExp.test(a)) k = a + (b || "");
                        else {
                            for (d = x.paths, e = x.pkgs, h = a.split("/"), i = h.length; i > 0; i -= 1) {
                                if (j = h.slice(0, i).join("/"), f = getOwn(e, j), l = getOwn(d, j)) {
                                    isArray(l) && (l = l[0]), h.splice(0, i, l);
                                    break
                                }
                                if (f) {
                                    g = a === f.name ? f.location + "/" + f.main : f.location, h.splice(0, i, g);
                                    break
                                }
                            }
                            k = h.join("/"), k += b || (/^data\:|\?/.test(k) || c ? "" : ".js"), k = ("/" === k.charAt(0) || k.match(/^[\w\+\.\-]+:/) ? "" : x.baseUrl) + k
                        }
                        return x.urlArgs ? k + ((-1 === k.indexOf("?") ? "?" : "&") + x.urlArgs) : k
                    },
                    load: function(a, b) {
                        req.load(u, a, b)
                    },
                    execCb: function(a, b, c, d) {
                        return b.apply(d, c)
                    },
                    onScriptLoad: function(a) {
                        if ("load" === a.type || readyRegExp.test((a.currentTarget || a.srcElement).readyState)) {
                            interactiveScript = null;
                            var b = q(a);
                            u.completeLoad(b.id)
                        }
                    },
                    onScriptError: function(a) {
                        var b = q(a);
                        return e(b.id) ? void 0 : j(makeError("scripterror", "Script error for: " + b.id, a, [b.id]))
                    }
                }, u.require = u.makeRequire(), u
            }

            function getInteractiveScript() {
                return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(a) {
                    return "interactive" === a.readyState ? interactiveScript = a : void 0
                }), interactiveScript)
            }
            var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.9",
                commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
                cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
                jsSuffixRegExp = /\.js$/,
                currDirRegExp = /^\.\//,
                op = Object.prototype,
                ostring = op.toString,
                hasOwn = op.hasOwnProperty,
                ap = Array.prototype,
                apsp = ap.splice,
                isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
                isWebWorker = !isBrowser && "undefined" != typeof importScripts,
                readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
                defContextName = "_",
                isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
                contexts = {},
                cfg = {},
                globalDefQueue = [],
                useInteractive = !1;
            if ("undefined" == typeof define) {
                if ("undefined" != typeof requirejs) {
                    if (isFunction(requirejs)) return;
                    cfg = requirejs, requirejs = void 0
                }
                "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(a, b, c, d) {
                    var e, f, g = defContextName;
                    return isArray(a) || "string" == typeof a || (f = a, isArray(b) ? (a = b, b = c, c = d) : a = []), f && f.context && (g = f.context), e = getOwn(contexts, g), e || (e = contexts[g] = req.s.newContext(g)), f && e.configure(f), e.require(a, b, c)
                }, req.config = function(a) {
                    return req(a)
                }, req.nextTick = "undefined" != typeof setTimeout ? function(a) {
                    setTimeout(a, 4)
                } : function(a) {
                    a()
                }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
                    contexts: contexts,
                    newContext: newContext
                }, req({}), each(["toUrl", "undef", "defined", "specified"], function(a) {
                    req[a] = function() {
                        var b = contexts[defContextName];
                        return b.require[a].apply(b, arguments)
                    }
                }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(a) {
                    var b = a.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
                    return b.type = a.scriptType || "text/javascript", b.charset = "utf-8", b.async = !0, b
                }, req.load = function(a, b, c) {
                    var d, e = a && a.config || {};
                    if (isBrowser) return d = req.createNode(e, b, c), d.setAttribute("data-requirecontext", a.contextName), d.setAttribute("data-requiremodule", b), !d.attachEvent || d.attachEvent.toString && d.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (d.addEventListener("load", a.onScriptLoad, !1), d.addEventListener("error", a.onScriptError, !1)) : (useInteractive = !0, d.attachEvent("onreadystatechange", a.onScriptLoad)), d.src = c, currentlyAddingScript = d, baseElement ? head.insertBefore(d, baseElement) : head.appendChild(d), currentlyAddingScript = null, d;
                    if (isWebWorker) try {
                        importScripts(c), a.completeLoad(b)
                    } catch (f) {
                        a.onError(makeError("importscripts", "importScripts failed for " + b + " at " + c, f, [b]))
                    }
                }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(a) {
                    return head || (head = a.parentNode), dataMain = a.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
                }), define = function(a, b, c) {
                    var d, e;
                    "string" != typeof a && (c = b, b = a, a = null), isArray(b) || (c = b, b = null), !b && isFunction(c) && (b = [], c.length && (c.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(a, c) {
                        b.push(c)
                    }), b = (1 === c.length ? ["require"] : ["require", "exports", "module"]).concat(b))), useInteractive && (d = currentlyAddingScript || getInteractiveScript(), d && (a || (a = d.getAttribute("data-requiremodule")), e = contexts[d.getAttribute("data-requirecontext")])), (e ? e.defQueue : globalDefQueue).push([a, b, c])
                }, define.amd = {
                    jQuery: !0
                }, req.exec = function(text) {
                    return eval(text)
                }, req(cfg)
            }
        }(this), define("requireLib", function() {}), "object" != typeof JSON && (JSON = {}),
            function() {
                function f(a) {
                    return 10 > a ? "0" + a : a
                }

                function quote(a) {
                    return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function(a) {
                        var b = meta[a];
                        return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + a + '"'
                }

                function str(a, b) {
                    var c, d, e, f, g, h = gap,
                        i = b[a];
                    switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
                        case "string":
                            return quote(i);
                        case "number":
                            return isFinite(i) ? String(i) : "null";
                        case "boolean":
                        case "null":
                            return String(i);
                        case "object":
                            if (!i) return "null";
                            if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                                for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
                                return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]", gap = h, e
                            }
                            if (rep && "object" == typeof rep)
                                for (f = rep.length, c = 0; f > c; c += 1) "string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                            else
                                for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                            return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}", gap = h, e
                    }
                }
                "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                    return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
                }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                    return this.valueOf()
                });
                var cx, escapable, gap, indent, meta, rep;
                "function" != typeof JSON.stringify && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                }, JSON.stringify = function(a, b, c) {
                    var d;
                    if (gap = "", indent = "", "number" == typeof c)
                        for (d = 0; c > d; d += 1) indent += " ";
                    else "string" == typeof c && (indent = c);
                    if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw new Error("JSON.stringify");
                    return str("", {
                        "": a
                    })
                }), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function(text, reviver) {
                    function walk(a, b) {
                        var c, d, e = a[b];
                        if (e && "object" == typeof e)
                            for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
                        return reviver.call(a, b, e)
                    }
                    var j;
                    if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
                            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                        "": j
                    }, "") : j;
                    throw new SyntaxError("JSON.parse")
                })
            }(), define("json2", function() {}),
            function() {
                var a = this,
                    b = a._,
                    c = {},
                    d = Array.prototype,
                    e = Object.prototype,
                    f = Function.prototype,
                    g = d.push,
                    h = d.slice,
                    i = d.concat,
                    j = e.toString,
                    k = e.hasOwnProperty,
                    l = d.forEach,
                    m = d.map,
                    n = d.reduce,
                    o = d.reduceRight,
                    p = d.filter,
                    q = d.every,
                    r = d.some,
                    s = d.indexOf,
                    t = d.lastIndexOf,
                    u = Array.isArray,
                    v = Object.keys,
                    w = f.bind,
                    x = function(a) {
                        return a instanceof x ? a : this instanceof x ? void(this._wrapped = a) : new x(a)
                    };
                "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : a._ = x, x.VERSION = "1.5.2";
                var y = x.each = x.forEach = function(a, b, d) {
                    if (null != a)
                        if (l && a.forEach === l) a.forEach(b, d);
                        else if (a.length === +a.length) {
                        for (var e = 0, f = a.length; f > e; e++)
                            if (b.call(d, a[e], e, a) === c) return
                    } else
                        for (var g = x.keys(a), e = 0, f = g.length; f > e; e++)
                            if (b.call(d, a[g[e]], g[e], a) === c) return
                };
                x.map = x.collect = function(a, b, c) {
                    var d = [];
                    return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function(a, e, f) {
                        d.push(b.call(c, a, e, f))
                    }), d)
                };
                var z = "Reduce of empty array with no initial value";
                x.reduce = x.foldl = x.inject = function(a, b, c, d) {
                    var e = arguments.length > 2;
                    if (null == a && (a = []), n && a.reduce === n) return d && (b = x.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
                    if (y(a, function(a, f, g) {
                            e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
                        }), !e) throw new TypeError(z);
                    return c
                }, x.reduceRight = x.foldr = function(a, b, c, d) {
                    var e = arguments.length > 2;
                    if (null == a && (a = []), o && a.reduceRight === o) return d && (b = x.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
                    var f = a.length;
                    if (f !== +f) {
                        var g = x.keys(a);
                        f = g.length
                    }
                    if (y(a, function(h, i, j) {
                            i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0)
                        }), !e) throw new TypeError(z);
                    return c
                }, x.find = x.detect = function(a, b, c) {
                    var d;
                    return A(a, function(a, e, f) {
                        return b.call(c, a, e, f) ? (d = a, !0) : void 0
                    }), d
                }, x.filter = x.select = function(a, b, c) {
                    var d = [];
                    return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function(a, e, f) {
                        b.call(c, a, e, f) && d.push(a)
                    }), d)
                }, x.reject = function(a, b, c) {
                    return x.filter(a, function(a, d, e) {
                        return !b.call(c, a, d, e)
                    }, c)
                }, x.every = x.all = function(a, b, d) {
                    b || (b = x.identity);
                    var e = !0;
                    return null == a ? e : q && a.every === q ? a.every(b, d) : (y(a, function(a, f, g) {
                        return (e = e && b.call(d, a, f, g)) ? void 0 : c
                    }), !!e)
                };
                var A = x.some = x.any = function(a, b, d) {
                    b || (b = x.identity);
                    var e = !1;
                    return null == a ? e : r && a.some === r ? a.some(b, d) : (y(a, function(a, f, g) {
                        return e || (e = b.call(d, a, f, g)) ? c : void 0
                    }), !!e)
                };
                x.contains = x.include = function(a, b) {
                    return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a, function(a) {
                        return a === b
                    })
                }, x.invoke = function(a, b) {
                    var c = h.call(arguments, 2),
                        d = x.isFunction(b);
                    return x.map(a, function(a) {
                        return (d ? b : a[b]).apply(a, c)
                    })
                }, x.pluck = function(a, b) {
                    return x.map(a, function(a) {
                        return a[b]
                    })
                }, x.where = function(a, b, c) {
                    return x.isEmpty(b) ? c ? void 0 : [] : x[c ? "find" : "filter"](a, function(a) {
                        for (var c in b)
                            if (b[c] !== a[c]) return !1;
                        return !0
                    })
                }, x.findWhere = function(a, b) {
                    return x.where(a, b, !0)
                }, x.max = function(a, b, c) {
                    if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.max.apply(Math, a);
                    if (!b && x.isEmpty(a)) return -1 / 0;
                    var d = {
                        computed: -1 / 0,
                        value: -1 / 0
                    };
                    return y(a, function(a, e, f) {
                        var g = b ? b.call(c, a, e, f) : a;
                        g > d.computed && (d = {
                            value: a,
                            computed: g
                        })
                    }), d.value
                }, x.min = function(a, b, c) {
                    if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.min.apply(Math, a);
                    if (!b && x.isEmpty(a)) return 1 / 0;
                    var d = {
                        computed: 1 / 0,
                        value: 1 / 0
                    };
                    return y(a, function(a, e, f) {
                        var g = b ? b.call(c, a, e, f) : a;
                        g < d.computed && (d = {
                            value: a,
                            computed: g
                        })
                    }), d.value
                }, x.shuffle = function(a) {
                    var b, c = 0,
                        d = [];
                    return y(a, function(a) {
                        b = x.random(c++), d[c - 1] = d[b], d[b] = a
                    }), d
                }, x.sample = function(a, b, c) {
                    return arguments.length < 2 || c ? a[x.random(a.length - 1)] : x.shuffle(a).slice(0, Math.max(0, b))
                };
                var B = function(a) {
                    return x.isFunction(a) ? a : function(b) {
                        return b[a]
                    }
                };
                x.sortBy = function(a, b, c) {
                    var d = B(b);
                    return x.pluck(x.map(a, function(a, b, e) {
                        return {
                            value: a,
                            index: b,
                            criteria: d.call(c, a, b, e)
                        }
                    }).sort(function(a, b) {
                        var c = a.criteria,
                            d = b.criteria;
                        if (c !== d) {
                            if (c > d || void 0 === c) return 1;
                            if (d > c || void 0 === d) return -1
                        }
                        return a.index - b.index
                    }), "value")
                };
                var C = function(a) {
                    return function(b, c, d) {
                        var e = {},
                            f = null == c ? x.identity : B(c);
                        return y(b, function(c, g) {
                            var h = f.call(d, c, g, b);
                            a(e, h, c)
                        }), e
                    }
                };
                x.groupBy = C(function(a, b, c) {
                    (x.has(a, b) ? a[b] : a[b] = []).push(c)
                }), x.indexBy = C(function(a, b, c) {
                    a[b] = c
                }), x.countBy = C(function(a, b) {
                    x.has(a, b) ? a[b]++ : a[b] = 1
                }), x.sortedIndex = function(a, b, c, d) {
                    c = null == c ? x.identity : B(c);
                    for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
                        var h = f + g >>> 1;
                        c.call(d, a[h]) < e ? f = h + 1 : g = h
                    }
                    return f
                }, x.toArray = function(a) {
                    return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : []
                }, x.size = function(a) {
                    return null == a ? 0 : a.length === +a.length ? a.length : x.keys(a).length
                }, x.first = x.head = x.take = function(a, b, c) {
                    return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b)
                }, x.initial = function(a, b, c) {
                    return h.call(a, 0, a.length - (null == b || c ? 1 : b))
                }, x.last = function(a, b, c) {
                    return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0))
                }, x.rest = x.tail = x.drop = function(a, b, c) {
                    return h.call(a, null == b || c ? 1 : b)
                }, x.compact = function(a) {
                    return x.filter(a, x.identity)
                };
                var D = function(a, b, c) {
                    return b && x.every(a, x.isArray) ? i.apply(c, a) : (y(a, function(a) {
                        x.isArray(a) || x.isArguments(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a)
                    }), c)
                };
                x.flatten = function(a, b) {
                    return D(a, b, [])
                }, x.without = function(a) {
                    return x.difference(a, h.call(arguments, 1))
                }, x.uniq = x.unique = function(a, b, c, d) {
                    x.isFunction(b) && (d = c, c = b, b = !1);
                    var e = c ? x.map(a, c, d) : a,
                        f = [],
                        g = [];
                    return y(e, function(c, d) {
                        (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d]))
                    }), f
                }, x.union = function() {
                    return x.uniq(x.flatten(arguments, !0))
                }, x.intersection = function(a) {
                    var b = h.call(arguments, 1);
                    return x.filter(x.uniq(a), function(a) {
                        return x.every(b, function(b) {
                            return x.indexOf(b, a) >= 0
                        })
                    })
                }, x.difference = function(a) {
                    var b = i.apply(d, h.call(arguments, 1));
                    return x.filter(a, function(a) {
                        return !x.contains(b, a)
                    })
                }, x.zip = function() {
                    for (var a = x.max(x.pluck(arguments, "length").concat(0)), b = new Array(a), c = 0; a > c; c++) b[c] = x.pluck(arguments, "" + c);
                    return b
                }, x.object = function(a, b) {
                    if (null == a) return {};
                    for (var c = {}, d = 0, e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
                    return c
                }, x.indexOf = function(a, b, c) {
                    if (null == a) return -1;
                    var d = 0,
                        e = a.length;
                    if (c) {
                        if ("number" != typeof c) return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
                        d = 0 > c ? Math.max(0, e + c) : c
                    }
                    if (s && a.indexOf === s) return a.indexOf(b, c);
                    for (; e > d; d++)
                        if (a[d] === b) return d;
                    return -1
                }, x.lastIndexOf = function(a, b, c) {
                    if (null == a) return -1;
                    var d = null != c;
                    if (t && a.lastIndexOf === t) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
                    for (var e = d ? c : a.length; e--;)
                        if (a[e] === b) return e;
                    return -1
                }, x.range = function(a, b, c) {
                    arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
                    for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;) f[e++] = a, a += c;
                    return f
                };
                var E = function() {};
                x.bind = function(a, b) {
                    var c, d;
                    if (w && a.bind === w) return w.apply(a, h.call(arguments, 1));
                    if (!x.isFunction(a)) throw new TypeError;
                    return c = h.call(arguments, 2), d = function() {
                        if (!(this instanceof d)) return a.apply(b, c.concat(h.call(arguments)));
                        E.prototype = a.prototype;
                        var e = new E;
                        E.prototype = null;
                        var f = a.apply(e, c.concat(h.call(arguments)));
                        return Object(f) === f ? f : e
                    }
                }, x.partial = function(a) {
                    var b = h.call(arguments, 1);
                    return function() {
                        return a.apply(this, b.concat(h.call(arguments)))
                    }
                }, x.bindAll = function(a) {
                    var b = h.call(arguments, 1);
                    if (0 === b.length) throw new Error("bindAll must be passed function names");
                    return y(b, function(b) {
                        a[b] = x.bind(a[b], a)
                    }), a
                }, x.memoize = function(a, b) {
                    var c = {};
                    return b || (b = x.identity),
                        function() {
                            var d = b.apply(this, arguments);
                            return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments)
                        }
                }, x.delay = function(a, b) {
                    var c = h.call(arguments, 2);
                    return setTimeout(function() {
                        return a.apply(null, c)
                    }, b)
                }, x.defer = function(a) {
                    return x.delay.apply(x, [a, 1].concat(h.call(arguments, 1)))
                }, x.throttle = function(a, b, c) {
                    var d, e, f, g = null,
                        h = 0;
                    c || (c = {});
                    var i = function() {
                        h = c.leading === !1 ? 0 : new Date, g = null, f = a.apply(d, e)
                    };
                    return function() {
                        var j = new Date;
                        h || c.leading !== !1 || (h = j);
                        var k = b - (j - h);
                        return d = this, e = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e)) : g || c.trailing === !1 || (g = setTimeout(i, k)), f
                    }
                }, x.debounce = function(a, b, c) {
                    var d, e, f, g, h;
                    return function() {
                        f = this, e = arguments, g = new Date;
                        var i = function() {
                                var j = new Date - g;
                                b > j ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e)))
                            },
                            j = c && !d;
                        return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e)), h
                    }
                }, x.once = function(a) {
                    var b, c = !1;
                    return function() {
                        return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b)
                    }
                }, x.wrap = function(a, b) {
                    return function() {
                        var c = [a];
                        return g.apply(c, arguments), b.apply(this, c)
                    }
                }, x.compose = function() {
                    var a = arguments;
                    return function() {
                        for (var b = arguments, c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
                        return b[0]
                    }
                }, x.after = function(a, b) {
                    return function() {
                        return --a < 1 ? b.apply(this, arguments) : void 0
                    }
                }, x.keys = v || function(a) {
                    if (a !== Object(a)) throw new TypeError("Invalid object");
                    var b = [];
                    for (var c in a) x.has(a, c) && b.push(c);
                    return b
                }, x.values = function(a) {
                    for (var b = x.keys(a), c = b.length, d = new Array(c), e = 0; c > e; e++) d[e] = a[b[e]];
                    return d
                }, x.pairs = function(a) {
                    for (var b = x.keys(a), c = b.length, d = new Array(c), e = 0; c > e; e++) d[e] = [b[e], a[b[e]]];
                    return d
                }, x.invert = function(a) {
                    for (var b = {}, c = x.keys(a), d = 0, e = c.length; e > d; d++) b[a[c[d]]] = c[d];
                    return b
                }, x.functions = x.methods = function(a) {
                    var b = [];
                    for (var c in a) x.isFunction(a[c]) && b.push(c);
                    return b.sort()
                }, x.extend = function(a) {
                    return y(h.call(arguments, 1), function(b) {
                        if (b)
                            for (var c in b) a[c] = b[c]
                    }), a
                }, x.pick = function(a) {
                    var b = {},
                        c = i.apply(d, h.call(arguments, 1));
                    return y(c, function(c) {
                        c in a && (b[c] = a[c])
                    }), b
                }, x.omit = function(a) {
                    var b = {},
                        c = i.apply(d, h.call(arguments, 1));
                    for (var e in a) x.contains(c, e) || (b[e] = a[e]);
                    return b
                }, x.defaults = function(a) {
                    return y(h.call(arguments, 1), function(b) {
                        if (b)
                            for (var c in b) void 0 === a[c] && (a[c] = b[c])
                    }), a
                }, x.clone = function(a) {
                    return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a
                }, x.tap = function(a, b) {
                    return b(a), a
                };
                var F = function(a, b, c, d) {
                    if (a === b) return 0 !== a || 1 / a == 1 / b;
                    if (null == a || null == b) return a === b;
                    a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
                    var e = j.call(a);
                    if (e != j.call(b)) return !1;
                    switch (e) {
                        case "[object String]":
                            return a == String(b);
                        case "[object Number]":
                            return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                        case "[object Date]":
                        case "[object Boolean]":
                            return +a == +b;
                        case "[object RegExp]":
                            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
                    }
                    if ("object" != typeof a || "object" != typeof b) return !1;
                    for (var f = c.length; f--;)
                        if (c[f] == a) return d[f] == b;
                    var g = a.constructor,
                        h = b.constructor;
                    if (g !== h && !(x.isFunction(g) && g instanceof g && x.isFunction(h) && h instanceof h)) return !1;
                    c.push(a), d.push(b);
                    var i = 0,
                        k = !0;
                    if ("[object Array]" == e) {
                        if (i = a.length, k = i == b.length)
                            for (; i-- && (k = F(a[i], b[i], c, d)););
                    } else {
                        for (var l in a)
                            if (x.has(a, l) && (i++, !(k = x.has(b, l) && F(a[l], b[l], c, d)))) break;
                        if (k) {
                            for (l in b)
                                if (x.has(b, l) && !i--) break;
                            k = !i
                        }
                    }
                    return c.pop(), d.pop(), k
                };
                x.isEqual = function(a, b) {
                    return F(a, b, [], [])
                }, x.isEmpty = function(a) {
                    if (null == a) return !0;
                    if (x.isArray(a) || x.isString(a)) return 0 === a.length;
                    for (var b in a)
                        if (x.has(a, b)) return !1;
                    return !0
                }, x.isElement = function(a) {
                    return !(!a || 1 !== a.nodeType)
                }, x.isArray = u || function(a) {
                    return "[object Array]" == j.call(a)
                }, x.isObject = function(a) {
                    return a === Object(a)
                }, y(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(a) {
                    x["is" + a] = function(b) {
                        return j.call(b) == "[object " + a + "]"
                    }
                }), x.isArguments(arguments) || (x.isArguments = function(a) {
                    return !(!a || !x.has(a, "callee"))
                }), "function" != typeof /./ && (x.isFunction = function(a) {
                    return "function" == typeof a
                }), x.isFinite = function(a) {
                    return isFinite(a) && !isNaN(parseFloat(a))
                }, x.isNaN = function(a) {
                    return x.isNumber(a) && a != +a
                }, x.isBoolean = function(a) {
                    return a === !0 || a === !1 || "[object Boolean]" == j.call(a)
                }, x.isNull = function(a) {
                    return null === a
                }, x.isUndefined = function(a) {
                    return void 0 === a
                }, x.has = function(a, b) {
                    return k.call(a, b)
                }, x.noConflict = function() {
                    return a._ = b, this
                }, x.identity = function(a) {
                    return a
                }, x.times = function(a, b, c) {
                    for (var d = Array(Math.max(0, a)), e = 0; a > e; e++) d[e] = b.call(c, e);
                    return d
                }, x.random = function(a, b) {
                    return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
                };
                var G = {
                    escape: {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#x27;"
                    }
                };
                G.unescape = x.invert(G.escape);
                var H = {
                    escape: new RegExp("[" + x.keys(G.escape).join("") + "]", "g"),
                    unescape: new RegExp("(" + x.keys(G.unescape).join("|") + ")", "g")
                };
                x.each(["escape", "unescape"], function(a) {
                    x[a] = function(b) {
                        return null == b ? "" : ("" + b).replace(H[a], function(b) {
                            return G[a][b]
                        })
                    }
                }), x.result = function(a, b) {
                    if (null == a) return void 0;
                    var c = a[b];
                    return x.isFunction(c) ? c.call(a) : c
                }, x.mixin = function(a) {
                    y(x.functions(a), function(b) {
                        var c = x[b] = a[b];
                        x.prototype[b] = function() {
                            var a = [this._wrapped];
                            return g.apply(a, arguments), M.call(this, c.apply(x, a))
                        }
                    })
                };
                var I = 0;
                x.uniqueId = function(a) {
                    var b = ++I + "";
                    return a ? a + b : b
                }, x.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g
                };
                var J = /(.)^/,
                    K = {
                        "'": "'",
                        "\\": "\\",
                        "\r": "r",
                        "\n": "n",
                        "	": "t",
                        "\u2028": "u2028",
                        "\u2029": "u2029"
                    },
                    L = /\\|'|\r|\n|\t|\u2028|\u2029/g;
                x.template = function(a, b, c) {
                    var d;
                    c = x.defaults({}, c, x.templateSettings);
                    var e = new RegExp([(c.escape || J).source, (c.interpolate || J).source, (c.evaluate || J).source].join("|") + "|$", "g"),
                        f = 0,
                        g = "__p+='";
                    a.replace(e, function(b, c, d, e, h) {
                        return g += a.slice(f, h).replace(L, function(a) {
                            return "\\" + K[a]
                        }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b
                    }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
                    try {
                        d = new Function(c.variable || "obj", "_", g)
                    } catch (h) {
                        throw h.source = g, h
                    }
                    if (b) return d(b, x);
                    var i = function(a) {
                        return d.call(this, a, x)
                    };
                    return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i
                }, x.chain = function(a) {
                    return x(a).chain()
                };
                var M = function(a) {
                    return this._chain ? x(a).chain() : a
                };
                x.mixin(x), y(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(a) {
                    var b = d[a];
                    x.prototype[a] = function() {
                        var c = this._wrapped;
                        return b.apply(c, arguments), "shift" != a && "splice" != a || 0 !== c.length || delete c[0], M.call(this, c)
                    }
                }), y(["concat", "join", "slice"], function(a) {
                    var b = d[a];
                    x.prototype[a] = function() {
                        return M.call(this, b.apply(this._wrapped, arguments))
                    }
                }), x.extend(x.prototype, {
                    chain: function() {
                        return this._chain = !0, this
                    },
                    value: function() {
                        return this._wrapped
                    }
                })
            }.call(this), define("underscore", function(a) {
                return function() {
                    var b;
                    return b || a._
                }
            }(this)), ! function(a, b) {
                var c = b.prototype.trim,
                    d = b.prototype.trimRight,
                    e = b.prototype.trimLeft,
                    f = function(a) {
                        return 1 * a || 0
                    },
                    g = function(a, b) {
                        if (1 > b) return "";
                        for (var c = ""; b > 0;) 1 & b && (c += a), b >>= 1, a += a;
                        return c
                    },
                    h = [].slice,
                    i = function(a) {
                        return null == a ? "\\s" : a.source ? a.source : "[" + n.escapeRegExp(a) + "]"
                    },
                    j = {
                        lt: "<",
                        gt: ">",
                        quot: '"',
                        amp: "&",
                        apos: "'"
                    },
                    k = {};
                for (var l in j) k[j[l]] = l;
                k["'"] = "#39";
                var m = function() {
                        function a(a) {
                            return Object.prototype.toString.call(a).slice(8, -1).toLowerCase()
                        }
                        var c = g,
                            d = function() {
                                return d.cache.hasOwnProperty(arguments[0]) || (d.cache[arguments[0]] = d.parse(arguments[0])), d.format.call(null, d.cache[arguments[0]], arguments)
                            };
                        return d.format = function(d, e) {
                            var f, g, h, i, j, k, l, n = 1,
                                o = d.length,
                                p = "",
                                q = [];
                            for (g = 0; o > g; g++)
                                if (p = a(d[g]), "string" === p) q.push(d[g]);
                                else if ("array" === p) {
                                if (i = d[g], i[2])
                                    for (f = e[n], h = 0; h < i[2].length; h++) {
                                        if (!f.hasOwnProperty(i[2][h])) throw new Error(m('[_.sprintf] property "%s" does not exist', i[2][h]));
                                        f = f[i[2][h]]
                                    } else f = i[1] ? e[i[1]] : e[n++];
                                if (/[^s]/.test(i[8]) && "number" != a(f)) throw new Error(m("[_.sprintf] expecting number but found %s", a(f)));
                                switch (i[8]) {
                                    case "b":
                                        f = f.toString(2);
                                        break;
                                    case "c":
                                        f = b.fromCharCode(f);
                                        break;
                                    case "d":
                                        f = parseInt(f, 10);
                                        break;
                                    case "e":
                                        f = i[7] ? f.toExponential(i[7]) : f.toExponential();
                                        break;
                                    case "f":
                                        f = i[7] ? parseFloat(f).toFixed(i[7]) : parseFloat(f);
                                        break;
                                    case "o":
                                        f = f.toString(8);
                                        break;
                                    case "s":
                                        f = (f = b(f)) && i[7] ? f.substring(0, i[7]) : f;
                                        break;
                                    case "u":
                                        f = Math.abs(f);
                                        break;
                                    case "x":
                                        f = f.toString(16);
                                        break;
                                    case "X":
                                        f = f.toString(16).toUpperCase()
                                }
                                f = /[def]/.test(i[8]) && i[3] && f >= 0 ? "+" + f : f, k = i[4] ? "0" == i[4] ? "0" : i[4].charAt(1) : " ", l = i[6] - b(f).length, j = i[6] ? c(k, l) : "", q.push(i[5] ? f + j : j + f)
                            }
                            return q.join("")
                        }, d.cache = {}, d.parse = function(a) {
                            for (var b = a, c = [], d = [], e = 0; b;) {
                                if (null !== (c = /^[^\x25]+/.exec(b))) d.push(c[0]);
                                else if (null !== (c = /^\x25{2}/.exec(b))) d.push("%");
                                else {
                                    if (null === (c = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(b))) throw new Error("[_.sprintf] huh?");
                                    if (c[2]) {
                                        e |= 1;
                                        var f = [],
                                            g = c[2],
                                            h = [];
                                        if (null === (h = /^([a-z_][a-z_\d]*)/i.exec(g))) throw new Error("[_.sprintf] huh?");
                                        for (f.push(h[1]);
                                            "" !== (g = g.substring(h[0].length));)
                                            if (null !== (h = /^\.([a-z_][a-z_\d]*)/i.exec(g))) f.push(h[1]);
                                            else {
                                                if (null === (h = /^\[(\d+)\]/.exec(g))) throw new Error("[_.sprintf] huh?");
                                                f.push(h[1])
                                            }
                                        c[2] = f
                                    } else e |= 2;
                                    if (3 === e) throw new Error("[_.sprintf] mixing positional and named placeholders is not (yet) supported");
                                    d.push(c)
                                }
                                b = b.substring(c[0].length)
                            }
                            return d
                        }, d
                    }(),
                    n = {
                        VERSION: "2.3.1",
                        isBlank: function(a) {
                            return null == a && (a = ""), /^\s*$/.test(a)
                        },
                        stripTags: function(a) {
                            return null == a ? "" : b(a).replace(/<\/?[^>]+>/g, "")
                        },
                        capitalize: function(a) {
                            return a = null == a ? "" : b(a), a.charAt(0).toUpperCase() + a.slice(1)
                        },
                        chop: function(a, c) {
                            return null == a ? [] : (a = b(a), c = ~~c, c > 0 ? a.match(new RegExp(".{1," + c + "}", "g")) : [a])
                        },
                        clean: function(a) {
                            return n.strip(a).replace(/\s+/g, " ")
                        },
                        count: function(a, c) {
                            if (null == a || null == c) return 0;
                            a = b(a), c = b(c);
                            for (var d = 0, e = 0, f = c.length;;) {
                                if (e = a.indexOf(c, e), -1 === e) break;
                                d++, e += f
                            }
                            return d
                        },
                        chars: function(a) {
                            return null == a ? [] : b(a).split("")
                        },
                        swapCase: function(a) {
                            return null == a ? "" : b(a).replace(/\S/g, function(a) {
                                return a === a.toUpperCase() ? a.toLowerCase() : a.toUpperCase()
                            })
                        },
                        escapeHTML: function(a) {
                            return null == a ? "" : b(a).replace(/[&<>"']/g, function(a) {
                                return "&" + k[a] + ";"
                            })
                        },
                        unescapeHTML: function(a) {
                            return null == a ? "" : b(a).replace(/\&([^;]+);/g, function(a, c) {
                                var d;
                                return c in j ? j[c] : (d = c.match(/^#x([\da-fA-F]+)$/)) ? b.fromCharCode(parseInt(d[1], 16)) : (d = c.match(/^#(\d+)$/)) ? b.fromCharCode(~~d[1]) : a
                            })
                        },
                        escapeRegExp: function(a) {
                            return null == a ? "" : b(a).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
                        },
                        splice: function(a, b, c, d) {
                            var e = n.chars(a);
                            return e.splice(~~b, ~~c, d), e.join("")
                        },
                        insert: function(a, b, c) {
                            return n.splice(a, b, 0, c)
                        },
                        include: function(a, c) {
                            return "" === c ? !0 : null == a ? !1 : -1 !== b(a).indexOf(c)
                        },
                        join: function() {
                            var a = h.call(arguments),
                                b = a.shift();
                            return null == b && (b = ""), a.join(b)
                        },
                        lines: function(a) {
                            return null == a ? [] : b(a).split("\n")
                        },
                        reverse: function(a) {
                            return n.chars(a).reverse().join("")
                        },
                        startsWith: function(a, c) {
                            return "" === c ? !0 : null == a || null == c ? !1 : (a = b(a), c = b(c), a.length >= c.length && a.slice(0, c.length) === c)
                        },
                        endsWith: function(a, c) {
                            return "" === c ? !0 : null == a || null == c ? !1 : (a = b(a), c = b(c), a.length >= c.length && a.slice(a.length - c.length) === c)
                        },
                        succ: function(a) {
                            return null == a ? "" : (a = b(a), a.slice(0, -1) + b.fromCharCode(a.charCodeAt(a.length - 1) + 1))
                        },
                        titleize: function(a) {
                            return null == a ? "" : b(a).replace(/(?:^|\s)\S/g, function(a) {
                                return a.toUpperCase()
                            })
                        },
                        camelize: function(a) {
                            return n.trim(a).replace(/[-_\s]+(.)?/g, function(a, b) {
                                return b.toUpperCase()
                            })
                        },
                        underscored: function(a) {
                            return n.trim(a).replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(/[-\s]+/g, "_").toLowerCase()
                        },
                        dasherize: function(a) {
                            return n.trim(a).replace(/([A-Z])/g, "-$1").replace(/[-_\s]+/g, "-").toLowerCase()
                        },
                        classify: function(a) {
                            return n.titleize(b(a).replace(/[\W_]/g, " ")).replace(/\s/g, "")
                        },
                        humanize: function(a) {
                            return n.capitalize(n.underscored(a).replace(/_id$/, "").replace(/_/g, " "))
                        },
                        trim: function(a, d) {
                            return null == a ? "" : !d && c ? c.call(a) : (d = i(d), b(a).replace(new RegExp("^" + d + "+|" + d + "+$", "g"), ""))
                        },
                        ltrim: function(a, c) {
                            return null == a ? "" : !c && e ? e.call(a) : (c = i(c), b(a).replace(new RegExp("^" + c + "+"), ""))
                        },
                        rtrim: function(a, c) {
                            return null == a ? "" : !c && d ? d.call(a) : (c = i(c), b(a).replace(new RegExp(c + "+$"), ""))
                        },
                        truncate: function(a, c, d) {
                            return null == a ? "" : (a = b(a), d = d || "...", c = ~~c, a.length > c ? a.slice(0, c) + d : a)
                        },
                        prune: function(a, c, d) {
                            if (null == a) return "";
                            if (a = b(a), c = ~~c, d = null != d ? b(d) : "...", a.length <= c) return a;
                            var e = function(a) {
                                    return a.toUpperCase() !== a.toLowerCase() ? "A" : " "
                                },
                                f = a.slice(0, c + 1).replace(/.(?=\W*\w*$)/g, e);
                            return f = f.slice(f.length - 2).match(/\w\w/) ? f.replace(/\s*\S+$/, "") : n.rtrim(f.slice(0, f.length - 1)), (f + d).length > a.length ? a : a.slice(0, f.length) + d
                        },
                        words: function(a, b) {
                            return n.isBlank(a) ? [] : n.trim(a, b).split(b || /\s+/)
                        },
                        pad: function(a, c, d, e) {
                            a = null == a ? "" : b(a), c = ~~c;
                            var f = 0;
                            switch (d ? d.length > 1 && (d = d.charAt(0)) : d = " ", e) {
                                case "right":
                                    return f = c - a.length, a + g(d, f);
                                case "both":
                                    return f = c - a.length, g(d, Math.ceil(f / 2)) + a + g(d, Math.floor(f / 2));
                                default:
                                    return f = c - a.length, g(d, f) + a
                            }
                        },
                        lpad: function(a, b, c) {
                            return n.pad(a, b, c)
                        },
                        rpad: function(a, b, c) {
                            return n.pad(a, b, c, "right")
                        },
                        lrpad: function(a, b, c) {
                            return n.pad(a, b, c, "both")
                        },
                        sprintf: m,
                        vsprintf: function(a, b) {
                            return b.unshift(a), m.apply(null, b)
                        },
                        toNumber: function(a, b) {
                            return a ? (a = n.trim(a), a.match(/^-?\d+(?:\.\d+)?$/) ? f(f(a).toFixed(~~b)) : 0 / 0) : 0
                        },
                        numberFormat: function(a, b, c, d) {
                            if (isNaN(a) || null == a) return "";
                            a = a.toFixed(~~b), d = "string" == typeof d ? d : ",";
                            var e = a.split("."),
                                f = e[0],
                                g = e[1] ? (c || ".") + e[1] : "";
                            return f.replace(/(\d)(?=(?:\d{3})+$)/g, "$1" + d) + g
                        },
                        strRight: function(a, c) {
                            if (null == a) return "";
                            a = b(a), c = null != c ? b(c) : c;
                            var d = c ? a.indexOf(c) : -1;
                            return ~d ? a.slice(d + c.length, a.length) : a
                        },
                        strRightBack: function(a, c) {
                            if (null == a) return "";
                            a = b(a), c = null != c ? b(c) : c;
                            var d = c ? a.lastIndexOf(c) : -1;
                            return ~d ? a.slice(d + c.length, a.length) : a
                        },
                        strLeft: function(a, c) {
                            if (null == a) return "";
                            a = b(a), c = null != c ? b(c) : c;
                            var d = c ? a.indexOf(c) : -1;
                            return ~d ? a.slice(0, d) : a
                        },
                        strLeftBack: function(a, b) {
                            if (null == a) return "";
                            a += "", b = null != b ? "" + b : b;
                            var c = a.lastIndexOf(b);
                            return ~c ? a.slice(0, c) : a
                        },
                        toSentence: function(a, b, c, d) {
                            b = b || ", ", c = c || " and ";
                            var e = a.slice(),
                                f = e.pop();
                            return a.length > 2 && d && (c = n.rtrim(b) + c), e.length ? e.join(b) + c + f : f
                        },
                        toSentenceSerial: function() {
                            var a = h.call(arguments);
                            return a[3] = !0, n.toSentence.apply(n, a)
                        },
                        slugify: function(a) {
                            if (null == a) return "";
                            var c = "ąàáäâãåæćęèéëêìíïîłńòóöôõøùúüûñçżź",
                                d = "aaaaaaaaceeeeeiiiilnoooooouuuunczz",
                                e = new RegExp(i(c), "g");
                            return a = b(a).toLowerCase().replace(e, function(a) {
                                var b = c.indexOf(a);
                                return d.charAt(b) || "-"
                            }), n.dasherize(a.replace(/[^\w\s-]/g, ""))
                        },
                        surround: function(a, b) {
                            return [b, a, b].join("")
                        },
                        quote: function(a) {
                            return n.surround(a, '"')
                        },
                        exports: function() {
                            var a = {};
                            for (var b in this) this.hasOwnProperty(b) && !b.match(/^(?:include|contains|reverse)$/) && (a[b] = this[b]);
                            return a
                        },
                        repeat: function(a, c, d) {
                            if (null == a) return "";
                            if (c = ~~c, null == d) return g(b(a), c);
                            for (var e = []; c > 0; e[--c] = a);
                            return e.join(d)
                        },
                        levenshtein: function(a, c) {
                            if (null == a && null == c) return 0;
                            if (null == a) return b(c).length;
                            if (null == c) return b(a).length;
                            a = b(a), c = b(c);
                            for (var d, e, f = [], g = 0; g <= c.length; g++)
                                for (var h = 0; h <= a.length; h++) e = g && h ? a.charAt(h - 1) === c.charAt(g - 1) ? d : Math.min(f[h], f[h - 1], d) + 1 : g + h, d = f[h], f[h] = e;
                            return f.pop()
                        }
                    };
                n.strip = n.trim, n.lstrip = n.ltrim, n.rstrip = n.rtrim, n.center = n.lrpad, n.rjust = n.lpad, n.ljust = n.rpad, n.contains = n.include, n.q = n.quote, "undefined" != typeof exports && ("undefined" != typeof module && module.exports && (module.exports = n), exports._s = n), "function" == typeof define && define.amd && define("underscore.string", [], function() {
                    return n
                }), a._ = a._ || {}, a._.string = a._.str = n
            }(this, String), define("string", function() {}),
            function(a) {
                var b = function(a, c, d) {
                    return 1 === arguments.length ? b.get(a) : b.set(a, c, d)
                };
                b._document = document, b._navigator = navigator, b.defaults = {
                    path: "/"
                }, b.get = function(a) {
                    return b._cachedDocumentCookie !== b._document.cookie && b._renewCache(), b._cache[a]
                }, b.set = function(c, d, e) {
                    return e = b._getExtendedOptions(e), e.expires = b._getExpiresDate(d === a ? -1 : e.expires), b._document.cookie = b._generateCookieString(c, d, e), b
                }, b.expire = function(c, d) {
                    return b.set(c, a, d)
                }, b._getExtendedOptions = function(c) {
                    return {
                        path: c && c.path || b.defaults.path,
                        domain: c && c.domain || b.defaults.domain,
                        expires: c && c.expires || b.defaults.expires,
                        secure: c && c.secure !== a ? c.secure : b.defaults.secure
                    }
                }, b._isValidDate = function(a) {
                    return "[object Date]" === Object.prototype.toString.call(a) && !isNaN(a.getTime())
                }, b._getExpiresDate = function(a, c) {
                    switch (c = c || new Date, typeof a) {
                        case "number":
                            a = new Date(c.getTime() + 1e3 * a);
                            break;
                        case "string":
                            a = new Date(a)
                    }
                    if (a && !b._isValidDate(a)) throw new Error("`expires` parameter cannot be converted to a valid Date instance");
                    return a
                }, b._generateCookieString = function(a, b, c) {
                    a = encodeURIComponent(a), b = (b + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent), c = c || {};
                    var d = a + "=" + b;
                    return d += c.path ? ";path=" + c.path : "", d += c.domain ? ";domain=" + c.domain : "", d += c.expires ? ";expires=" + c.expires.toGMTString() : "", d += c.secure ? ";secure" : ""
                }, b._getCookieObjectFromString = function(c) {
                    for (var d = {}, e = c ? c.split("; ") : [], f = 0; f < e.length; f++) {
                        var g = b._getKeyValuePairFromCookieString(e[f]);
                        d[g.key] === a && (d[g.key] = g.value)
                    }
                    return d
                }, b._getKeyValuePairFromCookieString = function(a) {
                    var b = a.indexOf("=");
                    return b = 0 > b ? a.length : b, {
                        key: decodeURIComponent(a.substr(0, b)),
                        value: decodeURIComponent(a.substr(b + 1))
                    }
                }, b._renewCache = function() {
                    b._cache = b._getCookieObjectFromString(b._document.cookie), b._cachedDocumentCookie = b._document.cookie
                }, b._areEnabled = function() {
                    return b._navigator.cookieEnabled || "1" === b.set("cookies.js", 1).get("cookies.js")
                }, b.enabled = b._areEnabled(), "function" == typeof define && define.amd ? define("cookie", [], function() {
                    return b
                }) : "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = b), exports.Cookies = b) : window.Cookies = b
            }(),
            function(a) {
                "function" == typeof define && define.amd ? define("purl", a) : window.purl = a()
            }(function() {
                function a(a, b) {
                    for (var c = decodeURI(a), d = p[b ? "strict" : "loose"].exec(c), e = {
                            attr: {},
                            param: {},
                            seg: {}
                        }, g = 14; g--;) e.attr[n[g]] = d[g] || "";
                    return e.param.query = f(e.attr.query), e.param.fragment = f(e.attr.fragment), e.seg.path = e.attr.path.replace(/^\/+|\/+$/g, "").split("/"), e.seg.fragment = e.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"), e.attr.base = e.attr.host ? (e.attr.protocol ? e.attr.protocol + "://" + e.attr.host : e.attr.host) + (e.attr.port ? ":" + e.attr.port : "") : "", e
                }

                function b(a) {
                    var b = a.tagName;
                    return "undefined" != typeof b ? m[b.toLowerCase()] : b
                }

                function c(a, b) {
                    if (0 === a[b].length) return a[b] = {};
                    var c = {};
                    for (var d in a[b]) c[d] = a[b][d];
                    return a[b] = c, c
                }

                function d(a, b, e, f) {
                    var g = a.shift();
                    if (g) {
                        var h = b[e] = b[e] || [];
                        "]" == g ? j(h) ? "" !== f && h.push(f) : "object" == typeof h ? h[k(h).length] = f : h = b[e] = [b[e], f] : ~g.indexOf("]") ? (g = g.substr(0, g.length - 1), !q.test(g) && j(h) && (h = c(b, e)), d(a, h, g, f)) : (!q.test(g) && j(h) && (h = c(b, e)), d(a, h, g, f))
                    } else j(b[e]) ? b[e].push(f) : b[e] = "object" == typeof b[e] ? f : "undefined" == typeof b[e] ? f : [b[e], f]
                }

                function e(a, b, c) {
                    if (~b.indexOf("]")) {
                        var e = b.split("[");
                        d(e, a, "base", c)
                    } else {
                        if (!q.test(b) && j(a.base)) {
                            var f = {};
                            for (var h in a.base) f[h] = a.base[h];
                            a.base = f
                        }
                        "" !== b && g(a.base, b, c)
                    }
                    return a
                }

                function f(a) {
                    return i(String(a).split(/&|;/), function(a, b) {
                        try {
                            b = decodeURIComponent(b.replace(/\+/g, " "))
                        } catch (c) {}
                        var d = b.indexOf("="),
                            f = h(b),
                            g = b.substr(0, f || d),
                            i = b.substr(f || d, b.length);
                        return i = i.substr(i.indexOf("=") + 1, i.length), "" === g && (g = b, i = ""), e(a, g, i)
                    }, {
                        base: {}
                    }).base
                }

                function g(a, b, c) {
                    var d = a[b];
                    "undefined" == typeof d ? a[b] = c : j(d) ? d.push(c) : a[b] = [d, c]
                }

                function h(a) {
                    for (var b, c, d = a.length, e = 0; d > e; ++e)
                        if (c = a[e], "]" == c && (b = !1), "[" == c && (b = !0), "=" == c && !b) return e
                }

                function i(a, b) {
                    for (var c = 0, d = a.length >> 0, e = arguments[2]; d > c;) c in a && (e = b.call(void 0, e, a[c], c, a)), ++c;
                    return e
                }

                function j(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                }

                function k(a) {
                    var b = [];
                    for (var c in a) a.hasOwnProperty(c) && b.push(c);
                    return b
                }

                function l(b, c) {
                    return 1 === arguments.length && b === !0 && (c = !0, b = void 0), c = c || !1, b = b || window.location.toString(), {
                        data: a(b, c),
                        attr: function(a) {
                            return a = o[a] || a, "undefined" != typeof a ? this.data.attr[a] : this.data.attr
                        },
                        param: function(a) {
                            return "undefined" != typeof a ? this.data.param.query[a] : this.data.param.query
                        },
                        fparam: function(a) {
                            return "undefined" != typeof a ? this.data.param.fragment[a] : this.data.param.fragment
                        },
                        segment: function(a) {
                            return "undefined" == typeof a ? this.data.seg.path : (a = 0 > a ? this.data.seg.path.length + a : a - 1, this.data.seg.path[a])
                        },
                        fsegment: function(a) {
                            return "undefined" == typeof a ? this.data.seg.fragment : (a = 0 > a ? this.data.seg.fragment.length + a : a - 1, this.data.seg.fragment[a])
                        }
                    }
                }
                var m = {
                        a: "href",
                        img: "src",
                        form: "action",
                        base: "href",
                        script: "src",
                        iframe: "src",
                        link: "href"
                    },
                    n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"],
                    o = {
                        anchor: "fragment"
                    },
                    p = {
                        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
                    },
                    q = /^[0-9]+$/;
                return l.jQuery = function(a) {
                    null != a && (a.fn.url = function(c) {
                        var d = "";
                        return this.length && (d = a(this).attr(b(this[0])) || ""), l(d, c)
                    }, a.url = l)
                }, l.jQuery(window.jQuery), l
            }),
            function() {
                var a = "undefined" != typeof window ? window : exports,
                    b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                    c = function() {
                        try {
                            document.createElement("$")
                        } catch (a) {
                            return a
                        }
                    }();
                a.btoa || (a.btoa = function(a) {
                    for (var d, e, f = 0, g = b, h = ""; a.charAt(0 | f) || (g = "=", f % 1); h += g.charAt(63 & d >> 8 - f % 1 * 8)) {
                        if (e = a.charCodeAt(f += .75), e > 255) throw c;
                        d = d << 8 | e
                    }
                    return h
                }), a.atob || (a.atob = function(a) {
                    if (a = a.replace(/=+$/, ""), a.length % 4 == 1) throw c;
                    for (var d, e, f = 0, g = 0, h = ""; e = a.charAt(g++); ~e && (d = f % 4 ? 64 * d + e : e, f++ % 4) ? h += String.fromCharCode(255 & d >> (-2 * f & 6)) : 0) e = b.indexOf(e);
                    return h
                })
            }(), define("base64", function() {}),
            function() {
                var a, b = this,
                    c = b.Backbone,
                    d = [],
                    e = d.push,
                    f = d.slice,
                    g = d.splice;
                a = "undefined" != typeof exports ? exports : b.Backbone = {}, a.VERSION = "0.9.9";
                var h = b._;
                h || "undefined" == typeof require || (h = require("underscore")), a.$ = b.jQuery || b.Zepto || b.ender, a.noConflict = function() {
                    return b.Backbone = c, this
                }, a.emulateHTTP = !1, a.emulateJSON = !1;
                var i = /\s+/,
                    j = function(a, b, c, d) {
                        if (!c) return !0;
                        if ("object" == typeof c)
                            for (var e in c) a[b].apply(a, [e, c[e]].concat(d));
                        else {
                            if (!i.test(c)) return !0;
                            for (var f = c.split(i), g = 0, h = f.length; h > g; g++) a[b].apply(a, [f[g]].concat(d))
                        }
                    },
                    k = function(a, b, c) {
                        var d, e = -1,
                            f = b.length;
                        switch (c.length) {
                            case 0:
                                for (; ++e < f;)(d = b[e]).callback.call(d.ctx);
                                return;
                            case 1:
                                for (; ++e < f;)(d = b[e]).callback.call(d.ctx, c[0]);
                                return;
                            case 2:
                                for (; ++e < f;)(d = b[e]).callback.call(d.ctx, c[0], c[1]);
                                return;
                            case 3:
                                for (; ++e < f;)(d = b[e]).callback.call(d.ctx, c[0], c[1], c[2]);
                                return;
                            default:
                                for (; ++e < f;)(d = b[e]).callback.apply(d.ctx, c)
                        }
                    },
                    l = a.Events = {
                        on: function(a, b, c) {
                            if (!j(this, "on", a, [b, c]) || !b) return this;
                            this._events || (this._events = {});
                            var d = this._events[a] || (this._events[a] = []);
                            return d.push({
                                callback: b,
                                context: c,
                                ctx: c || this
                            }), this
                        },
                        once: function(a, b, c) {
                            if (!j(this, "once", a, [b, c]) || !b) return this;
                            var d = this,
                                e = h.once(function() {
                                    d.off(a, e), b.apply(this, arguments)
                                });
                            return e._callback = b, this.on(a, e, c), this
                        },
                        off: function(a, b, c) {
                            var d, e, f, g, i, k, l, m;
                            if (!this._events || !j(this, "off", a, [b, c])) return this;
                            if (!a && !b && !c) return this._events = {}, this;
                            for (g = a ? [a] : h.keys(this._events), i = 0, k = g.length; k > i; i++)
                                if (a = g[i], d = this._events[a]) {
                                    if (f = [], b || c)
                                        for (l = 0, m = d.length; m > l; l++) e = d[l], (b && b !== (e.callback._callback || e.callback) || c && c !== e.context) && f.push(e);
                                    this._events[a] = f
                                }
                            return this
                        },
                        trigger: function(a) {
                            if (!this._events) return this;
                            var b = f.call(arguments, 1);
                            if (!j(this, "trigger", a, b)) return this;
                            var c = this._events[a],
                                d = this._events.all;
                            return c && k(this, c, b), d && k(this, d, arguments), this
                        },
                        listenTo: function(a, b, c) {
                            var d = this._listeners || (this._listeners = {}),
                                e = a._listenerId || (a._listenerId = h.uniqueId("l"));
                            return d[e] = a, a.on(b, c || this, this), this
                        },
                        stopListening: function(a, b, c) {
                            var d = this._listeners;
                            if (d) {
                                if (a) a.off(b, c, this), b || c || delete d[a._listenerId];
                                else {
                                    for (var e in d) d[e].off(null, null, this);
                                    this._listeners = {}
                                }
                                return this
                            }
                        }
                    };
                l.bind = l.on, l.unbind = l.off, h.extend(a, l);
                var m = a.Model = function(a, b) {
                    var c, d = a || {};
                    this.cid = h.uniqueId("c"), this.changed = {}, this.attributes = {}, this._changes = [], b && b.collection && (this.collection = b.collection), b && b.parse && (d = this.parse(d)), (c = h.result(this, "defaults")) && h.defaults(d, c), this.set(d, {
                        silent: !0
                    }), this._currentAttributes = h.clone(this.attributes), this._previousAttributes = h.clone(this.attributes), this.initialize.apply(this, arguments)
                };
                h.extend(m.prototype, l, {
                    changed: null,
                    idAttribute: "id",
                    initialize: function() {},
                    toJSON: function() {
                        return h.clone(this.attributes)
                    },
                    sync: function() {
                        return a.sync.apply(this, arguments)
                    },
                    get: function(a) {
                        return this.attributes[a]
                    },
                    escape: function(a) {
                        return h.escape(this.get(a))
                    },
                    has: function(a) {
                        return null != this.get(a)
                    },
                    set: function(a, b, c) {
                        var d, e;
                        if (null == a) return this;
                        h.isObject(a) ? (e = a, c = b) : (e = {})[a] = b;
                        var f = c && c.silent,
                            g = c && c.unset;
                        if (!this._validate(e, c)) return !1;
                        this.idAttribute in e && (this.id = e[this.idAttribute]);
                        var i = this.attributes;
                        for (d in e) b = e[d], g ? delete i[d] : i[d] = b, this._changes.push(d, b);
                        return this._hasComputed = !1, f || this.change(c), this
                    },
                    unset: function(a, b) {
                        return this.set(a, void 0, h.extend({}, b, {
                            unset: !0
                        }))
                    },
                    clear: function(a) {
                        var b = {};
                        for (var c in this.attributes) b[c] = void 0;
                        return this.set(b, h.extend({}, a, {
                            unset: !0
                        }))
                    },
                    fetch: function(a) {
                        a = a ? h.clone(a) : {}, void 0 === a.parse && (a.parse = !0);
                        var b = this,
                            c = a.success;
                        return a.success = function(d) {
                            return b.set(b.parse(d), a) ? void(c && c(b, d, a)) : !1
                        }, this.sync("read", this, a)
                    },
                    save: function(a, b, c) {
                        var d, e, f;
                        if (null == a || h.isObject(a) ? (d = a, c = b) : null != a && ((d = {})[a] = b), c = c ? h.clone(c) : {}, c.wait) {
                            if (d && !this._validate(d, c)) return !1;
                            e = h.clone(this.attributes)
                        }
                        var g = h.extend({}, c, {
                            silent: !0
                        });
                        if (d && !this.set(d, c.wait ? g : c)) return !1;
                        if (!d && !this._validate(null, c)) return !1;
                        var i = this,
                            j = c.success;
                        c.success = function(a) {
                            f = !0;
                            var b = i.parse(a);
                            return c.wait && (b = h.extend(d || {}, b)), i.set(b, c) ? void(j && j(i, a, c)) : !1
                        };
                        var k = this.isNew() ? "create" : c.patch ? "patch" : "update";
                        "patch" == k && (c.attrs = d);
                        var l = this.sync(k, this, c);
                        return !f && c.wait && (this.clear(g), this.set(e, g)), l
                    },
                    destroy: function(a) {
                        a = a ? h.clone(a) : {};
                        var b = this,
                            c = a.success,
                            d = function() {
                                b.trigger("destroy", b, b.collection, a)
                            };
                        if (a.success = function(e) {
                                (a.wait || b.isNew()) && d(), c && c(b, e, a)
                            }, this.isNew()) return a.success(), !1;
                        var e = this.sync("delete", this, a);
                        return a.wait || d(), e
                    },
                    url: function() {
                        var a = h.result(this, "urlRoot") || h.result(this.collection, "url") || F();
                        return this.isNew() ? a : a + ("/" === a.charAt(a.length - 1) ? "" : "/") + encodeURIComponent(this.id)
                    },
                    parse: function(a) {
                        return a
                    },
                    clone: function() {
                        return new this.constructor(this.attributes)
                    },
                    isNew: function() {
                        return null == this.id
                    },
                    change: function(a) {
                        var b = this._changing;
                        this._changing = !0;
                        var c = this._computeChanges(!0);
                        this._pending = !!c.length;
                        for (var d = c.length - 2; d >= 0; d -= 2) this.trigger("change:" + c[d], this, c[d + 1], a);
                        if (b) return this;
                        for (; this._pending;) this._pending = !1, this.trigger("change", this, a), this._previousAttributes = h.clone(this.attributes);
                        return this._changing = !1, this
                    },
                    hasChanged: function(a) {
                        return this._hasComputed || this._computeChanges(), null == a ? !h.isEmpty(this.changed) : h.has(this.changed, a)
                    },
                    changedAttributes: function(a) {
                        if (!a) return this.hasChanged() ? h.clone(this.changed) : !1;
                        var b, c = !1,
                            d = this._previousAttributes;
                        for (var e in a) h.isEqual(d[e], b = a[e]) || ((c || (c = {}))[e] = b);
                        return c
                    },
                    _computeChanges: function(a) {
                        this.changed = {};
                        for (var b = {}, c = [], d = this._currentAttributes, e = this._changes, f = e.length - 2; f >= 0; f -= 2) {
                            var g = e[f],
                                h = e[f + 1];
                            if (!b[g] && (b[g] = !0, d[g] !== h)) {
                                if (this.changed[g] = h, !a) continue;
                                c.push(g, h), d[g] = h
                            }
                        }
                        return a && (this._changes = []), this._hasComputed = !0, c
                    },
                    previous: function(a) {
                        return null != a && this._previousAttributes ? this._previousAttributes[a] : null
                    },
                    previousAttributes: function() {
                        return h.clone(this._previousAttributes)
                    },
                    _validate: function(a, b) {
                        if (!this.validate) return !0;
                        a = h.extend({}, this.attributes, a);
                        var c = this.validate(a, b);
                        return c ? (b && b.error && b.error(this, c, b), this.trigger("error", this, c, b), !1) : !0
                    }
                });
                var n = a.Collection = function(a, b) {
                    b || (b = {}), b.model && (this.model = b.model), void 0 !== b.comparator && (this.comparator = b.comparator), this._reset(), this.initialize.apply(this, arguments), a && this.reset(a, h.extend({
                        silent: !0
                    }, b))
                };
                h.extend(n.prototype, l, {
                    model: m,
                    initialize: function() {},
                    toJSON: function(a) {
                        return this.map(function(b) {
                            return b.toJSON(a)
                        })
                    },
                    sync: function() {
                        return a.sync.apply(this, arguments)
                    },
                    add: function(a, b) {
                        var c, d, f, i, j, k = b && b.at,
                            l = null == (b && b.sort) ? !0 : b.sort;
                        for (a = h.isArray(a) ? a.slice() : [a], c = a.length - 1; c >= 0; c--)(f = this._prepareModel(a[c], b)) ? (a[c] = f, i = null != f.id && this._byId[f.id], i || this._byCid[f.cid] ? (b && b.merge && i && (i.set(f.attributes, b), j = l), a.splice(c, 1)) : (f.on("all", this._onModelEvent, this), this._byCid[f.cid] = f, null != f.id && (this._byId[f.id] = f))) : (this.trigger("error", this, a[c], b), a.splice(c, 1));
                        if (a.length && (j = l), this.length += a.length, d = [null != k ? k : this.models.length, 0], e.apply(d, a), g.apply(this.models, d), j && this.comparator && null == k && this.sort({
                                silent: !0
                            }), b && b.silent) return this;
                        for (; f = a.shift();) f.trigger("add", f, this, b);
                        return this
                    },
                    remove: function(a, b) {
                        var c, d, e, f;
                        for (b || (b = {}), a = h.isArray(a) ? a.slice() : [a], c = 0, d = a.length; d > c; c++) f = this.get(a[c]), f && (delete this._byId[f.id], delete this._byCid[f.cid], e = this.indexOf(f), this.models.splice(e, 1), this.length--, b.silent || (b.index = e, f.trigger("remove", f, this, b)), this._removeReference(f));
                        return this
                    },
                    push: function(a, b) {
                        return a = this._prepareModel(a, b), this.add(a, h.extend({
                            at: this.length
                        }, b)), a
                    },
                    pop: function(a) {
                        var b = this.at(this.length - 1);
                        return this.remove(b, a), b
                    },
                    unshift: function(a, b) {
                        return a = this._prepareModel(a, b), this.add(a, h.extend({
                            at: 0
                        }, b)), a
                    },
                    shift: function(a) {
                        var b = this.at(0);
                        return this.remove(b, a), b
                    },
                    slice: function(a, b) {
                        return this.models.slice(a, b)
                    },
                    get: function(a) {
                        return null == a ? void 0 : this._byId[null != a.id ? a.id : a] || this._byCid[a.cid || a]
                    },
                    at: function(a) {
                        return this.models[a]
                    },
                    where: function(a) {
                        return h.isEmpty(a) ? [] : this.filter(function(b) {
                            for (var c in a)
                                if (a[c] !== b.get(c)) return !1;
                            return !0
                        })
                    },
                    sort: function(a) {
                        if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                        return h.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(h.bind(this.comparator, this)), a && a.silent || this.trigger("sort", this, a), this
                    },
                    pluck: function(a) {
                        return h.invoke(this.models, "get", a)
                    },
                    update: function(a, b) {
                        var c, d, e, f, g = [],
                            i = [],
                            j = {},
                            k = this.model.prototype.idAttribute;
                        if (b = h.extend({
                                add: !0,
                                merge: !0,
                                remove: !0
                            }, b), b.parse && (a = this.parse(a)), h.isArray(a) || (a = a ? [a] : []), b.add && !b.remove) return this.add(a, b);
                        for (d = 0, e = a.length; e > d; d++) c = a[d], f = this.get(c.id || c.cid || c[k]), b.remove && f && (j[f.cid] = !0), (b.add && !f || b.merge && f) && g.push(c);
                        if (b.remove)
                            for (d = 0, e = this.models.length; e > d; d++) c = this.models[d], j[c.cid] || i.push(c);
                        return i.length && this.remove(i, b), g.length && this.add(g, b), this
                    },
                    reset: function(a, b) {
                        b || (b = {}), b.parse && (a = this.parse(a));
                        for (var c = 0, d = this.models.length; d > c; c++) this._removeReference(this.models[c]);
                        return b.previousModels = this.models, this._reset(), a && this.add(a, h.extend({
                            silent: !0
                        }, b)), b.silent || this.trigger("reset", this, b), this
                    },
                    fetch: function(a) {
                        a = a ? h.clone(a) : {}, void 0 === a.parse && (a.parse = !0);
                        var b = this,
                            c = a.success;
                        return a.success = function(d) {
                            var e = a.update ? "update" : "reset";
                            b[e](d, a), c && c(b, d, a)
                        }, this.sync("read", this, a)
                    },
                    create: function(a, b) {
                        var c = this;
                        if (b = b ? h.clone(b) : {}, a = this._prepareModel(a, b), !a) return !1;
                        b.wait || c.add(a, b);
                        var d = b.success;
                        return b.success = function(a, b, e) {
                            e.wait && c.add(a, e), d && d(a, b, e)
                        }, a.save(null, b), a
                    },
                    parse: function(a) {
                        return a
                    },
                    clone: function() {
                        return new this.constructor(this.models)
                    },
                    chain: function() {
                        return h(this.models).chain()
                    },
                    _reset: function() {
                        this.length = 0, this.models = [], this._byId = {}, this._byCid = {}
                    },
                    _prepareModel: function(a, b) {
                        if (a instanceof m) return a.collection || (a.collection = this), a;
                        b || (b = {}), b.collection = this;
                        var c = new this.model(a, b);
                        return c._validate(a, b) ? c : !1
                    },
                    _removeReference: function(a) {
                        this === a.collection && delete a.collection, a.off("all", this._onModelEvent, this)
                    },
                    _onModelEvent: function(a, b, c, d) {
                        ("add" !== a && "remove" !== a || c === this) && ("destroy" === a && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], null != b.id && (this._byId[b.id] = b)), this.trigger.apply(this, arguments))
                    }
                });
                var o = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortedIndex", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty"];
                h.each(o, function(a) {
                    n.prototype[a] = function() {
                        var b = f.call(arguments);
                        return b.unshift(this.models), h[a].apply(h, b)
                    }
                });
                var p = ["groupBy", "countBy", "sortBy"];
                h.each(p, function(a) {
                    n.prototype[a] = function(b, c) {
                        var d = h.isFunction(b) ? b : function(a) {
                            return a.get(b)
                        };
                        return h[a](this.models, d, c)
                    }
                });
                var q = a.Router = function(a) {
                        a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
                    },
                    r = /\((.*?)\)/g,
                    s = /:\w+/g,
                    t = /\*\w+/g,
                    u = /[\-{}\[\]+?.,\\\^$|#\s]/g;
                h.extend(q.prototype, l, {
                    initialize: function() {},
                    route: function(b, c, d) {
                        return h.isRegExp(b) || (b = this._routeToRegExp(b)), d || (d = this[c]), a.history.route(b, h.bind(function(e) {
                            var f = this._extractParameters(b, e);
                            d && d.apply(this, f), this.trigger.apply(this, ["route:" + c].concat(f)), a.history.trigger("route", this, c, f)
                        }, this)), this
                    },
                    navigate: function(b, c) {
                        return a.history.navigate(b, c), this
                    },
                    _bindRoutes: function() {
                        if (this.routes)
                            for (var a, b = h.keys(this.routes); null != (a = b.pop());) this.route(a, this.routes[a])
                    },
                    _routeToRegExp: function(a) {
                        return a = a.replace(u, "\\$&").replace(r, "(?:$1)?").replace(s, "([^/]+)").replace(t, "(.*?)"), new RegExp("^" + a + "$")
                    },
                    _extractParameters: function(a, b) {
                        return a.exec(b).slice(1)
                    }
                });
                var v = a.History = function() {
                        this.handlers = [], h.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
                    },
                    w = /^[#\/]|\s+$/g,
                    x = /^\/+|\/+$/g,
                    y = /msie [\w.]+/,
                    z = /\/$/;
                v.started = !1, h.extend(v.prototype, l, {
                    interval: 50,
                    getHash: function(a) {
                        var b = (a || this).location.href.match(/#(.*)$/);
                        return b ? b[1] : ""
                    },
                    getFragment: function(a, b) {
                        if (null == a)
                            if (this._hasPushState || !this._wantsHashChange || b) {
                                a = this.location.pathname;
                                var c = this.root.replace(z, "");
                                a.indexOf(c) || (a = a.substr(c.length))
                            } else a = this.getHash();
                        return a.replace(w, "")
                    },
                    start: function(b) {
                        if (v.started) throw new Error("Backbone.history has already been started");
                        v.started = !0, this.options = h.extend({}, {
                            root: "/"
                        }, this.options, b), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                        var c = this.getFragment(),
                            d = document.documentMode,
                            e = y.exec(navigator.userAgent.toLowerCase()) && (!d || 7 >= d);
                        this.root = ("/" + this.root + "/").replace(x, "/"), e && this._wantsHashChange && (this.iframe = a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(c)), this._hasPushState ? a.$(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !e ? a.$(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = c;
                        var f = this.location,
                            g = f.pathname.replace(/[^\/]$/, "$&/") === this.root;
                        return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !g ? (this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && g && f.hash && (this.fragment = this.getHash().replace(w, ""), this.history.replaceState({}, document.title, this.root + this.fragment + f.search)), this.options.silent ? void 0 : this.loadUrl())
                    },
                    stop: function() {
                        a.$(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), v.started = !1
                    },
                    route: function(a, b) {
                        this.handlers.unshift({
                            route: a,
                            callback: b
                        })
                    },
                    checkUrl: function() {
                        var a = this.getFragment();
                        return a === this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe))), a === this.fragment ? !1 : (this.iframe && this.navigate(a), void(this.loadUrl() || this.loadUrl(this.getHash())))
                    },
                    loadUrl: function(a) {
                        var b = this.fragment = this.getFragment(a),
                            c = h.any(this.handlers, function(a) {
                                return a.route.test(b) ? (a.callback(b), !0) : void 0
                            });
                        return c
                    },
                    navigate: function(a, b) {
                        if (!v.started) return !1;
                        if (b && b !== !0 || (b = {
                                trigger: b
                            }), a = this.getFragment(a || ""), this.fragment !== a) {
                            this.fragment = a;
                            var c = this.root + a;
                            if (this._hasPushState) this.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c);
                            else {
                                if (!this._wantsHashChange) return this.location.assign(c);
                                this._updateHash(this.location, a, b.replace), this.iframe && a !== this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, a, b.replace))
                            }
                            b.trigger && this.loadUrl(a)
                        }
                    },
                    _updateHash: function(a, b, c) {
                        if (c) {
                            var d = a.href.replace(/(javascript:|#).*$/, "");
                            a.replace(d + "#" + b)
                        } else a.hash = "#" + b
                    }
                }), a.history = new v;
                var A = a.View = function(a) {
                        this.cid = h.uniqueId("view"), this._configure(a || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
                    },
                    B = /^(\S+)\s*(.*)$/,
                    C = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
                h.extend(A.prototype, l, {
                    tagName: "div",
                    $: function(a) {
                        return this.$el.find(a)
                    },
                    initialize: function() {},
                    render: function() {
                        return this
                    },
                    remove: function() {
                        return this.$el.remove(), this.stopListening(), this
                    },
                    make: function(b, c, d) {
                        var e = document.createElement(b);
                        return c && a.$(e).attr(c), null != d && a.$(e).html(d), e
                    },
                    setElement: function(b, c) {
                        return this.$el && this.undelegateEvents(), this.$el = b instanceof a.$ ? b : a.$(b), this.el = this.$el[0], c !== !1 && this.delegateEvents(), this
                    },
                    delegateEvents: function(a) {
                        if (a || (a = h.result(this, "events"))) {
                            this.undelegateEvents();
                            for (var b in a) {
                                var c = a[b];
                                if (h.isFunction(c) || (c = this[a[b]]), !c) throw new Error('Method "' + a[b] + '" does not exist');
                                var d = b.match(B),
                                    e = d[1],
                                    f = d[2];
                                c = h.bind(c, this), e += ".delegateEvents" + this.cid, "" === f ? this.$el.bind(e, c) : this.$el.delegate(f, e, c)
                            }
                        }
                    },
                    undelegateEvents: function() {
                        this.$el.unbind(".delegateEvents" + this.cid)
                    },
                    _configure: function(a) {
                        this.options && (a = h.extend({}, h.result(this, "options"), a)), h.extend(this, h.pick(a, C)), this.options = a
                    },
                    _ensureElement: function() {
                        if (this.el) this.setElement(h.result(this, "el"), !1);
                        else {
                            var a = h.extend({}, h.result(this, "attributes"));
                            this.id && (a.id = h.result(this, "id")), this.className && (a["class"] = h.result(this, "className")), this.setElement(this.make(h.result(this, "tagName"), a), !1)
                        }
                    }
                });
                var D = {
                    create: "POST",
                    update: "PUT",
                    patch: "PATCH",
                    "delete": "DELETE",
                    read: "GET"
                };
                a.sync = function(b, c, d) {
                    var e = D[b];
                    h.defaults(d || (d = {}), {
                        emulateHTTP: a.emulateHTTP,
                        emulateJSON: a.emulateJSON
                    });
                    var f = {
                        type: e,
                        dataType: "json"
                    };
                    if (d.url || (f.url = h.result(c, "url") || F()), null != d.data || !c || "create" !== b && "update" !== b && "patch" !== b || (f.contentType = "application/json", f.data = JSON.stringify(d.attrs || c.toJSON(d))), d.emulateJSON && (f.contentType = "application/x-www-form-urlencoded", f.data = f.data ? {
                            model: f.data
                        } : {}), d.emulateHTTP && ("PUT" === e || "DELETE" === e || "PATCH" === e)) {
                        f.type = "POST", d.emulateJSON && (f.data._method = e);
                        var g = d.beforeSend;
                        d.beforeSend = function(a) {
                            return a.setRequestHeader("X-HTTP-Method-Override", e), g ? g.apply(this, arguments) : void 0
                        }
                    }
                    "GET" === f.type || d.emulateJSON || (f.processData = !1);
                    var i = d.success;
                    d.success = function(a, b, e) {
                        i && i(a, b, e), c.trigger("sync", c, a, d)
                    };
                    var j = d.error;
                    d.error = function(a) {
                        j && j(c, a, d), c.trigger("error", c, a, d)
                    };
                    var k = a.ajax(h.extend(f, d));
                    return c.trigger("request", c, k, d), k
                }, a.ajax = function() {
                    return a.$.ajax.apply(a.$, arguments)
                };
                var E = function(a, b) {
                    var c, d = this;
                    c = a && h.has(a, "constructor") ? a.constructor : function() {
                        d.apply(this, arguments)
                    }, h.extend(c, d, b);
                    var e = function() {
                        this.constructor = c
                    };
                    return e.prototype = d.prototype, c.prototype = new e, a && h.extend(c.prototype, a), c.__super__ = d.prototype, c
                };
                m.extend = n.extend = q.extend = A.extend = v.extend = E;
                var F = function() {
                    throw new Error('A "url" property or function must be specified')
                }
            }.call(this), define("backbone", ["underscore", "jquery"], function(a) {
                return function() {
                    var b;
                    return b || a.Backbone
                }
            }(this)), define("text", ["module"], function(a) {
                var b, c, d, e, f, g = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
                    h = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
                    i = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
                    j = "undefined" != typeof location && location.href,
                    k = j && location.protocol && location.protocol.replace(/\:/, ""),
                    l = j && location.hostname,
                    m = j && (location.port || void 0),
                    n = {},
                    o = a.config && a.config() || {};
                return b = {
                    version: "2.0.12",
                    strip: function(a) {
                        if (a) {
                            a = a.replace(h, "");
                            var b = a.match(i);
                            b && (a = b[1])
                        } else a = "";
                        return a
                    },
                    jsEscape: function(a) {
                        return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
                    },
                    createXhr: o.createXhr || function() {
                        var a, b, c;
                        if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
                        if ("undefined" != typeof ActiveXObject)
                            for (b = 0; 3 > b; b += 1) {
                                c = g[b];
                                try {
                                    a = new ActiveXObject(c)
                                } catch (d) {}
                                if (a) {
                                    g = [c];
                                    break
                                }
                            }
                        return a
                    },
                    parseName: function(a) {
                        var b, c, d, e = !1,
                            f = a.indexOf("."),
                            g = 0 === a.indexOf("./") || 0 === a.indexOf("../");
                        return -1 !== f && (!g || f > 1) ? (b = a.substring(0, f), c = a.substring(f + 1, a.length)) : b = a, d = c || b, f = d.indexOf("!"), -1 !== f && (e = "strip" === d.substring(f + 1), d = d.substring(0, f), c ? c = d : b = d), {
                            moduleName: b,
                            ext: c,
                            strip: e
                        }
                    },
                    xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
                    useXhr: function(a, c, d, e) {
                        var f, g, h, i = b.xdRegExp.exec(a);
                        return i ? (f = i[2], g = i[3], g = g.split(":"), h = g[1], g = g[0], !(f && f !== c || g && g.toLowerCase() !== d.toLowerCase() || (h || g) && h !== e)) : !0
                    },
                    finishLoad: function(a, c, d, e) {
                        d = c ? b.strip(d) : d, o.isBuild && (n[a] = d), e(d)
                    },
                    load: function(a, c, d, e) {
                        if (e && e.isBuild && !e.inlineText) return void d();
                        o.isBuild = e && e.isBuild;
                        var f = b.parseName(a),
                            g = f.moduleName + (f.ext ? "." + f.ext : ""),
                            h = c.toUrl(g),
                            i = o.useXhr || b.useXhr;
                        return 0 === h.indexOf("empty:") ? void d() : void(!j || i(h, k, l, m) ? b.get(h, function(c) {
                            b.finishLoad(a, f.strip, c, d)
                        }, function(a) {
                            d.error && d.error(a)
                        }) : c([g], function(a) {
                            b.finishLoad(f.moduleName + "." + f.ext, f.strip, a, d)
                        }))
                    },
                    write: function(a, c, d) {
                        if (n.hasOwnProperty(c)) {
                            var e = b.jsEscape(n[c]);
                            d.asModule(a + "!" + c, "define(function () { return '" + e + "';});\n")
                        }
                    },
                    writeFile: function(a, c, d, e, f) {
                        var g = b.parseName(c),
                            h = g.ext ? "." + g.ext : "",
                            i = g.moduleName + h,
                            j = d.toUrl(g.moduleName + h) + ".js";
                        b.load(i, d, function() {
                            var c = function(a) {
                                return e(j, a)
                            };
                            c.asModule = function(a, b) {
                                return e.asModule(a, j, b)
                            }, b.write(a, i, c, f)
                        }, f)
                    }
                }, "node" === o.env || !o.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] ? (c = require.nodeRequire("fs"), b.get = function(a, b, d) {
                    try {
                        var e = c.readFileSync(a, "utf8");
                        0 === e.indexOf("﻿") && (e = e.substring(1)), b(e)
                    } catch (f) {
                        d && d(f)
                    }
                }) : "xhr" === o.env || !o.env && b.createXhr() ? b.get = function(a, c, d, e) {
                    var f, g = b.createXhr();
                    if (g.open("GET", a, !0), e)
                        for (f in e) e.hasOwnProperty(f) && g.setRequestHeader(f.toLowerCase(), e[f]);
                    o.onXhr && o.onXhr(g, a), g.onreadystatechange = function() {
                        var b, e;
                        4 === g.readyState && (b = g.status || 0, b > 399 && 600 > b ? (e = new Error(a + " HTTP status: " + b), e.xhr = g, d && d(e)) : c(g.responseText), o.onXhrComplete && o.onXhrComplete(g, a))
                    }, g.send(null)
                } : "rhino" === o.env || !o.env && "undefined" != typeof Packages && "undefined" != typeof java ? b.get = function(a, b) {
                    var c, d, e = "utf-8",
                        f = new java.io.File(a),
                        g = java.lang.System.getProperty("line.separator"),
                        h = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f), e)),
                        i = "";
                    try {
                        for (c = new java.lang.StringBuffer, d = h.readLine(), d && d.length() && 65279 === d.charAt(0) && (d = d.substring(1)), null !== d && c.append(d); null !== (d = h.readLine());) c.append(g), c.append(d);
                        i = String(c.toString())
                    } finally {
                        h.close()
                    }
                    b(i)
                } : ("xpconnect" === o.env || !o.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (d = Components.classes, e = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), f = "@mozilla.org/windows-registry-key;1" in d, b.get = function(a, b) {
                    var c, g, h, i = {};
                    f && (a = a.replace(/\//g, "\\")), h = new FileUtils.File(a);
                    try {
                        c = d["@mozilla.org/network/file-input-stream;1"].createInstance(e.nsIFileInputStream), c.init(h, 1, 0, !1), g = d["@mozilla.org/intl/converter-input-stream;1"].createInstance(e.nsIConverterInputStream), g.init(c, "utf-8", c.available(), e.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), g.readString(c.available(), i), g.close(), c.close(), b(i.value)
                    } catch (j) {
                        throw new Error((h && h.path || "") + ": " + j)
                    }
                }), b
            }), ! function(a, b) {
                "undefined" != typeof module ? module.exports = b() : "function" == typeof define && "object" == typeof define.amd ? define("domready", b) : this[a] = b()
            }("domready", function(a) {
                function b(a) {
                    for (n = 1; a = d.shift();) a()
                }
                var c, d = [],
                    e = !1,
                    f = document,
                    g = f.documentElement,
                    h = g.doScroll,
                    i = "DOMContentLoaded",
                    j = "addEventListener",
                    k = "onreadystatechange",
                    l = "readyState",
                    m = h ? /^loaded|^c/ : /^loaded|c/,
                    n = m.test(f[l]);
                return f[j] && f[j](i, c = function() {
                    f.removeEventListener(i, c, e), b()
                }, e), h && f.attachEvent(k, c = function() {
                    /^c/.test(f[l]) && (f.detachEvent(k, c), b())
                }), a = h ? function(b) {
                    self != top ? n ? b() : d.push(b) : function() {
                        try {
                            g.doScroll("left")
                        } catch (c) {
                            return setTimeout(function() {
                                a(b)
                            }, 50)
                        }
                        b()
                    }()
                } : function(a) {
                    n ? a() : d.push(a)
                }
            }), define("aura/ext/debug", [], function() {
                return {
                    name: "debug",
                    initialize: function(a) {
                        "function" == typeof window.attachDebugger && (a.logger.log("Attaching debugger ..."), window.attachDebugger(a))
                    }
                }
            }), ! function(a) {
                function b() {
                    this._events = {}, this._conf && c.call(this, this._conf)
                }

                function c(a) {
                    a && (this._conf = a, a.delimiter && (this.delimiter = a.delimiter), a.maxListeners && (this._events.maxListeners = a.maxListeners), a.wildcard && (this.wildcard = a.wildcard), a.newListener && (this.newListener = a.newListener), this.wildcard && (this.listenerTree = {}))
                }

                function d(a) {
                    this._events = {}, this.newListener = !1, c.call(this, a)
                }

                function e(a, b, c, d) {
                    if (!c) return [];
                    var f, g, h, i, j, k, l, m = [],
                        n = b.length,
                        o = b[d],
                        p = b[d + 1];
                    if (d === n && c._listeners) {
                        if ("function" == typeof c._listeners) return a && a.push(c._listeners), [c];
                        for (f = 0, g = c._listeners.length; g > f; f++) a && a.push(c._listeners[f]);
                        return [c]
                    }
                    if ("*" === o || "**" === o || c[o]) {
                        if ("*" === o) {
                            for (h in c) "_listeners" !== h && c.hasOwnProperty(h) && (m = m.concat(e(a, b, c[h], d + 1)));
                            return m
                        }
                        if ("**" === o) {
                            l = d + 1 === n || d + 2 === n && "*" === p, l && c._listeners && (m = m.concat(e(a, b, c, n)));
                            for (h in c) "_listeners" !== h && c.hasOwnProperty(h) && ("*" === h || "**" === h ? (c[h]._listeners && !l && (m = m.concat(e(a, b, c[h], n))), m = m.concat(e(a, b, c[h], d))) : m = m.concat(h === p ? e(a, b, c[h], d + 2) : e(a, b, c[h], d)));
                            return m
                        }
                        m = m.concat(e(a, b, c[o], d + 1))
                    }
                    if (i = c["*"], i && e(a, b, i, d + 1), j = c["**"])
                        if (n > d) {
                            j._listeners && e(a, b, j, n);
                            for (h in j) "_listeners" !== h && j.hasOwnProperty(h) && (h === p ? e(a, b, j[h], d + 2) : h === o ? e(a, b, j[h], d + 1) : (k = {}, k[h] = j[h], e(a, b, {
                                "**": k
                            }, d + 1)))
                        } else j._listeners ? e(a, b, j, n) : j["*"] && j["*"]._listeners && e(a, b, j["*"], n);
                    return m
                }

                function f(a, b) {
                    a = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                    for (var c = 0, d = a.length; d > c + 1; c++)
                        if ("**" === a[c] && "**" === a[c + 1]) return;
                    for (var e = this.listenerTree, f = a.shift(); f;) {
                        if (e[f] || (e[f] = {}), e = e[f], 0 === a.length) {
                            if (e._listeners) {
                                if ("function" == typeof e._listeners) e._listeners = [e._listeners, b];
                                else if (g(e._listeners) && (e._listeners.push(b), !e._listeners.warned)) {
                                    var i = h;
                                    "undefined" != typeof this._events.maxListeners && (i = this._events.maxListeners), i > 0 && e._listeners.length > i && (e._listeners.warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", e._listeners.length), console.trace())
                                }
                            } else e._listeners = b;
                            return !0
                        }
                        f = a.shift()
                    }
                    return !0
                }
                var g = Array.isArray ? Array.isArray : function(a) {
                        return "[object Array]" === Object.prototype.toString.call(a)
                    },
                    h = 10;
                d.prototype.delimiter = ".", d.prototype.setMaxListeners = function(a) {
                    this._events || b.call(this), this._events.maxListeners = a, this._conf || (this._conf = {}), this._conf.maxListeners = a
                }, d.prototype.event = "", d.prototype.once = function(a, b) {
                    return this.many(a, 1, b), this
                }, d.prototype.many = function(a, b, c) {
                    function d() {
                        0 === --b && e.off(a, d), c.apply(this, arguments)
                    }
                    var e = this;
                    if ("function" != typeof c) throw new Error("many only accepts instances of Function");
                    return d._origin = c, this.on(a, d), e
                }, d.prototype.emit = function() {
                    this._events || b.call(this);
                    var a = arguments[0];
                    if ("newListener" === a && !this.newListener && !this._events.newListener) return !1;
                    if (this._all) {
                        for (var c = arguments.length, d = new Array(c - 1), f = 1; c > f; f++) d[f - 1] = arguments[f];
                        for (f = 0, c = this._all.length; c > f; f++) this.event = a, this._all[f].apply(this, d)
                    }
                    if ("error" === a && !(this._all || this._events.error || this.wildcard && this.listenerTree.error)) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
                    var g;
                    if (this.wildcard) {
                        g = [];
                        var h = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                        e.call(this, g, h, this.listenerTree, 0)
                    } else g = this._events[a];
                    if ("function" == typeof g) {
                        if (this.event = a, 1 === arguments.length) g.call(this);
                        else if (arguments.length > 1) switch (arguments.length) {
                            case 2:
                                g.call(this, arguments[1]);
                                break;
                            case 3:
                                g.call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                for (var c = arguments.length, d = new Array(c - 1), f = 1; c > f; f++) d[f - 1] = arguments[f];
                                g.apply(this, d)
                        }
                        return !0
                    }
                    if (g) {
                        for (var c = arguments.length, d = new Array(c - 1), f = 1; c > f; f++) d[f - 1] = arguments[f];
                        for (var i = g.slice(), f = 0, c = i.length; c > f; f++) this.event = a, i[f].apply(this, d);
                        return i.length > 0 || this._all
                    }
                    return this._all
                }, d.prototype.on = function(a, c) {
                    if ("function" == typeof a) return this.onAny(a), this;
                    if ("function" != typeof c) throw new Error("on only accepts instances of Function");
                    if (this._events || b.call(this), this.emit("newListener", a, c), this.wildcard) return f.call(this, a, c), this;
                    if (this._events[a]) {
                        if ("function" == typeof this._events[a]) this._events[a] = [this._events[a], c];
                        else if (g(this._events[a]) && (this._events[a].push(c), !this._events[a].warned)) {
                            var d = h;
                            "undefined" != typeof this._events.maxListeners && (d = this._events.maxListeners), d > 0 && this._events[a].length > d && (this._events[a].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[a].length), console.trace())
                        }
                    } else this._events[a] = c;
                    return this
                }, d.prototype.onAny = function(a) {
                    if (this._all || (this._all = []), "function" != typeof a) throw new Error("onAny only accepts instances of Function");
                    return this._all.push(a), this
                }, d.prototype.addListener = d.prototype.on, d.prototype.off = function(a, b) {
                    if ("function" != typeof b) throw new Error("removeListener only takes instances of Function");
                    var c, d = [];
                    if (this.wildcard) {
                        var f = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                        d = e.call(this, null, f, this.listenerTree, 0)
                    } else {
                        if (!this._events[a]) return this;
                        c = this._events[a], d.push({
                            _listeners: c
                        })
                    }
                    for (var h = 0; h < d.length; h++) {
                        var i = d[h];
                        if (c = i._listeners, g(c)) {
                            for (var j = -1, k = 0, l = c.length; l > k; k++)
                                if (c[k] === b || c[k].listener && c[k].listener === b || c[k]._origin && c[k]._origin === b) {
                                    j = k;
                                    break
                                }
                            if (0 > j) continue;
                            return this.wildcard ? i._listeners.splice(j, 1) : this._events[a].splice(j, 1), 0 === c.length && (this.wildcard ? delete i._listeners : delete this._events[a]), this
                        }(c === b || c.listener && c.listener === b || c._origin && c._origin === b) && (this.wildcard ? delete i._listeners : delete this._events[a])
                    }
                    return this
                }, d.prototype.offAny = function(a) {
                    var b, c = 0,
                        d = 0;
                    if (a && this._all && this._all.length > 0) {
                        for (b = this._all, c = 0, d = b.length; d > c; c++)
                            if (a === b[c]) return b.splice(c, 1), this
                    } else this._all = [];
                    return this
                }, d.prototype.removeListener = d.prototype.off, d.prototype.removeAllListeners = function(a) {
                    if (0 === arguments.length) return !this._events || b.call(this), this;
                    if (this.wildcard)
                        for (var c = "string" == typeof a ? a.split(this.delimiter) : a.slice(), d = e.call(this, null, c, this.listenerTree, 0), f = 0; f < d.length; f++) {
                            var g = d[f];
                            g._listeners = null
                        } else {
                            if (!this._events[a]) return this;
                            this._events[a] = null
                        }
                    return this
                }, d.prototype.listeners = function(a) {
                    if (this.wildcard) {
                        var c = [],
                            d = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                        return e.call(this, c, d, this.listenerTree, 0), c
                    }
                    return this._events || b.call(this), this._events[a] || (this._events[a] = []), g(this._events[a]) || (this._events[a] = [this._events[a]]), this._events[a]
                }, d.prototype.listenersAny = function() {
                    return this._all ? this._all : []
                }, "function" == typeof define && define.amd ? define("eventemitter", [], function() {
                    return d
                }) : a.EventEmitter2 = d
            }("undefined" != typeof process && "undefined" != typeof process.title && "undefined" != typeof exports ? exports : window), define("aura/ext/mediator", ["eventemitter", "underscore"], function(a, b) {
                return {
                    name: "mediator",
                    initialize: function(c) {
                        c.config.mediator = b.defaults(c.config.mediator || {}, {
                            wildcard: !0,
                            delimiter: ".",
                            newListener: !0,
                            maxListeners: 20
                        });
                        var d = c.config.mediatorInstance || new a(c.config.mediator);
                        c.core.mediator = d;
                        var e = function(a) {
                            return function(e, f, g) {
                                if (!b.isFunction(f) || !b.isString(e)) throw new Error("Invalid arguments passed to sandbox." + a);
                                g = g || this;
                                var h = function() {
                                    var a = Array.prototype.slice.call(arguments);
                                    try {
                                        f.apply(g, a)
                                    } catch (b) {
                                        c.logger.error("Error caught in listener '" + e + "', called with arguments: ", a, "\nError:", b.message, b, a)
                                    }
                                };
                                this._events = this._events || [], this._events.push({
                                    name: e,
                                    listener: f,
                                    callback: h
                                }), d[a](e, h)
                            }
                        };
                        c.sandbox.on = e("on"), c.sandbox.once = e("once"), c.sandbox.off = function(a, c) {
                            this._events && (this._events = b.reject(this._events, function(b) {
                                var e = b.name === a && b.listener === c;
                                return e && d.off(a, b.callback), e
                            }))
                        }, c.sandbox.emit = function() {
                            var a = c.config.debug;
                            if (a.enable && (0 === a.components.length || -1 !== a.components.indexOf("aura:mediator"))) {
                                var b = Array.prototype.slice.call(arguments);
                                b.unshift("Event emitted"), c.logger.log.apply(c.logger, b)
                            }
                            d.emit.apply(d, arguments)
                        }, c.sandbox.stopListening = function() {
                            this._events && b.each(this._events, function(a) {
                                d.off(a.name, a.callback)
                            })
                        };
                        var f = ["aura", "sandbox", "stop"].join(c.config.mediator.delimiter);
                        c.core.mediator.on(f, function(a) {
                            a.stopListening()
                        })
                    }
                }
            }), define("aura/ext/components", [], function() {
                return function(a) {
                    function b(a, b, c, d) {
                        var e = o[a + ":" + b] || [],
                            f = [];
                        k(e, function(a) {
                            "function" == typeof a && f.push(a.apply(c, d))
                        });
                        var g = m(l.apply(void 0, f));
                        return g
                    }

                    function c(c, d) {
                        var e, f;
                        if ("string" == typeof c) f = c, c = d[f] || function() {};
                        else {
                            if ("string" != typeof c.name) throw new Error("Error invoking Component with callbacks: ", d.options.name, ". first argument should be either the name of a function or of the form : { name: 'fnName', fn: function() { ... } } ");
                            f = c.name, c = c.fn || function() {}
                        }
                        var g, i = h.data.deferred(),
                            j = [].slice.call(arguments, 2);
                        return g = b("before", f, d, j), g.then(function() {
                            var a = h.data.deferred();
                            try {
                                return e = c.apply(d, j), a.resolve(e)
                            } catch (b) {
                                return a.reject(b)
                            }
                        }).then(function(a) {
                            b("after", f, d, j).then(function() {
                                i.resolve(a)
                            }, i.reject)
                        }).fail(function(b) {
                            a.logger.error("Error in Component " + d.options.name + " " + f + " callback", b), i.reject(b)
                        }), m(i)
                    }

                    function d(a) {
                        var b = i.clone(a);
                        return this.options = i.defaults(b || {}, this.options || {}), this._ref = b._ref, this.$el = j(b.el), this.invokeWithCallbacks("initialize", this.options), this
                    }

                    function e(a, b, c) {
                        var d = function(a) {
                                return a.replace(/(?:^|[-_])(\w)/g, function(a, b) {
                                    return b ? b.toUpperCase() : ""
                                })
                            },
                            e = i.clone(c || {});
                        e.el = a, e.require = {};
                        var g, j = h.dom.data(a);
                        return k(j, function(a, c) {
                            c = c.replace(new RegExp("^" + b + "(-)?"), ""), c = d(c), c = c.charAt(0).toLowerCase() + c.slice(1), "component" !== c && "widget" !== c ? e[c] = a : g = a
                        }), f(g, e)
                    }

                    function f(b, c) {
                        var d = b.split("@"),
                            e = h.util.decamelize(d[0]),
                            f = d[1] || "default",
                            g = (require.s.contexts._, a.config.sources[f] || "./aura_components");
                        return c.name = e, c.ref = "__component__$" + e + "@" + f, c.baseUrl = g + "/" + e, c.require = c.require || {}, c.require.packages = c.require.packages || [], c.require.packages.push({
                            name: c.ref,
                            location: g + "/" + e
                        }), c
                    }
                    var g = function(a, b) {
                            return Object.prototype.hasOwnProperty.call(a, b)
                        },
                        h = a.core,
                        i = h.util._,
                        j = h.dom.find,
                        k = h.util.each,
                        l = h.data.when,
                        m = h.data.promise;
                    h.Components = h.Components || {};
                    var n = {},
                        o = {};
                    d.prototype.initialize = function() {}, d.prototype.html = function(a) {
                        var b = this.$el;
                        b.html(a);
                        var c = this;
                        return i.defer(function() {
                            c.sandbox.start(b, {
                                reset: !0
                            })
                        }), this
                    }, d.prototype.$find = function(a) {
                        return j(a, this.$el)
                    }, d.prototype.invokeWithCallbacks = function(a) {
                        return c.apply(void 0, [a, this].concat([].slice.call(arguments, 1)))
                    };
                    var p = function(a, b) {
                        var c, d = this;
                        c = a && g(a, "constructor") ? a.constructor : function() {
                            d.apply(this, arguments)
                        }, h.util.extend(c, d, b);
                        var e = function() {
                            this.constructor = c
                        };
                        return e.prototype = d.prototype, c.prototype = new e, a && h.util.extend(c.prototype, a), c.__super__ = d.prototype, c
                    };
                    return d.extend = p, d.load = function(b, c) {
                        var e, f = h.data.deferred(),
                            g = c.ref,
                            j = c.el;
                        c._ref = h.util._.uniqueId(g + "+");
                        var k = i.clone(c);
                        return a.logger.log("Start loading component:", b), f.fail(function(c) {
                            a.logger.error("Error loading component:", b, c)
                        }), require.config(k.require), require([g], function(i) {
                            if (!i) return f.reject("component " + g + " Definition is empty !");
                            try {
                                if (n[g]) e = n[g];
                                else {
                                    if (e = i.type ? h.Components[i.type] : d, !e) throw new Error("Can't find component of type '" + i.type + "', did you forget to include the extension that provides it ?");
                                    h.util._.isObject(i) && (e = n[g] = e.extend(i))
                                }
                                var m = a.sandboxes.create(c._ref, {
                                    el: j
                                });
                                m.logger.setName("Component '" + b + "'(" + m.logger.name + ")");
                                var o = {
                                    sandbox: m
                                };
                                "function" == typeof i && (o.initialize = i), e = e.extend(o);
                                var p = new e(k);
                                h.dom.data(p.$el, "__sandbox_ref__", m.ref);
                                var q = l(p);
                                return q.then(function(a) {
                                    f.resolve(a)
                                }), q.fail(function(a) {
                                    f.reject(a)
                                }), q
                            } catch (r) {
                                a.logger.error(r.message), f.reject(r)
                            }
                        }, function(a) {
                            f.reject(a)
                        }), m(f)
                    }, d.parseList = function(b) {
                        var c = [];
                        if (i.isArray(b) && !i.some(b, i.isElement)) i.map(b, function(a) {
                            var b = f(a.name, a.options);
                            c.push({
                                name: a.name,
                                options: b
                            })
                        });
                        else if (b && j(b)) {
                            var d = a.config.namespace,
                                g = ["[data-aura-component]", "[data-aura-widget]"];
                            d && (g.push("[data-" + d + "-component]"), g.push("[data-" + d + "-widget]")), g = g.join(","), k(j(g, b || "body"), function(a) {
                                var b = "aura";
                                d && (h.dom.data(a, d + "-component") || h.dom.data(a, d + "-widget")) && (b = d);
                                var f = e(a, b);
                                c.push({
                                    name: f.name,
                                    options: f
                                })
                            })
                        }
                        return c
                    }, d.startAll = function(a) {
                        var b = d.parseList(a),
                            c = [];
                        h.util.each(b, function(a) {
                            var b = d.load(a.name, a.options);
                            c.push(b)
                        });
                        var e = l.apply(void 0, c);
                        return m(e)
                    }, {
                        name: "components",
                        require: {
                            paths: {
                                text: "bower_components/requirejs-text/text"
                            }
                        },
                        initialize: function(a) {
                            function b(a, b) {
                                o[a] = o[a] || [], o[a].push(b)
                            }
                            h.Components.Base = d, a.components.before = function(a, c) {
                                var d = "before:" + a;
                                b(d, c)
                            }, a.components.after = function(a, c) {
                                var d = "after:" + a;
                                b(d, c)
                            }, a.components.addType = function(a, b) {
                                if (h.Components[a]) throw new Error("Component type " + a + " already defined");
                                h.Components[a] = d.extend(b)
                            }, a.sandbox.start = function(b, c) {
                                var e = ["aura", "sandbox", "start"].join(a.config.mediator.delimiter);
                                h.mediator.emit(e, this);
                                var f = this._children || [];
                                c && c.reset && (i.invoke(this._children || [], "stop"), f = []);
                                var g = this;
                                return d.startAll(b).done(function() {
                                    var a = i.compact(Array.prototype.slice.call(arguments) || []);
                                    h.util.each(a, function(a) {
                                        a.sandbox._component = a, a.sandbox._parent = g, f.push(a.sandbox)
                                    }), g._children = f
                                }), this
                            }
                        },
                        afterAppStart: function(a) {
                            if (a.config.components !== !1 && a.startOptions.components !== !1) {
                                var b;
                                b = j(i.isArray(a.startOptions.components) ? "body" : a.startOptions.components), h.appSandbox = a.sandboxes.create(a.ref, {
                                    el: b
                                }), h.appSandbox.start(a.startOptions.components)
                            }
                        }
                    }
                }
            }),
            function(a) {
                if ("function" == typeof bootstrap) bootstrap("promise", a);
                else if ("object" == typeof exports) module.exports = a();
                else if ("function" == typeof define && define.amd) define("promises", a);
                else if ("undefined" != typeof ses) {
                    if (!ses.ok()) return;
                    ses.makeQ = a
                } else Q = a()
            }(function() {
                function a(a) {
                    return function() {
                        return X.apply(a, arguments)
                    }
                }

                function b(a) {
                    return a === Object(a)
                }

                function c(a) {
                    return "[object StopIteration]" === db(a) || a instanceof T
                }

                function d(a, b) {
                    if (Q && b.stack && "object" == typeof a && null !== a && a.stack && -1 === a.stack.indexOf(fb)) {
                        for (var c = [], d = b; d; d = d.source) d.stack && c.unshift(d.stack);
                        c.unshift(a.stack);
                        var f = c.join("\n" + fb + "\n");
                        a.stack = e(f)
                    }
                }

                function e(a) {
                    for (var b = a.split("\n"), c = [], d = 0; d < b.length; ++d) {
                        var e = b[d];
                        h(e) || f(e) || !e || c.push(e)
                    }
                    return c.join("\n")
                }

                function f(a) {
                    return -1 !== a.indexOf("(module.js:") || -1 !== a.indexOf("(node.js:")
                }

                function g(a) {
                    var b = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(a);
                    if (b) return [b[1], Number(b[2])];
                    var c = /at ([^ ]+):(\d+):(?:\d+)$/.exec(a);
                    if (c) return [c[1], Number(c[2])];
                    var d = /.*@(.+):(\d+)$/.exec(a);
                    return d ? [d[1], Number(d[2])] : void 0
                }

                function h(a) {
                    var b = g(a);
                    if (!b) return !1;
                    var c = b[0],
                        d = b[1];
                    return c === S && d >= U && kb >= d
                }

                function i() {
                    if (Q) try {
                        throw new Error
                    } catch (a) {
                        var b = a.stack.split("\n"),
                            c = b[0].indexOf("@") > 0 ? b[1] : b[2],
                            d = g(c);
                        if (!d) return;
                        return S = d[0], d[1]
                    }
                }

                function j(a, b, c) {
                    return function() {
                        return "undefined" != typeof console && "function" == typeof console.warn && console.warn(b + " is deprecated, use " + c + " instead.", new Error("").stack), a.apply(a, arguments)
                    }
                }

                function k(a) {
                    return r(a) ? a : s(a) ? D(a) : C(a)
                }

                function l() {
                    function a(a) {
                        b = a, f.source = a, Z(c, function(b, c) {
                            W(function() {
                                a.promiseDispatch.apply(a, c)
                            })
                        }, void 0), c = void 0, d = void 0
                    }
                    var b, c = [],
                        d = [],
                        e = ab(l.prototype),
                        f = ab(o.prototype);
                    if (f.promiseDispatch = function(a, e, f) {
                            var g = Y(arguments);
                            c ? (c.push(g), "when" === e && f[1] && d.push(f[1])) : W(function() {
                                b.promiseDispatch.apply(b, g)
                            })
                        }, f.valueOf = j(function() {
                            if (c) return f;
                            var a = q(b);
                            return r(a) && (b = a), a
                        }, "valueOf", "inspect"), f.inspect = function() {
                            return b ? b.inspect() : {
                                state: "pending"
                            }
                        }, k.longStackSupport && Q) try {
                        throw new Error
                    } catch (g) {
                        f.stack = g.stack.substring(g.stack.indexOf("\n") + 1)
                    }
                    return e.promise = f, e.resolve = function(c) {
                        b || a(k(c))
                    }, e.fulfill = function(c) {
                        b || a(C(c))
                    }, e.reject = function(c) {
                        b || a(B(c))
                    }, e.notify = function(a) {
                        b || Z(d, function(b, c) {
                            W(function() {
                                c(a)
                            })
                        }, void 0)
                    }, e
                }

                function m(a) {
                    if ("function" != typeof a) throw new TypeError("resolver must be a function.");
                    var b = l();
                    try {
                        a(b.resolve, b.reject, b.notify)
                    } catch (c) {
                        b.reject(c)
                    }
                    return b.promise
                }

                function n(a) {
                    return m(function(b, c) {
                        for (var d = 0, e = a.length; e > d; d++) k(a[d]).then(b, c)
                    })
                }

                function o(a, b, c) {
                    void 0 === b && (b = function(a) {
                        return B(new Error("Promise does not support operation: " + a))
                    }), void 0 === c && (c = function() {
                        return {
                            state: "unknown"
                        }
                    });
                    var d = ab(o.prototype);
                    if (d.promiseDispatch = function(c, e, f) {
                            var g;
                            try {
                                g = a[e] ? a[e].apply(d, f) : b.call(d, e, f)
                            } catch (h) {
                                g = B(h)
                            }
                            c && c(g)
                        }, d.inspect = c, c) {
                        var e = c();
                        "rejected" === e.state && (d.exception = e.reason), d.valueOf = j(function() {
                            var a = c();
                            return "pending" === a.state || "rejected" === a.state ? d : a.value
                        })
                    }
                    return d
                }

                function p(a, b, c, d) {
                    return k(a).then(b, c, d)
                }

                function q(a) {
                    if (r(a)) {
                        var b = a.inspect();
                        if ("fulfilled" === b.state) return b.value
                    }
                    return a
                }

                function r(a) {
                    return b(a) && "function" == typeof a.promiseDispatch && "function" == typeof a.inspect
                }

                function s(a) {
                    return b(a) && "function" == typeof a.then
                }

                function t(a) {
                    return r(a) && "pending" === a.inspect().state
                }

                function u(a) {
                    return !r(a) || "fulfilled" === a.inspect().state
                }

                function v(a) {
                    return r(a) && "rejected" === a.inspect().state
                }

                function w() {
                    ib || "undefined" == typeof window || window.Touch || !window.console || console.warn("[Q] Unhandled rejection reasons (should be empty):", gb), ib = !0
                }

                function x() {
                    for (var a = 0; a < gb.length; a++) {
                        var b = gb[a];
                        console.warn("Unhandled rejection reason:", b)
                    }
                }

                function y() {
                    gb.length = 0, hb.length = 0, ib = !1, jb || (jb = !0, "undefined" != typeof process && process.on && process.on("exit", x))
                }

                function z(a, b) {
                    jb && (hb.push(a), gb.push(b && "undefined" != typeof b.stack ? b.stack : "(no stack) " + b), w())
                }

                function A(a) {
                    if (jb) {
                        var b = $(hb, a); - 1 !== b && (hb.splice(b, 1), gb.splice(b, 1))
                    }
                }

                function B(a) {
                    var b = o({
                        when: function(b) {
                            return b && A(this), b ? b(a) : this
                        }
                    }, function() {
                        return this
                    }, function() {
                        return {
                            state: "rejected",
                            reason: a
                        }
                    });
                    return z(b, a), b
                }

                function C(a) {
                    return o({
                        when: function() {
                            return a
                        },
                        get: function(b) {
                            return a[b]
                        },
                        set: function(b, c) {
                            a[b] = c
                        },
                        "delete": function(b) {
                            delete a[b]
                        },
                        post: function(b, c) {
                            return null === b || void 0 === b ? a.apply(void 0, c) : a[b].apply(a, c)
                        },
                        apply: function(b, c) {
                            return a.apply(b, c)
                        },
                        keys: function() {
                            return cb(a)
                        }
                    }, void 0, function() {
                        return {
                            state: "fulfilled",
                            value: a
                        }
                    })
                }

                function D(a) {
                    var b = l();
                    return W(function() {
                        try {
                            a.then(b.resolve, b.reject, b.notify)
                        } catch (c) {
                            b.reject(c)
                        }
                    }), b.promise
                }

                function E(a) {
                    return o({
                        isDef: function() {}
                    }, function(b, c) {
                        return K(a, b, c)
                    }, function() {
                        return k(a).inspect()
                    })
                }

                function F(a, b, c) {
                    return k(a).spread(b, c)
                }

                function G(a) {
                    return function() {
                        function b(a, b) {
                            var g;
                            if (eb) {
                                try {
                                    g = d[a](b)
                                } catch (h) {
                                    return B(h)
                                }
                                return g.done ? g.value : p(g.value, e, f)
                            }
                            try {
                                g = d[a](b)
                            } catch (h) {
                                return c(h) ? h.value : B(h)
                            }
                            return p(g, e, f)
                        }
                        var d = a.apply(this, arguments),
                            e = b.bind(b, "next"),
                            f = b.bind(b, "throw");
                        return e()
                    }
                }

                function H(a) {
                    k.done(k.async(a)())
                }

                function I(a) {
                    throw new T(a)
                }

                function J(a) {
                    return function() {
                        return F([this, L(arguments)], function(b, c) {
                            return a.apply(b, c)
                        })
                    }
                }

                function K(a, b, c) {
                    return k(a).dispatch(b, c)
                }

                function L(a) {
                    return p(a, function(a) {
                        var b = 0,
                            c = l();
                        return Z(a, function(d, e, f) {
                            var g;
                            r(e) && "fulfilled" === (g = e.inspect()).state ? a[f] = g.value : (++b, p(e, function(d) {
                                a[f] = d, 0 === --b && c.resolve(a)
                            }, c.reject, function(a) {
                                c.notify({
                                    index: f,
                                    value: a
                                })
                            }))
                        }, void 0), 0 === b && c.resolve(a), c.promise
                    })
                }

                function M(a) {
                    return p(a, function(a) {
                        return a = _(a, k), p(L(_(a, function(a) {
                            return p(a, V, V)
                        })), function() {
                            return a
                        })
                    })
                }

                function N(a) {
                    return k(a).allSettled()
                }

                function O(a, b) {
                    return k(a).then(void 0, void 0, b)
                }

                function P(a, b) {
                    return k(a).nodeify(b)
                }
                var Q = !1;
                try {
                    throw new Error
                } catch (R) {
                    Q = !!R.stack
                }
                var S, T, U = i(),
                    V = function() {},
                    W = function() {
                        function a() {
                            for (; b.next;) {
                                b = b.next;
                                var c = b.task;
                                b.task = void 0;
                                var e = b.domain;
                                e && (b.domain = void 0, e.enter());
                                try {
                                    c()
                                } catch (g) {
                                    if (f) throw e && e.exit(), setTimeout(a, 0), e && e.enter(), g;
                                    setTimeout(function() {
                                        throw g
                                    }, 0)
                                }
                                e && e.exit()
                            }
                            d = !1
                        }
                        var b = {
                                task: void 0,
                                next: null
                            },
                            c = b,
                            d = !1,
                            e = void 0,
                            f = !1;
                        if (W = function(a) {
                                c = c.next = {
                                    task: a,
                                    domain: f && process.domain,
                                    next: null
                                }, d || (d = !0, e())
                            }, "undefined" != typeof process && process.nextTick) f = !0, e = function() {
                            process.nextTick(a)
                        };
                        else if ("function" == typeof setImmediate) e = "undefined" != typeof window ? setImmediate.bind(window, a) : function() {
                            setImmediate(a)
                        };
                        else if ("undefined" != typeof MessageChannel) {
                            var g = new MessageChannel;
                            g.port1.onmessage = function() {
                                e = h, g.port1.onmessage = a, a()
                            };
                            var h = function() {
                                g.port2.postMessage(0)
                            };
                            e = function() {
                                setTimeout(a, 0), h()
                            }
                        } else e = function() {
                            setTimeout(a, 0)
                        };
                        return W
                    }(),
                    X = Function.call,
                    Y = a(Array.prototype.slice),
                    Z = a(Array.prototype.reduce || function(a, b) {
                        var c = 0,
                            d = this.length;
                        if (1 === arguments.length)
                            for (;;) {
                                if (c in this) {
                                    b = this[c++];
                                    break
                                }
                                if (++c >= d) throw new TypeError
                            }
                        for (; d > c; c++) c in this && (b = a(b, this[c], c));
                        return b
                    }),
                    $ = a(Array.prototype.indexOf || function(a) {
                        for (var b = 0; b < this.length; b++)
                            if (this[b] === a) return b;
                        return -1
                    }),
                    _ = a(Array.prototype.map || function(a, b) {
                        var c = this,
                            d = [];
                        return Z(c, function(e, f, g) {
                            d.push(a.call(b, f, g, c))
                        }, void 0), d
                    }),
                    ab = Object.create || function(a) {
                        function b() {}
                        return b.prototype = a, new b
                    },
                    bb = a(Object.prototype.hasOwnProperty),
                    cb = Object.keys || function(a) {
                        var b = [];
                        for (var c in a) bb(a, c) && b.push(c);
                        return b
                    },
                    db = a(Object.prototype.toString);
                T = "undefined" != typeof ReturnValue ? ReturnValue : function(a) {
                    this.value = a
                };
                var eb;
                try {
                    new Function("(function* (){ yield 1; })"), eb = !0
                } catch (R) {
                    eb = !1
                }
                var fb = "From previous event:";
                k.resolve = k, k.nextTick = W, k.longStackSupport = !1, k.defer = l, l.prototype.makeNodeResolver = function() {
                    var a = this;
                    return function(b, c) {
                        b ? a.reject(b) : a.resolve(arguments.length > 2 ? Y(arguments, 1) : c)
                    }
                }, k.promise = m, k.passByCopy = function(a) {
                    return a
                }, o.prototype.passByCopy = function() {
                    return this
                }, k.join = function(a, b) {
                    return k(a).join(b)
                }, o.prototype.join = function(a) {
                    return k([this, a]).spread(function(a, b) {
                        if (a === b) return a;
                        throw new Error("Can't join: not the same: " + a + " " + b)
                    })
                }, k.race = n, o.prototype.race = function() {
                    return this.then(k.race)
                }, k.makePromise = o, o.prototype.toString = function() {
                    return "[object Promise]"
                }, o.prototype.then = function(a, b, c) {
                    function e(b) {
                        try {
                            return "function" == typeof a ? a(b) : b
                        } catch (c) {
                            return B(c)
                        }
                    }

                    function f(a) {
                        if ("function" == typeof b) {
                            d(a, h);
                            try {
                                return b(a)
                            } catch (c) {
                                return B(c)
                            }
                        }
                        return B(a)
                    }

                    function g(a) {
                        return "function" == typeof c ? c(a) : a
                    }
                    var h = this,
                        i = l(),
                        j = !1;
                    return W(function() {
                        h.promiseDispatch(function(a) {
                            j || (j = !0, i.resolve(e(a)))
                        }, "when", [function(a) {
                            j || (j = !0, i.resolve(f(a)))
                        }])
                    }), h.promiseDispatch(void 0, "when", [void 0, function(a) {
                        var b, c = !1;
                        try {
                            b = g(a)
                        } catch (d) {
                            if (c = !0, !k.onerror) throw d;
                            k.onerror(d)
                        }
                        c || i.notify(b)
                    }]), i.promise
                }, k.when = p, o.prototype.thenResolve = function(a) {
                    return this.then(function() {
                        return a
                    })
                }, k.thenResolve = function(a, b) {
                    return k(a).thenResolve(b)
                }, o.prototype.thenReject = function(a) {
                    return this.then(function() {
                        throw a
                    })
                }, k.thenReject = function(a, b) {
                    return k(a).thenReject(b)
                }, k.nearer = q, k.isPromise = r, k.isPromiseAlike = s, k.isPending = t, o.prototype.isPending = function() {
                    return "pending" === this.inspect().state
                }, k.isFulfilled = u, o.prototype.isFulfilled = function() {
                    return "fulfilled" === this.inspect().state
                }, k.isRejected = v, o.prototype.isRejected = function() {
                    return "rejected" === this.inspect().state
                };
                var gb = [],
                    hb = [],
                    ib = !1,
                    jb = !0;
                k.resetUnhandledRejections = y, k.getUnhandledReasons = function() {
                    return gb.slice()
                }, k.stopUnhandledRejectionTracking = function() {
                    y(), "undefined" != typeof process && process.on && process.removeListener("exit", x), jb = !1
                }, y(), k.reject = B, k.fulfill = C, k.master = E, k.spread = F, o.prototype.spread = function(a, b) {
                    return this.all().then(function(b) {
                        return a.apply(void 0, b)
                    }, b)
                }, k.async = G, k.spawn = H, k["return"] = I, k.promised = J, k.dispatch = K, o.prototype.dispatch = function(a, b) {
                    var c = this,
                        d = l();
                    return W(function() {
                        c.promiseDispatch(d.resolve, a, b)
                    }), d.promise
                }, k.get = function(a, b) {
                    return k(a).dispatch("get", [b])
                }, o.prototype.get = function(a) {
                    return this.dispatch("get", [a])
                }, k.set = function(a, b, c) {
                    return k(a).dispatch("set", [b, c])
                }, o.prototype.set = function(a, b) {
                    return this.dispatch("set", [a, b])
                }, k.del = k["delete"] = function(a, b) {
                    return k(a).dispatch("delete", [b])
                }, o.prototype.del = o.prototype["delete"] = function(a) {
                    return this.dispatch("delete", [a])
                }, k.mapply = k.post = function(a, b, c) {
                    return k(a).dispatch("post", [b, c])
                }, o.prototype.mapply = o.prototype.post = function(a, b) {
                    return this.dispatch("post", [a, b])
                }, k.send = k.mcall = k.invoke = function(a, b) {
                    return k(a).dispatch("post", [b, Y(arguments, 2)])
                }, o.prototype.send = o.prototype.mcall = o.prototype.invoke = function(a) {
                    return this.dispatch("post", [a, Y(arguments, 1)])
                }, k.fapply = function(a, b) {
                    return k(a).dispatch("apply", [void 0, b])
                }, o.prototype.fapply = function(a) {
                    return this.dispatch("apply", [void 0, a])
                }, k["try"] = k.fcall = function(a) {
                    return k(a).dispatch("apply", [void 0, Y(arguments, 1)])
                }, o.prototype.fcall = function() {
                    return this.dispatch("apply", [void 0, Y(arguments)])
                }, k.fbind = function(a) {
                    var b = k(a),
                        c = Y(arguments, 1);
                    return function() {
                        return b.dispatch("apply", [this, c.concat(Y(arguments))])
                    }
                }, o.prototype.fbind = function() {
                    var a = this,
                        b = Y(arguments);
                    return function() {
                        return a.dispatch("apply", [this, b.concat(Y(arguments))])
                    }
                }, k.keys = function(a) {
                    return k(a).dispatch("keys", [])
                }, o.prototype.keys = function() {
                    return this.dispatch("keys", [])
                }, k.all = L, o.prototype.all = function() {
                    return L(this)
                }, k.allResolved = j(M, "allResolved", "allSettled"), o.prototype.allResolved = function() {
                    return M(this)
                }, k.allSettled = N, o.prototype.allSettled = function() {
                    return this.then(function(a) {
                        return L(_(a, function(a) {
                            function b() {
                                return a.inspect()
                            }
                            return a = k(a), a.then(b, b)
                        }))
                    })
                }, k.fail = k["catch"] = function(a, b) {
                    return k(a).then(void 0, b)
                }, o.prototype.fail = o.prototype["catch"] = function(a) {
                    return this.then(void 0, a)
                }, k.progress = O, o.prototype.progress = function(a) {
                    return this.then(void 0, void 0, a)
                }, k.fin = k["finally"] = function(a, b) {
                    return k(a)["finally"](b)
                }, o.prototype.fin = o.prototype["finally"] = function(a) {
                    return a = k(a), this.then(function(b) {
                        return a.fcall().then(function() {
                            return b
                        })
                    }, function(b) {
                        return a.fcall().then(function() {
                            throw b
                        })
                    })
                }, k.done = function(a, b, c, d) {
                    return k(a).done(b, c, d)
                }, o.prototype.done = function(a, b, c) {
                    var e = function(a) {
                            W(function() {
                                if (d(a, f), !k.onerror) throw a;
                                k.onerror(a)
                            })
                        },
                        f = a || b || c ? this.then(a, b, c) : this;
                    "object" == typeof process && process && process.domain && (e = process.domain.bind(e)), f.then(void 0, e)
                }, k.timeout = function(a, b, c) {
                    return k(a).timeout(b, c)
                }, o.prototype.timeout = function(a, b) {
                    var c = l(),
                        d = setTimeout(function() {
                            c.reject(new Error(b || "Timed out after " + a + " ms"))
                        }, a);
                    return this.then(function(a) {
                        clearTimeout(d), c.resolve(a)
                    }, function(a) {
                        clearTimeout(d), c.reject(a)
                    }, c.notify), c.promise
                }, k.delay = function(a, b) {
                    return void 0 === b && (b = a, a = void 0), k(a).delay(b)
                }, o.prototype.delay = function(a) {
                    return this.then(function(b) {
                        var c = l();
                        return setTimeout(function() {
                            c.resolve(b)
                        }, a), c.promise
                    })
                }, k.nfapply = function(a, b) {
                    return k(a).nfapply(b)
                }, o.prototype.nfapply = function(a) {
                    var b = l(),
                        c = Y(a);
                    return c.push(b.makeNodeResolver()), this.fapply(c).fail(b.reject), b.promise
                }, k.nfcall = function(a) {
                    var b = Y(arguments, 1);
                    return k(a).nfapply(b)
                }, o.prototype.nfcall = function() {
                    var a = Y(arguments),
                        b = l();
                    return a.push(b.makeNodeResolver()), this.fapply(a).fail(b.reject), b.promise
                }, k.nfbind = k.denodeify = function(a) {
                    var b = Y(arguments, 1);
                    return function() {
                        var c = b.concat(Y(arguments)),
                            d = l();
                        return c.push(d.makeNodeResolver()), k(a).fapply(c).fail(d.reject), d.promise
                    }
                }, o.prototype.nfbind = o.prototype.denodeify = function() {
                    var a = Y(arguments);
                    return a.unshift(this), k.denodeify.apply(void 0, a)
                }, k.nbind = function(a, b) {
                    var c = Y(arguments, 2);
                    return function() {
                        function d() {
                            return a.apply(b, arguments)
                        }
                        var e = c.concat(Y(arguments)),
                            f = l();
                        return e.push(f.makeNodeResolver()), k(d).fapply(e).fail(f.reject), f.promise
                    }
                }, o.prototype.nbind = function() {
                    var a = Y(arguments, 0);
                    return a.unshift(this), k.nbind.apply(void 0, a)
                }, k.nmapply = k.npost = function(a, b, c) {
                    return k(a).npost(b, c)
                }, o.prototype.nmapply = o.prototype.npost = function(a, b) {
                    var c = Y(b || []),
                        d = l();
                    return c.push(d.makeNodeResolver()), this.dispatch("post", [a, c]).fail(d.reject), d.promise
                }, k.nsend = k.nmcall = k.ninvoke = function(a, b) {
                    var c = Y(arguments, 2),
                        d = l();
                    return c.push(d.makeNodeResolver()), k(a).dispatch("post", [b, c]).fail(d.reject), d.promise
                }, o.prototype.nsend = o.prototype.nmcall = o.prototype.ninvoke = function(a) {
                    var b = Y(arguments, 1),
                        c = l();
                    return b.push(c.makeNodeResolver()), this.dispatch("post", [a, b]).fail(c.reject), c.promise
                }, k.nodeify = P, o.prototype.nodeify = function(a) {
                    return a ? void this.then(function(b) {
                        W(function() {
                            a(null, b)
                        })
                    }, function(b) {
                        W(function() {
                            a(b)
                        })
                    }) : this
                };
                var kb = i();
                return k
            }),
            function() {
                define("lib/utils/promises", ["promises"], function(a) {
                    return {
                        deferred: a.defer,
                        when: a.when,
                        all: a.all
                    }
                })
            }.call(this), define("aura/platform", [], function() {
                "function" != typeof Function.prototype.bind && (Function.prototype.bind = function(a) {
                    var b = this,
                        c = Array.prototype.slice.call(arguments, 1);
                    return function() {
                        return b.apply(a, Array.prototype.concat.apply(c, arguments))
                    }
                }), Object.create || (Object.create = function(a) {
                    function b() {}
                    if (arguments.length > 1) throw new Error("Object.create implementation only accepts the first parameter.");
                    return b.prototype = a, new b
                })
            }),
            function() {
                window.jQuery ? define("jquery", [], function() {
                    return window.jQuery
                }) : require.config({
                    paths: {
                        jquery: "bower_components/jquery/jquery"
                    },
                    shim: {
                        jquery: {
                            exports: "$"
                        }
                    }
                }), window._ ? define("underscore", [], function() {
                    return window._
                }) : require.config({
                    paths: {
                        underscore: "bower_components/underscore/underscore"
                    },
                    shim: {
                        underscore: {
                            exports: "_"
                        }
                    }
                }), define("aura/base", ["module", "underscore", "jquery", "./platform"], function(a, b, c) {
                    require.s.contexts._.config.paths.aura || require.config({
                        paths: {
                            aura: a.id.replace(/base$/, "")
                        }
                    });
                    var d = {};
                    return d.dom = {
                        find: function(a, b) {
                            return b ? c(b).find(a) : c(a)
                        },
                        data: function(a, b, d) {
                            return void 0 === d ? c(a).data(b) : c(a).data(b, d)
                        }
                    }, d.data = {
                        ajax: c.ajax,
                        deferred: c.Deferred,
                        when: function() {
                            return b.isArray(arguments[0]) ? c.when.call(void 0, arguments[0]) : c.when.apply(void 0, [].slice.call(arguments))
                        },
                        promise: function(a) {
                            return b.isFunction(a.promise) ? a.promise() : a.promise
                        }
                    }, d.util = {
                        each: b.each,
                        extend: b.extend,
                        uniq: b.uniq,
                        _: b,
                        decamelize: function(a, b) {
                            return b = void 0 === b ? "_" : b, a.replace(/([A-Z])/g, b + "$1").toLowerCase()
                        }
                    }, d.events = {
                        listen: function(a, b, d, e) {
                            return c(a).on(b, d, e)
                        },
                        bindAll: function() {
                            return b.bindAll.apply(this, arguments)
                        }
                    }, d.template = {
                        parse: b.template
                    }, d
                })
            }(), define("aura/logger", [], function() {
                function a(a) {
                    return this.name = a, this._log = b, this._warn = b, this._error = b, this._enabled = !1, this
                }
                var b = function() {},
                    c = window.console || {};
                return a.prototype.isEnabled = function() {
                    return this._enabled
                }, a.prototype.setName = function(a) {
                    this.name = a
                }, a.prototype.enable = function() {
                    this._log = c.log || b, this._warn = c.warn || this._log, this._error = c.error || this._log, this._enabled = !0;
                    try {
                        if (Function.prototype.bind && "object" == typeof c)
                            for (var a = ["log", "warn", "error"], d = 0; d < a.length; d++) c[a[d]] = Function.prototype.call.bind(c[a[d]], c)
                    } catch (e) {}
                    return this
                }, a.prototype.write = function(a, b) {
                    var d = Array.prototype.slice.call(b);
                    d.unshift(this.name + ":"), a.apply(c, d)
                }, a.prototype.log = function() {
                    this.write(this._log, arguments)
                }, a.prototype.warn = function() {
                    this.write(this._warn, arguments)
                }, a.prototype.error = function() {
                    this.write(this._error, arguments)
                }, a
            }), define("aura/aura.extensions", ["./base", "./logger"], function(a, b) {
                function c() {
                    return this._extensions = [], this.initStatus = j(), this
                }

                function d() {
                    for (var a, b = i.call(arguments), c = 0, d = b.length; d > c; c++)
                        if (a = b[c], "function" == typeof a) return a;
                    return function() {}
                }

                function e(a) {
                    return "function" == typeof a ? a.apply(void 0, i.call(arguments, 1)) : a
                }

                function f(a) {
                    var b = j(),
                        c = a.ref,
                        e = a.context,
                        f = g(c, e);
                    return f.fail(b.reject), f.done(function(a) {
                        if (!a) return b.resolve();
                        var c = k(d(a, a.initialize)(e));
                        c.done(function() {
                            b.resolve(a)
                        }), c.fail(b.reject)
                    }), b.promise()
                }

                function g(a, b) {
                    var c = j(),
                        d = function(a) {
                            if (a = e(a, b), a && a.require && a.require.paths) {
                                var d = h.keys(a.require.paths) || [];
                                require.config(a.require), require(d, function() {
                                    c.resolve(a)
                                }, f)
                            } else c.resolve(a)
                        },
                        f = function(b) {
                            l.error("Error loading ext:", a, b), c.reject(b)
                        };
                    return "string" == typeof a ? require([a], d, f) : d(a), c
                }
                var h = a.util._,
                    i = Array.prototype.slice,
                    j = a.data.deferred,
                    k = a.data.when,
                    l = new b("Extensions").enable();
                return c.prototype.add = function(a) {
                    if (h.include(this._extensions, a)) {
                        var b = a.ref.toString() + " is already registered.";
                        throw b += "Extensions can only be added once.", new Error(b)
                    }
                    if (this.initStarted) throw new Error("Init extensions already called");
                    return this._extensions.push(a), this
                }, c.prototype.onReady = function(a) {
                    return this.initStatus.then(a), this
                }, c.prototype.onFailure = function(a) {
                    return this.initStatus.fail(a), this
                }, c.prototype.init = function() {
                    if (this.initStarted) throw new Error("Init extensions already called");
                    this.initStarted = !0;
                    var a = h.compact(this._extensions.slice(0)),
                        b = [],
                        c = this.initStatus;
                    return function d(e) {
                        if (e) {
                            var g = f(e);
                            b.push(g), g.done(function() {
                                d(a.shift())
                            }), g.fail(function(a) {
                                a || (a = "Unknown error while loading an extension"), a instanceof Error || (a = new Error(a)), c.reject(a)
                            })
                        } else 0 === a.length && k.apply(void 0, b).done(function() {
                            c.resolve(Array.prototype.slice.call(arguments))
                        })
                    }(a.shift()), c.promise()
                }, c
            }), define("aura/aura", ["./base", "./aura.extensions", "./logger"], function(a, b, c) {
                function d(f) {
                    function i(a) {
                        if ("string" == typeof a && (a = k.sandboxes.get(a)), a) {
                            var b = ["aura", "sandbox", "stop"].join(k.config.mediator.delimiter);
                            return e.invoke(a._children, "stop"), k.core.mediator.emit(b, a), a._component && a._component.invokeWithCallbacks("remove"), a.stopped = !0, a.el && g(a.el).remove(), l[a.ref] = null, delete l[a.ref], a
                        }
                    }
                    if (!(this instanceof d)) return new d(f);
                    var j = new b,
                        k = this;
                    k.ref = e.uniqueId("aura_"), k.config = f = f || {}, k.config.sources = k.config.sources || {
                        "default": "./aura_components"
                    };
                    var l = {},
                        m = Object.create(a);
                    k.sandboxes = {}, k.sandboxes.create = function(a, b) {
                        if (a = a || e.uniqueId("sandbox-"), l[a]) throw new Error("Sandbox with ref " + a + " already exists.");
                        var d = Object.create(m);
                        d.ref = a || e.uniqueId("sandbox-"), d.logger = new c(d.ref), l[d.ref] = d;
                        var g = f.debug;
                        return (g === !0 || g.enable && (0 === g.components.length || -1 !== g.components.indexOf(a))) && d.logger.enable(), e.extend(d, b || {}), d
                    }, k.sandboxes.get = function(a) {
                        return l[a]
                    }, k.use = function(a) {
                        return j.add({
                            ref: a,
                            context: k
                        }), k
                    }, k.components = {}, k.components.addSource = function(a, b) {
                        if (f.sources[a]) throw new Error("Components source '" + a + "' is already registered");
                        return f.sources[a] = b, k
                    }, k.core = Object.create(a), k.start = function(b) {
                        if (k.started) return k.logger.error("Aura already started!"), j.initStatus;
                        k.logger.log("Starting Aura");
                        var c = b || {};
                        return "string" == typeof b ? c = {
                            components: g(b)
                        } : e.isArray(b) ? c = {
                            components: b
                        } : b && b.widgets && !b.components ? c.components = b.widgets : void 0 === c.components && (c.components = g(k.config.components || "body")), j.onReady(function(b) {
                            a.util.each(b, function(a) {
                                a && "function" == typeof a.afterAppStart && a.afterAppStart(k)
                            })
                        }), j.onFailure(function() {
                            k.logger.error("Error initializing app:", k.config.name, arguments), k.stop()
                        }), k.startOptions = c, k.started = !0, j.init()
                    }, k.stop = function() {
                        k.started = !1
                    }, k.sandbox = m, k.logger = new c(k.ref), k.sandbox.stop = function(a) {
                        a ? e.each(g(a, this.el), function(a) {
                            var b = h(g(a), "__sandbox_ref__");
                            i(b)
                        }) : i(this)
                    }, f.debug = f.debug || {};
                    var n = f.debug;
                    return n === !0 && (f.debug = n = {
                        enable: !0
                    }), n.enable && (n.components = n.components ? n.components.split(" ") : [], k.logger.enable(), k.use("aura/ext/debug")), k.use("aura/ext/mediator"), f.components !== !1 && k.use("aura/ext/components"), k
                }
                var e = a.util._,
                    f = function() {},
                    g = (Object.freeze || f, a.dom.find),
                    h = a.dom.data;
                return d
            }), define("handlebars/safe-string", ["exports"], function(a) {
                function b(a) {
                    this.string = a
                }
                b.prototype.toString = function() {
                    return "" + this.string
                }, a["default"] = b
            }), define("handlebars/utils", ["./safe-string", "exports"], function(a, b) {
                function c(a) {
                    return h[a] || "&amp;"
                }

                function d(a, b) {
                    for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
                }

                function e(a) {
                    return a instanceof g ? a.toString() : a || 0 === a ? (a = "" + a, j.test(a) ? a.replace(i, c) : a) : ""
                }

                function f(a) {
                    return a || 0 === a ? m(a) && 0 === a.length ? !0 : !1 : !0
                }
                var g = a["default"],
                    h = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#x27;",
                        "`": "&#x60;"
                    },
                    i = /[&<>"'`]/g,
                    j = /[&<>"'`]/;
                b.extend = d;
                var k = Object.prototype.toString;
                b.toString = k;
                var l = function(a) {
                    return "function" == typeof a
                };
                l(/x/) && (l = function(a) {
                    return "function" == typeof a && "[object Function]" === k.call(a)
                });
                var l;
                b.isFunction = l;
                var m = Array.isArray || function(a) {
                    return a && "object" == typeof a ? "[object Array]" === k.call(a) : !1
                };
                b.isArray = m, b.escapeExpression = e, b.isEmpty = f
            }), define("handlebars/exception", ["exports"], function(a) {
                function b() {
                    for (var a = Error.prototype.constructor.apply(this, arguments), b = 0; b < c.length; b++) this[c[b]] = a[c[b]]
                }
                var c = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
                b.prototype = new Error, a["default"] = b
            }), define("handlebars/base", ["./utils", "./exception", "exports"], function(a, b, c) {
                function d(a, b) {
                    this.helpers = a || {}, this.partials = b || {}, e(this)
                }

                function e(a) {
                    a.registerHelper("helperMissing", function(a) {
                        if (2 === arguments.length) return void 0;
                        throw new Error("Missing helper: '" + a + "'")
                    }), a.registerHelper("blockHelperMissing", function(b, c) {
                        var d = c.inverse || function() {},
                            e = c.fn;
                        return m(b) && (b = b.call(this)), b === !0 ? e(this) : b === !1 || null == b ? d(this) : l(b) ? b.length > 0 ? a.helpers.each(b, c) : d(this) : e(b)
                    }), a.registerHelper("each", function(a, b) {
                        var c, d = b.fn,
                            e = b.inverse,
                            f = 0,
                            g = "";
                        if (m(a) && (a = a.call(this)), b.data && (c = q(b.data)), a && "object" == typeof a)
                            if (l(a))
                                for (var h = a.length; h > f; f++) c && (c.index = f, c.first = 0 === f, c.last = f === a.length - 1), g += d(a[f], {
                                    data: c
                                });
                            else
                                for (var i in a) a.hasOwnProperty(i) && (c && (c.key = i), g += d(a[i], {
                                    data: c
                                }), f++);
                        return 0 === f && (g = e(this)), g
                    }), a.registerHelper("if", function(a, b) {
                        return m(a) && (a = a.call(this)), !b.hash.includeZero && !a || g.isEmpty(a) ? b.inverse(this) : b.fn(this)
                    }), a.registerHelper("unless", function(b, c) {
                        return a.helpers["if"].call(this, b, {
                            fn: c.inverse,
                            inverse: c.fn,
                            hash: c.hash
                        })
                    }), a.registerHelper("with", function(a, b) {
                        return m(a) && (a = a.call(this)), g.isEmpty(a) ? void 0 : b.fn(a)
                    }), a.registerHelper("log", function(b, c) {
                        var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
                        a.log(d, b)
                    })
                }

                function f(a, b) {
                    p.log(a, b)
                }
                var g = a,
                    h = b["default"],
                    i = "1.1.2";
                c.VERSION = i;
                var j = 4;
                c.COMPILER_REVISION = j;
                var k = {
                    1: "<= 1.0.rc.2",
                    2: "== 1.0.0-rc.3",
                    3: "== 1.0.0-rc.4",
                    4: ">= 1.0.0"
                };
                c.REVISION_CHANGES = k;
                var l = g.isArray,
                    m = g.isFunction,
                    n = g.toString,
                    o = "[object Object]";
                c.HandlebarsEnvironment = d, d.prototype = {
                    constructor: d,
                    logger: p,
                    log: f,
                    registerHelper: function(a, b, c) {
                        if (n.call(a) === o) {
                            if (c || b) throw new h("Arg not supported with multiple helpers");
                            g.extend(this.helpers, a)
                        } else c && (b.not = c), this.helpers[a] = b
                    },
                    registerPartial: function(a, b) {
                        n.call(a) === o ? g.extend(this.partials, a) : this.partials[a] = b
                    }
                };
                var p = {
                    methodMap: {
                        0: "debug",
                        1: "info",
                        2: "warn",
                        3: "error"
                    },
                    DEBUG: 0,
                    INFO: 1,
                    WARN: 2,
                    ERROR: 3,
                    level: 3,
                    log: function(a, b) {
                        if (p.level <= a) {
                            var c = p.methodMap[a];
                            "undefined" != typeof console && console[c] && console[c].call(console, b)
                        }
                    }
                };
                c.logger = p, c.log = f;
                var q = function(a) {
                    var b = {};
                    return g.extend(b, a), b
                };
                c.createFrame = q
            }), define("handlebars/runtime", ["./utils", "./exception", "./base", "exports"], function(a, b, c, d) {
                function e(a) {
                    var b = a && a[0] || 1,
                        c = m;
                    if (b !== c) {
                        if (c > b) {
                            var d = n[c],
                                e = n[b];
                            throw new Error("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + d + ") or downgrade your runtime to an older version (" + e + ").")
                        }
                        throw new Error("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + a[1] + ").")
                    }
                }

                function f(a, b) {
                    if (!b) throw new Error("No environment passed to template");
                    var c;
                    c = b.compile ? function(a, c, d, e, f, g) {
                        var h = i.apply(this, arguments);
                        if (h) return h;
                        var j = {
                            helpers: e,
                            partials: f,
                            data: g
                        };
                        return f[c] = b.compile(a, {
                            data: void 0 !== g
                        }, b), f[c](d, j)
                    } : function(a, b) {
                        var c = i.apply(this, arguments);
                        if (c) return c;
                        throw new l("The partial " + b + " could not be compiled when running in runtime-only mode")
                    };
                    var d = {
                        escapeExpression: k.escapeExpression,
                        invokePartial: c,
                        programs: [],
                        program: function(a, b, c) {
                            var d = this.programs[a];
                            return c ? d = h(a, b, c) : d || (d = this.programs[a] = h(a, b)), d
                        },
                        merge: function(a, b) {
                            var c = a || b;
                            return a && b && a !== b && (c = {}, k.extend(c, b), k.extend(c, a)), c
                        },
                        programWithDepth: g,
                        noop: j,
                        compilerInfo: null
                    };
                    return function(c, f) {
                        f = f || {};
                        var g, h, i = f.partial ? f : b;
                        f.partial || (g = f.helpers, h = f.partials);
                        var j = a.call(d, i, c, g, h, f.data);
                        return f.partial || e(d.compilerInfo), j
                    }
                }

                function g(a, b, c) {
                    var d = Array.prototype.slice.call(arguments, 3),
                        e = function(a, e) {
                            return e = e || {}, b.apply(this, [a, e.data || c].concat(d))
                        };
                    return e.program = a, e.depth = d.length, e
                }

                function h(a, b, c) {
                    var d = function(a, d) {
                        return d = d || {}, b(a, d.data || c)
                    };
                    return d.program = a, d.depth = 0, d
                }

                function i(a, b, c, d, e, f) {
                    var g = {
                        partial: !0,
                        helpers: d,
                        partials: e,
                        data: f
                    };
                    if (void 0 === a) throw new l("The partial " + b + " could not be found");
                    return a instanceof Function ? a(c, g) : void 0
                }

                function j() {
                    return ""
                }
                var k = a,
                    l = b["default"],
                    m = c.COMPILER_REVISION,
                    n = c.REVISION_CHANGES;
                d.template = f, d.programWithDepth = g, d.program = h, d.invokePartial = i, d.noop = j
            }), define("handlebars.runtime", ["./handlebars/base", "./handlebars/safe-string", "./handlebars/exception", "./handlebars/utils", "./handlebars/runtime", "exports"], function(a, b, c, d, e, f) {
                var g = a,
                    h = b["default"],
                    i = c["default"],
                    j = d,
                    k = e,
                    l = function() {
                        var a = new g.HandlebarsEnvironment;
                        return j.extend(a, g), a.SafeString = h, a.Exception = i, a.Utils = j, a.VM = k, a.template = function(b) {
                            return k.template(b, a)
                        }, a
                    },
                    m = l();
                m.create = l, f["default"] = m
            }), define("handlebars/compiler/ast", ["../exception", "exports"], function(a, b) {
                function c(a, b, d) {
                    this.type = "program", this.statements = a, this.strip = {}, d ? (this.inverse = new c(d, b), this.strip.right = b.left) : b && (this.strip.left = b.right)
                }

                function d(a, b, c, d) {
                    this.type = "mustache", this.hash = b, this.strip = d;
                    var e = c[3] || c[2];
                    this.escaped = "{" !== e && "&" !== e;
                    var f = this.id = a[0],
                        g = this.params = a.slice(1),
                        h = this.eligibleHelper = f.isSimple;
                    this.isHelper = h && (g.length || b)
                }

                function e(a, b, c) {
                    this.type = "partial", this.partialName = a, this.context = b, this.strip = c
                }

                function f(a, b, c, d) {
                    if (a.id.original !== d.path.original) throw new p(a.id.original + " doesn't match " + d.path.original);
                    this.type = "block", this.mustache = a, this.program = b, this.inverse = c, this.strip = {
                        left: a.strip.left,
                        right: d.strip.right
                    }, (b || c).strip.left = a.strip.right, (c || b).strip.right = d.strip.left, c && !b && (this.isInverse = !0)
                }

                function g(a) {
                    this.type = "content", this.string = a
                }

                function h(a) {
                    this.type = "hash", this.pairs = a
                }

                function i(a) {
                    this.type = "ID";
                    for (var b = "", c = [], d = 0, e = 0, f = a.length; f > e; e++) {
                        var g = a[e].part;
                        if (b += (a[e].separator || "") + g, ".." === g || "." === g || "this" === g) {
                            if (c.length > 0) throw new p("Invalid path: " + b);
                            ".." === g ? d++ : this.isScoped = !0
                        } else c.push(g)
                    }
                    this.original = b, this.parts = c, this.string = c.join("."), this.depth = d, this.isSimple = 1 === a.length && !this.isScoped && 0 === d, this.stringModeValue = this.string
                }

                function j(a) {
                    this.type = "PARTIAL_NAME", this.name = a.original
                }

                function k(a) {
                    this.type = "DATA", this.id = a
                }

                function l(a) {
                    this.type = "STRING", this.original = this.string = this.stringModeValue = a
                }

                function m(a) {
                    this.type = "INTEGER", this.original = this.integer = a, this.stringModeValue = Number(a)
                }

                function n(a) {
                    this.type = "BOOLEAN", this.bool = a, this.stringModeValue = "true" === a
                }

                function o(a) {
                    this.type = "comment", this.comment = a
                }
                var p = a["default"];
                b.ProgramNode = c, b.MustacheNode = d, b.PartialNode = e, b.BlockNode = f, b.ContentNode = g, b.HashNode = h, b.IdNode = i, b.PartialNameNode = j, b.DataNode = k, b.StringNode = l, b.IntegerNode = m, b.BooleanNode = n, b.CommentNode = o
            }), define("handlebars/compiler/parser", ["exports"], function(a) {
                var b = function() {
                    function a(a, b) {
                        return {
                            left: "~" === a[2],
                            right: "~" === b[0] || "~" === b[1]
                        }
                    }

                    function b() {
                        this.yy = {}
                    }
                    var c = {
                            trace: function() {},
                            yy: {},
                            symbols_: {
                                error: 2,
                                root: 3,
                                statements: 4,
                                EOF: 5,
                                program: 6,
                                simpleInverse: 7,
                                statement: 8,
                                openInverse: 9,
                                closeBlock: 10,
                                openBlock: 11,
                                mustache: 12,
                                partial: 13,
                                CONTENT: 14,
                                COMMENT: 15,
                                OPEN_BLOCK: 16,
                                inMustache: 17,
                                CLOSE: 18,
                                OPEN_INVERSE: 19,
                                OPEN_ENDBLOCK: 20,
                                path: 21,
                                OPEN: 22,
                                OPEN_UNESCAPED: 23,
                                CLOSE_UNESCAPED: 24,
                                OPEN_PARTIAL: 25,
                                partialName: 26,
                                partial_option0: 27,
                                inMustache_repetition0: 28,
                                inMustache_option0: 29,
                                dataName: 30,
                                param: 31,
                                STRING: 32,
                                INTEGER: 33,
                                BOOLEAN: 34,
                                hash: 35,
                                hash_repetition_plus0: 36,
                                hashSegment: 37,
                                ID: 38,
                                EQUALS: 39,
                                DATA: 40,
                                pathSegments: 41,
                                SEP: 42,
                                $accept: 0,
                                $end: 1
                            },
                            terminals_: {
                                2: "error",
                                5: "EOF",
                                14: "CONTENT",
                                15: "COMMENT",
                                16: "OPEN_BLOCK",
                                18: "CLOSE",
                                19: "OPEN_INVERSE",
                                20: "OPEN_ENDBLOCK",
                                22: "OPEN",
                                23: "OPEN_UNESCAPED",
                                24: "CLOSE_UNESCAPED",
                                25: "OPEN_PARTIAL",
                                32: "STRING",
                                33: "INTEGER",
                                34: "BOOLEAN",
                                38: "ID",
                                39: "EQUALS",
                                40: "DATA",
                                42: "SEP"
                            },
                            productions_: [0, [3, 2],
                                [3, 1],
                                [6, 2],
                                [6, 3],
                                [6, 2],
                                [6, 1],
                                [6, 1],
                                [6, 0],
                                [4, 1],
                                [4, 2],
                                [8, 3],
                                [8, 3],
                                [8, 1],
                                [8, 1],
                                [8, 1],
                                [8, 1],
                                [11, 3],
                                [9, 3],
                                [10, 3],
                                [12, 3],
                                [12, 3],
                                [13, 4],
                                [7, 2],
                                [17, 3],
                                [17, 1],
                                [31, 1],
                                [31, 1],
                                [31, 1],
                                [31, 1],
                                [31, 1],
                                [35, 1],
                                [37, 3],
                                [26, 1],
                                [26, 1],
                                [26, 1],
                                [30, 2],
                                [21, 1],
                                [41, 3],
                                [41, 1],
                                [27, 0],
                                [27, 1],
                                [28, 0],
                                [28, 2],
                                [29, 0],
                                [29, 1],
                                [36, 1],
                                [36, 2]
                            ],
                            performAction: function(b, c, d, e, f, g) {
                                var h = g.length - 1;
                                switch (f) {
                                    case 1:
                                        return new e.ProgramNode(g[h - 1]);
                                    case 2:
                                        return new e.ProgramNode([]);
                                    case 3:
                                        this.$ = new e.ProgramNode([], g[h - 1], g[h]);
                                        break;
                                    case 4:
                                        this.$ = new e.ProgramNode(g[h - 2], g[h - 1], g[h]);
                                        break;
                                    case 5:
                                        this.$ = new e.ProgramNode(g[h - 1], g[h], []);
                                        break;
                                    case 6:
                                        this.$ = new e.ProgramNode(g[h]);
                                        break;
                                    case 7:
                                        this.$ = new e.ProgramNode([]);
                                        break;
                                    case 8:
                                        this.$ = new e.ProgramNode([]);
                                        break;
                                    case 9:
                                        this.$ = [g[h]];
                                        break;
                                    case 10:
                                        g[h - 1].push(g[h]), this.$ = g[h - 1];
                                        break;
                                    case 11:
                                        this.$ = new e.BlockNode(g[h - 2], g[h - 1].inverse, g[h - 1], g[h]);
                                        break;
                                    case 12:
                                        this.$ = new e.BlockNode(g[h - 2], g[h - 1], g[h - 1].inverse, g[h]);
                                        break;
                                    case 13:
                                        this.$ = g[h];
                                        break;
                                    case 14:
                                        this.$ = g[h];
                                        break;
                                    case 15:
                                        this.$ = new e.ContentNode(g[h]);
                                        break;
                                    case 16:
                                        this.$ = new e.CommentNode(g[h]);
                                        break;
                                    case 17:
                                        this.$ = new e.MustacheNode(g[h - 1][0], g[h - 1][1], g[h - 2], a(g[h - 2], g[h]));
                                        break;
                                    case 18:
                                        this.$ = new e.MustacheNode(g[h - 1][0], g[h - 1][1], g[h - 2], a(g[h - 2], g[h]));
                                        break;
                                    case 19:
                                        this.$ = {
                                            path: g[h - 1],
                                            strip: a(g[h - 2], g[h])
                                        };
                                        break;
                                    case 20:
                                        this.$ = new e.MustacheNode(g[h - 1][0], g[h - 1][1], g[h - 2], a(g[h - 2], g[h]));
                                        break;
                                    case 21:
                                        this.$ = new e.MustacheNode(g[h - 1][0], g[h - 1][1], g[h - 2], a(g[h - 2], g[h]));
                                        break;
                                    case 22:
                                        this.$ = new e.PartialNode(g[h - 2], g[h - 1], a(g[h - 3], g[h]));
                                        break;
                                    case 23:
                                        this.$ = a(g[h - 1], g[h]);
                                        break;
                                    case 24:
                                        this.$ = [
                                            [g[h - 2]].concat(g[h - 1]), g[h]
                                        ];
                                        break;
                                    case 25:
                                        this.$ = [
                                            [g[h]], null
                                        ];
                                        break;
                                    case 26:
                                        this.$ = g[h];
                                        break;
                                    case 27:
                                        this.$ = new e.StringNode(g[h]);
                                        break;
                                    case 28:
                                        this.$ = new e.IntegerNode(g[h]);
                                        break;
                                    case 29:
                                        this.$ = new e.BooleanNode(g[h]);
                                        break;
                                    case 30:
                                        this.$ = g[h];
                                        break;
                                    case 31:
                                        this.$ = new e.HashNode(g[h]);
                                        break;
                                    case 32:
                                        this.$ = [g[h - 2], g[h]];
                                        break;
                                    case 33:
                                        this.$ = new e.PartialNameNode(g[h]);
                                        break;
                                    case 34:
                                        this.$ = new e.PartialNameNode(new e.StringNode(g[h]));
                                        break;
                                    case 35:
                                        this.$ = new e.PartialNameNode(new e.IntegerNode(g[h]));
                                        break;
                                    case 36:
                                        this.$ = new e.DataNode(g[h]);
                                        break;
                                    case 37:
                                        this.$ = new e.IdNode(g[h]);
                                        break;
                                    case 38:
                                        g[h - 2].push({
                                            part: g[h],
                                            separator: g[h - 1]
                                        }), this.$ = g[h - 2];
                                        break;
                                    case 39:
                                        this.$ = [{
                                            part: g[h]
                                        }];
                                        break;
                                    case 42:
                                        this.$ = [];
                                        break;
                                    case 43:
                                        g[h - 1].push(g[h]);
                                        break;
                                    case 46:
                                        this.$ = [g[h]];
                                        break;
                                    case 47:
                                        g[h - 1].push(g[h])
                                }
                            },
                            table: [{
                                3: 1,
                                4: 2,
                                5: [1, 3],
                                8: 4,
                                9: 5,
                                11: 6,
                                12: 7,
                                13: 8,
                                14: [1, 9],
                                15: [1, 10],
                                16: [1, 12],
                                19: [1, 11],
                                22: [1, 13],
                                23: [1, 14],
                                25: [1, 15]
                            }, {
                                1: [3]
                            }, {
                                5: [1, 16],
                                8: 17,
                                9: 5,
                                11: 6,
                                12: 7,
                                13: 8,
                                14: [1, 9],
                                15: [1, 10],
                                16: [1, 12],
                                19: [1, 11],
                                22: [1, 13],
                                23: [1, 14],
                                25: [1, 15]
                            }, {
                                1: [2, 2]
                            }, {
                                5: [2, 9],
                                14: [2, 9],
                                15: [2, 9],
                                16: [2, 9],
                                19: [2, 9],
                                20: [2, 9],
                                22: [2, 9],
                                23: [2, 9],
                                25: [2, 9]
                            }, {
                                4: 20,
                                6: 18,
                                7: 19,
                                8: 4,
                                9: 5,
                                11: 6,
                                12: 7,
                                13: 8,
                                14: [1, 9],
                                15: [1, 10],
                                16: [1, 12],
                                19: [1, 21],
                                20: [2, 8],
                                22: [1, 13],
                                23: [1, 14],
                                25: [1, 15]
                            }, {
                                4: 20,
                                6: 22,
                                7: 19,
                                8: 4,
                                9: 5,
                                11: 6,
                                12: 7,
                                13: 8,
                                14: [1, 9],
                                15: [1, 10],
                                16: [1, 12],
                                19: [1, 21],
                                20: [2, 8],
                                22: [1, 13],
                                23: [1, 14],
                                25: [1, 15]
                            }, {
                                5: [2, 13],
                                14: [2, 13],
                                15: [2, 13],
                                16: [2, 13],
                                19: [2, 13],
                                20: [2, 13],
                                22: [2, 13],
                                23: [2, 13],
                                25: [2, 13]
                            }, {
                                5: [2, 14],
                                14: [2, 14],
                                15: [2, 14],
                                16: [2, 14],
                                19: [2, 14],
                                20: [2, 14],
                                22: [2, 14],
                                23: [2, 14],
                                25: [2, 14]
                            }, {
                                5: [2, 15],
                                14: [2, 15],
                                15: [2, 15],
                                16: [2, 15],
                                19: [2, 15],
                                20: [2, 15],
                                22: [2, 15],
                                23: [2, 15],
                                25: [2, 15]
                            }, {
                                5: [2, 16],
                                14: [2, 16],
                                15: [2, 16],
                                16: [2, 16],
                                19: [2, 16],
                                20: [2, 16],
                                22: [2, 16],
                                23: [2, 16],
                                25: [2, 16]
                            }, {
                                17: 23,
                                21: 24,
                                30: 25,
                                38: [1, 28],
                                40: [1, 27],
                                41: 26
                            }, {
                                17: 29,
                                21: 24,
                                30: 25,
                                38: [1, 28],
                                40: [1, 27],
                                41: 26
                            }, {
                                17: 30,
                                21: 24,
                                30: 25,
                                38: [1, 28],
                                40: [1, 27],
                                41: 26
                            }, {
                                17: 31,
                                21: 24,
                                30: 25,
                                38: [1, 28],
                                40: [1, 27],
                                41: 26
                            }, {
                                21: 33,
                                26: 32,
                                32: [1, 34],
                                33: [1, 35],
                                38: [1, 28],
                                41: 26
                            }, {
                                1: [2, 1]
                            }, {
                                5: [2, 10],
                                14: [2, 10],
                                15: [2, 10],
                                16: [2, 10],
                                19: [2, 10],
                                20: [2, 10],
                                22: [2, 10],
                                23: [2, 10],
                                25: [2, 10]
                            }, {
                                10: 36,
                                20: [1, 37]
                            }, {
                                4: 38,
                                8: 4,
                                9: 5,
                                11: 6,
                                12: 7,
                                13: 8,
                                14: [1, 9],
                                15: [1, 10],
                                16: [1, 12],
                                19: [1, 11],
                                20: [2, 7],
                                22: [1, 13],
                                23: [1, 14],
                                25: [1, 15]
                            }, {
                                7: 39,
                                8: 17,
                                9: 5,
                                11: 6,
                                12: 7,
                                13: 8,
                                14: [1, 9],
                                15: [1, 10],
                                16: [1, 12],
                                19: [1, 21],
                                20: [2, 6],
                                22: [1, 13],
                                23: [1, 14],
                                25: [1, 15]
                            }, {
                                17: 23,
                                18: [1, 40],
                                21: 24,
                                30: 25,
                                38: [1, 28],
                                40: [1, 27],
                                41: 26
                            }, {
                                10: 41,
                                20: [1, 37]
                            }, {
                                18: [1, 42]
                            }, {
                                18: [2, 42],
                                24: [2, 42],
                                28: 43,
                                32: [2, 42],
                                33: [2, 42],
                                34: [2, 42],
                                38: [2, 42],
                                40: [2, 42]
                            }, {
                                18: [2, 25],
                                24: [2, 25]
                            }, {
                                18: [2, 37],
                                24: [2, 37],
                                32: [2, 37],
                                33: [2, 37],
                                34: [2, 37],
                                38: [2, 37],
                                40: [2, 37],
                                42: [1, 44]
                            }, {
                                21: 45,
                                38: [1, 28],
                                41: 26
                            }, {
                                18: [2, 39],
                                24: [2, 39],
                                32: [2, 39],
                                33: [2, 39],
                                34: [2, 39],
                                38: [2, 39],
                                40: [2, 39],
                                42: [2, 39]
                            }, {
                                18: [1, 46]
                            }, {
                                18: [1, 47]
                            }, {
                                24: [1, 48]
                            }, {
                                18: [2, 40],
                                21: 50,
                                27: 49,
                                38: [1, 28],
                                41: 26
                            }, {
                                18: [2, 33],
                                38: [2, 33]
                            }, {
                                18: [2, 34],
                                38: [2, 34]
                            }, {
                                18: [2, 35],
                                38: [2, 35]
                            }, {
                                5: [2, 11],
                                14: [2, 11],
                                15: [2, 11],
                                16: [2, 11],
                                19: [2, 11],
                                20: [2, 11],
                                22: [2, 11],
                                23: [2, 11],
                                25: [2, 11]
                            }, {
                                21: 51,
                                38: [1, 28],
                                41: 26
                            }, {
                                8: 17,
                                9: 5,
                                11: 6,
                                12: 7,
                                13: 8,
                                14: [1, 9],
                                15: [1, 10],
                                16: [1, 12],
                                19: [1, 11],
                                20: [2, 3],
                                22: [1, 13],
                                23: [1, 14],
                                25: [1, 15]
                            }, {
                                4: 52,
                                8: 4,
                                9: 5,
                                11: 6,
                                12: 7,
                                13: 8,
                                14: [1, 9],
                                15: [1, 10],
                                16: [1, 12],
                                19: [1, 11],
                                20: [2, 5],
                                22: [1, 13],
                                23: [1, 14],
                                25: [1, 15]
                            }, {
                                14: [2, 23],
                                15: [2, 23],
                                16: [2, 23],
                                19: [2, 23],
                                20: [2, 23],
                                22: [2, 23],
                                23: [2, 23],
                                25: [2, 23]
                            }, {
                                5: [2, 12],
                                14: [2, 12],
                                15: [2, 12],
                                16: [2, 12],
                                19: [2, 12],
                                20: [2, 12],
                                22: [2, 12],
                                23: [2, 12],
                                25: [2, 12]
                            }, {
                                14: [2, 18],
                                15: [2, 18],
                                16: [2, 18],
                                19: [2, 18],
                                20: [2, 18],
                                22: [2, 18],
                                23: [2, 18],
                                25: [2, 18]
                            }, {
                                18: [2, 44],
                                21: 56,
                                24: [2, 44],
                                29: 53,
                                30: 60,
                                31: 54,
                                32: [1, 57],
                                33: [1, 58],
                                34: [1, 59],
                                35: 55,
                                36: 61,
                                37: 62,
                                38: [1, 63],
                                40: [1, 27],
                                41: 26
                            }, {
                                38: [1, 64]
                            }, {
                                18: [2, 36],
                                24: [2, 36],
                                32: [2, 36],
                                33: [2, 36],
                                34: [2, 36],
                                38: [2, 36],
                                40: [2, 36]
                            }, {
                                14: [2, 17],
                                15: [2, 17],
                                16: [2, 17],
                                19: [2, 17],
                                20: [2, 17],
                                22: [2, 17],
                                23: [2, 17],
                                25: [2, 17]
                            }, {
                                5: [2, 20],
                                14: [2, 20],
                                15: [2, 20],
                                16: [2, 20],
                                19: [2, 20],
                                20: [2, 20],
                                22: [2, 20],
                                23: [2, 20],
                                25: [2, 20]
                            }, {
                                5: [2, 21],
                                14: [2, 21],
                                15: [2, 21],
                                16: [2, 21],
                                19: [2, 21],
                                20: [2, 21],
                                22: [2, 21],
                                23: [2, 21],
                                25: [2, 21]
                            }, {
                                18: [1, 65]
                            }, {
                                18: [2, 41]
                            }, {
                                18: [1, 66]
                            }, {
                                8: 17,
                                9: 5,
                                11: 6,
                                12: 7,
                                13: 8,
                                14: [1, 9],
                                15: [1, 10],
                                16: [1, 12],
                                19: [1, 11],
                                20: [2, 4],
                                22: [1, 13],
                                23: [1, 14],
                                25: [1, 15]
                            }, {
                                18: [2, 24],
                                24: [2, 24]
                            }, {
                                18: [2, 43],
                                24: [2, 43],
                                32: [2, 43],
                                33: [2, 43],
                                34: [2, 43],
                                38: [2, 43],
                                40: [2, 43]
                            }, {
                                18: [2, 45],
                                24: [2, 45]
                            }, {
                                18: [2, 26],
                                24: [2, 26],
                                32: [2, 26],
                                33: [2, 26],
                                34: [2, 26],
                                38: [2, 26],
                                40: [2, 26]
                            }, {
                                18: [2, 27],
                                24: [2, 27],
                                32: [2, 27],
                                33: [2, 27],
                                34: [2, 27],
                                38: [2, 27],
                                40: [2, 27]
                            }, {
                                18: [2, 28],
                                24: [2, 28],
                                32: [2, 28],
                                33: [2, 28],
                                34: [2, 28],
                                38: [2, 28],
                                40: [2, 28]
                            }, {
                                18: [2, 29],
                                24: [2, 29],
                                32: [2, 29],
                                33: [2, 29],
                                34: [2, 29],
                                38: [2, 29],
                                40: [2, 29]
                            }, {
                                18: [2, 30],
                                24: [2, 30],
                                32: [2, 30],
                                33: [2, 30],
                                34: [2, 30],
                                38: [2, 30],
                                40: [2, 30]
                            }, {
                                18: [2, 31],
                                24: [2, 31],
                                37: 67,
                                38: [1, 68]
                            }, {
                                18: [2, 46],
                                24: [2, 46],
                                38: [2, 46]
                            }, {
                                18: [2, 39],
                                24: [2, 39],
                                32: [2, 39],
                                33: [2, 39],
                                34: [2, 39],
                                38: [2, 39],
                                39: [1, 69],
                                40: [2, 39],
                                42: [2, 39]
                            }, {
                                18: [2, 38],
                                24: [2, 38],
                                32: [2, 38],
                                33: [2, 38],
                                34: [2, 38],
                                38: [2, 38],
                                40: [2, 38],
                                42: [2, 38]
                            }, {
                                5: [2, 22],
                                14: [2, 22],
                                15: [2, 22],
                                16: [2, 22],
                                19: [2, 22],
                                20: [2, 22],
                                22: [2, 22],
                                23: [2, 22],
                                25: [2, 22]
                            }, {
                                5: [2, 19],
                                14: [2, 19],
                                15: [2, 19],
                                16: [2, 19],
                                19: [2, 19],
                                20: [2, 19],
                                22: [2, 19],
                                23: [2, 19],
                                25: [2, 19]
                            }, {
                                18: [2, 47],
                                24: [2, 47],
                                38: [2, 47]
                            }, {
                                39: [1, 69]
                            }, {
                                21: 56,
                                30: 60,
                                31: 70,
                                32: [1, 57],
                                33: [1, 58],
                                34: [1, 59],
                                38: [1, 28],
                                40: [1, 27],
                                41: 26
                            }, {
                                18: [2, 32],
                                24: [2, 32],
                                38: [2, 32]
                            }],
                            defaultActions: {
                                3: [2, 2],
                                16: [2, 1],
                                50: [2, 41]
                            },
                            parseError: function(a) {
                                throw new Error(a)
                            },
                            parse: function(a) {
                                function b() {
                                    var a;
                                    return a = c.lexer.lex() || 1, "number" != typeof a && (a = c.symbols_[a] || a), a
                                }
                                var c = this,
                                    d = [0],
                                    e = [null],
                                    f = [],
                                    g = this.table,
                                    h = "",
                                    i = 0,
                                    j = 0,
                                    k = 0;
                                this.lexer.setInput(a), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, "undefined" == typeof this.lexer.yylloc && (this.lexer.yylloc = {});
                                var l = this.lexer.yylloc;
                                f.push(l);
                                var m = this.lexer.options && this.lexer.options.ranges;
                                "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                                for (var n, o, p, q, r, s, t, u, v, w = {};;) {
                                    if (p = d[d.length - 1], this.defaultActions[p] ? q = this.defaultActions[p] : ((null === n || "undefined" == typeof n) && (n = b()), q = g[p] && g[p][n]), "undefined" == typeof q || !q.length || !q[0]) {
                                        var x = "";
                                        if (!k) {
                                            v = [];
                                            for (s in g[p]) this.terminals_[s] && s > 2 && v.push("'" + this.terminals_[s] + "'");
                                            x = this.lexer.showPosition ? "Parse error on line " + (i + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + v.join(", ") + ", got '" + (this.terminals_[n] || n) + "'" : "Parse error on line " + (i + 1) + ": Unexpected " + (1 == n ? "end of input" : "'" + (this.terminals_[n] || n) + "'"), this.parseError(x, {
                                                text: this.lexer.match,
                                                token: this.terminals_[n] || n,
                                                line: this.lexer.yylineno,
                                                loc: l,
                                                expected: v
                                            })
                                        }
                                    }
                                    if (q[0] instanceof Array && q.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + p + ", token: " + n);
                                    switch (q[0]) {
                                        case 1:
                                            d.push(n), e.push(this.lexer.yytext), f.push(this.lexer.yylloc), d.push(q[1]), n = null, o ? (n = o, o = null) : (j = this.lexer.yyleng, h = this.lexer.yytext, i = this.lexer.yylineno, l = this.lexer.yylloc, k > 0 && k--);
                                            break;
                                        case 2:
                                            if (t = this.productions_[q[1]][1], w.$ = e[e.length - t], w._$ = {
                                                    first_line: f[f.length - (t || 1)].first_line,
                                                    last_line: f[f.length - 1].last_line,
                                                    first_column: f[f.length - (t || 1)].first_column,
                                                    last_column: f[f.length - 1].last_column
                                                }, m && (w._$.range = [f[f.length - (t || 1)].range[0], f[f.length - 1].range[1]]), r = this.performAction.call(w, h, j, i, this.yy, q[1], e, f), "undefined" != typeof r) return r;
                                            t && (d = d.slice(0, -1 * t * 2), e = e.slice(0, -1 * t), f = f.slice(0, -1 * t)), d.push(this.productions_[q[1]][0]), e.push(w.$), f.push(w._$), u = g[d[d.length - 2]][d[d.length - 1]], d.push(u);
                                            break;
                                        case 3:
                                            return !0
                                    }
                                }
                                return !0
                            }
                        },
                        d = function() {
                            var a = {
                                EOF: 1,
                                parseError: function(a, b) {
                                    if (!this.yy.parser) throw new Error(a);
                                    this.yy.parser.parseError(a, b)
                                },
                                setInput: function(a) {
                                    return this._input = a, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
                                        first_line: 1,
                                        first_column: 0,
                                        last_line: 1,
                                        last_column: 0
                                    }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
                                },
                                input: function() {
                                    var a = this._input[0];
                                    this.yytext += a, this.yyleng++, this.offset++, this.match += a, this.matched += a;
                                    var b = a.match(/(?:\r\n?|\n).*/g);
                                    return b ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), a
                                },
                                unput: function(a) {
                                    var b = a.length,
                                        c = a.split(/(?:\r\n?|\n)/g);
                                    this._input = a + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - b - 1), this.offset -= b;
                                    var d = this.match.split(/(?:\r\n?|\n)/g);
                                    this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), c.length - 1 && (this.yylineno -= c.length - 1);
                                    var e = this.yylloc.range;
                                    return this.yylloc = {
                                        first_line: this.yylloc.first_line,
                                        last_line: this.yylineno + 1,
                                        first_column: this.yylloc.first_column,
                                        last_column: c ? (c.length === d.length ? this.yylloc.first_column : 0) + d[d.length - c.length].length - c[0].length : this.yylloc.first_column - b
                                    }, this.options.ranges && (this.yylloc.range = [e[0], e[0] + this.yyleng - b]), this
                                },
                                more: function() {
                                    return this._more = !0, this
                                },
                                less: function(a) {
                                    this.unput(this.match.slice(a))
                                },
                                pastInput: function() {
                                    var a = this.matched.substr(0, this.matched.length - this.match.length);
                                    return (a.length > 20 ? "..." : "") + a.substr(-20).replace(/\n/g, "")
                                },
                                upcomingInput: function() {
                                    var a = this.match;
                                    return a.length < 20 && (a += this._input.substr(0, 20 - a.length)), (a.substr(0, 20) + (a.length > 20 ? "..." : "")).replace(/\n/g, "")
                                },
                                showPosition: function() {
                                    var a = this.pastInput(),
                                        b = new Array(a.length + 1).join("-");
                                    return a + this.upcomingInput() + "\n" + b + "^"
                                },
                                next: function() {
                                    if (this.done) return this.EOF;
                                    this._input || (this.done = !0);
                                    var a, b, c, d, e;
                                    this._more || (this.yytext = "", this.match = "");
                                    for (var f = this._currentRules(), g = 0; g < f.length && (c = this._input.match(this.rules[f[g]]), !c || b && !(c[0].length > b[0].length) || (b = c, d = g, this.options.flex)); g++);
                                    return b ? (e = b[0].match(/(?:\r\n?|\n).*/g), e && (this.yylineno += e.length), this.yylloc = {
                                        first_line: this.yylloc.last_line,
                                        last_line: this.yylineno + 1,
                                        first_column: this.yylloc.last_column,
                                        last_column: e ? e[e.length - 1].length - e[e.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + b[0].length
                                    }, this.yytext += b[0], this.match += b[0], this.matches = b, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(b[0].length), this.matched += b[0], a = this.performAction.call(this, this.yy, this, f[d], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), a ? a : void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                        text: "",
                                        token: null,
                                        line: this.yylineno
                                    })
                                },
                                lex: function() {
                                    var a = this.next();
                                    return "undefined" != typeof a ? a : this.lex()
                                },
                                begin: function(a) {
                                    this.conditionStack.push(a)
                                },
                                popState: function() {
                                    return this.conditionStack.pop()
                                },
                                _currentRules: function() {
                                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
                                },
                                topState: function() {
                                    return this.conditionStack[this.conditionStack.length - 2]
                                },
                                pushState: function(a) {
                                    this.begin(a)
                                }
                            };
                            return a.options = {}, a.performAction = function(a, b, c, d) {
                                function e(a, c) {
                                    return b.yytext = b.yytext.substr(a, b.yyleng - c)
                                }
                                switch (c) {
                                    case 0:
                                        if ("\\\\" === b.yytext.slice(-2) ? (e(0, 1), this.begin("mu")) : "\\" === b.yytext.slice(-1) ? (e(0, 1), this.begin("emu")) : this.begin("mu"), b.yytext) return 14;
                                        break;
                                    case 1:
                                        return 14;
                                    case 2:
                                        return "\\" !== b.yytext.slice(-1) && this.popState(), "\\" === b.yytext.slice(-1) && e(0, 1), 14;
                                    case 3:
                                        return e(0, 4), this.popState(), 15;
                                    case 4:
                                        return 25;
                                    case 5:
                                        return 16;
                                    case 6:
                                        return 20;
                                    case 7:
                                        return 19;
                                    case 8:
                                        return 19;
                                    case 9:
                                        return 23;
                                    case 10:
                                        return 22;
                                    case 11:
                                        this.popState(), this.begin("com");
                                        break;
                                    case 12:
                                        return e(3, 5), this.popState(), 15;
                                    case 13:
                                        return 22;
                                    case 14:
                                        return 39;
                                    case 15:
                                        return 38;
                                    case 16:
                                        return 38;
                                    case 17:
                                        return 42;
                                    case 18:
                                        break;
                                    case 19:
                                        return this.popState(), 24;
                                    case 20:
                                        return this.popState(), 18;
                                    case 21:
                                        return b.yytext = e(1, 2).replace(/\\"/g, '"'), 32;
                                    case 22:
                                        return b.yytext = e(1, 2).replace(/\\'/g, "'"), 32;
                                    case 23:
                                        return 40;
                                    case 24:
                                        return 34;
                                    case 25:
                                        return 34;
                                    case 26:
                                        return 33;
                                    case 27:
                                        return 38;
                                    case 28:
                                        return b.yytext = e(1, 2), 38;
                                    case 29:
                                        return "INVALID";
                                    case 30:
                                        return 5
                                }
                            }, a.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:[\s\S]*?--\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{!--)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{(~)?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s])))/, /^(?:false(?=([~}\s])))/, /^(?:-?[0-9]+(?=([~}\s])))/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.]))))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/], a.conditions = {
                                mu: {
                                    rules: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                                    inclusive: !1
                                },
                                emu: {
                                    rules: [2],
                                    inclusive: !1
                                },
                                com: {
                                    rules: [3],
                                    inclusive: !1
                                },
                                INITIAL: {
                                    rules: [0, 1, 30],
                                    inclusive: !0
                                }
                            }, a
                        }();
                    return c.lexer = d, b.prototype = c, c.Parser = b, new b
                }();
                a["default"] = b
            }), define("handlebars/compiler/base", ["./parser", "./ast", "exports"], function(a, b, c) {
                function d(a) {
                    return a.constructor === f.ProgramNode ? a : (e.yy = f, e.parse(a))
                }
                var e = a["default"],
                    f = b;
                c.parser = e, c.parse = d
            }), define("handlebars/compiler/javascript-compiler", ["../base", "exports"], function(a, b) {
                function c(a) {
                    this.value = a
                }

                function d() {}
                var e = a.COMPILER_REVISION,
                    f = a.REVISION_CHANGES,
                    g = a.log;
                d.prototype = {
                    nameLookup: function(a, b) {
                        var c, e;
                        return 0 === a.indexOf("depth") && (c = !0), e = /^[0-9]+$/.test(b) ? a + "[" + b + "]" : d.isValidJavaScriptVariableName(b) ? a + "." + b : a + "['" + b + "']", c ? "(" + a + " && " + e + ")" : e
                    },
                    appendToBuffer: function(a) {
                        return this.environment.isSimple ? "return " + a + ";" : {
                            appendToBuffer: !0,
                            content: a,
                            toString: function() {
                                return "buffer += " + a + ";"
                            }
                        }
                    },
                    initializeBuffer: function() {
                        return this.quotedString("")
                    },
                    namespace: "Handlebars",
                    compile: function(a, b, c, d) {
                        this.environment = a, this.options = b || {}, g("debug", this.environment.disassemble() + "\n\n"), this.name = this.environment.name, this.isChild = !!c, this.context = c || {
                            programs: [],
                            environments: [],
                            aliases: {}
                        }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.registers = {
                            list: []
                        }, this.compileStack = [], this.inlineStack = [], this.compileChildren(a, b);
                        var e, f = a.opcodes;
                        this.i = 0;
                        for (var h = f.length; this.i < h; this.i++) e = f[this.i], "DECLARE" === e.opcode ? this[e.name] = e.value : this[e.opcode].apply(this, e.args), e.opcode !== this.stripNext && (this.stripNext = !1);
                        return this.pushSource(""), this.createFunctionContext(d)
                    },
                    preamble: function() {
                        var a = [];
                        if (this.isChild) a.push("");
                        else {
                            var b = this.namespace,
                                c = "helpers = this.merge(helpers, " + b + ".helpers);";
                            this.environment.usePartial && (c = c + " partials = this.merge(partials, " + b + ".partials);"), this.options.data && (c += " data = data || {};"), a.push(c)
                        }
                        a.push(this.environment.isSimple ? "" : ", buffer = " + this.initializeBuffer()), this.lastContext = 0, this.source = a
                    },
                    createFunctionContext: function(a) {
                        var b = this.stackVars.concat(this.registers.list);
                        if (b.length > 0 && (this.source[1] = this.source[1] + ", " + b.join(", ")), !this.isChild)
                            for (var c in this.context.aliases) this.context.aliases.hasOwnProperty(c) && (this.source[1] = this.source[1] + ", " + c + "=" + this.context.aliases[c]);
                        this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"), this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"), this.environment.isSimple || this.pushSource("return buffer;");
                        for (var d = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"], h = 0, i = this.environment.depths.list.length; i > h; h++) d.push("depth" + this.environment.depths.list[h]);
                        var j = this.mergeSource();
                        if (!this.isChild) {
                            var k = e,
                                l = f[k];
                            j = "this.compilerInfo = [" + k + ",'" + l + "'];\n" + j
                        }
                        if (a) return d.push(j), Function.apply(this, d);
                        var m = "function " + (this.name || "") + "(" + d.join(",") + ") {\n  " + j + "}";
                        return g("debug", m + "\n\n"), m
                    },
                    mergeSource: function() {
                        for (var a, b = "", c = 0, d = this.source.length; d > c; c++) {
                            var e = this.source[c];
                            e.appendToBuffer ? a = a ? a + "\n    + " + e.content : e.content : (a && (b += "buffer += " + a + ";\n  ", a = void 0), b += e + "\n  ")
                        }
                        return b
                    },
                    blockValue: function() {
                        this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
                        var a = ["depth0"];
                        this.setupParams(0, a), this.replaceStack(function(b) {
                            return a.splice(1, 0, b), "blockHelperMissing.call(" + a.join(", ") + ")"
                        })
                    },
                    ambiguousBlockValue: function() {
                        this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
                        var a = ["depth0"];
                        this.setupParams(0, a);
                        var b = this.topStack();
                        a.splice(1, 0, b), a[a.length - 1] = "options", this.pushSource("if (!" + this.lastHelper + ") { " + b + " = blockHelperMissing.call(" + a.join(", ") + "); }")
                    },
                    appendContent: function(a) {
                        this.pendingContent && (a = this.pendingContent + a), this.stripNext && (a = a.replace(/^\s+/, "")), this.pendingContent = a
                    },
                    strip: function() {
                        this.pendingContent && (this.pendingContent = this.pendingContent.replace(/\s+$/, "")), this.stripNext = "strip"
                    },
                    append: function() {
                        this.flushInline();
                        var a = this.popStack();
                        this.pushSource("if(" + a + " || " + a + " === 0) { " + this.appendToBuffer(a) + " }"), this.environment.isSimple && this.pushSource("else { " + this.appendToBuffer("''") + " }")
                    },
                    appendEscaped: function() {
                        this.context.aliases.escapeExpression = "this.escapeExpression", this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"))
                    },
                    getContext: function(a) {
                        this.lastContext !== a && (this.lastContext = a)
                    },
                    lookupOnContext: function(a) {
                        this.push(this.nameLookup("depth" + this.lastContext, a, "context"))
                    },
                    pushContext: function() {
                        this.pushStackLiteral("depth" + this.lastContext)
                    },
                    resolvePossibleLambda: function() {
                        this.context.aliases.functionType = '"function"', this.replaceStack(function(a) {
                            return "typeof " + a + " === functionType ? " + a + ".apply(depth0) : " + a
                        })
                    },
                    lookup: function(a) {
                        this.replaceStack(function(b) {
                            return b + " == null || " + b + " === false ? " + b + " : " + this.nameLookup(b, a, "context")
                        })
                    },
                    lookupData: function() {
                        this.push("data")
                    },
                    pushStringParam: function(a, b) {
                        this.pushStackLiteral("depth" + this.lastContext), this.pushString(b), "string" == typeof a ? this.pushString(a) : this.pushStackLiteral(a)
                    },
                    emptyHash: function() {
                        this.pushStackLiteral("{}"), this.options.stringParams && (this.register("hashTypes", "{}"), this.register("hashContexts", "{}"))
                    },
                    pushHash: function() {
                        this.hash = {
                            values: [],
                            types: [],
                            contexts: []
                        }
                    },
                    popHash: function() {
                        var a = this.hash;
                        this.hash = void 0, this.options.stringParams && (this.register("hashContexts", "{" + a.contexts.join(",") + "}"), this.register("hashTypes", "{" + a.types.join(",") + "}")), this.push("{\n    " + a.values.join(",\n    ") + "\n  }")
                    },
                    pushString: function(a) {
                        this.pushStackLiteral(this.quotedString(a))
                    },
                    push: function(a) {
                        return this.inlineStack.push(a), a
                    },
                    pushLiteral: function(a) {
                        this.pushStackLiteral(a)
                    },
                    pushProgram: function(a) {
                        this.pushStackLiteral(null != a ? this.programExpression(a) : null)
                    },
                    invokeHelper: function(a, b) {
                        this.context.aliases.helperMissing = "helpers.helperMissing";
                        var c = this.lastHelper = this.setupHelper(a, b, !0),
                            d = this.nameLookup("depth" + this.lastContext, b, "context");
                        this.push(c.name + " || " + d), this.replaceStack(function(a) {
                            return a + " ? " + a + ".call(" + c.callParams + ") : helperMissing.call(" + c.helperMissingParams + ")"
                        })
                    },
                    invokeKnownHelper: function(a, b) {
                        var c = this.setupHelper(a, b);
                        this.push(c.name + ".call(" + c.callParams + ")")
                    },
                    invokeAmbiguous: function(a, b) {
                        this.context.aliases.functionType = '"function"', this.pushStackLiteral("{}");
                        var c = this.setupHelper(0, a, b),
                            d = this.lastHelper = this.nameLookup("helpers", a, "helper"),
                            e = this.nameLookup("depth" + this.lastContext, a, "context"),
                            f = this.nextStack();
                        this.pushSource("if (" + f + " = " + d + ") { " + f + " = " + f + ".call(" + c.callParams + "); }"), this.pushSource("else { " + f + " = " + e + "; " + f + " = typeof " + f + " === functionType ? " + f + ".call(" + c.callParams + ") : " + f + "; }")
                    },
                    invokePartial: function(a) {
                        var b = [this.nameLookup("partials", a, "partial"), "'" + a + "'", this.popStack(), "helpers", "partials"];
                        this.options.data && b.push("data"), this.context.aliases.self = "this", this.push("self.invokePartial(" + b.join(", ") + ")")
                    },
                    assignToHash: function(a) {
                        var b, c, d = this.popStack();
                        this.options.stringParams && (c = this.popStack(), b = this.popStack());
                        var e = this.hash;
                        b && e.contexts.push("'" + a + "': " + b), c && e.types.push("'" + a + "': " + c), e.values.push("'" + a + "': (" + d + ")")
                    },
                    compiler: d,
                    compileChildren: function(a, b) {
                        for (var c, d, e = a.children, f = 0, g = e.length; g > f; f++) {
                            c = e[f], d = new this.compiler;
                            var h = this.matchExistingProgram(c);
                            null == h ? (this.context.programs.push(""), h = this.context.programs.length, c.index = h, c.name = "program" + h, this.context.programs[h] = d.compile(c, b, this.context), this.context.environments[h] = c) : (c.index = h, c.name = "program" + h)
                        }
                    },
                    matchExistingProgram: function(a) {
                        for (var b = 0, c = this.context.environments.length; c > b; b++) {
                            var d = this.context.environments[b];
                            if (d && d.equals(a)) return b
                        }
                    },
                    programExpression: function(a) {
                        if (this.context.aliases.self = "this", null == a) return "self.noop";
                        for (var b, c = this.environment.children[a], d = c.depths.list, e = [c.index, c.name, "data"], f = 0, g = d.length; g > f; f++) b = d[f], e.push(1 === b ? "depth0" : "depth" + (b - 1));
                        return (0 === d.length ? "self.program(" : "self.programWithDepth(") + e.join(", ") + ")"
                    },
                    register: function(a, b) {
                        this.useRegister(a), this.pushSource(a + " = " + b + ";")
                    },
                    useRegister: function(a) {
                        this.registers[a] || (this.registers[a] = !0, this.registers.list.push(a))
                    },
                    pushStackLiteral: function(a) {
                        return this.push(new c(a))
                    },
                    pushSource: function(a) {
                        this.pendingContent && (this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))), this.pendingContent = void 0), a && this.source.push(a)
                    },
                    pushStack: function(a) {
                        this.flushInline();
                        var b = this.incrStack();
                        return a && this.pushSource(b + " = " + a + ";"), this.compileStack.push(b), b
                    },
                    replaceStack: function(a) {
                        var b, d = "",
                            e = this.isInline();
                        if (e) {
                            var f = this.popStack(!0);
                            if (f instanceof c) b = f.value;
                            else {
                                var g = this.stackSlot ? this.topStackName() : this.incrStack();
                                d = "(" + this.push(g) + " = " + f + "),", b = this.topStack()
                            }
                        } else b = this.topStack();
                        var h = a.call(this, b);
                        return e ? ((this.inlineStack.length || this.compileStack.length) && this.popStack(), this.push("(" + d + h + ")")) : (/^stack/.test(b) || (b = this.nextStack()), this.pushSource(b + " = (" + d + h + ");")), b
                    },
                    nextStack: function() {
                        return this.pushStack()
                    },
                    incrStack: function() {
                        return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), this.topStackName()
                    },
                    topStackName: function() {
                        return "stack" + this.stackSlot
                    },
                    flushInline: function() {
                        var a = this.inlineStack;
                        if (a.length) {
                            this.inlineStack = [];
                            for (var b = 0, d = a.length; d > b; b++) {
                                var e = a[b];
                                e instanceof c ? this.compileStack.push(e) : this.pushStack(e)
                            }
                        }
                    },
                    isInline: function() {
                        return this.inlineStack.length
                    },
                    popStack: function(a) {
                        var b = this.isInline(),
                            d = (b ? this.inlineStack : this.compileStack).pop();
                        return !a && d instanceof c ? d.value : (b || this.stackSlot--, d)
                    },
                    topStack: function(a) {
                        var b = this.isInline() ? this.inlineStack : this.compileStack,
                            d = b[b.length - 1];
                        return !a && d instanceof c ? d.value : d
                    },
                    quotedString: function(a) {
                        return '"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"'
                    },
                    setupHelper: function(a, b, c) {
                        var d = [];
                        this.setupParams(a, d, c);
                        var e = this.nameLookup("helpers", b, "helper");
                        return {
                            params: d,
                            name: e,
                            callParams: ["depth0"].concat(d).join(", "),
                            helperMissingParams: c && ["depth0", this.quotedString(b)].concat(d).join(", ")
                        }
                    },
                    setupParams: function(a, b, c) {
                        var d, e, f, g = [],
                            h = [],
                            i = [];
                        g.push("hash:" + this.popStack()), e = this.popStack(), f = this.popStack(), (f || e) && (f || (this.context.aliases.self = "this", f = "self.noop"), e || (this.context.aliases.self = "this", e = "self.noop"), g.push("inverse:" + e), g.push("fn:" + f));
                        for (var j = 0; a > j; j++) d = this.popStack(), b.push(d), this.options.stringParams && (i.push(this.popStack()), h.push(this.popStack()));
                        return this.options.stringParams && (g.push("contexts:[" + h.join(",") + "]"), g.push("types:[" + i.join(",") + "]"), g.push("hashContexts:hashContexts"), g.push("hashTypes:hashTypes")), this.options.data && g.push("data:data"), g = "{" + g.join(",") + "}", c ? (this.register("options", g), b.push("options")) : b.push(g), b.join(", ")
                    }
                };
                for (var h = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "), i = d.RESERVED_WORDS = {}, j = 0, k = h.length; k > j; j++) i[h[j]] = !0;
                d.isValidJavaScriptVariableName = function(a) {
                    return !d.RESERVED_WORDS[a] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(a) ? !0 : !1
                }, b["default"] = d
            }), define("handlebars/compiler/compiler", ["../exception", "./base", "./javascript-compiler", "./ast", "exports"], function(a, b, c, d, e) {
                function f() {}

                function g(a, b) {
                    if (null == a || "string" != typeof a && a.constructor !== l.ProgramNode) throw new i("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + a);
                    b = b || {}, "data" in b || (b.data = !0);
                    var c = j(a),
                        d = (new f).compile(c, b);
                    return (new k).compile(d, b)
                }

                function h(a, b, c) {
                    function d() {
                        var d = j(a),
                            e = (new f).compile(d, b),
                            g = (new k).compile(e, b, void 0, !0);
                        return c.template(g)
                    }
                    if (null == a || "string" != typeof a && a.constructor !== l.ProgramNode) throw new i("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + a);
                    b = b || {}, "data" in b || (b.data = !0);
                    var e;
                    return function(a, b) {
                        return e || (e = d()), e.call(this, a, b)
                    }
                }
                var i = a["default"],
                    j = b.parse,
                    k = c["default"],
                    l = d;
                e.Compiler = f, f.prototype = {
                    compiler: f,
                    disassemble: function() {
                        for (var a, b, c, d = this.opcodes, e = [], f = 0, g = d.length; g > f; f++)
                            if (a = d[f], "DECLARE" === a.opcode) e.push("DECLARE " + a.name + "=" + a.value);
                            else {
                                b = [];
                                for (var h = 0; h < a.args.length; h++) c = a.args[h], "string" == typeof c && (c = '"' + c.replace("\n", "\\n") + '"'), b.push(c);
                                e.push(a.opcode + " " + b.join(" "))
                            }
                        return e.join("\n")
                    },
                    equals: function(a) {
                        var b = this.opcodes.length;
                        if (a.opcodes.length !== b) return !1;
                        for (var c = 0; b > c; c++) {
                            var d = this.opcodes[c],
                                e = a.opcodes[c];
                            if (d.opcode !== e.opcode || d.args.length !== e.args.length) return !1;
                            for (var f = 0; f < d.args.length; f++)
                                if (d.args[f] !== e.args[f]) return !1
                        }
                        if (b = this.children.length, a.children.length !== b) return !1;
                        for (c = 0; b > c; c++)
                            if (!this.children[c].equals(a.children[c])) return !1;
                        return !0
                    },
                    guid: 0,
                    compile: function(a, b) {
                        this.opcodes = [], this.children = [], this.depths = {
                            list: []
                        }, this.options = b;
                        var c = this.options.knownHelpers;
                        if (this.options.knownHelpers = {
                                helperMissing: !0,
                                blockHelperMissing: !0,
                                each: !0,
                                "if": !0,
                                unless: !0,
                                "with": !0,
                                log: !0
                            }, c)
                            for (var d in c) this.options.knownHelpers[d] = c[d];
                        return this.accept(a)
                    },
                    accept: function(a) {
                        var b, c = a.strip || {};
                        return c.left && this.opcode("strip"), b = this[a.type](a), c.right && this.opcode("strip"), b
                    },
                    program: function(a) {
                        for (var b = a.statements, c = 0, d = b.length; d > c; c++) this.accept(b[c]);
                        return this.isSimple = 1 === d, this.depths.list = this.depths.list.sort(function(a, b) {
                            return a - b
                        }), this
                    },
                    compileProgram: function(a) {
                        var b, c = (new this.compiler).compile(a, this.options),
                            d = this.guid++;
                        this.usePartial = this.usePartial || c.usePartial, this.children[d] = c;
                        for (var e = 0, f = c.depths.list.length; f > e; e++) b = c.depths.list[e], 2 > b || this.addDepth(b - 1);
                        return d
                    },
                    block: function(a) {
                        var b = a.mustache,
                            c = a.program,
                            d = a.inverse;
                        c && (c = this.compileProgram(c)), d && (d = this.compileProgram(d));
                        var e = this.classifyMustache(b);
                        "helper" === e ? this.helperMustache(b, c, d) : "simple" === e ? (this.simpleMustache(b), this.opcode("pushProgram", c), this.opcode("pushProgram", d), this.opcode("emptyHash"), this.opcode("blockValue")) : (this.ambiguousMustache(b, c, d), this.opcode("pushProgram", c), this.opcode("pushProgram", d), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), this.opcode("append")
                    },
                    hash: function(a) {
                        var b, c, d = a.pairs;
                        this.opcode("pushHash");
                        for (var e = 0, f = d.length; f > e; e++) b = d[e], c = b[1], this.options.stringParams ? (c.depth && this.addDepth(c.depth), this.opcode("getContext", c.depth || 0), this.opcode("pushStringParam", c.stringModeValue, c.type)) : this.accept(c), this.opcode("assignToHash", b[0]);
                        this.opcode("popHash")
                    },
                    partial: function(a) {
                        var b = a.partialName;
                        this.usePartial = !0, a.context ? this.ID(a.context) : this.opcode("push", "depth0"), this.opcode("invokePartial", b.name), this.opcode("append")
                    },
                    content: function(a) {
                        this.opcode("appendContent", a.string)
                    },
                    mustache: function(a) {
                        var b = this.options,
                            c = this.classifyMustache(a);
                        "simple" === c ? this.simpleMustache(a) : "helper" === c ? this.helperMustache(a) : this.ambiguousMustache(a), this.opcode(a.escaped && !b.noEscape ? "appendEscaped" : "append")
                    },
                    ambiguousMustache: function(a, b, c) {
                        var d = a.id,
                            e = d.parts[0],
                            f = null != b || null != c;
                        this.opcode("getContext", d.depth), this.opcode("pushProgram", b), this.opcode("pushProgram", c), this.opcode("invokeAmbiguous", e, f)
                    },
                    simpleMustache: function(a) {
                        var b = a.id;
                        "DATA" === b.type ? this.DATA(b) : b.parts.length ? this.ID(b) : (this.addDepth(b.depth), this.opcode("getContext", b.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda")
                    },
                    helperMustache: function(a, b, c) {
                        var d = this.setupFullMustacheParams(a, b, c),
                            e = a.id.parts[0];
                        if (this.options.knownHelpers[e]) this.opcode("invokeKnownHelper", d.length, e);
                        else {
                            if (this.options.knownHelpersOnly) throw new Error("You specified knownHelpersOnly, but used the unknown helper " + e);
                            this.opcode("invokeHelper", d.length, e)
                        }
                    },
                    ID: function(a) {
                        this.addDepth(a.depth), this.opcode("getContext", a.depth);
                        var b = a.parts[0];
                        b ? this.opcode("lookupOnContext", a.parts[0]) : this.opcode("pushContext");
                        for (var c = 1, d = a.parts.length; d > c; c++) this.opcode("lookup", a.parts[c])
                    },
                    DATA: function(a) {
                        if (this.options.data = !0, a.id.isScoped || a.id.depth) throw new i("Scoped data references are not supported: " + a.original);
                        this.opcode("lookupData");
                        for (var b = a.id.parts, c = 0, d = b.length; d > c; c++) this.opcode("lookup", b[c])
                    },
                    STRING: function(a) {
                        this.opcode("pushString", a.string)
                    },
                    INTEGER: function(a) {
                        this.opcode("pushLiteral", a.integer)
                    },
                    BOOLEAN: function(a) {
                        this.opcode("pushLiteral", a.bool)
                    },
                    comment: function() {},
                    opcode: function(a) {
                        this.opcodes.push({
                            opcode: a,
                            args: [].slice.call(arguments, 1)
                        })
                    },
                    declare: function(a, b) {
                        this.opcodes.push({
                            opcode: "DECLARE",
                            name: a,
                            value: b
                        })
                    },
                    addDepth: function(a) {
                        if (isNaN(a)) throw new Error("EWOT");
                        0 !== a && (this.depths[a] || (this.depths[a] = !0, this.depths.list.push(a)))
                    },
                    classifyMustache: function(a) {
                        var b = a.isHelper,
                            c = a.eligibleHelper,
                            d = this.options;
                        if (c && !b) {
                            var e = a.id.parts[0];
                            d.knownHelpers[e] ? b = !0 : d.knownHelpersOnly && (c = !1)
                        }
                        return b ? "helper" : c ? "ambiguous" : "simple"
                    },
                    pushParams: function(a) {
                        for (var b, c = a.length; c--;) b = a[c], this.options.stringParams ? (b.depth && this.addDepth(b.depth), this.opcode("getContext", b.depth || 0), this.opcode("pushStringParam", b.stringModeValue, b.type)) : this[b.type](b)
                    },
                    setupMustacheParams: function(a) {
                        var b = a.params;
                        return this.pushParams(b), a.hash ? this.hash(a.hash) : this.opcode("emptyHash"), b
                    },
                    setupFullMustacheParams: function(a, b, c) {
                        var d = a.params;
                        return this.pushParams(d), this.opcode("pushProgram", b), this.opcode("pushProgram", c), a.hash ? this.hash(a.hash) : this.opcode("emptyHash"), d
                    }
                }, e.precompile = g, e.compile = h
            }), define("handlebars", ["./handlebars.runtime", "./handlebars/compiler/ast", "./handlebars/compiler/base", "./handlebars/compiler/compiler", "./handlebars/compiler/javascript-compiler", "exports"], function(a, b, c, d, e, f) {
                var g = a["default"],
                    h = b,
                    i = c.parser,
                    j = c.parse,
                    k = d.Compiler,
                    l = d.compile,
                    m = d.precompile,
                    n = e["default"],
                    o = g.create,
                    p = function() {
                        var a = o();
                        return a.compile = function(b, c) {
                            return l(b, c, a)
                        }, a.precompile = m, a.AST = h, a.Compiler = k, a.JavaScriptCompiler = n, a.Parser = i, a.parse = j, a
                    };
                g = p(), g.create = p, f["default"] = g
            }),
            function() {
                define("lib/utils/handlebars", ["handlebars"], function(a) {
                    var b;
                    return b = a["default"].create()
                })
            }.call(this),
            function() {
                var a;
                a = ["on", "onAny", "offAny", "once", "many", "off", "removeAllListeners", "listeners", "listenersAny", "emit", "setMaxListeners"], define("lib/utils/emitter", ["underscore", "eventemitter"], function(b, c) {
                    return function() {
                        var d, e, f, g, h;
                        for (f = new c({
                                wildcard: !0,
                                delimiter: ".",
                                newListener: !1,
                                maxListeners: 100
                            }), d = {}, g = 0, h = a.length; h > g; g++) e = a[g], d[e] = b.bind(f[e], f);
                        return d
                    }
                })
            }.call(this),
            function() {
                define("lib/utils/cookies", ["cookie"], function(a) {
                    return {
                        set: a.set,
                        get: a.get,
                        remove: a.expire
                    }
                })
            }.call(this), define("lib/utils/version", [], function() {
                return "0.8.36"
            }),
            function() {
                define("lib/api/params", ["underscore"], function(a) {
                    var b, c, d;
                    return b = "hull", d = function(a) {
                        return [a, b, {}]
                    }, c = function(a) {
                        var c, d, e;
                        return d = a.path, e = a.provider || b, c = a.params || {}, [d, e, c]
                    }, {
                        parse: function(b) {
                            var e, f, g, h, i, j, k, l, m, n, o, p;
                            if (f = b.shift(), a.isString(f) && (o = d(f), k = o[0], l = o[1], j = o[2]), a.isObject(f) && (p = c(f), k = p[0], l = p[1], j = p[2]), !k) throw "No URI provided for the API call";
                            for ("/" === k[0] && (k = k.substring(1)), m = [], null != j && m.push(j), m = m.concat(b), e = g = null, j = {}; i = m.shift();)
                                if (n = typeof i, "string" !== n || h)
                                    if ("function" !== n || e && g) {
                                        if ("object" !== n) throw new TypeError("Invalid argument passed to Hull.api(): " + i);
                                        j = a.extend(j, i)
                                    } else e ? g || (g = i) : e = i;
                            else h = i.toLowerCase();
                            return null == h && (h = "get"), null == e && (e = function() {}), null == g && (g = function(a) {
                                return console.error("The request has failed: ", a)
                            }), [{
                                provider: l,
                                path: k,
                                method: h,
                                params: j
                            }, e, g]
                        }
                    }
                })
            }.call(this),
            function() {
                var a;
                try {
                    a = JSON.parse(atob(document.location.hash.replace("#", ""))), window.opener && window.opener.Hull && window.opener.__hull_login_status__ && null != a && (window.opener.__hull_login_status__(a), window.close())
                } catch (b) {}
                define("lib/api/auth", ["underscore", "../utils/promises", "../utils/version"], function(b, c, d) {
                    return function(e, f, g, h) {
                        var i, j, k, l, m, n, o, p, q, r, s, t, u;
                        return null == h && (h = []), j = null, u = null, n = function(a, d) {
                            var e, f, h;
                            return e = c.deferred(), f = e.promise, f.then(function() {
                                var b;
                                return g.emit("hull.auth.login", d, a), null == (null != d && null != (b = d.stats) ? b.sign_in_count : void 0) ? g.emit("hull.auth.create", d) : void 0
                            }, function(a) {
                                return g.emit("hull.auth.fail", a)
                            }), g.once("hull.settings.update", function() {
                                return e.resolve(d)
                            }), h = b.bind(e.reject, e), b.delay(h, 3e4, new Error("Timeout for login")), f
                        }, o = function(a) {
                            throw g.emit("hull.auth.fail", a), a
                        }, k = b.bind(n, void 0, "email"), t = function(a) {
                            return e("users", "post", a).then(k, o)
                        }, m = function(a, c, d) {
                            var f, g;
                            console.log(a)
                             console.log(c)
                              console.log(b)
                            // if (!b.isString(a)) throw new TypeError("'loginOrProvider' must be a String");
                            return b.isString(c) ? (g = e("users/login", "post", {
                                login: a,
                                password: c
                            }).then(function() {
                                return e.clearToken(), e("me")
                            }), f = g.then(k, o)) : (g = p(a, c).then(function() {
                                return e.clearToken(), e("me")
                            }), f = g.then(b.bind(n, void 0, a), o)), b.isFunction(d) && f.then(d), g
                        }, p = function(a, d) {
                            var e;
                            return r.isAuthenticating() ? r.isAuthenticating() : (a = a.toLowerCase(), j = c.deferred(), ~b.indexOf(h, a) ? (j.providerName = a, e = r.authUrl(f, a, d), r.authHelper(e), j.promise) : (j.reject({
                                message: "No authentication service " + a + " configured for the app",
                                reason: "no_such_service"
                            }), j.promise))
                        }, q = function(a) {
                            var c;
                            return c = e("logout"), c.done(function() {
                                return b.isFunction(a) ? a() : void 0
                            }), c.then(function() {
                                return g.emit("hull.auth.logout")
                            })
                        }, s = function(a) {
                            var b, c, d, e, f;
                            if (e = j, j) {
                                if (a.success) j.resolve({});
                                else {
                                    b = new Error("Login failed"), f = a.error;
                                    for (c in f) d = f[c], b[c] = d;
                                    j.reject(b)
                                }
                                return j = null, clearInterval(u), u = null, e
                            }
                        }, l = function(a, c, e) {
                            var f, g;
                            return r.createCallback(), f = e || {}, f.app_id = a.appId, f.callback_url = a.callback_url || a.callbackUrl || r.location.toString(), f.auth_referer = r.location.toString(), f.version = d, g = b.map(f, function(a, b) {
                                return encodeURIComponent(b) + "=" + encodeURIComponent(a)
                            }).join("&"), "" + a.orgUrl + "/auth/" + c + "?" + g
                        }, r = {
                            isAuthenticating: function() {
                                return null != j
                            },
                            location: document.location,
                            authUrl: l,
                            createCallback: function() {
                                return window.__hull_login_status__ = function(a) {
                                    return window.__hull_login_status__ = null, s(a)
                                }
                            },
                            authHelper: function(b) {
                                var c, d;
                                return c = window.open(b, "_auth", "location=0,status=0,width=1030,height=600"), (null != (d = window.device) ? d.cordova : void 0) && null != c && c.addEventListener("loadstart", function(b) {
                                    return a = function() {
                                        try {
                                            return JSON.parse(atob(b.url.split("#")[1]))
                                        } catch (a) {}
                                    }(), a ? (window.__hull_login_status__(a), c.close()) : void 0
                                }), u = null != c && setInterval(function() {
                                    return (null != c ? c.closed : void 0) ? s({
                                        success: !1,
                                        error: {
                                            reason: "window_closed"
                                        }
                                    }) : void 0
                                }, 200)
                            },
                            onCompleteAuth: s
                        }, i = {
                            signup: t,
                            login: m,
                            logout: q,
                            isAuthenticating: r.isAuthenticating
                        }
                    }
                })
            }.call(this),
            function(a) {
                function b(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                }

                function c(a) {
                    return "undefined" == typeof a
                }

                function d(a) {
                    if (!a) throw new Error("url is undefined or empty");
                    if (/^file/.test(a)) throw new Error("The file:// protocol is not supported");
                    var b = a.toLowerCase().match(t);
                    if (b) {
                        var c = b[2],
                            d = b[3],
                            e = b[4] || "";
                        return ("http:" === c && ":80" === e || "https:" === c && ":443" === e) && (e = ""), c + "//" + d + e
                    }
                    return a
                }

                function e(a) {
                    if (!a) throw new Error("url is undefined or empty");
                    if (a = a.replace(v, "$1/"), !a.match(/^(http||https):\/\//)) {
                        var b = "/" === a.substring(0, 1) ? "" : location.pathname;
                        "/" !== b.substring(b.length - 1) && (b = b.substring(0, b.lastIndexOf("/") + 1)), a = location.protocol + "//" + location.host + b + a
                    }
                    for (; u.test(a);) a = a.replace(u, "");
                    return a
                }

                function f(a, b, c) {
                    var d;
                    for (var e in b) b.hasOwnProperty(e) && (e in a ? (d = b[e], "object" == typeof d ? f(a[e], d, c) : c || (a[e] = b[e])) : a[e] = b[e]);
                    return a
                }

                function g(a, b) {
                    "string" == typeof a && (a = [a]);
                    for (var c, d = a.length; d--;)
                        if (c = a[d], c = new RegExp("^" === c.substr(0, 1) ? c : "^" + c.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$"), c.test(b)) return !0;
                    return !1
                }

                function h(a, b) {
                    if (!b) throw new Error("parameters is undefined or null");
                    var c = a.indexOf("#"),
                        d = [];
                    for (var e in b) b.hasOwnProperty(e) && d.push(e + "=" + encodeURIComponent(b[e]));
                    return a + (-1 === c ? "#" : "&") + d.join("&")
                }

                function i(a) {
                    var b = q.cloneNode(!1);
                    if (f(a.props, {
                            frameBorder: 0,
                            allowTransparency: !0,
                            scrolling: "no",
                            width: "100%",
                            src: h(a.remote, {
                                xdm_e: d(location.href),
                                xdm_c: a.channel,
                                xdm_p: 1
                            }),
                            name: p + a.channel + "_provider",
                            style: {
                                margin: 0,
                                padding: 0,
                                border: 0
                            }
                        }), b.id = a.props.name, delete a.props.name, !a.container) throw new Error('xdm.Rpc() configuration object missing a DOM "container" property');
                    return f(b, a.props), a.container.appendChild(b), a.onLoad && w(b, "load", a.onLoad), a.html && (b.contentWindow.document.open(), b.contentWindow.document.write(a.html), b.contentWindow.document.close()), a.iframe = b, b
                }

                function j(a) {
                    var b;
                    if (a.isHost = a.isHost || c(y.xdm_p), a.props = a.props || {}, a.isHost) a.remote = e(a.remote), a.channel = a.channel || "default" + r++;
                    else if (a.channel = y.xdm_c.replace(/["'<>\\]/g, ""), a.remote = y.xdm_e.replace(/["'<>\\]/g, ""), a.acl && !g(a.acl, a.remote)) throw new Error("Access denied for " + a.remote);
                    return b = [new n.stack.PostMessageTransport(a)], b.push(new n.stack.QueueBehavior(!0)), b
                }

                function k(a) {
                    var b, c, d = a.length,
                        e = {
                            incoming: function(a, b) {
                                this.up.incoming(a, b)
                            },
                            outgoing: function(a, b) {
                                this.down.outgoing(a, b)
                            },
                            callback: function(a) {
                                this.up.callback(a)
                            },
                            init: function() {
                                this.down.init()
                            },
                            destroy: function() {
                                this.down.destroy()
                            }
                        };
                    for (c = 0; d > c; c++) b = a[c], f(b, e, !0), 0 !== c && (b.down = a[c - 1]), c !== d - 1 && (b.up = a[c + 1]);
                    return b
                }

                function l(a) {
                    a.up.down = a.down, a.down.up = a.up, a.up = a.down = null
                }
                if (a.postMessage) {
                    var m = "",
                        n = {},
                        o = a.xdm,
                        p = "xdm_",
                        q = document.createElement("IFRAME"),
                        r = Math.floor(1e4 * Math.random()),
                        s = Function.prototype,
                        t = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,
                        u = /[\-\w]+\/\.\.\//,
                        v = /([^:])\/\//g,
                        w = function() {
                            return a.addEventListener ? function(a, b, c) {
                                a.addEventListener(b, c, !1)
                            } : function(a, b, c) {
                                a.attachEvent("on" + b, c)
                            }
                        }(),
                        x = function() {
                            return a.removeEventListener ? function(a, b, c) {
                                a.removeEventListener(b, c, !1)
                            } : function(a, b, c) {
                                a.detachEvent("on" + b, c)
                            }
                        }(),
                        y = function(a) {
                            a = a.substring(1, a.length).split("&");
                            for (var b, c = {}, d = a.length; d--;) b = a[d].split("="), c[b[0]] = decodeURIComponent(b[1]);
                            return c
                        }(location.hash);
                    n.version = "1.0.1", n.stack = {}, n.query = y, n.checkAcl = g, n.noConflict = function(b) {
                        return a.xdm = o, m = b, m && (p = "xdm_" + m.replace(".", "_") + "_"), n
                    }, n.Rpc = function(a, b) {
                        var c;
                        if (b.local)
                            for (var e in b.local) b.local.hasOwnProperty(e) && (c = b.local[e], "function" == typeof c && (b.local[e] = {
                                method: c
                            }));
                        var f = k(j(a).concat([new n.stack.RpcBehavior(this, b), {
                            callback: function(b) {
                                a.onReady && a.onReady(b)
                            }
                        }]));
                        this.origin = d(a.remote), this.destroy = function() {
                            f.destroy()
                        }, f.init(), this.iframe = a.iframe
                    }, n.stack.PostMessageTransport = function(b) {
                        function c(a) {
                            var c = d(a.origin),
                                f = "string" == typeof a.data;
                            c === h && f && a.data.substring(0, b.channel.length + 1) === b.channel + " " && e.up.incoming(a.data.substring(b.channel.length + 1), c)
                        }
                        var e, f, g, h;
                        return e = {
                            outgoing: function(a, c, d) {
                                g.postMessage(b.channel + " " + a, c || h), d && d()
                            },
                            destroy: function() {
                                x(a, "message", c), f && (g = null, f.parentNode.removeChild(f), f = null)
                            },
                            init: function() {
                                if (h = d(b.remote), b.isHost) {
                                    var j = function(d) {
                                        d.data === b.channel + "-ready" && (g = "postMessage" in f.contentWindow ? f.contentWindow : f.contentWindow.document, x(a, "message", j), w(a, "message", c), setTimeout(function() {
                                            e.up.callback(!0)
                                        }, 0))
                                    };
                                    w(a, "message", j), f = i(b)
                                } else w(a, "message", c), g = "postMessage" in a.parent ? a.parent : a.parent.document, g.postMessage(b.channel + "-ready", h), setTimeout(function() {
                                    e.up.callback(!0)
                                }, 0)
                            }
                        }
                    }, n.stack.QueueBehavior = function(a) {
                        function b() {
                            var g;
                            return a === !0 && 0 === e.length ? void l(c) : void(f || 0 === e.length || d || (f = !0, g = e.shift(), c.down.outgoing(g.data, g.origin, function(a) {
                                f = !1, g.callback && setTimeout(function() {
                                    g.callback(a)
                                }, 0), b()
                            })))
                        }
                        var c, d, e = [],
                            f = !0;
                        return c = {
                            init: function() {
                                c.down.init()
                            },
                            callback: function(a) {
                                f = !1;
                                var d = c.up;
                                b(), d.callback(a)
                            },
                            incoming: function(a, b) {
                                c.up.incoming(a, b)
                            },
                            outgoing: function(a, c, d) {
                                e.push({
                                    data: a,
                                    origin: c,
                                    callback: d
                                }), b()
                            },
                            destroy: function() {
                                d = !0, c.down.destroy()
                            }
                        }
                    }, n.stack.RpcBehavior = function(a, d) {
                        function e(a) {
                            a.jsonrpc = "2.0", h.down.outgoing(JSON.stringify(a))
                        }

                        function f(a, b) {
                            var c = Array.prototype.slice;
                            return function() {
                                var d, f = arguments.length,
                                    g = {
                                        method: b
                                    };
                                f > 0 && "function" == typeof arguments[f - 1] ? (f > 1 && "function" == typeof arguments[f - 2] ? (d = {
                                    success: arguments[f - 2],
                                    error: arguments[f - 1]
                                }, g.params = c.call(arguments, 0, f - 2)) : (d = {
                                    success: arguments[f - 1]
                                }, g.params = c.call(arguments, 0, f - 1)), j["" + ++i] = d, g.id = i) : g.params = c.call(arguments, 0), a.namedParams && 1 === g.params.length && (g.params = g.params[0]), e(g)
                            }
                        }

                        function g(a, d, f, g) {
                            if (!f) return void(d && e({
                                id: d,
                                error: {
                                    code: -32601,
                                    message: "Procedure not found."
                                }
                            }));
                            var h, i;
                            d ? (h = function(a) {
                                h = s, e({
                                    id: d,
                                    result: a
                                })
                            }, i = function(a, b) {
                                i = s;
                                var c = {
                                    id: d,
                                    error: {
                                        code: -32099,
                                        message: a
                                    }
                                };
                                b && (c.error.data = b), e(c)
                            }) : h = i = s, b(g) || (g = [g]);
                            try {
                                var j = f.method.apply(f.scope, g.concat([h, i]));
                                c(j) || h(j)
                            } catch (k) {
                                i(k.message)
                            }
                        }
                        var h, i = 0,
                            j = {};
                        return h = {
                            incoming: function(a) {
                                var b, c = JSON.parse(a);
                                c.method ? d.handle ? d.handle(c, e) : g(c.method, c.id, d.local[c.method], c.params) : (b = j[c.id], c.error && b.error ? b.error(c.error) : b.success && b.success(c.result), delete j[c.id])
                            },
                            init: function() {
                                if (d.remote)
                                    for (var b in d.remote) d.remote.hasOwnProperty(b) && (a[b] = f(d.remote[b], b));
                                h.down.init()
                            },
                            destroy: function() {
                                for (var b in d.remote) d.remote.hasOwnProperty(b) && a.hasOwnProperty(b) && delete a[b];
                                h.down.destroy()
                            }
                        }
                    }, "object" == typeof exports ? module.exports = n : "function" == typeof define && define.amd ? define("xdm", [], function() {
                        return n
                    }) : a.xdm = n
                }
            }(window),
            function() {
                define("lib/api/xdm", ["domready", "lib/utils/promises", "xdm", "lib/utils/version", "underscore"], function(a, b, c, d, e) {
                    var f;
                    return f = function(a) {
                            var b, c;
                            return c = "" + a.orgUrl + "/api/v1/" + a.appId + "/remote.html?v=" + d, a.jsUrl && (c += "&js=" + a.jsUrl), a.uid && (c += "&uid=" + a.uid), a.debugRemote && (c += "&debug_remote=true"), b = a.accessToken || a.appSecret, null != b && (c += "&access_token=" + b), void 0 !== a.userHash && (c += "&user_hash=" + a.userHash), c += "&r=" + encodeURIComponent(document.referrer)
                        },
                        function(d, g) {
                            var h, i, j, k, l, m, n, o, p, q, r, s, t;
                            return s = null, o = null, i = b.deferred(), m = function(a) {
                                return console.log("remoteMessage", a), a.error ? i.reject(a.error) : console.warn("RPC Message", arguments)
                            }, p = function(a) {
                                return g.emit("hull.settings.update", a)
                            }, t = function(a) {
                                return g.emit("hull.auth.update", a)
                            }, n = function(a) {
                                return window.clearTimeout(s), i.resolve({
                                    rpc: o,
                                    config: a
                                })
                            }, j = function() {
                                return d
                            }, k = {
                                top: "-20px",
                                left: "-20px",
                                bottom: "auto",
                                right: "auto",
                                width: "1px",
                                height: "1px",
                                display: "block",
                                position: "fixed",
                                zIndex: void 0,
                                overflow: "hidden"
                            }, r = {
                                top: "0px",
                                left: "0px",
                                right: "0px",
                                bottom: "0px",
                                width: "100%",
                                height: "100%",
                                display: "block",
                                position: "fixed",
                                zIndex: 1e4,
                                overflow: "auto"
                            }, q = function() {
                                return h(r)
                            }, l = function() {
                                return h(k)
                            }, h = function(a) {
                                return e.map(a, function(a, b) {
                                    return o.iframe.style[b] = a
                                })
                            }, a(function() {
                                return s = setTimeout(function() {
                                    return i.reject('Remote loading has failed. Please check "orgUrl" and "appId" in your configuration. This may also be about connectivity.')
                                }, 3e4), o = new c.Rpc({
                                    remote: f(d),
                                    container: document.body,
                                    channel: d.appId,
                                    props: {
                                        tabIndex: -1,
                                        height: "0",
                                        width: "1px",
                                        style: {
                                            position: "fixed",
                                            width: "1px",
                                            height: "1px",
                                            top: "-20px",
                                            left: "-20px",
                                            overflow: "hidden"
                                        }
                                    }
                                }, {
                                    remote: {
                                        message: {},
                                        ready: {},
                                        clearUserToken: {}
                                    },
                                    local: {
                                        message: m,
                                        ready: n,
                                        userUpdate: t,
                                        settingsUpdate: p,
                                        getClientConfig: j,
                                        show: q,
                                        hide: l
                                    }
                                })
                            }), i.promise
                        }
                })
            }.call(this),
            function() {
                define("lib/api/api", ["underscore", "../utils/cookies", "../utils/version", "../api/params", "../api/auth", "../utils/promises", "lib/api/xdm"], function(a, b, c, d, e, f, g) {
                    var h;
                    return h = Array.prototype.slice, {
                        init: function(c, i) {
                            var j, k, l, m, n, o;
                            return null == c && (c = {}), k = f.deferred(), c.orgUrl && c.appId ? (l = null, j = function() {
                                return l.apply(void 0, d.parse(h.call(arguments)))
                            }, a.each(["get", "post", "put", "delete"], function(a) {
                                return j[a] = function() {
                                    var b, c;
                                    return b = d.parse(h.call(arguments)), c = b[0], c.method = a, l.apply(j, b)
                                }
                            }), j.parseRoute = d.parse, o = function(a) {
                                var d, e;
                                return null == a && (a = {}), c.appId ? (d = "hull_" + c.appId, a && a["Hull-User-Id"] && a["Hull-User-Sig"] ? (e = btoa(JSON.stringify(a)), b.set(d, e, {
                                    path: "/"
                                })) : b.remove(d, {
                                    path: "/"
                                })) : void 0
                            }, n = null, j.clearToken = function() {
                                return n.clearUserToken()
                            }, m = function(b) {
                                var d, f, g, h;
                                return n = b.rpc, g = b.config, f = g.data, o(f.headers), (null != (h = f.headers) ? h["Hull-Auth-Scope"] : void 0) && (d = f.headers["Hull-Auth-Scope"].split(":")[0]), {
                                    auth: e(j, c, i, a.keys(g.settings.auth || {})),
                                    remoteConfig: g,
                                    authScope: d || "",
                                    api: j,
                                    init: function() {
                                        return k.promise
                                    }
                                }
                            }, g(c, i).then(m).then(k.resolve, k.reject), l = function(a, b, c) {
                                var d, e, g;
                                return n || console.error("Api not initialized yet"), d = f.deferred(), g = function(a) {
                                    var c, e, f, g, h;
                                    if (null == a && (a = {}), "hull" === a.provider && o(a.headers), e = null != a ? a.headers : void 0, null != e && "hull" === a.provider && (f = e["Hull-Track"])) try {
                                        h = JSON.parse(atob(f)), c = h[0], g = h[1], i.emit(c, g)
                                    } catch (j) {}
                                    return b(a.response, a.headers), d.resolve(a.response)
                                }, e = function(a) {
                                    return null == a && (a = {}), c(a.message), d.reject(a.message)
                                }, n.message(a, g, e), d.promise
                            }, k.promise) : (c.orgUrl || k.reject(new ReferenceError("no organizationURL provided. Can't proceed")), c.appId || k.reject(new ReferenceError("no applicationID provided. Can't proceed")), k.promise)
                        }
                    }
                })
            }.call(this),
            function() {
                define("lib/api/reporting", ["underscore"], function(a) {
                    return {
                        init: function(b) {
                            return {
                                track: function(c, d) {
                                    var e;
                                    return e = a.extend({
                                        url: window.location.href,
                                        referrer: document.referrer
                                    }, d), b.api({
                                        provider: "track",
                                        path: c
                                    }, "post", e)
                                },
                                flag: function(a) {
                                    return b.api({
                                        provider: "hull",
                                        path: [a, "flag"].join("/")
                                    }, "post")
                                }
                            }
                        }
                    }
                })
            }.call(this),
            function() {
                define("lib/utils/base64", [], function() {
                    var a;
                    return a = window, {
                        utils: a,
                        decode: function(b) {
                            return a.decodeURIComponent(a.escape(a.atob(b)))
                        },
                        encode: function(b) {
                            return a.btoa(a.unescape(a.encodeURIComponent(b)))
                        },
                        utilsContainer: window
                    }
                })
            }.call(this),
            function() {
                define("lib/utils/entity", ["underscore", "lib/utils/base64"], function(a, b) {
                    return {
                        decode: function(a) {
                            return /^~[a-z0-9_\-\+\/\=]+$/i.test(a) && (a.length - 1) % 4 === 0 ? b.decode(a.substr(1), !0) : a
                        },
                        encode: function(a) {
                            return "~" + b.encode(a, !0)
                        }
                    }
                })
            }.call(this),
            function() {
                define("lib/utils/config", ["underscore"], function(a) {
                    var b, c;
                    return c = function(a) {
                            return void 0 !== a ? JSON.parse(JSON.stringify(a)) : void 0
                        }, b = function(b, d) {
                            return d && d.on("hull.settings.update", function(a) {
                                    return b.services = a
                                }),
                                function(d) {
                                    var e;
                                    return e = b, d ? (a.each(d.split("."), function(b) {
                                        return void 0 === e ? e : e = a.contains(a.keys(e), b) ? e[b] : void 0
                                    }), c(e)) : c(b)
                                }
                        },
                        function(a, c) {
                            return b(a, c)
                        }
                })
            }.call(this),
            function() {
                define("lib/api/current-user", [], function() {
                    return function(a) {
                        var b;
                        return b = !1, a.on("hull.init", function(a, c) {
                                return b = c
                            }), a.on("hull.auth.login", function(a) {
                                return b = a
                            }), a.on("hull.auth.update", function(c) {
                                return (null != b ? b.id : void 0) ? b.id === c.id ? b = c : (null != c ? c.id : void 0) ? a.emit("hull.auth.login", c) : a.emit("hull.auth.logout") : void 0
                            }), a.on("hull.auth.logout", function() {
                                return b = !1
                            }),
                            function() {
                                return b
                            }
                    }
                })
            }.call(this),
            function() {
                define("lib/traits/base", ["underscore"], function(a) {
                    var b, c;
                    return b = function() {
                        function b(b, c, d) {
                            this.api = b, this.name = c, this.value = d, this.api || (this.api = function() {}), a.isUndefined(this.value) || this.set(this.value)
                        }
                        return b.prototype.inc = function(a) {
                            return null == a && (a = 1), this.api("me/traits", "put", {
                                name: this.name,
                                operation: "inc",
                                value: a
                            })
                        }, b.prototype.dec = function(a) {
                            return null == a && (a = 1), this.api("me/traits", "put", {
                                name: this.name,
                                operation: "dec",
                                value: a
                            })
                        }, b.prototype.set = function(a) {
                            return this.api("me/traits", "put", {
                                name: this.name,
                                operation: "set",
                                value: a
                            })
                        }, b
                    }(), c = {
                        api: null
                    }, {
                        setup: function(a) {
                            return c.api = a, {
                                build: function(a, d) {
                                    return new b(c.api, a, d)
                                }
                            }
                        }
                    }
                })
            }.call(this),
            function() {
                var a = [].slice;
                define("lib/hull.api", ["underscore", "lib/utils/promises", "lib/utils/emitter", "lib/api/api", "lib/api/reporting", "lib/utils/entity", "lib/utils/config", "lib/api/current-user", "lib/traits/base"], function(b, c, d, e, f, g, h, i, j) {
                    var k, l;
                    return k = function(l) {
                        var m;
                        return m = d(), e.init(l, m).then(function(d) {
                            var e, n, o;
                            return o = f.init(d), m.on("hull.auth.create", function(a) {
                                var c;
                                return c = b.pluck(a.identities, "provider"), o.track("hull.auth.create", {
                                    providers: c,
                                    main_identity: a.main_identity
                                })
                            }), m.on("hull.auth.login", function(a, c) {
                                var d;
                                return d = b.pluck(a.identities, "provider"), c = c || a.main_identity, o.track("hull.auth.login", {
                                    provider: c,
                                    providers: d,
                                    main_identity: a.main_identity
                                })
                            }), m.on("hull.auth.logout", function() {
                                return o.track("hull.auth.logout")
                            }), n = c.deferred(), n.promise.fail(function() {}), n.reject({
                                reason: "no_current_user",
                                message: "User must be logged in to perform this action"
                            }), l.services = d.remoteConfig.settings, e = {
                                config: h(l, m),
                                on: m.on,
                                off: m.off,
                                emit: m.emit,
                                track: o.track,
                                flag: o.flag,
                                api: d.api,
                                currentUser: i(m),
                                signup: function() {
                                    var b, c, e;
                                    return b = 1 <= arguments.length ? a.call(arguments, 0) : [], c = (e = d.auth).signup.apply(e, b)
                                },
                                login: function() {
                                    var b, c;
                                    return b = 1 <= arguments.length ? a.call(arguments, 0) : [], d.auth.isAuthenticating() ? console.info("Authentication is in progress. Use `Hull.on('hull.auth.login', fn)` to call `fn` when done.") : (c = d.auth).login.apply(c, b)
                                },
                                logout: d.auth.logout,
                                linkIdentity: function(a, b, c) {
                                    return null == b && (b = {}), e.currentUser() ? (b.mode = "connect", e.login(a, b, c)) : n.promise
                                },
                                unlinkIdentity: function(a, b) {
                                    var c;
                                    return e.currentUser() ? (c = d.api("me/identities/" + a, "delete").then(d.api.bind(d, "me")), c.then(function(a) {
                                        return m.emit("hull.auth.login", a), b(a)
                                    }), c) : n.promise
                                },
                                util: {
                                    entity: g
                                },
                                trait: j.setup(d.api).build
                            }, e.api.create = k, {
                                raw: d,
                                api: e,
                                eventEmitter: m
                            }
                        })
                    }, l = function(a) {
                        throw console.error("Unable to start Hull.api", a.message), a
                    }, {
                        init: function(a) {
                            return k(a)
                        },
                        success: function(a) {
                            return {
                                exports: a.api,
                                context: {
                                    me: a.raw.remoteConfig.data.me,
                                    app: a.raw.remoteConfig.data.app,
                                    org: a.raw.remoteConfig.data.org
                                }
                            }
                        },
                        failure: l
                    }
                })
            }.call(this),
            function() {
                define("lib/client/component/registrar", [], function() {
                    var a;
                    return a = function(a) {
                            var b, c;
                            return c = a.split("@"), a = c[0], b = c[1], null == b && (b = "default"), "__component__$" + a + "@" + b
                        },
                        function(b) {
                            return function(c, d) {
                                var e;
                                if (d || (d = c, c = null), c && "[object String]" === !Object.prototype.toString.apply(c)) throw "The component identifier must be a String";
                                if ("[object Function]" === Object.prototype.toString.apply(d) && (d = d()), "[object Object]" !== Object.prototype.toString.apply(d)) throw "A component must have a definition";
                                return null == (e = d.type) && (d.type = "Hull"), c ? b(a(c), d) : b(["module"], function(a) {
                                    return b(a.id, d), d
                                }), d
                            }
                        }
                })
            }.call(this),
            function() {
                define("lib/helpers/login", [], function() {
                    return {
                        update: function(a, b, c) {
                            return null == c && (c = {}), a ? (c._id = "me", a("me").set(c)) : void 0
                        },
                        login: function(a, b, c) {
                            return null == c && (c = {}), a ? (c._id = "me", a("me").clear({
                                silent: !0
                            }), a("me").set(c)) : void 0
                        },
                        logout: function(a) {
                            return a ? (a("me").clear(), a("me").set({
                                _id: "me"
                            }, {
                                silent: !0
                            })) : void 0
                        }
                    }
                })
            }.call(this),
            function() {
                if (!window.jQuery) throw "jQuery must be available for components to work";
                define("flavour", ["underscore", "lib/utils/promises", "aura/aura", "lib/utils/handlebars", "lib/hull.api", "lib/utils/emitter", "lib/client/component/registrar", "lib/helpers/login"], function(a, b, c, d, e, f, g, h) {
                    var i, j;
                    return i = function(b) {
                        return {
                            name: "Hull",
                            initialize: function(a) {
                                return a.core.mediator.setMaxListeners(100), a.core.data.hullApi = b
                            },
                            afterAppStart: function(b) {
                                var c;
                                return a = b.core.util._, c = b.sandboxes.create()
                            }
                        }
                    }, j = function(a, b, c) {
                        var d, e, f;
                        for (null == c && (c = []), a.use(i(b)).use("aura-extensions/aura-base64").use("aura-extensions/aura-cookies").use("aura-extensions/aura-backbone").use("aura-extensions/aura-moment").use("aura-extensions/aura-twitter-text").use("aura-extensions/hull-reporting").use("aura-extensions/hull-entities").use("aura-extensions/hull-helpers").use("aura-extensions/hull-utils").use("aura-extensions/aura-form-serialize").use("aura-extensions/aura-purl").use("aura-extensions/aura-component-validate-options").use("aura-extensions/aura-component-require").use("aura-extensions/hull-component-normalize-id").use("aura-extensions/hull-component-reporting").use("lib/client/component/api").use("lib/client/component/actions").use("lib/client/component/component").use("lib/client/component/templates").use("lib/client/component/datasource"), e = 0, f = c.length; f > e; e++) d = c[e], a.use(d);
                        return a
                    }, {
                        init: function(b) {
                            var d;
                            return d = e.init(b), b.apiOnly === !0 ? d : d.then(function(d) {
                                var e, f;
                                return e = new c(a.extend(b, {
                                    mediatorInstance: d.eventEmitter
                                })), f = {
                                    api: d.raw.api,
                                    authScope: d.raw.authScope,
                                    remoteConfig: d.raw.remoteConfig,
                                    login: d.api.login,
                                    logout: d.api.logout
                                }, {
                                    app: j(e, f, b.extensions || []),
                                    api: d,
                                    components: !0
                                }
                            })
                        },
                        success: function(c) {
                            var f, i;
                            return f = e.success(c.api), i = f.exports, c.components ? (i.component = g(define), c.app.sandbox.currentUser = f.exports.currentUser, c.app.sandbox.promises = b, i.util = c.app.sandbox.util, i.util.Handlebars = d, i.define = define, i.parse = function(a, b) {
                                return null == b && (b = {}), c.app.core.appSandbox.start(a, b)
                            }, c.app.start({
                                components: "body"
                            }).then(function() {
                                return i.on("hull.auth.login", a.bind(h.login, void 0, c.app.sandbox.data.api.model, c.app.core.mediator)), i.on("hull.auth.update", a.bind(h.update, void 0, c.app.sandbox.data.api.model, c.app.core.mediator)), i.on("hull.auth.logout", a.bind(h.logout, void 0, c.app.sandbox.data.api.model, c.app.core.mediator))
                            }, function(a) {
                                return console.error("Unable to start Aura app:", a), c.app.stop()
                            }), {
                                exports: i,
                                context: f.context
                            }) : i
                        },
                        failure: function(a) {
                            return console.error(a.message || a), a
                        }
                    }
                })
            }.call(this),
            function() {
                var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r = [].slice;
                window.console && console.log || ! function() {
                    var a, b, c, d, e;
                    for (d = function() {}, c = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "markTimeline", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], b = c.length, a = window.console = {}, e = []; b--;) e.push(a[c[b]] = d);
                    return e
                }(), a = "undefined" != typeof HULL_ENV && null !== HULL_ENV ? HULL_ENV : "", n = null, d = null, b = function() {
                    var a, b;
                    return b = !1, a = [], {
                        run: function(c) {
                            return b ? c() : a.push(c)
                        },
                        unlock: function() {
                            var c, d, e, f;
                            for (b = !0, f = [], d = 0, e = a.length; e > d; d++) c = a[d], f.push(c());
                            return f
                        }
                    }
                }, q = q || {}, c = function(a) {
                    var b;
                    return null == (b = q[a]) && (q[a] = []),
                        function() {
                            var b;
                            return b = 1 <= arguments.length ? r.call(arguments, 0) : [], q[a].push(b)
                        }
                }, e = function(a) {
                    return delete q[a]
                }, l = function(a, b) {
                    var c, d, f, g;
                    for (g = q[a], d = 0, f = g.length; f > d; d++) c = g[d], b[a].apply(b, c);
                    return e(a)
                }, j = b(), p = !1, k = function(a, b, c, e) {
                    if (a && p) throw new Error("Hull.init can be called only once");
                    return a && (p = !0), j.run(function() {
                        var h, i, j;
                        return h = n({}, b), null != h.track && (h.track = g(h.track)), h.namespace = "hull", h.debug = b.debug && {
                            enable: !0
                        }, j = function() {
                            var d;
                            return d = 1 <= arguments.length ? r.call(arguments, 0) : [], m.apply(null, [b, a, c || function() {}].concat(d))
                        }, i = function() {
                            var b;
                            return b = 1 <= arguments.length ? r.call(arguments, 0) : [], f.apply(null, [a, e || function() {}].concat(b))
                        }, d.init(h).then(j, i).done(), console.info('Hull.js version "' + o.version + '" started')
                    })
                }, h = function() {
                    var a, b;
                    return b = arguments[0], a = 2 <= arguments.length ? r.call(arguments, 1) : [], b.apiOnly = !0, k.apply(null, [!1, b].concat(a))
                }, i = function() {
                    var a, b;
                    return b = arguments[0], a = 2 <= arguments.length ? r.call(arguments, 1) : [], k.apply(null, [!0, b].concat(a))
                }, g = function(a) {
                    var b, c, d;
                    if (null != a) return d = function() {}, c = function() {
                        switch (Object.prototype.toString.call(a).match(/^\[object (.*)\]$/)[1]) {
                            case "Object":
                                if (null != a.only) return {
                                    only: function() {
                                        var c, d, e, f;
                                        for (e = a.only, f = [], c = 0, d = e.length; d > c; c++) b = e[c], f.push(b.toString());
                                        return f
                                    }()
                                };
                                if (null != a.ignore) return {
                                    ignore: function() {
                                        var c, d, e, f;
                                        for (e = a.ignore, f = [], c = 0, d = e.length; d > c; c++) b = e[c], f.push(b.toString());
                                        return f
                                    }()
                                };
                                break;
                            case "RegExp":
                                return {
                                    only: a.toString()
                                };
                            case "Array":
                                return {
                                    only: function() {
                                        var c, d, e;
                                        for (e = [], c = 0, d = a.length; d > c; c++) b = a[c], e.push(b.toString());
                                        return e
                                    }()
                                }
                        }
                    }()
                }, o = window.Hull = {
                    on: c("on"),
                    track: c("track"),
                    ready: c("ready"),
                    init: i
                }, o.init.api = h, "client" === a && (o.component = c("component")), m = function() {
                    var b, c, e, f, g, h, i, j;
                    return c = arguments[0], g = arguments[1], h = arguments[2], b = 4 <= arguments.length ? r.call(arguments, 3) : [], f = d.success.apply(d, b), e = f.context, i = n({}, c), j = n({}, o, f.exports, {
                        ready: function(a) {
                            return a(j, e.me, e.app, e.org)
                        }
                    }), g ? (window.Hull = j, l("on", j), l("track", j), "client" === a && l("component", j)) : delete j.component, l("ready", j), j.emit("hull.init", j, f.context.me, f.context.app, f.context.org), h(j, f.context.me, f.context.app, f.context.org), j
                }, f = function() {
                    var a, b, c, e;
                    return c = arguments[0], e = arguments[1], b = arguments[2], a = 4 <= arguments.length ? r.call(arguments, 3) : [], d.failure(b), e.apply(null, [b].concat(a))
                }, require(["flavour", "underscore", "lib/utils/version"], function(a, b, c) {
                    return o.version = c, n = b.extend, d = a, j.unlock()
                })
            }.call(this), define("lib/bootstrap", function() {}),
            function(a) {
                function b() {
                    return {
                        empty: !1,
                        unusedTokens: [],
                        unusedInput: [],
                        overflow: -2,
                        charsLeftOver: 0,
                        nullInput: !1,
                        invalidMonth: null,
                        invalidFormat: !1,
                        userInvalidated: !1,
                        iso: !1
                    }
                }

                function c(a, b) {
                    function c() {
                        ib.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
                    }
                    var d = !0;
                    return i(function() {
                        return d && (c(), d = !1), b.apply(this, arguments)
                    }, b)
                }

                function d(a, b) {
                    return function(c) {
                        return l(a.call(this, c), b)
                    }
                }

                function e(a, b) {
                    return function(c) {
                        return this.lang().ordinal(a.call(this, c), b)
                    }
                }

                function f() {}

                function g(a) {
                    y(a), i(this, a)
                }

                function h(a) {
                    var b = r(a),
                        c = b.year || 0,
                        d = b.quarter || 0,
                        e = b.month || 0,
                        f = b.week || 0,
                        g = b.day || 0,
                        h = b.hour || 0,
                        i = b.minute || 0,
                        j = b.second || 0,
                        k = b.millisecond || 0;
                    this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._bubble()
                }

                function i(a, b) {
                    for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                    return b.hasOwnProperty("toString") && (a.toString = b.toString), b.hasOwnProperty("valueOf") && (a.valueOf = b.valueOf), a
                }

                function j(a) {
                    var b, c = {};
                    for (b in a) a.hasOwnProperty(b) && wb.hasOwnProperty(b) && (c[b] = a[b]);
                    return c
                }

                function k(a) {
                    return 0 > a ? Math.ceil(a) : Math.floor(a)
                }

                function l(a, b, c) {
                    for (var d = "" + Math.abs(a), e = a >= 0; d.length < b;) d = "0" + d;
                    return (e ? c ? "+" : "" : "-") + d
                }

                function m(a, b, c, d) {
                    var e = b._milliseconds,
                        f = b._days,
                        g = b._months;
                    d = null == d ? !0 : d, e && a._d.setTime(+a._d + e * c), f && db(a, "Date", cb(a, "Date") + f * c), g && bb(a, cb(a, "Month") + g * c), d && ib.updateOffset(a, f || g)
                }

                function n(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                }

                function o(a) {
                    return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
                }

                function p(a, b, c) {
                    var d, e = Math.min(a.length, b.length),
                        f = Math.abs(a.length - b.length),
                        g = 0;
                    for (d = 0; e > d; d++)(c && a[d] !== b[d] || !c && t(a[d]) !== t(b[d])) && g++;
                    return g + f
                }

                function q(a) {
                    if (a) {
                        var b = a.toLowerCase().replace(/(.)s$/, "$1");
                        a = Zb[a] || $b[b] || b
                    }
                    return a
                }

                function r(a) {
                    var b, c, d = {};
                    for (c in a) a.hasOwnProperty(c) && (b = q(c), b && (d[b] = a[c]));
                    return d
                }

                function s(b) {
                    var c, d;
                    if (0 === b.indexOf("week")) c = 7, d = "day";
                    else {
                        if (0 !== b.indexOf("month")) return;
                        c = 12, d = "month"
                    }
                    ib[b] = function(e, f) {
                        var g, h, i = ib.fn._lang[b],
                            j = [];
                        if ("number" == typeof e && (f = e, e = a), h = function(a) {
                                var b = ib().utc().set(d, a);
                                return i.call(ib.fn._lang, b, e || "")
                            }, null != f) return h(f);
                        for (g = 0; c > g; g++) j.push(h(g));
                        return j
                    }
                }

                function t(a) {
                    var b = +a,
                        c = 0;
                    return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)), c
                }

                function u(a, b) {
                    return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
                }

                function v(a, b, c) {
                    return $(ib([a, 11, 31 + b - c]), b, c).week
                }

                function w(a) {
                    return x(a) ? 366 : 365
                }

                function x(a) {
                    return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
                }

                function y(a) {
                    var b;
                    a._a && -2 === a._pf.overflow && (b = a._a[pb] < 0 || a._a[pb] > 11 ? pb : a._a[qb] < 1 || a._a[qb] > u(a._a[ob], a._a[pb]) ? qb : a._a[rb] < 0 || a._a[rb] > 23 ? rb : a._a[sb] < 0 || a._a[sb] > 59 ? sb : a._a[tb] < 0 || a._a[tb] > 59 ? tb : a._a[ub] < 0 || a._a[ub] > 999 ? ub : -1, a._pf._overflowDayOfYear && (ob > b || b > qb) && (b = qb), a._pf.overflow = b)
                }

                function z(a) {
                    return null == a._isValid && (a._isValid = !isNaN(a._d.getTime()) && a._pf.overflow < 0 && !a._pf.empty && !a._pf.invalidMonth && !a._pf.nullInput && !a._pf.invalidFormat && !a._pf.userInvalidated, a._strict && (a._isValid = a._isValid && 0 === a._pf.charsLeftOver && 0 === a._pf.unusedTokens.length)), a._isValid
                }

                function A(a) {
                    return a ? a.toLowerCase().replace("_", "-") : a
                }

                function B(a, b) {
                    return b._isUTC ? ib(a).zone(b._offset || 0) : ib(a).local()
                }

                function C(a, b) {
                    return b.abbr = a, vb[a] || (vb[a] = new f), vb[a].set(b), vb[a]
                }

                function D(a) {
                    delete vb[a]
                }

                function E(a) {
                    var b, c, d, e, f = 0,
                        g = function(a) {
                            if (!vb[a] && xb) try {
                                require("./lang/" + a)
                            } catch (b) {}
                            return vb[a]
                        };
                    if (!a) return ib.fn._lang;
                    if (!n(a)) {
                        if (c = g(a)) return c;
                        a = [a]
                    }
                    for (; f < a.length;) {
                        for (e = A(a[f]).split("-"), b = e.length, d = A(a[f + 1]), d = d ? d.split("-") : null; b > 0;) {
                            if (c = g(e.slice(0, b).join("-"))) return c;
                            if (d && d.length >= b && p(e, d, !0) >= b - 1) break;
                            b--
                        }
                        f++
                    }
                    return ib.fn._lang
                }

                function F(a) {
                    return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
                }

                function G(a) {
                    var b, c, d = a.match(Bb);
                    for (b = 0, c = d.length; c > b; b++) d[b] = cc[d[b]] ? cc[d[b]] : F(d[b]);
                    return function(e) {
                        var f = "";
                        for (b = 0; c > b; b++) f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
                        return f
                    }
                }

                function H(a, b) {
                    return a.isValid() ? (b = I(b, a.lang()), _b[b] || (_b[b] = G(b)), _b[b](a)) : a.lang().invalidDate()
                }

                function I(a, b) {
                    function c(a) {
                        return b.longDateFormat(a) || a
                    }
                    var d = 5;
                    for (Cb.lastIndex = 0; d >= 0 && Cb.test(a);) a = a.replace(Cb, c), Cb.lastIndex = 0, d -= 1;
                    return a
                }

                function J(a, b) {
                    var c, d = b._strict;
                    switch (a) {
                        case "Q":
                            return Nb;
                        case "DDDD":
                            return Pb;
                        case "YYYY":
                        case "GGGG":
                        case "gggg":
                            return d ? Qb : Fb;
                        case "Y":
                        case "G":
                        case "g":
                            return Sb;
                        case "YYYYYY":
                        case "YYYYY":
                        case "GGGGG":
                        case "ggggg":
                            return d ? Rb : Gb;
                        case "S":
                            if (d) return Nb;
                        case "SS":
                            if (d) return Ob;
                        case "SSS":
                            if (d) return Pb;
                        case "DDD":
                            return Eb;
                        case "MMM":
                        case "MMMM":
                        case "dd":
                        case "ddd":
                        case "dddd":
                            return Ib;
                        case "a":
                        case "A":
                            return E(b._l)._meridiemParse;
                        case "X":
                            return Lb;
                        case "Z":
                        case "ZZ":
                            return Jb;
                        case "T":
                            return Kb;
                        case "SSSS":
                            return Hb;
                        case "MM":
                        case "DD":
                        case "YY":
                        case "GG":
                        case "gg":
                        case "HH":
                        case "hh":
                        case "mm":
                        case "ss":
                        case "ww":
                        case "WW":
                            return d ? Ob : Db;
                        case "M":
                        case "D":
                        case "d":
                        case "H":
                        case "h":
                        case "m":
                        case "s":
                        case "w":
                        case "W":
                        case "e":
                        case "E":
                            return Db;
                        case "Do":
                            return Mb;
                        default:
                            return c = new RegExp(R(Q(a.replace("\\", "")), "i"))
                    }
                }

                function K(a) {
                    a = a || "";
                    var b = a.match(Jb) || [],
                        c = b[b.length - 1] || [],
                        d = (c + "").match(Xb) || ["-", 0, 0],
                        e = +(60 * d[1]) + t(d[2]);
                    return "+" === d[0] ? -e : e
                }

                function L(a, b, c) {
                    var d, e = c._a;
                    switch (a) {
                        case "Q":
                            null != b && (e[pb] = 3 * (t(b) - 1));
                            break;
                        case "M":
                        case "MM":
                            null != b && (e[pb] = t(b) - 1);
                            break;
                        case "MMM":
                        case "MMMM":
                            d = E(c._l).monthsParse(b), null != d ? e[pb] = d : c._pf.invalidMonth = b;
                            break;
                        case "D":
                        case "DD":
                            null != b && (e[qb] = t(b));
                            break;
                        case "Do":
                            null != b && (e[qb] = t(parseInt(b, 10)));
                            break;
                        case "DDD":
                        case "DDDD":
                            null != b && (c._dayOfYear = t(b));
                            break;
                        case "YY":
                            e[ob] = ib.parseTwoDigitYear(b);
                            break;
                        case "YYYY":
                        case "YYYYY":
                        case "YYYYYY":
                            e[ob] = t(b);
                            break;
                        case "a":
                        case "A":
                            c._isPm = E(c._l).isPM(b);
                            break;
                        case "H":
                        case "HH":
                        case "h":
                        case "hh":
                            e[rb] = t(b);
                            break;
                        case "m":
                        case "mm":
                            e[sb] = t(b);
                            break;
                        case "s":
                        case "ss":
                            e[tb] = t(b);
                            break;
                        case "S":
                        case "SS":
                        case "SSS":
                        case "SSSS":
                            e[ub] = t(1e3 * ("0." + b));
                            break;
                        case "X":
                            c._d = new Date(1e3 * parseFloat(b));
                            break;
                        case "Z":
                        case "ZZ":
                            c._useUTC = !0, c._tzm = K(b);
                            break;
                        case "w":
                        case "ww":
                        case "W":
                        case "WW":
                        case "d":
                        case "dd":
                        case "ddd":
                        case "dddd":
                        case "e":
                        case "E":
                            a = a.substr(0, 1);
                        case "gg":
                        case "gggg":
                        case "GG":
                        case "GGGG":
                        case "GGGGG":
                            a = a.substr(0, 2), b && (c._w = c._w || {}, c._w[a] = b)
                    }
                }

                function M(a) {
                    var b, c, d, e, f, g, h, i, j, k, l = [];
                    if (!a._d) {
                        for (d = O(a), a._w && null == a._a[qb] && null == a._a[pb] && (f = function(b) {
                                var c = parseInt(b, 10);
                                return b ? b.length < 3 ? c > 68 ? 1900 + c : 2e3 + c : c : null == a._a[ob] ? ib().weekYear() : a._a[ob]
                            }, g = a._w, null != g.GG || null != g.W || null != g.E ? h = _(f(g.GG), g.W || 1, g.E, 4, 1) : (i = E(a._l), j = null != g.d ? X(g.d, i) : null != g.e ? parseInt(g.e, 10) + i._week.dow : 0, k = parseInt(g.w, 10) || 1, null != g.d && j < i._week.dow && k++, h = _(f(g.gg), k, j, i._week.doy, i._week.dow)), a._a[ob] = h.year, a._dayOfYear = h.dayOfYear), a._dayOfYear && (e = null == a._a[ob] ? d[ob] : a._a[ob], a._dayOfYear > w(e) && (a._pf._overflowDayOfYear = !0), c = W(e, 0, a._dayOfYear), a._a[pb] = c.getUTCMonth(), a._a[qb] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b) a._a[b] = l[b] = d[b];
                        for (; 7 > b; b++) a._a[b] = l[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
                        l[rb] += t((a._tzm || 0) / 60), l[sb] += t((a._tzm || 0) % 60), a._d = (a._useUTC ? W : V).apply(null, l)
                    }
                }

                function N(a) {
                    var b;
                    a._d || (b = r(a._i), a._a = [b.year, b.month, b.day, b.hour, b.minute, b.second, b.millisecond], M(a))
                }

                function O(a) {
                    var b = new Date;
                    return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]
                }

                function P(a) {
                    a._a = [], a._pf.empty = !0;
                    var b, c, d, e, f, g = E(a._l),
                        h = "" + a._i,
                        i = h.length,
                        j = 0;
                    for (d = I(a._f, g).match(Bb) || [], b = 0; b < d.length; b++) e = d[b], c = (h.match(J(e, a)) || [])[0], c && (f = h.substr(0, h.indexOf(c)), f.length > 0 && a._pf.unusedInput.push(f), h = h.slice(h.indexOf(c) + c.length), j += c.length), cc[e] ? (c ? a._pf.empty = !1 : a._pf.unusedTokens.push(e), L(e, c, a)) : a._strict && !c && a._pf.unusedTokens.push(e);
                    a._pf.charsLeftOver = i - j, h.length > 0 && a._pf.unusedInput.push(h), a._isPm && a._a[rb] < 12 && (a._a[rb] += 12), a._isPm === !1 && 12 === a._a[rb] && (a._a[rb] = 0), M(a), y(a)
                }

                function Q(a) {
                    return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
                        return b || c || d || e
                    })
                }

                function R(a) {
                    return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
                }

                function S(a) {
                    var c, d, e, f, g;
                    if (0 === a._f.length) return a._pf.invalidFormat = !0, void(a._d = new Date(0 / 0));
                    for (f = 0; f < a._f.length; f++) g = 0, c = i({}, a), c._pf = b(), c._f = a._f[f], P(c), z(c) && (g += c._pf.charsLeftOver, g += 10 * c._pf.unusedTokens.length, c._pf.score = g, (null == e || e > g) && (e = g, d = c));
                    i(a, d || c)
                }

                function T(a) {
                    var b, c, d = a._i,
                        e = Tb.exec(d);
                    if (e) {
                        for (a._pf.iso = !0, b = 0, c = Vb.length; c > b; b++)
                            if (Vb[b][1].exec(d)) {
                                a._f = Vb[b][0] + (e[6] || " ");
                                break
                            }
                        for (b = 0, c = Wb.length; c > b; b++)
                            if (Wb[b][1].exec(d)) {
                                a._f += Wb[b][0];
                                break
                            }
                        d.match(Jb) && (a._f += "Z"), P(a)
                    } else ib.createFromInputFallback(a)
                }

                function U(b) {
                    var c = b._i,
                        d = yb.exec(c);
                    c === a ? b._d = new Date : d ? b._d = new Date(+d[1]) : "string" == typeof c ? T(b) : n(c) ? (b._a = c.slice(0), M(b)) : o(c) ? b._d = new Date(+c) : "object" == typeof c ? N(b) : "number" == typeof c ? b._d = new Date(c) : ib.createFromInputFallback(b)
                }

                function V(a, b, c, d, e, f, g) {
                    var h = new Date(a, b, c, d, e, f, g);
                    return 1970 > a && h.setFullYear(a), h
                }

                function W(a) {
                    var b = new Date(Date.UTC.apply(null, arguments));
                    return 1970 > a && b.setUTCFullYear(a), b
                }

                function X(a, b) {
                    if ("string" == typeof a)
                        if (isNaN(a)) {
                            if (a = b.weekdaysParse(a), "number" != typeof a) return null
                        } else a = parseInt(a, 10);
                    return a
                }

                function Y(a, b, c, d, e) {
                    return e.relativeTime(b || 1, !!c, a, d)
                }

                function Z(a, b, c) {
                    var d = nb(Math.abs(a) / 1e3),
                        e = nb(d / 60),
                        f = nb(e / 60),
                        g = nb(f / 24),
                        h = nb(g / 365),
                        i = 45 > d && ["s", d] || 1 === e && ["m"] || 45 > e && ["mm", e] || 1 === f && ["h"] || 22 > f && ["hh", f] || 1 === g && ["d"] || 25 >= g && ["dd", g] || 45 >= g && ["M"] || 345 > g && ["MM", nb(g / 30)] || 1 === h && ["y"] || ["yy", h];
                    return i[2] = b, i[3] = a > 0, i[4] = c, Y.apply({}, i)
                }

                function $(a, b, c) {
                    var d, e = c - b,
                        f = c - a.day();
                    return f > e && (f -= 7), e - 7 > f && (f += 7), d = ib(a).add("d", f), {
                        week: Math.ceil(d.dayOfYear() / 7),
                        year: d.year()
                    }
                }

                function _(a, b, c, d, e) {
                    var f, g, h = W(a, 0, 1).getUTCDay();
                    return c = null != c ? c : e, f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0), g = 7 * (b - 1) + (c - e) + f + 1, {
                        year: g > 0 ? a : a - 1,
                        dayOfYear: g > 0 ? g : w(a - 1) + g
                    }
                }

                function ab(b) {
                    var c = b._i,
                        d = b._f;
                    return null === c || d === a && "" === c ? ib.invalid({
                        nullInput: !0
                    }) : ("string" == typeof c && (b._i = c = E().preparse(c)), ib.isMoment(c) ? (b = j(c), b._d = new Date(+c._d)) : d ? n(d) ? S(b) : P(b) : U(b), new g(b))
                }

                function bb(a, b) {
                    var c;
                    return "string" == typeof b && (b = a.lang().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), u(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a)
                }

                function cb(a, b) {
                    return a._d["get" + (a._isUTC ? "UTC" : "") + b]()
                }

                function db(a, b, c) {
                    return "Month" === b ? bb(a, c) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
                }

                function eb(a, b) {
                    return function(c) {
                        return null != c ? (db(this, a, c), ib.updateOffset(this, b), this) : cb(this, a)
                    }
                }

                function fb(a) {
                    ib.duration.fn[a] = function() {
                        return this._data[a]
                    }
                }

                function gb(a, b) {
                    ib.duration.fn["as" + a] = function() {
                        return +this / b
                    }
                }

                function hb(a) {
                    "undefined" == typeof ender && (jb = mb.moment, mb.moment = a ? c("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", ib) : ib)
                }
                for (var ib, jb, kb, lb = "2.6.0", mb = "undefined" != typeof global ? global : this, nb = Math.round, ob = 0, pb = 1, qb = 2, rb = 3, sb = 4, tb = 5, ub = 6, vb = {}, wb = {
                        _isAMomentObject: null,
                        _i: null,
                        _f: null,
                        _l: null,
                        _strict: null,
                        _isUTC: null,
                        _offset: null,
                        _pf: null,
                        _lang: null
                    }, xb = "undefined" != typeof module && module.exports, yb = /^\/?Date\((\-?\d+)/i, zb = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ab = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Bb = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, Cb = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, Db = /\d\d?/, Eb = /\d{1,3}/, Fb = /\d{1,4}/, Gb = /[+\-]?\d{1,6}/, Hb = /\d+/, Ib = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Jb = /Z|[\+\-]\d\d:?\d\d/gi, Kb = /T/i, Lb = /[\+\-]?\d+(\.\d{1,3})?/, Mb = /\d{1,2}/, Nb = /\d/, Ob = /\d\d/, Pb = /\d{3}/, Qb = /\d{4}/, Rb = /[+-]?\d{6}/, Sb = /[+-]?\d+/, Tb = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ub = "YYYY-MM-DDTHH:mm:ssZ", Vb = [
                        ["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
                        ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
                        ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
                        ["GGGG-[W]WW", /\d{4}-W\d{2}/],
                        ["YYYY-DDD", /\d{4}-\d{3}/]
                    ], Wb = [
                        ["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
                        ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
                        ["HH:mm", /(T| )\d\d:\d\d/],
                        ["HH", /(T| )\d\d/]
                    ], Xb = /([\+\-]|\d\d)/gi, Yb = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
                        Milliseconds: 1,
                        Seconds: 1e3,
                        Minutes: 6e4,
                        Hours: 36e5,
                        Days: 864e5,
                        Months: 2592e6,
                        Years: 31536e6
                    }), Zb = {
                        ms: "millisecond",
                        s: "second",
                        m: "minute",
                        h: "hour",
                        d: "day",
                        D: "date",
                        w: "week",
                        W: "isoWeek",
                        M: "month",
                        Q: "quarter",
                        y: "year",
                        DDD: "dayOfYear",
                        e: "weekday",
                        E: "isoWeekday",
                        gg: "weekYear",
                        GG: "isoWeekYear"
                    }, $b = {
                        dayofyear: "dayOfYear",
                        isoweekday: "isoWeekday",
                        isoweek: "isoWeek",
                        weekyear: "weekYear",
                        isoweekyear: "isoWeekYear"
                    }, _b = {}, ac = "DDD w W M D d".split(" "), bc = "M D H h m s w W".split(" "), cc = {
                        M: function() {
                            return this.month() + 1
                        },
                        MMM: function(a) {
                            return this.lang().monthsShort(this, a)
                        },
                        MMMM: function(a) {
                            return this.lang().months(this, a)
                        },
                        D: function() {
                            return this.date()
                        },
                        DDD: function() {
                            return this.dayOfYear()
                        },
                        d: function() {
                            return this.day()
                        },
                        dd: function(a) {
                            return this.lang().weekdaysMin(this, a)
                        },
                        ddd: function(a) {
                            return this.lang().weekdaysShort(this, a)
                        },
                        dddd: function(a) {
                            return this.lang().weekdays(this, a)
                        },
                        w: function() {
                            return this.week()
                        },
                        W: function() {
                            return this.isoWeek()
                        },
                        YY: function() {
                            return l(this.year() % 100, 2)
                        },
                        YYYY: function() {
                            return l(this.year(), 4)
                        },
                        YYYYY: function() {
                            return l(this.year(), 5)
                        },
                        YYYYYY: function() {
                            var a = this.year(),
                                b = a >= 0 ? "+" : "-";
                            return b + l(Math.abs(a), 6)
                        },
                        gg: function() {
                            return l(this.weekYear() % 100, 2)
                        },
                        gggg: function() {
                            return l(this.weekYear(), 4)
                        },
                        ggggg: function() {
                            return l(this.weekYear(), 5)
                        },
                        GG: function() {
                            return l(this.isoWeekYear() % 100, 2)
                        },
                        GGGG: function() {
                            return l(this.isoWeekYear(), 4)
                        },
                        GGGGG: function() {
                            return l(this.isoWeekYear(), 5)
                        },
                        e: function() {
                            return this.weekday()
                        },
                        E: function() {
                            return this.isoWeekday()
                        },
                        a: function() {
                            return this.lang().meridiem(this.hours(), this.minutes(), !0)
                        },
                        A: function() {
                            return this.lang().meridiem(this.hours(), this.minutes(), !1)
                        },
                        H: function() {
                            return this.hours()
                        },
                        h: function() {
                            return this.hours() % 12 || 12
                        },
                        m: function() {
                            return this.minutes()
                        },
                        s: function() {
                            return this.seconds()
                        },
                        S: function() {
                            return t(this.milliseconds() / 100)
                        },
                        SS: function() {
                            return l(t(this.milliseconds() / 10), 2)
                        },
                        SSS: function() {
                            return l(this.milliseconds(), 3)
                        },
                        SSSS: function() {
                            return l(this.milliseconds(), 3)
                        },
                        Z: function() {
                            var a = -this.zone(),
                                b = "+";
                            return 0 > a && (a = -a, b = "-"), b + l(t(a / 60), 2) + ":" + l(t(a) % 60, 2)
                        },
                        ZZ: function() {
                            var a = -this.zone(),
                                b = "+";
                            return 0 > a && (a = -a, b = "-"), b + l(t(a / 60), 2) + l(t(a) % 60, 2)
                        },
                        z: function() {
                            return this.zoneAbbr()
                        },
                        zz: function() {
                            return this.zoneName()
                        },
                        X: function() {
                            return this.unix()
                        },
                        Q: function() {
                            return this.quarter()
                        }
                    }, dc = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"]; ac.length;) kb = ac.pop(), cc[kb + "o"] = e(cc[kb], kb);
                for (; bc.length;) kb = bc.pop(), cc[kb + kb] = d(cc[kb], 2);
                for (cc.DDDD = d(cc.DDD, 3), i(f.prototype, {
                        set: function(a) {
                            var b, c;
                            for (c in a) b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b
                        },
                        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                        months: function(a) {
                            return this._months[a.month()]
                        },
                        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
                        monthsShort: function(a) {
                            return this._monthsShort[a.month()]
                        },
                        monthsParse: function(a) {
                            var b, c, d;
                            for (this._monthsParse || (this._monthsParse = []), b = 0; 12 > b; b++)
                                if (this._monthsParse[b] || (c = ib.utc([2e3, b]), d = "^" + this.months(c, "") + "|^" + this.monthsShort(c, ""), this._monthsParse[b] = new RegExp(d.replace(".", ""), "i")), this._monthsParse[b].test(a)) return b
                        },
                        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                        weekdays: function(a) {
                            return this._weekdays[a.day()]
                        },
                        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
                        weekdaysShort: function(a) {
                            return this._weekdaysShort[a.day()]
                        },
                        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
                        weekdaysMin: function(a) {
                            return this._weekdaysMin[a.day()]
                        },
                        weekdaysParse: function(a) {
                            var b, c, d;
                            for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++)
                                if (this._weekdaysParse[b] || (c = ib([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a)) return b
                        },
                        _longDateFormat: {
                            LT: "h:mm A",
                            L: "MM/DD/YYYY",
                            LL: "MMMM D YYYY",
                            LLL: "MMMM D YYYY LT",
                            LLLL: "dddd, MMMM D YYYY LT"
                        },
                        longDateFormat: function(a) {
                            var b = this._longDateFormat[a];
                            return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a) {
                                return a.slice(1)
                            }), this._longDateFormat[a] = b), b
                        },
                        isPM: function(a) {
                            return "p" === (a + "").toLowerCase().charAt(0)
                        },
                        _meridiemParse: /[ap]\.?m?\.?/i,
                        meridiem: function(a, b, c) {
                            return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
                        },
                        _calendar: {
                            sameDay: "[Today at] LT",
                            nextDay: "[Tomorrow at] LT",
                            nextWeek: "dddd [at] LT",
                            lastDay: "[Yesterday at] LT",
                            lastWeek: "[Last] dddd [at] LT",
                            sameElse: "L"
                        },
                        calendar: function(a, b) {
                            var c = this._calendar[a];
                            return "function" == typeof c ? c.apply(b) : c
                        },
                        _relativeTime: {
                            future: "in %s",
                            past: "%s ago",
                            s: "a few seconds",
                            m: "a minute",
                            mm: "%d minutes",
                            h: "an hour",
                            hh: "%d hours",
                            d: "a day",
                            dd: "%d days",
                            M: "a month",
                            MM: "%d months",
                            y: "a year",
                            yy: "%d years"
                        },
                        relativeTime: function(a, b, c, d) {
                            var e = this._relativeTime[c];
                            return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
                        },
                        pastFuture: function(a, b) {
                            var c = this._relativeTime[a > 0 ? "future" : "past"];
                            return "function" == typeof c ? c(b) : c.replace(/%s/i, b)
                        },
                        ordinal: function(a) {
                            return this._ordinal.replace("%d", a)
                        },
                        _ordinal: "%d",
                        preparse: function(a) {
                            return a
                        },
                        postformat: function(a) {
                            return a
                        },
                        week: function(a) {
                            return $(a, this._week.dow, this._week.doy).week
                        },
                        _week: {
                            dow: 0,
                            doy: 6
                        },
                        _invalidDate: "Invalid date",
                        invalidDate: function() {
                            return this._invalidDate
                        }
                    }), ib = function(c, d, e, f) {
                        var g;
                        return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, g._i = c, g._f = d, g._l = e, g._strict = f, g._isUTC = !1, g._pf = b(), ab(g)
                    }, ib.suppressDeprecationWarnings = !1, ib.createFromInputFallback = c("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(a) {
                        a._d = new Date(a._i)
                    }), ib.utc = function(c, d, e, f) {
                        var g;
                        return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, g._useUTC = !0, g._isUTC = !0, g._l = e, g._i = c, g._f = d, g._strict = f, g._pf = b(), ab(g).utc()
                    }, ib.unix = function(a) {
                        return ib(1e3 * a)
                    }, ib.duration = function(a, b) {
                        var c, d, e, f = a,
                            g = null;
                        return ib.isDuration(a) ? f = {
                            ms: a._milliseconds,
                            d: a._days,
                            M: a._months
                        } : "number" == typeof a ? (f = {}, b ? f[b] = a : f.milliseconds = a) : (g = zb.exec(a)) ? (c = "-" === g[1] ? -1 : 1, f = {
                            y: 0,
                            d: t(g[qb]) * c,
                            h: t(g[rb]) * c,
                            m: t(g[sb]) * c,
                            s: t(g[tb]) * c,
                            ms: t(g[ub]) * c
                        }) : (g = Ab.exec(a)) && (c = "-" === g[1] ? -1 : 1, e = function(a) {
                            var b = a && parseFloat(a.replace(",", "."));
                            return (isNaN(b) ? 0 : b) * c
                        }, f = {
                            y: e(g[2]),
                            M: e(g[3]),
                            d: e(g[4]),
                            h: e(g[5]),
                            m: e(g[6]),
                            s: e(g[7]),
                            w: e(g[8])
                        }), d = new h(f), ib.isDuration(a) && a.hasOwnProperty("_lang") && (d._lang = a._lang), d
                    }, ib.version = lb, ib.defaultFormat = Ub, ib.momentProperties = wb, ib.updateOffset = function() {}, ib.lang = function(a, b) {
                        var c;
                        return a ? (b ? C(A(a), b) : null === b ? (D(a), a = "en") : vb[a] || E(a), c = ib.duration.fn._lang = ib.fn._lang = E(a), c._abbr) : ib.fn._lang._abbr
                    }, ib.langData = function(a) {
                        return a && a._lang && a._lang._abbr && (a = a._lang._abbr), E(a)
                    }, ib.isMoment = function(a) {
                        return a instanceof g || null != a && a.hasOwnProperty("_isAMomentObject")
                    }, ib.isDuration = function(a) {
                        return a instanceof h
                    }, kb = dc.length - 1; kb >= 0; --kb) s(dc[kb]);
                ib.normalizeUnits = function(a) {
                    return q(a)
                }, ib.invalid = function(a) {
                    var b = ib.utc(0 / 0);
                    return null != a ? i(b._pf, a) : b._pf.userInvalidated = !0, b
                }, ib.parseZone = function() {
                    return ib.apply(null, arguments).parseZone()
                }, ib.parseTwoDigitYear = function(a) {
                    return t(a) + (t(a) > 68 ? 1900 : 2e3)
                }, i(ib.fn = g.prototype, {
                    clone: function() {
                        return ib(this)
                    },
                    valueOf: function() {
                        return +this._d + 6e4 * (this._offset || 0)
                    },
                    unix: function() {
                        return Math.floor(+this / 1e3)
                    },
                    toString: function() {
                        return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                    },
                    toDate: function() {
                        return this._offset ? new Date(+this) : this._d
                    },
                    toISOString: function() {
                        var a = ib(this).utc();
                        return 0 < a.year() && a.year() <= 9999 ? H(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : H(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
                    },
                    toArray: function() {
                        var a = this;
                        return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
                    },
                    isValid: function() {
                        return z(this)
                    },
                    isDSTShifted: function() {
                        return this._a ? this.isValid() && p(this._a, (this._isUTC ? ib.utc(this._a) : ib(this._a)).toArray()) > 0 : !1
                    },
                    parsingFlags: function() {
                        return i({}, this._pf)
                    },
                    invalidAt: function() {
                        return this._pf.overflow
                    },
                    utc: function() {
                        return this.zone(0)
                    },
                    local: function() {
                        return this.zone(0), this._isUTC = !1, this
                    },
                    format: function(a) {
                        var b = H(this, a || ib.defaultFormat);
                        return this.lang().postformat(b)
                    },
                    add: function(a, b) {
                        var c;
                        return c = "string" == typeof a ? ib.duration(+b, a) : ib.duration(a, b), m(this, c, 1), this
                    },
                    subtract: function(a, b) {
                        var c;
                        return c = "string" == typeof a ? ib.duration(+b, a) : ib.duration(a, b), m(this, c, -1), this
                    },
                    diff: function(a, b, c) {
                        var d, e, f = B(a, this),
                            g = 6e4 * (this.zone() - f.zone());
                        return b = q(b), "year" === b || "month" === b ? (d = 432e5 * (this.daysInMonth() + f.daysInMonth()), e = 12 * (this.year() - f.year()) + (this.month() - f.month()), e += (this - ib(this).startOf("month") - (f - ib(f).startOf("month"))) / d, e -= 6e4 * (this.zone() - ib(this).startOf("month").zone() - (f.zone() - ib(f).startOf("month").zone())) / d, "year" === b && (e /= 12)) : (d = this - f, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d), c ? e : k(e)
                    },
                    from: function(a, b) {
                        return ib.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)
                    },
                    fromNow: function(a) {
                        return this.from(ib(), a)
                    },
                    calendar: function() {
                        var a = B(ib(), this).startOf("day"),
                            b = this.diff(a, "days", !0),
                            c = -6 > b ? "sameElse" : -1 > b ? "lastWeek" : 0 > b ? "lastDay" : 1 > b ? "sameDay" : 2 > b ? "nextDay" : 7 > b ? "nextWeek" : "sameElse";
                        return this.format(this.lang().calendar(c, this))
                    },
                    isLeapYear: function() {
                        return x(this.year())
                    },
                    isDST: function() {
                        return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
                    },
                    day: function(a) {
                        var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
                        return null != a ? (a = X(a, this.lang()), this.add({
                            d: a - b
                        })) : b
                    },
                    month: eb("Month", !0),
                    startOf: function(a) {
                        switch (a = q(a)) {
                            case "year":
                                this.month(0);
                            case "quarter":
                            case "month":
                                this.date(1);
                            case "week":
                            case "isoWeek":
                            case "day":
                                this.hours(0);
                            case "hour":
                                this.minutes(0);
                            case "minute":
                                this.seconds(0);
                            case "second":
                                this.milliseconds(0)
                        }
                        return "week" === a ? this.weekday(0) : "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
                    },
                    endOf: function(a) {
                        return a = q(a), this.startOf(a).add("isoWeek" === a ? "week" : a, 1).subtract("ms", 1)
                    },
                    isAfter: function(a, b) {
                        return b = "undefined" != typeof b ? b : "millisecond", +this.clone().startOf(b) > +ib(a).startOf(b)
                    },
                    isBefore: function(a, b) {
                        return b = "undefined" != typeof b ? b : "millisecond", +this.clone().startOf(b) < +ib(a).startOf(b)
                    },
                    isSame: function(a, b) {
                        return b = b || "ms", +this.clone().startOf(b) === +B(a, this).startOf(b)
                    },
                    min: function(a) {
                        return a = ib.apply(null, arguments), this > a ? this : a
                    },
                    max: function(a) {
                        return a = ib.apply(null, arguments), a > this ? this : a
                    },
                    zone: function(a, b) {
                        var c = this._offset || 0;
                        return null == a ? this._isUTC ? c : this._d.getTimezoneOffset() : ("string" == typeof a && (a = K(a)), Math.abs(a) < 16 && (a = 60 * a), this._offset = a, this._isUTC = !0, c !== a && (!b || this._changeInProgress ? m(this, ib.duration(c - a, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, ib.updateOffset(this, !0), this._changeInProgress = null)), this)
                    },
                    zoneAbbr: function() {
                        return this._isUTC ? "UTC" : ""
                    },
                    zoneName: function() {
                        return this._isUTC ? "Coordinated Universal Time" : ""
                    },
                    parseZone: function() {
                        return this._tzm ? this.zone(this._tzm) : "string" == typeof this._i && this.zone(this._i), this
                    },
                    hasAlignedHourOffset: function(a) {
                        return a = a ? ib(a).zone() : 0, (this.zone() - a) % 60 === 0
                    },
                    daysInMonth: function() {
                        return u(this.year(), this.month())
                    },
                    dayOfYear: function(a) {
                        var b = nb((ib(this).startOf("day") - ib(this).startOf("year")) / 864e5) + 1;
                        return null == a ? b : this.add("d", a - b)
                    },
                    quarter: function(a) {
                        return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
                    },
                    weekYear: function(a) {
                        var b = $(this, this.lang()._week.dow, this.lang()._week.doy).year;
                        return null == a ? b : this.add("y", a - b)
                    },
                    isoWeekYear: function(a) {
                        var b = $(this, 1, 4).year;
                        return null == a ? b : this.add("y", a - b)
                    },
                    week: function(a) {
                        var b = this.lang().week(this);
                        return null == a ? b : this.add("d", 7 * (a - b))
                    },
                    isoWeek: function(a) {
                        var b = $(this, 1, 4).week;
                        return null == a ? b : this.add("d", 7 * (a - b))
                    },
                    weekday: function(a) {
                        var b = (this.day() + 7 - this.lang()._week.dow) % 7;
                        return null == a ? b : this.add("d", a - b)
                    },
                    isoWeekday: function(a) {
                        return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
                    },
                    isoWeeksInYear: function() {
                        return v(this.year(), 1, 4)
                    },
                    weeksInYear: function() {
                        var a = this._lang._week;
                        return v(this.year(), a.dow, a.doy)
                    },
                    get: function(a) {
                        return a = q(a), this[a]()
                    },
                    set: function(a, b) {
                        return a = q(a), "function" == typeof this[a] && this[a](b), this
                    },
                    lang: function(b) {
                        return b === a ? this._lang : (this._lang = E(b), this)
                    }
                }), ib.fn.millisecond = ib.fn.milliseconds = eb("Milliseconds", !1), ib.fn.second = ib.fn.seconds = eb("Seconds", !1), ib.fn.minute = ib.fn.minutes = eb("Minutes", !1), ib.fn.hour = ib.fn.hours = eb("Hours", !0), ib.fn.date = eb("Date", !0), ib.fn.dates = c("dates accessor is deprecated. Use date instead.", eb("Date", !0)), ib.fn.year = eb("FullYear", !0), ib.fn.years = c("years accessor is deprecated. Use year instead.", eb("FullYear", !0)), ib.fn.days = ib.fn.day, ib.fn.months = ib.fn.month, ib.fn.weeks = ib.fn.week, ib.fn.isoWeeks = ib.fn.isoWeek, ib.fn.quarters = ib.fn.quarter, ib.fn.toJSON = ib.fn.toISOString, i(ib.duration.fn = h.prototype, {
                    _bubble: function() {
                        var a, b, c, d, e = this._milliseconds,
                            f = this._days,
                            g = this._months,
                            h = this._data;
                        h.milliseconds = e % 1e3, a = k(e / 1e3), h.seconds = a % 60, b = k(a / 60), h.minutes = b % 60, c = k(b / 60), h.hours = c % 24, f += k(c / 24), h.days = f % 30, g += k(f / 30), h.months = g % 12, d = k(g / 12), h.years = d
                    },
                    weeks: function() {
                        return k(this.days() / 7)
                    },
                    valueOf: function() {
                        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * t(this._months / 12)
                    },
                    humanize: function(a) {
                        var b = +this,
                            c = Z(b, !a, this.lang());
                        return a && (c = this.lang().pastFuture(b, c)), this.lang().postformat(c)
                    },
                    add: function(a, b) {
                        var c = ib.duration(a, b);
                        return this._milliseconds += c._milliseconds, this._days += c._days, this._months += c._months, this._bubble(), this
                    },
                    subtract: function(a, b) {
                        var c = ib.duration(a, b);
                        return this._milliseconds -= c._milliseconds, this._days -= c._days, this._months -= c._months, this._bubble(), this
                    },
                    get: function(a) {
                        return a = q(a), this[a.toLowerCase() + "s"]()
                    },
                    as: function(a) {
                        return a = q(a), this["as" + a.charAt(0).toUpperCase() + a.slice(1) + "s"]()
                    },
                    lang: ib.fn.lang,
                    toIsoString: function() {
                        var a = Math.abs(this.years()),
                            b = Math.abs(this.months()),
                            c = Math.abs(this.days()),
                            d = Math.abs(this.hours()),
                            e = Math.abs(this.minutes()),
                            f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
                        return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D"
                    }
                });
                for (kb in Yb) Yb.hasOwnProperty(kb) && (gb(kb, Yb[kb]), fb(kb.toLowerCase()));
                gb("Weeks", 6048e5), ib.duration.fn.asMonths = function() {
                    return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
                }, ib.lang("en", {
                    ordinal: function(a) {
                        var b = a % 10,
                            c = 1 === t(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
                        return a + c
                    }
                }), xb ? module.exports = ib : "function" == typeof define && define.amd ? (define("moment", ["require", "exports", "module"], function(a, b, c) {
                    return c.config && c.config() && c.config().noGlobal === !0 && (mb.moment = jb), ib
                }), hb(!0)) : hb()
            }.call(this),
            function() {
                window.Backbone ? define("backbone", [], function() {
                    return window.Backbone
                }) : require.config({
                    paths: {
                        backbone: "components/backbone/backbone"
                    },
                    shim: {
                        backbone: {
                            exports: "Backbone",
                            deps: ["underscore", "jquery"]
                        }
                    }
                }), define("aura-extensions/aura-backbone", ["backbone"], {
                    name: "The Back of the Bone",
                    initialize: function(a) {
                        var b = a.core,
                            c = a.sandbox,
                            d = require("backbone");
                        b.mvc = d.noConflict(), c.mvc = {}, c.mvc.View = function(a) {
                            return b.mvc.View.extend(a)
                        }, c.mvc.Model = function(a) {
                            return b.mvc.Model.extend(a)
                        }, c.mvc.Collection = function(a) {
                            return b.mvc.Collection.extend(a)
                        }, c.mvc.Router = function(a) {
                            return b.mvc.Router.extend(a)
                        }
                    }
                })
            }(), define("aura-extensions/aura-base64", ["lib/utils/base64"], function(a) {
                var b = {
                    name: "base64",
                    initialize: function(b) {
                        b.core.util.base64 = a
                    }
                };
                return b
            }),
            function() {
                define("lib/utils/q2jquery", ["jquery"], function(a) {
                    return function(b) {
                        var c;
                        return c = a.Deferred(), b.then(c.resolve, c.reject), c.promise()
                    }
                })
            }.call(this), define("aura-extensions/aura-component-require", ["underscore", "lib/utils/promises", "lib/utils/q2jquery"], function(a, b, c) {
                function d(a, b) {
                    return b.ref + "/" + a
                }

                function e() {
                    var e = b.deferred();
                    if (this.require) {
                        var f = (a.map([].concat(this.require), function(a) {
                                return d(a, this)
                            }, this), require.s.contexts._.config),
                            g = require.s.contexts._.defined,
                            h = require.config({
                                context: "__context__" + this.ref,
                                baseUrl: f.pkgs[this.ref].location,
                                shim: f.shim,
                                paths: f.paths
                            }),
                            i = this,
                            j = this.require;
                        return h(["require"], function(b) {
                            a.each(a.keys(g), function(a) {
                                define(a, [], function() {
                                    return g[a]
                                })
                            }), b(j, function(a) {
                                i.require = function(a) {
                                    return h(a)
                                }, e.resolve(a)
                            }, function(a) {
                                e.reject(a)
                            })
                        }), c(e.promise)
                    }
                }
                return {
                    initialize: function(a) {
                        a.components.before("initialize", e)
                    },
                    componentRequire: e
                }
            }), define("aura-extensions/aura-component-validate-options", [], function() {
                return function(a) {
                    var b = a.core.util._,
                        c = {
                            name: "ValidateOptions",
                            initialize: function(a) {
                                a.components.before("initialize", c.checkOptions)
                            },
                            checkOptions: function(a) {
                                var c = b.keys(a);
                                return b.each(this.requiredOptions || [], function(d) {
                                    if (!b.contains(c, d) || void 0 === a[d]) throw new Error("Missing option to component " + this.componentName + ": " + d)
                                }, this), !0
                            }
                        };
                    return c
                }
            }), define("aura-extensions/aura-cookies", ["lib/utils/cookies"], function(a) {
                var b = {
                    initialize: function(b) {
                        b.core.cookies = a
                    }
                };
                return b
            }),
            function(a, b) {
                "function" == typeof define && define.amd ? define("bower_components/form2js/src/form2js", b) : a.form2js = b()
            }(this, function() {
                function a(a, d, e, f, g, h) {
                    h = h ? !0 : !1, ("undefined" == typeof e || null == e) && (e = !0), ("undefined" == typeof d || null == d) && (d = "."), arguments.length < 5 && (g = !1), a = "string" == typeof a ? document.getElementById(a) : a;
                    var i, j = [],
                        k = 0;
                    if (a.constructor == Array || "undefined" != typeof NodeList && a.constructor == NodeList)
                        for (; i = a[k++];) j = j.concat(c(i, f, g, h));
                    else j = c(a, f, g, h);
                    return b(j, e, d)
                }

                function b(a, b, c) {
                    var d, e, f, g, h, i, j, k, l, m, n, o, p, q = {},
                        r = {};
                    for (d = 0; d < a.length; d++)
                        if (h = a[d].value, !b || "" !== h && null !== h) {
                            for (o = a[d].name, p = o.split(c), i = [], j = q, k = "", e = 0; e < p.length; e++)
                                if (n = p[e].split("]["), n.length > 1)
                                    for (f = 0; f < n.length; f++)
                                        if (n[f] = 0 == f ? n[f] + "]" : f == n.length - 1 ? "[" + n[f] : "[" + n[f] + "]", m = n[f].match(/([a-z_]+)?\[([a-z_][a-z0-9_]+?)\]/i))
                                            for (g = 1; g < m.length; g++) m[g] && i.push(m[g]);
                                        else i.push(n[f]);
                            else i = i.concat(n);
                            for (e = 0; e < i.length; e++) n = i[e], n.indexOf("[]") > -1 && e == i.length - 1 ? (l = n.substr(0, n.indexOf("[")), k += l, j[l] || (j[l] = []), j[l].push(h)) : n.indexOf("[") > -1 ? (l = n.substr(0, n.indexOf("[")), m = n.replace(/(^([a-z_]+)?\[)|(\]$)/gi, ""), k += "_" + l + "_" + m, r[k] || (r[k] = {}), "" == l || j[l] || (j[l] = []), e == i.length - 1 ? "" == l ? (j.push(h), r[k][m] = j[j.length - 1]) : (j[l].push(h), r[k][m] = j[l][j[l].length - 1]) : r[k][m] || (j[l].push(/^[0-9a-z_]+\[?/i.test(i[e + 1]) ? {} : []), r[k][m] = j[l][j[l].length - 1]), j = r[k][m]) : (k += n, e < i.length - 1 ? (j[n] || (j[n] = {}), j = j[n]) : j[n] = h)
                        }
                    return q
                }

                function c(a, b, c, f) {
                    var g = e(a, b, c, f);
                    return g.length > 0 ? g : d(a, b, c, f)
                }

                function d(a, b, c, d) {
                    for (var f = [], g = a.firstChild; g;) f = f.concat(e(g, b, c, d)), g = g.nextSibling;
                    return f
                }

                function e(a, b, c, e) {
                    if (a.disabled && !e) return [];
                    var h, i, j, k = f(a, c);
                    return h = b && b(a), h && h.name ? j = [h] : "" != k && a.nodeName.match(/INPUT|TEXTAREA/i) ? (i = g(a, e), j = null === i ? [] : [{
                        name: k,
                        value: i
                    }]) : "" != k && a.nodeName.match(/SELECT/i) ? (i = g(a, e), j = [{
                        name: k.replace(/\[\]$/, ""),
                        value: i
                    }]) : j = d(a, b, c, e), j
                }

                function f(a, b) {
                    return a.name && "" != a.name ? a.name : b && a.id && "" != a.id ? a.id : ""
                }

                function g(a, b) {
                    if (a.disabled && !b) return null;
                    switch (a.nodeName) {
                        case "INPUT":
                        case "TEXTAREA":
                            switch (a.type.toLowerCase()) {
                                case "radio":
                                    if (a.checked && "false" === a.value) return !1;
                                case "checkbox":
                                    if (a.checked && "true" === a.value) return !0;
                                    if (!a.checked && "true" === a.value) return !1;
                                    if (a.checked) return a.value;
                                    break;
                                case "button":
                                case "reset":
                                case "submit":
                                case "image":
                                    return "";
                                default:
                                    return a.value
                            }
                            break;
                        case "SELECT":
                            return h(a)
                    }
                    return null
                }

                function h(a) {
                    var b, c, d, e = a.multiple,
                        f = [];
                    if (!e) return a.value;
                    for (b = a.getElementsByTagName("option"), c = 0, d = b.length; d > c; c++) b[c].selected && f.push(b[c].value);
                    return f
                }
                return a
            }), define("aura-extensions/aura-form-serialize", ["bower_components/form2js/src/form2js", "underscore"], function(a, b) {
                return {
                    initialize: function(c) {
                        c.core.dom.getFormData = function(c) {
                            return c.toArray && (c = c.toArray()), b.extend.apply(b, b.map([].concat(c), a))
                        }
                    }
                }
            }), define("aura-extensions/aura-moment", ["moment"], function(a) {
                return {
                    initialize: function(b) {
                        b.sandbox.util.moment = a
                    }
                }
            }), define("aura-extensions/aura-purl", ["purl"], function() {
                return {
                    require: {
                        paths: {
                            purl: "bower_components/purl/purl"
                        }
                    },
                    initialize: function(a) {
                        var b = require("purl");
                        a.core.util.purl = b
                    }
                }
            }),
            function() {
                function a(a, b) {
                    return b = b || "", "string" != typeof a && (a.global && b.indexOf("g") < 0 && (b += "g"), a.ignoreCase && b.indexOf("i") < 0 && (b += "i"), a.multiline && b.indexOf("m") < 0 && (b += "m"), a = a.source), new RegExp(a.replace(/#\{(\w+)\}/g, function(a, b) {
                        var c = f.txt.regexen[b] || "";
                        return "string" != typeof c && (c = c.source), c
                    }), b)
                }

                function b(a, b) {
                    return a.replace(/#\{(\w+)\}/g, function(a, c) {
                        return b[c] || ""
                    })
                }

                function c(a, b, c) {
                    var d = String.fromCharCode(b);
                    return c !== b && (d += "-" + String.fromCharCode(c)), a.push(d), a
                }

                function d(a) {
                    var b = {};
                    for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                    return b
                }

                function e(a, b, c) {
                    return c ? !a || a.match(b) && RegExp["$&"] === a : "string" == typeof a && a.match(b) && RegExp["$&"] === a
                }
                if ("undefined" == typeof f || null === f) var f = {};
                f.txt = {}, f.txt.regexen = {};
                var g = {
                    "&": "&amp;",
                    ">": "&gt;",
                    "<": "&lt;",
                    '"': "&quot;",
                    "'": "&#39;"
                };
                f.txt.htmlEscape = function(a) {
                    return a && a.replace(/[&"'><]/g, function(a) {
                        return g[a]
                    })
                }, f.txt.regexSupplant = a, f.txt.stringSupplant = b, f.txt.addCharsToCharClass = c;
                var h = String.fromCharCode,
                    i = [h(32), h(133), h(160), h(5760), h(6158), h(8232), h(8233), h(8239), h(8287), h(12288)];
                c(i, 9, 13), c(i, 8192, 8202);
                var j = [h(65534), h(65279), h(65535)];
                c(j, 8234, 8238), f.txt.regexen.spaces_group = a(i.join("")), f.txt.regexen.spaces = a("[" + i.join("") + "]"), f.txt.regexen.invalid_chars_group = a(j.join("")), f.txt.regexen.punct = /\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~\$/, f.txt.regexen.rtl_chars = /[\u0600-\u06FF]|[\u0750-\u077F]|[\u0590-\u05FF]|[\uFE70-\uFEFF]/gm, f.txt.regexen.non_bmp_code_pairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/gm;
                var k = [];
                c(k, 1024, 1279), c(k, 1280, 1319), c(k, 11744, 11775), c(k, 42560, 42655), c(k, 1425, 1471), c(k, 1473, 1474), c(k, 1476, 1477), c(k, 1479, 1479), c(k, 1488, 1514), c(k, 1520, 1524), c(k, 64274, 64296), c(k, 64298, 64310), c(k, 64312, 64316), c(k, 64318, 64318), c(k, 64320, 64321), c(k, 64323, 64324), c(k, 64326, 64335), c(k, 1552, 1562), c(k, 1568, 1631), c(k, 1646, 1747), c(k, 1749, 1756), c(k, 1758, 1768), c(k, 1770, 1775), c(k, 1786, 1788), c(k, 1791, 1791), c(k, 1872, 1919), c(k, 2208, 2208), c(k, 2210, 2220), c(k, 2276, 2302), c(k, 64336, 64433), c(k, 64467, 64829), c(k, 64848, 64911), c(k, 64914, 64967), c(k, 65008, 65019), c(k, 65136, 65140), c(k, 65142, 65276), c(k, 8204, 8204), c(k, 3585, 3642), c(k, 3648, 3662), c(k, 4352, 4607), c(k, 12592, 12677), c(k, 43360, 43391), c(k, 44032, 55215), c(k, 55216, 55295), c(k, 65441, 65500), c(k, 12449, 12538), c(k, 12540, 12542), c(k, 65382, 65439), c(k, 65392, 65392), c(k, 65296, 65305), c(k, 65313, 65338), c(k, 65345, 65370), c(k, 12353, 12438), c(k, 12441, 12446), c(k, 13312, 19903), c(k, 19968, 40959), c(k, 173824, 177983), c(k, 177984, 178207), c(k, 194560, 195103), c(k, 12291, 12291), c(k, 12293, 12293), c(k, 12347, 12347), f.txt.regexen.nonLatinHashtagChars = a(k.join(""));
                var l = [];
                c(l, 192, 214), c(l, 216, 246), c(l, 248, 255), c(l, 256, 591), c(l, 595, 596), c(l, 598, 599), c(l, 601, 601), c(l, 603, 603), c(l, 611, 611), c(l, 616, 616), c(l, 623, 623), c(l, 626, 626), c(l, 649, 649), c(l, 651, 651), c(l, 699, 699), c(l, 768, 879), c(l, 7680, 7935), f.txt.regexen.latinAccentChars = a(l.join("")), f.txt.regexen.hashSigns = /[#＃]/, f.txt.regexen.hashtagAlpha = a(/[a-z_#{latinAccentChars}#{nonLatinHashtagChars}]/i), f.txt.regexen.hashtagAlphaNumeric = a(/[a-z0-9_#{latinAccentChars}#{nonLatinHashtagChars}]/i), f.txt.regexen.endHashtagMatch = a(/^(?:#{hashSigns}|:\/\/)/), f.txt.regexen.hashtagBoundary = a(/(?:^|$|[^&a-z0-9_#{latinAccentChars}#{nonLatinHashtagChars}])/), f.txt.regexen.validHashtag = a(/(#{hashtagBoundary})(#{hashSigns})(#{hashtagAlphaNumeric}*#{hashtagAlpha}#{hashtagAlphaNumeric}*)/gi), f.txt.regexen.validMentionPrecedingChars = /(?:^|[^a-zA-Z0-9_!#$%&*@＠]|RT:?)/, f.txt.regexen.atSigns = /[@＠]/, f.txt.regexen.validMentionOrList = a("(#{validMentionPrecedingChars})(#{atSigns})([a-zA-Z0-9_]{1,20})(/[a-zA-Z][a-zA-Z0-9_-]{0,24})?", "g"), f.txt.regexen.validReply = a(/^(?:#{spaces})*#{atSigns}([a-zA-Z0-9_]{1,20})/), f.txt.regexen.endMentionMatch = a(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/), f.txt.regexen.validUrlPrecedingChars = a(/(?:[^A-Za-z0-9@＠$#＃#{invalid_chars_group}]|^)/), f.txt.regexen.invalidUrlWithoutProtocolPrecedingChars = /[-_.\/]$/, f.txt.regexen.invalidDomainChars = b("#{punct}#{spaces_group}#{invalid_chars_group}", f.txt.regexen), f.txt.regexen.validDomainChars = a(/[^#{invalidDomainChars}]/), f.txt.regexen.validSubdomain = a(/(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/), f.txt.regexen.validDomainName = a(/(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/), f.txt.regexen.validGTLD = a(/(?:(?:aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx)(?=[^0-9a-zA-Z]|$))/), f.txt.regexen.validCCTLD = a(/(?:(?:ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw|sx)(?=[^0-9a-zA-Z]|$))/), f.txt.regexen.validPunycode = a(/(?:xn--[0-9a-z]+)/), f.txt.regexen.validDomain = a(/(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/), f.txt.regexen.validAsciiDomain = a(/(?:(?:[\-a-z0-9#{latinAccentChars}]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi), f.txt.regexen.invalidShortDomain = a(/^#{validDomainName}#{validCCTLD}$/), f.txt.regexen.validPortNumber = a(/[0-9]+/), f.txt.regexen.validGeneralUrlPathChars = a(/[a-z0-9!\*';:=\+,\.\$\/%#\[\]\-_~@|&#{latinAccentChars}]/i), f.txt.regexen.validUrlBalancedParens = a(/\(#{validGeneralUrlPathChars}+\)/i), f.txt.regexen.validUrlPathEndingChars = a(/[\+\-a-z0-9=_#\/#{latinAccentChars}]|(?:#{validUrlBalancedParens})/i), f.txt.regexen.validUrlPath = a("(?:(?:#{validGeneralUrlPathChars}*(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*#{validUrlPathEndingChars})|(?:@#{validGeneralUrlPathChars}+/))", "i"), f.txt.regexen.validUrlQueryChars = /[a-z0-9!?\*'@\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i, f.txt.regexen.validUrlQueryEndingChars = /[a-z0-9_&=#\/]/i, f.txt.regexen.extractUrl = a("((#{validUrlPrecedingChars})((https?:\\/\\/)?(#{validDomain})(?::(#{validPortNumber}))?(\\/#{validUrlPath}*)?(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?))", "gi"), f.txt.regexen.validTcoUrl = /^https?:\/\/t\.co\/[a-z0-9]+/i, f.txt.regexen.urlHasProtocol = /^https?:\/\//i, f.txt.regexen.urlHasHttps = /^https:\/\//i, f.txt.regexen.cashtag = /[a-z]{1,6}(?:[._][a-z]{1,2})?/i, f.txt.regexen.validCashtag = a("(^|#{spaces})(\\$)(#{cashtag})(?=$|\\s|[#{punct}])", "gi"), f.txt.regexen.validateUrlUnreserved = /[a-z0-9\-._~]/i, f.txt.regexen.validateUrlPctEncoded = /(?:%[0-9a-f]{2})/i, f.txt.regexen.validateUrlSubDelims = /[!$&'()*+,;=]/i, f.txt.regexen.validateUrlPchar = a("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|[:|@])", "i"), f.txt.regexen.validateUrlScheme = /(?:[a-z][a-z0-9+\-.]*)/i, f.txt.regexen.validateUrlUserinfo = a("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|:)*", "i"), f.txt.regexen.validateUrlDecOctet = /(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))/i, f.txt.regexen.validateUrlIpv4 = a(/(?:#{validateUrlDecOctet}(?:\.#{validateUrlDecOctet}){3})/i), f.txt.regexen.validateUrlIpv6 = /(?:\[[a-f0-9:\.]+\])/i, f.txt.regexen.validateUrlIp = a("(?:#{validateUrlIpv4}|#{validateUrlIpv6})", "i"), f.txt.regexen.validateUrlSubDomainSegment = /(?:[a-z0-9](?:[a-z0-9_\-]*[a-z0-9])?)/i, f.txt.regexen.validateUrlDomainSegment = /(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)/i, f.txt.regexen.validateUrlDomainTld = /(?:[a-z](?:[a-z0-9\-]*[a-z0-9])?)/i, f.txt.regexen.validateUrlDomain = a(/(?:(?:#{validateUrlSubDomainSegment]}\.)*(?:#{validateUrlDomainSegment]}\.)#{validateUrlDomainTld})/i), f.txt.regexen.validateUrlHost = a("(?:#{validateUrlIp}|#{validateUrlDomain})", "i"), f.txt.regexen.validateUrlUnicodeSubDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9_\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i, f.txt.regexen.validateUrlUnicodeDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i, f.txt.regexen.validateUrlUnicodeDomainTld = /(?:(?:[a-z]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i, f.txt.regexen.validateUrlUnicodeDomain = a(/(?:(?:#{validateUrlUnicodeSubDomainSegment}\.)*(?:#{validateUrlUnicodeDomainSegment}\.)#{validateUrlUnicodeDomainTld})/i), f.txt.regexen.validateUrlUnicodeHost = a("(?:#{validateUrlIp}|#{validateUrlUnicodeDomain})", "i"), f.txt.regexen.validateUrlPort = /[0-9]{1,5}/, f.txt.regexen.validateUrlUnicodeAuthority = a("(?:(#{validateUrlUserinfo})@)?(#{validateUrlUnicodeHost})(?::(#{validateUrlPort}))?", "i"), f.txt.regexen.validateUrlAuthority = a("(?:(#{validateUrlUserinfo})@)?(#{validateUrlHost})(?::(#{validateUrlPort}))?", "i"), f.txt.regexen.validateUrlPath = a(/(\/#{validateUrlPchar}*)*/i), f.txt.regexen.validateUrlQuery = a(/(#{validateUrlPchar}|\/|\?)*/i), f.txt.regexen.validateUrlFragment = a(/(#{validateUrlPchar}|\/|\?)*/i), f.txt.regexen.validateUrlUnencoded = a("^(?:([^:/?#]+):\\/\\/)?([^/?#]*)([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$", "i");
                var m = "tweet-url list-slug",
                    n = "tweet-url username",
                    o = "tweet-url hashtag",
                    p = "tweet-url cashtag",
                    q = {
                        urlClass: !0,
                        listClass: !0,
                        usernameClass: !0,
                        hashtagClass: !0,
                        cashtagClass: !0,
                        usernameUrlBase: !0,
                        listUrlBase: !0,
                        hashtagUrlBase: !0,
                        cashtagUrlBase: !0,
                        usernameUrlBlock: !0,
                        listUrlBlock: !0,
                        hashtagUrlBlock: !0,
                        linkUrlBlock: !0,
                        usernameIncludeSymbol: !0,
                        suppressLists: !0,
                        suppressNoFollow: !0,
                        targetBlank: !0,
                        suppressDataScreenName: !0,
                        urlEntities: !0,
                        symbolTag: !0,
                        textWithSymbolTag: !0,
                        urlTarget: !0,
                        invisibleTagAttrs: !0,
                        linkAttributeBlock: !0,
                        linkTextBlock: !0,
                        htmlEscapeNonEntities: !0
                    },
                    r = {
                        disabled: !0,
                        readonly: !0,
                        multiple: !0,
                        checked: !0
                    };
                f.txt.tagAttrs = function(a) {
                    var b = "";
                    for (var c in a) {
                        var d = a[c];
                        r[c] && (d = d ? c : null), null != d && (b += " " + f.txt.htmlEscape(c) + '="' + f.txt.htmlEscape(d.toString()) + '"')
                    }
                    return b
                }, f.txt.linkToText = function(a, c, d, e) {
                    e.suppressNoFollow || (d.rel = "nofollow"), e.linkAttributeBlock && e.linkAttributeBlock(a, d), e.linkTextBlock && (c = e.linkTextBlock(a, c));
                    var g = {
                        text: c,
                        attr: f.txt.tagAttrs(d)
                    };
                    return b("<a#{attr}>#{text}</a>", g)
                }, f.txt.linkToTextWithSymbol = function(a, b, c, d, e) {
                    var g = e.symbolTag ? "<" + e.symbolTag + ">" + b + "</" + e.symbolTag + ">" : b;
                    c = f.txt.htmlEscape(c);
                    var h = e.textWithSymbolTag ? "<" + e.textWithSymbolTag + ">" + c + "</" + e.textWithSymbolTag + ">" : c;
                    return e.usernameIncludeSymbol || !b.match(f.txt.regexen.atSigns) ? f.txt.linkToText(a, g + h, d, e) : g + f.txt.linkToText(a, h, d, e)
                }, f.txt.linkToHashtag = function(a, b, c) {
                    var e = b.substring(a.indices[0], a.indices[0] + 1),
                        g = f.txt.htmlEscape(a.hashtag),
                        h = d(c.htmlAttrs || {});
                    return h.href = c.hashtagUrlBase + g, h.title = "#" + g, h["class"] = c.hashtagClass, g[0].match(f.txt.regexen.rtl_chars) && (h["class"] += " rtl"), c.targetBlank && (h.target = "_blank"), f.txt.linkToTextWithSymbol(a, e, g, h, c)
                }, f.txt.linkToCashtag = function(a, b, c) {
                    var e = f.txt.htmlEscape(a.cashtag),
                        g = d(c.htmlAttrs || {});
                    return g.href = c.cashtagUrlBase + e, g.title = "$" + e, g["class"] = c.cashtagClass, c.targetBlank && (g.target = "_blank"), f.txt.linkToTextWithSymbol(a, "$", e, g, c)
                }, f.txt.linkToMentionAndList = function(a, b, c) {
                    var e = b.substring(a.indices[0], a.indices[0] + 1),
                        g = f.txt.htmlEscape(a.screenName),
                        h = f.txt.htmlEscape(a.listSlug),
                        i = a.listSlug && !c.suppressLists,
                        j = d(c.htmlAttrs || {});
                    return j["class"] = i ? c.listClass : c.usernameClass, j.href = i ? c.listUrlBase + g + h : c.usernameUrlBase + g, i || c.suppressDataScreenName || (j["data-screen-name"] = g), c.targetBlank && (j.target = "_blank"), f.txt.linkToTextWithSymbol(a, e, i ? g + h : g, j, c)
                }, f.txt.linkToUrl = function(a, b, c) {
                    var e = a.url,
                        g = e,
                        h = f.txt.htmlEscape(g),
                        i = c.urlEntities && c.urlEntities[e] || a;
                    i.display_url && (h = f.txt.linkTextWithEntity(i, c));
                    var j = d(c.htmlAttrs || {});
                    return e.match(f.txt.regexen.urlHasProtocol) || (e = "http://" + e), j.href = e, c.targetBlank && (j.target = "_blank"), c.urlClass && (j["class"] = c.urlClass), c.urlTarget && (j.target = c.urlTarget), !c.title && i.display_url && (j.title = i.expanded_url), f.txt.linkToText(a, h, j, c)
                }, f.txt.linkTextWithEntity = function(a, c) {
                    var d = a.display_url,
                        e = a.expanded_url,
                        g = d.replace(/…/g, "");
                    if (-1 != e.indexOf(g)) {
                        var h = e.indexOf(g),
                            i = {
                                displayUrlSansEllipses: g,
                                beforeDisplayUrl: e.substr(0, h),
                                afterDisplayUrl: e.substr(h + g.length),
                                precedingEllipsis: d.match(/^…/) ? "…" : "",
                                followingEllipsis: d.match(/…$/) ? "…" : ""
                            };
                        for (var j in i) i.hasOwnProperty(j) && (i[j] = f.txt.htmlEscape(i[j]));
                        return i.invisible = c.invisibleTagAttrs, b("<span class='tco-ellipsis'>#{precedingEllipsis}<span #{invisible}>&nbsp;</span></span><span #{invisible}>#{beforeDisplayUrl}</span><span class='js-display-url'>#{displayUrlSansEllipses}</span><span #{invisible}>#{afterDisplayUrl}</span><span class='tco-ellipsis'><span #{invisible}>&nbsp;</span>#{followingEllipsis}</span>", i)
                    }
                    return d
                }, f.txt.autoLinkEntities = function(a, b, c) {
                    c = d(c || {}), c.hashtagClass = c.hashtagClass || o, c.hashtagUrlBase = c.hashtagUrlBase || "https://twitter.com/#!/search?q=%23", c.cashtagClass = c.cashtagClass || p, c.cashtagUrlBase = c.cashtagUrlBase || "https://twitter.com/#!/search?q=%24", c.listClass = c.listClass || m, c.usernameClass = c.usernameClass || n, c.usernameUrlBase = c.usernameUrlBase || "https://twitter.com/", c.listUrlBase = c.listUrlBase || "https://twitter.com/", c.htmlAttrs = f.txt.extractHtmlAttrsFromOptions(c), c.invisibleTagAttrs = c.invisibleTagAttrs || "style='position:absolute;left:-9999px;'";
                    var e, g, h;
                    if (c.urlEntities) {
                        for (e = {}, g = 0, h = c.urlEntities.length; h > g; g++) e[c.urlEntities[g].url] = c.urlEntities[g];
                        c.urlEntities = e
                    }
                    var i = "",
                        j = 0;
                    b.sort(function(a, b) {
                        return a.indices[0] - b.indices[0]
                    });
                    for (var k = c.htmlEscapeNonEntities ? f.txt.htmlEscape : function(a) {
                            return a
                        }, g = 0; g < b.length; g++) {
                        var l = b[g];
                        i += k(a.substring(j, l.indices[0])), l.url ? i += f.txt.linkToUrl(l, a, c) : l.hashtag ? i += f.txt.linkToHashtag(l, a, c) : l.screenName ? i += f.txt.linkToMentionAndList(l, a, c) : l.cashtag && (i += f.txt.linkToCashtag(l, a, c)), j = l.indices[1]
                    }
                    return i += k(a.substring(j, a.length))
                }, f.txt.autoLinkWithJSON = function(a, b, c) {
                    var d = [];
                    for (var e in b) d = d.concat(b[e]);
                    for (var g = 0; g < d.length; g++) entity = d[g], entity.screen_name ? entity.screenName = entity.screen_name : entity.text && (entity.hashtag = entity.text);
                    return f.txt.modifyIndicesFromUnicodeToUTF16(a, d), f.txt.autoLinkEntities(a, d, c)
                }, f.txt.extractHtmlAttrsFromOptions = function(a) {
                    var b = {};
                    for (var c in a) {
                        var d = a[c];
                        q[c] || (r[c] && (d = d ? c : null), null != d && (b[c] = d))
                    }
                    return b
                }, f.txt.autoLink = function(a, b) {
                    var c = f.txt.extractEntitiesWithIndices(a, {
                        extractUrlsWithoutProtocol: !1
                    });
                    return f.txt.autoLinkEntities(a, c, b)
                }, f.txt.autoLinkUsernamesOrLists = function(a, b) {
                    var c = f.txt.extractMentionsOrListsWithIndices(a);
                    return f.txt.autoLinkEntities(a, c, b)
                }, f.txt.autoLinkHashtags = function(a, b) {
                    var c = f.txt.extractHashtagsWithIndices(a);
                    return f.txt.autoLinkEntities(a, c, b)
                }, f.txt.autoLinkCashtags = function(a, b) {
                    var c = f.txt.extractCashtagsWithIndices(a);
                    return f.txt.autoLinkEntities(a, c, b)
                }, f.txt.autoLinkUrlsCustom = function(a, b) {
                    var c = f.txt.extractUrlsWithIndices(a, {
                        extractUrlsWithoutProtocol: !1
                    });
                    return f.txt.autoLinkEntities(a, c, b)
                }, f.txt.removeOverlappingEntities = function(a) {
                    a.sort(function(a, b) {
                        return a.indices[0] - b.indices[0]
                    });
                    for (var b = a[0], c = 1; c < a.length; c++) b.indices[1] > a[c].indices[0] ? (a.splice(c, 1), c--) : b = a[c]
                }, f.txt.extractEntitiesWithIndices = function(a, b) {
                    var c = f.txt.extractUrlsWithIndices(a, b).concat(f.txt.extractMentionsOrListsWithIndices(a)).concat(f.txt.extractHashtagsWithIndices(a, {
                        checkUrlOverlap: !1
                    })).concat(f.txt.extractCashtagsWithIndices(a));
                    return 0 == c.length ? [] : (f.txt.removeOverlappingEntities(c), c)
                }, f.txt.extractMentions = function(a) {
                    for (var b = [], c = f.txt.extractMentionsWithIndices(a), d = 0; d < c.length; d++) {
                        var e = c[d].screenName;
                        b.push(e)
                    }
                    return b
                }, f.txt.extractMentionsWithIndices = function(a) {
                    for (var b, c = [], d = f.txt.extractMentionsOrListsWithIndices(a), e = 0; e < d.length; e++) b = d[e], "" == b.listSlug && c.push({
                        screenName: b.screenName,
                        indices: b.indices
                    });
                    return c
                }, f.txt.extractMentionsOrListsWithIndices = function(a) {
                    if (!a || !a.match(f.txt.regexen.atSigns)) return [];
                    var b = [];
                    return a.replace(f.txt.regexen.validMentionOrList, function(a, c, d, e, g, h, i) {
                        var j = i.slice(h + a.length);
                        if (!j.match(f.txt.regexen.endMentionMatch)) {
                            g = g || "";
                            var k = h + c.length,
                                l = k + e.length + g.length + 1;
                            b.push({
                                screenName: e,
                                listSlug: g,
                                indices: [k, l]
                            })
                        }
                    }), b
                }, f.txt.extractReplies = function(a) {
                    if (!a) return null;
                    var b = a.match(f.txt.regexen.validReply);
                    return !b || RegExp.rightContext.match(f.txt.regexen.endMentionMatch) ? null : b[1]
                }, f.txt.extractUrls = function(a, b) {
                    for (var c = [], d = f.txt.extractUrlsWithIndices(a, b), e = 0; e < d.length; e++) c.push(d[e].url);
                    return c
                }, f.txt.extractUrlsWithIndices = function(a, b) {
                    if (b || (b = {
                            extractUrlsWithoutProtocol: !0
                        }), !a || (b.extractUrlsWithoutProtocol ? !a.match(/\./) : !a.match(/:/))) return [];
                    for (var c = []; f.txt.regexen.extractUrl.exec(a);) {
                        var d = RegExp.$2,
                            e = RegExp.$3,
                            g = RegExp.$4,
                            h = RegExp.$5,
                            i = RegExp.$7,
                            j = f.txt.regexen.extractUrl.lastIndex,
                            k = j - e.length;
                        if (g) e.match(f.txt.regexen.validTcoUrl) && (e = RegExp.lastMatch, j = k + e.length), c.push({
                            url: e,
                            indices: [k, j]
                        });
                        else {
                            if (!b.extractUrlsWithoutProtocol || d.match(f.txt.regexen.invalidUrlWithoutProtocolPrecedingChars)) continue;
                            var l = null,
                                m = !1,
                                n = 0;
                            if (h.replace(f.txt.regexen.validAsciiDomain, function(a) {
                                    var b = h.indexOf(a, n);
                                    n = b + a.length, l = {
                                        url: a,
                                        indices: [k + b, k + n]
                                    }, m = a.match(f.txt.regexen.invalidShortDomain), m || c.push(l)
                                }), null == l) continue;
                            i && (m && c.push(l), l.url = e.replace(h, l.url), l.indices[1] = j)
                        }
                    }
                    return c
                }, f.txt.extractHashtags = function(a) {
                    for (var b = [], c = f.txt.extractHashtagsWithIndices(a), d = 0; d < c.length; d++) b.push(c[d].hashtag);
                    return b
                }, f.txt.extractHashtagsWithIndices = function(a, b) {
                    if (b || (b = {
                            checkUrlOverlap: !0
                        }), !a || !a.match(f.txt.regexen.hashSigns)) return [];
                    var c = [];
                    if (a.replace(f.txt.regexen.validHashtag, function(a, b, d, e, g, h) {
                            var i = h.slice(g + a.length);
                            if (!i.match(f.txt.regexen.endHashtagMatch)) {
                                var j = g + b.length,
                                    k = j + e.length + 1;
                                c.push({
                                    hashtag: e,
                                    indices: [j, k]
                                })
                            }
                        }), b.checkUrlOverlap) {
                        var d = f.txt.extractUrlsWithIndices(a);
                        if (d.length > 0) {
                            var e = c.concat(d);
                            f.txt.removeOverlappingEntities(e), c = [];
                            for (var g = 0; g < e.length; g++) e[g].hashtag && c.push(e[g])
                        }
                    }
                    return c
                }, f.txt.extractCashtags = function(a) {
                    for (var b = [], c = f.txt.extractCashtagsWithIndices(a), d = 0; d < c.length; d++) b.push(c[d].cashtag);
                    return b
                }, f.txt.extractCashtagsWithIndices = function(a) {
                    if (!a || -1 == a.indexOf("$")) return [];
                    var b = [];
                    return a.replace(f.txt.regexen.validCashtag, function(a, c, d, e, f) {
                        var g = f + c.length,
                            h = g + e.length + 1;
                        b.push({
                            cashtag: e,
                            indices: [g, h]
                        })
                    }), b
                }, f.txt.modifyIndicesFromUnicodeToUTF16 = function(a, b) {
                    f.txt.convertUnicodeIndices(a, b, !1)
                }, f.txt.modifyIndicesFromUTF16ToUnicode = function(a, b) {
                    f.txt.convertUnicodeIndices(a, b, !0)
                }, f.txt.getUnicodeTextLength = function(a) {
                    return a.replace(f.txt.regexen.non_bmp_code_pairs, " ").length
                }, f.txt.convertUnicodeIndices = function(a, b, c) {
                    if (0 != b.length) {
                        var d = 0,
                            e = 0;
                        b.sort(function(a, b) {
                            return a.indices[0] - b.indices[0]
                        });
                        for (var f = 0, g = b[0]; d < a.length;) {
                            if (g.indices[0] == (c ? d : e)) {
                                var h = g.indices[1] - g.indices[0];
                                if (g.indices[0] = c ? e : d, g.indices[1] = g.indices[0] + h, f++, f == b.length) break;
                                g = b[f]
                            }
                            var i = a.charCodeAt(d);
                            i >= 55296 && 56319 >= i && d < a.length - 1 && (i = a.charCodeAt(d + 1), i >= 56320 && 57343 >= i && d++), e++, d++
                        }
                    }
                }, f.txt.splitTags = function(a) {
                    for (var b, c, d = a.split("<"), e = [], f = 0; f < d.length; f += 1)
                        if (c = d[f]) {
                            b = c.split(">");
                            for (var g = 0; g < b.length; g += 1) e.push(b[g])
                        } else e.push("");
                    return e
                }, f.txt.hitHighlight = function(a, b, c) {
                    var d = "em";
                    if (b = b || [], c = c || {}, 0 === b.length) return a;
                    var e, g, h, i, j, k, l, m = c.tag || d,
                        n = ["<" + m + ">", "</" + m + ">"],
                        o = f.txt.splitTags(a),
                        p = "",
                        q = 0,
                        r = o[0],
                        s = 0,
                        t = 0,
                        u = !1,
                        v = r,
                        w = [];
                    for (e = 0; e < b.length; e += 1)
                        for (g = 0; g < b[e].length; g += 1) w.push(b[e][g]);
                    for (h = 0; h < w.length; h += 1) {
                        for (i = w[h], j = n[h % 2], k = !1; null != r && i >= s + r.length;) p += v.slice(t), u && i === s + v.length && (p += j, k = !0), o[q + 1] && (p += "<" + o[q + 1] + ">"), s += v.length, t = 0, q += 2, r = o[q], v = r, u = !1;
                        k || null == r ? k || (k = !0, p += j) : (l = i - s, p += v.slice(t, l) + j, t = l, u = h % 2 === 0 ? !0 : !1)
                    }
                    if (null != r)
                        for (t < v.length && (p += v.slice(t)), h = q + 1; h < o.length; h += 1) p += h % 2 === 0 ? o[h] : "<" + o[h] + ">";
                    return p
                };
                var s = 140,
                    t = [h(65534), h(65279), h(65535), h(8234), h(8235), h(8236), h(8237), h(8238)];
                f.txt.getTweetLength = function(a, b) {
                    b || (b = {
                        short_url_length: 22,
                        short_url_length_https: 23
                    });
                    var c = f.txt.getUnicodeTextLength(a),
                        d = f.txt.extractUrlsWithIndices(a);
                    f.txt.modifyIndicesFromUTF16ToUnicode(a, d);
                    for (var e = 0; e < d.length; e++) c += d[e].indices[0] - d[e].indices[1], c += d[e].url.toLowerCase().match(f.txt.regexen.urlHasHttps) ? b.short_url_length_https : b.short_url_length;
                    return c
                }, f.txt.isInvalidTweet = function(a) {
                    if (!a) return "empty";
                    if (f.txt.getTweetLength(a) > s) return "too_long";
                    for (var b = 0; b < t.length; b++)
                        if (a.indexOf(t[b]) >= 0) return "invalid_characters";
                    return !1
                }, f.txt.isValidTweetText = function(a) {
                    return !f.txt.isInvalidTweet(a)
                }, f.txt.isValidUsername = function(a) {
                    if (!a) return !1;
                    var b = f.txt.extractMentions(a);
                    return 1 === b.length && b[0] === a.slice(1)
                };
                var u = a(/^#{validMentionOrList}$/);
                if (f.txt.isValidList = function(a) {
                        var b = a.match(u);
                        return !(!b || "" != b[1] || !b[4])
                    }, f.txt.isValidHashtag = function(a) {
                        if (!a) return !1;
                        var b = f.txt.extractHashtags(a);
                        return 1 === b.length && b[0] === a.slice(1)
                    }, f.txt.isValidUrl = function(a, b, c) {
                        if (null == b && (b = !0), null == c && (c = !0), !a) return !1;
                        var d = a.match(f.txt.regexen.validateUrlUnencoded);
                        if (!d || d[0] !== a) return !1;
                        var g = d[1],
                            h = d[2],
                            i = d[3],
                            j = d[4],
                            k = d[5];
                        return (!c || e(g, f.txt.regexen.validateUrlScheme) && g.match(/^https?$/i)) && e(i, f.txt.regexen.validateUrlPath) && e(j, f.txt.regexen.validateUrlQuery, !0) && e(k, f.txt.regexen.validateUrlFragment, !0) ? b && e(h, f.txt.regexen.validateUrlUnicodeAuthority) || !b && e(h, f.txt.regexen.validateUrlAuthority) : !1
                    }, "undefined" != typeof module && module.exports && (module.exports = f.txt), "undefined" != typeof window)
                    if (window.twttr)
                        for (var v in f) window.twttr[v] = f[v];
                    else window.twttr = f
            }(), define("bower_components/twitter-text/twitter-text", function() {}), define("aura-extensions/aura-twitter-text", ["bower_components/twitter-text/twitter-text"], function() {
                return {
                    initialize: function(a) {
                        a.sandbox.util.twttr = window.twttr.txt
                    }
                }
            }), define("aura-extensions/aura-uuid", [], function() {
                return function(a) {
                    var b = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
                    a.core.util.uuid = function(a, c) {
                        var d, e = b,
                            f = [];
                        if (c = c || e.length, a)
                            for (d = 0; a > d; d++) f[d] = e[0 | Math.random() * c];
                        else {
                            var g;
                            for (f[8] = f[13] = f[18] = f[23] = "-", f[14] = "4", d = 0; 36 > d; d++) f[d] || (g = 0 | 16 * Math.random(), f[d] = e[19 == d ? 3 & g | 8 : g])
                        }
                        return f.join("")
                    }, a.core.util.uuidFast = function() {
                        for (var a, c = b, d = new Array(36), e = 0, f = 0; 36 > f; f++) 8 == f || 13 == f || 18 == f || 23 == f ? d[f] = "-" : 14 == f ? d[f] = "4" : (2 >= e && (e = 33554432 + 16777216 * Math.random() | 0), a = 15 & e, e >>= 4, d[f] = c[19 == f ? 3 & a | 8 : a]);
                        return d.join("")
                    }, a.core.util.uuidCompact = function() {
                        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                            var b = 16 * Math.random() | 0,
                                c = "x" == a ? b : 3 & b | 8;
                            return c.toString(16)
                        })
                    }
                }
            }), define("aura-extensions/hull-component-normalize-id", [], function() {
                var a = {
                    initialize: function(b) {
                        var c = b.core.util._;
                        b.components.before("initialize", function(b) {
                            var d = a.normalizeId.call(this, b);
                            this.options = c.extend(this.options, d)
                        })
                    },
                    normalizeId: function(a) {
                        var b = this.sandbox,
                            c = "entity:";
                        return a.id ? (null !== a.id.match("^" + c) && (a.id = b.util.entity.encode(a.id.slice(c.length))), a) : a.uid ? (a.id = b.util.entity.encode(a.uid), a) : (a.id = b.config.entity_id, a)
                    }
                };
                return a
            }), define("aura-extensions/hull-component-reporting", ["underscore", "lib/api/reporting"], function(a, b) {
                var c = {
                    setup: function() {
                        this.track = function(b, c) {
                            var d;
                            return null == c && (c = {}), d = a.result(this, "trackingData"), d = a.isObject(d) ? d : {}, c = a.extend({
                                id: this.id,
                                component: this.options.name
                            }, d, c), this.sandbox.track(b, c)
                        }
                    },
                    initialize: function(a) {
                        var d = b.init(a.core.data.hullApi),
                            e = a.sandbox;
                        return e.track = function(a, b) {
                            return d.track(a, b)
                        }, e.flag = function(a) {
                            return d.flag(a)
                        }, a.components.before("initialize", c.setup)
                    }
                };
                return c
            }), define("aura-extensions/hull-entities", ["lib/utils/entity"], function(a) {
                parseQueryString = function(a) {
                    var b;
                    return a || (a = window.location.search), b = {}, a.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function(a, c, d, e) {
                        return b[c] = decodeURIComponent(e)
                    }), b
                };
                var b = {
                    initialize: function(b) {
                        b.core.util.entity = a;
                        var c = b.core.util._;
                        b.config.withEntity === !0 && (og = core.dom.find('meta[property="og:url"]'), og && og.length && og.attr("content") ? uid = og.attr("content") : (loc = document.location, search = parseQueryString(loc.search), qs = c.map(c.keys(search).sort(), function(a) {
                            return [a, search[a]].join("=")
                        }).join("&"), qs.length > 0 && (qs = "?" + qs), uid = [loc.origin, loc.pathname, qs].join("")), b.config.uid = a.encode(uid))
                    }
                };
                return b
            }), define("aura-extensions/hull-helpers", [], function() {
                var a = {
                    initialize: function(a) {
                        var b = a.core.util._;
                        imageUrl = function(c, d, e) {
                            return null == d && (d = "small"), null == e && (e = ""), b.isFunction(c) && (c = c()), c ? (c = c.replace(/\/(large|small|medium|thumb)$/, ""), b.isString(d) || (d = "small"), "//" + a.config.assetsUrl + "/img/" + c + "/" + d) : e
                        }, a.sandbox.helpers = a.sandbox.helpers || {}, a.sandbox.helpers.imageUrl = imageUrl
                    }
                };
                return a
            }), define("aura-extensions/hull-reporting", ["lib/api/reporting"], function(a) {
                return {
                    initialize: function(b) {
                        b.core.reporting = a
                    }
                }
            }), define("aura-extensions/hull-utils", [], function() {
                return {
                    require: {
                        paths: {
                            string: "bower_components/underscore.string/lib/underscore.string"
                        },
                        shim: {
                            string: {
                                deps: ["underscore"]
                            }
                        }
                    },
                    initialize: function(a) {
                        a.core.util._;
                        a.sandbox.utils = a.sandbox.utils || {}
                    }
                }
            }),
            function() {
                define("lib/client/component/actions", ["underscore"], function(a) {
                    var b, c;
                    return b = function(a) {
                        return a.replace(/(?:^|[-_])(\w)/g, function(a, b) {
                            return b && b.toUpperCase() || ""
                        })
                    }, c = {
                        initialize: function(a) {
                            return a.components.before("initialize", c.registerActions)
                        },
                        defaultActions: ["login", "logout", "linkIdentity", "unlinkIdentity"],
                        selectAction: function(b, c) {
                            var d;
                            if (d = c.actions[b] || c["" + b + "Action"], a.isString(d) && (d = c[d]), !a.isFunction(d)) throw new Error("Can't find action " + b + " on this component");
                            return d
                        },
                        formatActionData: function(a) {
                            var c, d, e, f;
                            c = {}, f = function() {
                                var a;
                                return a = d.replace(/^hull(-)?/, ""), a = b(a), a = a.charAt(0).toLowerCase() + a.slice(1), c[a] = e
                            };
                            for (d in a) e = a[d], f();
                            return c
                        },
                        actionHandler: function(a) {
                            var b, d, e, f;
                            f = this.sandbox.dom.find(a.currentTarget), b = f.data("hull-action"), d = c.formatActionData(f.data());
                            try {
                                return e = c.selectAction(b, this), e.call(this, a, {
                                    el: f,
                                    data: d
                                })
                            } catch (g) {
                                return console.error("Error in action handler: ", b, g.message, g)
                            } finally {
                                a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation()
                            }
                        },
                        registerActions: function() {
                            var b, d;
                            return b = a.isFunction(this.events) ? this.events() : this.events, this.events = a.defaults({
                                "click [data-hull-action]": a.bind(c.actionHandler, this)
                            }, b), this.actions = a.isFunction(this.actions) ? this.actions() : this.actions, null == (d = this.actions) && (this.actions = {}), a.each(c.defaultActions, function(a) {
                                var b, c, d = this;
                                return null != (c = (b = this.actions)[a]) ? c : b[a] = function(b, c) {
                                    return d.sandbox[a](c.data.provider, c.data)
                                }
                            }, this)
                        }
                    }
                })
            }.call(this),
            function() {
                var a = [].slice;
                define("lib/client/component/api", ["underscore", "lib/utils/promises"], function(b, c) {
                    var d, e, f, g, h;
                    return h = Array.prototype.slice, e = {}, d = function() {
                        return e = b.pick(e, "me", "app", "org")
                    }, g = null, f = {
                        initialize: function(d) {
                            var f, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E;
                            for (n = d.core, u = d.sandbox, q = n.data.hullApi, E = function(a, b) {
                                    var c, d, e, f, g;
                                    if (null == b && (b = {}), null != b) {
                                        if (e = b["Hull-Track"]) try {
                                            g = JSON.parse(atob(e)), d = g[0], f = g[1], n.mediator.emit(d, f)
                                        } catch (h) {
                                            console.warn("Error", h)
                                        }
                                        if (b["Hull-Auth-Scope"]) return c = b["Hull-Auth-Scope"].split(":")[0]
                                    }
                                }, n.data.api = function() {
                                    var b, c;
                                    return b = 1 <= arguments.length ? a.call(arguments, 0) : [], c = q.api.apply(q, b), c.then(E), c
                                }, b.each(["get", "put", "post", "delete"], function(b) {
                                    return n.data.api[b] = function() {
                                        var c, d, e;
                                        return c = 1 <= arguments.length ? a.call(arguments, 0) : [], d = (e = q.api)[b].apply(e, c), d.then(E), d
                                    }
                                }), s = {
                                    create: "post",
                                    update: "put",
                                    "delete": "delete",
                                    read: "get"
                                }, x = function(a, c, d) {
                                    var e, f, g, h;
                                    return null == d && (d = {}), g = b.isFunction(c.url) ? c.url() : c.url, h = s[a], e = d.data, null != e || !c || "create" !== a && "update" !== a && "patch" !== a || (e = d.attrs || c.toJSON(d)), f = n.data.api(g, h, e), f.then(d.success), f.then(function(a) {
                                        return c.trigger("sync", c, a, d)
                                    }), f.fail(d.error), f.fail(function(a) {
                                        return c.trigger("error", c, a, d)
                                    }), f
                                }, f = n.mvc.Model.extend({
                                    sync: x
                                }), k = f.extend({
                                    url: function() {
                                        return this._id || this.id
                                    }
                                }), j = f.extend({
                                    url: function() {
                                        var a, b;
                                        return a = this.id || this._id ? this._id || this.id : null != (b = this.collection) ? b.url : void 0
                                    }
                                }), i = n.mvc.Collection.extend({
                                    model: j,
                                    sync: x
                                }), w = function(a, b) {
                                    var c;
                                    return c = p(a, b), c.on("change", function() {
                                        var a, b, d;
                                        return a = h.call(arguments), b = "model.hull." + c._id + ".change", n.mediator.emit(b, {
                                            eventName: b,
                                            model: c,
                                            changes: null != (d = a[1]) ? d.changes : void 0
                                        })
                                    }), c.on("sync", function() {
                                        return "me" === c._id ? n.mediator.emit("hull.auth.update", c.attributes) : void 0
                                    }), c._id = a._id, e[a._id] = c, c
                                }, n.data.api.model = function(a) {
                                    return g(a, !1)
                                }, g = function(a, c) {
                                    if (null == c && (c = !1), b.isString(a) && (a = {
                                            _id: a
                                        }), a._id || (a._id = a.path), null == (null != a ? a._id : void 0)) throw new Error("A model must have an identifier...");
                                    return e[a._id] || w(a, c)
                                }, p = function(a, b) {
                                    var c, d;
                                    return d = b ? k : j, c = a.id || a._id ? new d(a) : new d
                                }, v = function(a) {
                                    var b, d, e;
                                    return e = n.data.api.parseRoute([a])[0], b = new i, b.url = a, b.on("all", function() {
                                        var a, c, d;
                                        return a = h.call(arguments), c = "collection." + e.path.replace(/\//g, ".") + "." + a[0], n.mediator.emit(c, {
                                            eventName: c,
                                            collection: b,
                                            changes: null != (d = a[1]) ? d.changes : void 0
                                        })
                                    }), d = b.deferred = c.deferred(), b.models.length > 0 ? (b._fetched = !0, d.resolve(b)) : (b._fetched = !1, b.fetch({
                                        success: function() {
                                            return b._fetched = !0, d.resolve(b)
                                        },
                                        error: function() {
                                            return d.fail(b)
                                        }
                                    })), b
                                }, n.data.api.collection = function(a) {
                                    if (null == a) throw new Error("A model must have an path...");
                                    return v.call(n.data.api, a)
                                }, u = d.sandbox, m = q.authScope, t = q.remoteConfig, o = t.data, d.config.assetsUrl = t.assetsUrl, d.config.services = t.settings, d.components.addSource("hull", t.baseUrl + "/aura_components"), null == (A = u.config) && (u.config = {}), u.config.debug = d.config.debug, u.config.assetsUrl = t.assetsUrl, u.config.appId = d.config.appId, u.config.orgUrl = d.config.orgUrl, u.config.services = t.settings, u.config.entity_id = null != (B = o.entity) ? B.id : void 0, u.isAdmin = function() {
                                    return "Account" === m || u.data.api.model("me").get("is_admin")
                                }, u.login = q.login, u.logout = q.logout, u.linkIdentity = function(a, b, c) {
                                    return null == b && (b = {}), null == c && (c = function() {}), b.mode = "connect", u.login(a, b, c)
                                }, u.unlinkIdentity = function(a, b) {
                                    return null == b && (b = function() {}), n.data.api("me/identities/" + a, "delete").then(function() {
                                        var a;
                                        return a = d.sandbox.data.api.model("me").fetch(), a.then(function(a) {
                                            return n.mediator.emit("hull.auth.login", a)
                                        }), a.then(b)
                                    })
                                }, C = ["me", "app", "org", "entity"], D = [], y = 0, z = C.length; z > y; y++) r = C[y], l = o[r], l ? (l._id = r, D.push(g(l, !0))) : D.push(void 0);
                            return D
                        },
                        afterAppStart: function(a) {
                            var b;
                            return b = a.core, b.mediator.on("hull.auth.*", d)
                        }
                    }
                })
            }.call(this),
            function() {
                define("lib/client/component/context", ["underscore", "lib/utils/promises"], function(a, b) {
                    var c, d, e;
                    return d = function(a, b) {
                        return console.log("An error occurred with datasource " + a, b)
                    }, e = b.deferred, c = function() {
                        function b() {
                            this._context = {}, this._errors = {}
                        }
                        return b.prototype.add = function(a, b) {
                            return this._context[a] = b
                        }, b.prototype.addDatasource = function(b, c, f) {
                            var g, h = this;
                            return a.isFunction(f) || (f = a.bind(d, void 0, b)), g = e(), c.then(function(c) {
                                return a.isFunction(null != c ? c.toJSON : void 0) ? h.add(b, c.toJSON()) : a.isArray(c) && "success" === c[1] && 200 === c[2].status ? h.add(b, c[0]) : h.add(b, c), g.resolve(c)
                            }, function(a) {
                                var c;
                                return h._errors[b] = a, c = f(a), h.add(b, c), g.resolve(c)
                            }), g.promise
                        }, b.prototype.errors = function() {
                            var b;
                            return b = a.keys(this._errors).length, b ? this._errors : null
                        }, b.prototype.build = function() {
                            return this._context
                        }, b
                    }()
                })
            }.call(this),
            function() {
                var a = function(a, b) {
                        return function() {
                            return a.apply(b, arguments)
                        }
                    },
                    b = {}.hasOwnProperty,
                    c = function(a, c) {
                        function d() {
                            this.constructor = a
                        }
                        for (var e in c) b.call(c, e) && (a[e] = c[e]);
                        return d.prototype = c.prototype, a.prototype = new d, a.__super__ = c.prototype, a
                    };
                define("lib/client/component/component", ["underscore", "lib/client/component/context"], function(b, d) {
                    return function(e) {
                        var f, g, h, i;
                        return i = function(a, c) {
                            var d, f = this;
                            return d = e.core.data.deferred(), this.invokeWithCallbacks("beforeRender", c.build(), c.errors()).then(function(e) {
                                return a = b.extend({}, f.data, e || c.build(), a), d.resolve(a)
                            }, function(a) {
                                return console.error(a), d.reject(a)
                            }), d.promise()
                        }, g = !1, f = function(e) {
                            function f(c) {
                                this.render = a(this.render, this), this.afterRender = a(this.afterRender, this), this.doRender = a(this.doRender, this), this.getTemplate = a(this.getTemplate, this), this.loggedIn = a(this.loggedIn, this), this.buildContext = a(this.buildContext, this), this.log = a(this.log, this), this.renderTemplate = a(this.renderTemplate, this);
                                var d, e, f, g, h;
                                this.ref = c.ref, this.api = this.sandbox.data.api, null == (f = this.refresh) && (this.refresh = b.throttle(function() {
                                    return this.invokeWithCallbacks("render")
                                }, 200)), this.componentName = c.name, g = this.options;
                                for (d in g) e = g[d], null == (h = c[d]) && (c[d] = e);
                                null == this.className && (this.className = "hull-component", null != this.namespace && (this.className += " hull-" + this.namespace)), this.cid = b.uniqueId("view"), this._configure(c || {}), this._ensureElement(), this.invokeWithCallbacks("initialize", c).then(b.bind(function() {
                                    var a, b, c, d, e, f = this;
                                    for (this.delegateEvents(), this.invokeWithCallbacks("render"), this.sandbox.on("hull.settings.update", function(a) {
                                            return f.sandbox.config.services = a
                                        }), d = this.refreshEvents || [], e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(this.sandbox.on(a, function() {
                                        return f.refresh()
                                    }, this));
                                    return e
                                }, this), function(a) {
                                    return console.warn("WARNING", a)
                                })
                            }
                            return c(f, e), f.prototype.initialize = function() {}, f.prototype.isInitialized = !1, f.prototype.options = {}, f.prototype.renderTemplate = function(a, c) {
                                var d, e;
                                return e = null != (d = this._templates) ? d[a] : void 0, e ? e(c || this, {
                                    helpers: b.extend({}, this.helpers)
                                }) : "Cannot find template '" + a + "'"
                            }, f.prototype.authServices = function() {
                                return this.sandbox.util._.reject(this.sandbox.util._.keys(this.sandbox.config.services.auth || {}), function(a) {
                                    return "hull" === a
                                })
                            }, f.prototype.beforeRender = function(a) {
                                return a
                            }, f.prototype.renderError = function() {}, f.prototype.log = function(a) {
                                return this.options.debug ? console.warn(this.options.name, ":", this.options.id, a) : console.warn("[DEBUG] " + this.options.name, a, this)
                            }, f.prototype.buildContext = function(a) {
                                var b;
                                return null == (b = this._renderCount) && (this._renderCount = 0), a.add("options", this.options), a.add("loggedIn", this.loggedIn()), a.add("isAdmin", this.sandbox.isAdmin()), a.add("debug", this.sandbox.config.debug), a.add("renderCount", ++this._renderCount), a
                            }, f.prototype.loggedIn = function() {
                                var a, c, d;
                                return null == this.sandbox.data.api.model("me").get("id") ? !1 : (a = {}, c = this.sandbox.data.api.model("me"), b.map(c.get("identities"), function(b) {
                                    return a[b.provider] = b
                                }), "email" === c.get("main_identity") && null == (d = a.email) && (a.email = {}), a)
                            }, f.prototype.getTemplate = function(a) {
                                var b;
                                return a || this.template || (null != (b = this.templates) ? b[0] : void 0)
                            }, f.prototype.doRender = function(a, b) {
                                var c, d;
                                return d = this.getTemplate(a, b), c = this.renderTemplate(d, b), this.$el.addClass(this.className), g && (c = "<!-- START " + d + " RenderCount: " + this._renderCount + " -->" + c + "<!-- END " + d + "-->"), this.$el.html(c), this
                            }, f.prototype.afterRender = function(a) {
                                return a
                            }, f.prototype.render = function(a, c) {
                                var e, f = this;
                                return e = new d, this.invokeWithCallbacks("buildContext", e).then(function() {
                                    return i.call(f, c, e).then(function(c) {
                                        return f.invokeWithCallbacks("doRender", a, c), b.defer(function() {
                                            return f.afterRender.call(f, c)
                                        }), b.defer(function() {
                                            return f.sandbox.start(f.$el, {
                                                reset: !0
                                            })
                                        }), f.isInitialized = !0, f.emitLifecycleEvent("render")
                                    }, function(a) {
                                        return console.error(a.message), f.renderError(a)
                                    })
                                })
                            }, f.prototype.emitLifecycleEvent = function(a) {
                                return this.sandbox.emit("hull." + this.componentName.replace("/", ".") + "." + a, {
                                    cid: this.cid
                                })
                            }, f
                        }(e.core.mvc.View), h = {
                            initialize: function(a) {
                                return g = a.config.debug, a.components.addType("Hull", f.prototype)
                            }
                        }
                    }
                })
            }.call(this),
            function() {
                define("lib/client/datasource", ["lib/utils/promises", "underscore", "backbone"], function(a, b, c) {
                    var d, e, f, g;
                    return e = function(a) {
                        var b;
                        return b = {}, null != a && a.replace(/<([^>]*)>;\s*rel="([\w]*)\"/g, function(a, c, d) {
                            return b[d] = c
                        }), b
                    }, f = function(a) {
                        var b;
                        return a = a.split("?")[1] || a, b = {}, a.replace(/([^?&=]+)(=([^&]*))?/g, function(a, c, d, e) {
                            return null != e ? b[c] = e : void 0
                        }), b
                    }, g = function(a, c) {
                        var d, e, f, g, h;
                        if (e = a.match(/(\:[a-zA-Z0-9-_]+)/g), !e) return a;
                        for (f = 0, h = e.length; h > f; f++) {
                            if (d = e[f], g = d.slice(1), !b.has(c, g)) throw new Error("Cannot resolve datasource binding " + d);
                            a = a.replace(d, c[g])
                        }
                        return a
                    }, d = function() {
                        function d(a, d) {
                            var e, g, h;
                            if (a instanceof c.Model || a instanceof c.Collection) return void(this.def = a);
                            if (this.transport = d, g = new TypeError("Datasource is missing its definition. Cannot continue."), h = new TypeError("Datasource is missing a transport. Cannot continue."), !a) throw g;
                            if (!this.transport) throw h;
                            if (b.isString(a)) a = {
                                path: a,
                                provider: "hull"
                            };
                            else if (b.isObject(a) && !b.isFunction(a)) {
                                if (!a.path) throw g;
                                a.provider = a.provider || "hull"
                            }
                            b.isFunction(a) || (e = a.params || {}, a.params = b.extend(f(a.path), e), a.path = a.path.split("?")[0]), this.def = a
                        }
                        return d.prototype.parse = function(a) {
                            return this.def instanceof c.Model || this.def instanceof c.Collection || (b.isFunction(this.def) || (this.def.path = g(this.def.path, a)), b.isFunction(this.def)) ? void 0 : this.def.provider = g(this.def.provider, a)
                        }, d.prototype.fetch = function() {
                            var d, f, g, h = this;
                            if (d = a.deferred(), this.def instanceof c.Model || this.def instanceof c.Collection) d.resolve(this.def);
                            else if (b.isFunction(this.def)) {
                                if (f = this.def.call(), null != f ? f.promise : void 0) return a.when(f);
                                d.resolve(f)
                            } else {
                                if (/undefined/.test(this.def.path)) return d.resolve(!1), d.promise;
                                g = this.transport(this.def), g.then(function(a, f) {
                                    return b.isArray(a) ? ((null != f ? f.Link : void 0) && (h.paginationLinks = e(f.Link)), d.resolve(new c.Collection(a))) : d.resolve(new c.Model(a))
                                }, function(a) {
                                    return d.reject(a)
                                })
                            }
                            return d.promise
                        }, d.prototype.isPaginable = function() {
                            return null != this.paginationLinks
                        }, d.prototype.isFirst = function() {
                            var a;
                            return !(null != (a = this.paginationLinks) ? a.first : void 0)
                        }, d.prototype.isLast = function() {
                            var a;
                            return !(null != (a = this.paginationLinks) ? a.last : void 0)
                        }, d.prototype.previous = function() {
                            return this.isFirst() ? void 0 : b.extend(this.def.params, f(this.paginationLinks.prev))
                        }, d.prototype.next = function() {
                            return this.isLast() ? void 0 : b.extend(this.def.params, f(this.paginationLinks.next))
                        }, d.prototype.sort = function(a, b) {
                            return null == b && (b = "ASC"), this.def.params.order_by = a + " " + b
                        }, d.prototype.where = function(a, c) {
                            return null == c && (c = !1), c && (a = b.extend(this.def.params.where, a)), this.def.params.where = a, this.def.params.page = 1
                        }, d
                    }()
                })
            }.call(this),
            function() {
                define("lib/utils/q2jQuery", ["jquery"], function(a) {
                    return function(b) {
                        var c;
                        return c = a.Deferred(), b.then(c.resolve, c.reject), c.promise()
                    }
                })
            }.call(this),
            function() {
                define("lib/client/component/datasource", ["lib/client/datasource", "underscore", "lib/utils/promises", "lib/utils/q2jQuery", "string"], function(a, b, c, d) {
                    var e;
                    return e = {
                        datasourceModel: a,
                        getDatasourceErrorHandler: function(a, c) {
                            var d;
                            return d = c["on" + b.string.capitalize(b.string.camelize(a)) + "Error"], b.isFunction(d) || (d = e.defaultErrorHandler), b.bind(d, c, a)
                        },
                        defaultErrorHandler: function(a, b) {
                            return console.warn("An error occurred with datasource " + a, b.status, b.statusText)
                        },
                        addDatasources: function(a) {
                            var c, d = this;
                            return null == a && (a = {}), c = b.map(a, function(a) {
                                return b.isFunction(a) && (a = b.bind(a, d)), a instanceof e.datasourceModel || (a = new e.datasourceModel(a, d.api)), a
                            }), this.datasources = b.object(b.keys(a), c)
                        },
                        fetchDatasources: function() {
                            var a, f, g, h = this;
                            return a = [].pop.apply(arguments), null == (g = this.data) && (this.data = {}), f = b.map(this.datasources, function(d, f) {
                                var g, i;
                                return d.parse(b.extend({}, h, h.options || {})), i = e.getDatasourceErrorHandler(f, h), g = d.fetch(), c.when(g, function(a) {
                                    return h.data[f] = a
                                }), a.addDatasource(f, g, i)
                            }), d(c.all(f))
                        },
                        initialize: function(a) {
                            var c;
                            return c = {
                                me: new e.datasourceModel(a.core.data.api.model("me")),
                                app: new e.datasourceModel(a.core.data.api.model("app")),
                                org: new e.datasourceModel(a.core.data.api.model("org"))
                            }, a.components.before("initialize", function(a) {
                                var d;
                                return d = b.extend({}, c, this.datasources, a.datasources), e.addDatasources.call(this, d)
                            }), a.components.after("buildContext", e.fetchDatasources)
                        }
                    }
                })
            }.call(this),
            function() {
                var a = {}.hasOwnProperty;
                define("lib/utils/handlebars-helpers", ["underscore", "moment"], function(b, c) {
                    var d;
                    return d = (new Date).getTime(),
                        function(e) {
                            var f;
                            return f = {}, f.or = function(a, b) {
                                return a || b
                            }, f.imageUrl = function(a, c, d) {
                                return null == c && (c = "small"), null == d && (d = ""), b.isFunction(a) && (a = a()), a ? (a = a.replace(/\/(large|small|medium|thumb)$/, ""), b.isString(c) || (c = "small"), "//" + e.config.assetsUrl + "/img/" + a + "/" + c) : d
                            }, f.fromNow = function(a) {
                                return null != a ? c(a).fromNow() : void 0
                            }, f.autoLink = function(a) {
                                return null != a ? twttr.txt.autoLink(a) : void 0
                            }, f.formatTime = function(a, b) {
                                return c(a).format(b)
                            }, f.json = function(a, b) {
                                return b ? JSON.stringify(a, null, 2) : JSON.stringify(a)
                            }, f.key_value = function(b, c) {
                                var d, e;
                                return function() {
                                    var f;
                                    f = [];
                                    for (d in b) a.call(b, d) && (e = b[d], f.push(c.fn({
                                        key: d,
                                        value: e
                                    })));
                                    return f
                                }().join("")
                            }, f.seq = function(a) {
                                return null == a && (a = "seq"), "" + a + "-" + d++
                            }, f.camelize = function(a) {
                                return b.str.camelize(a)
                            }, f.underscore = function(a) {
                                return b.str.underscored(a)
                            }, f.humanize = function(a) {
                                return b.str.humanize(a)
                            }, f.pluralize = function(a, b, c) {
                                return 1 >= a ? b : c
                            }, f.capitalize = function(a) {
                                return b.str.capitalize(a)
                            }, f.dasherize = function(a) {
                                return b.str.dasherize(a)
                            }, f.titlelize = function(a) {
                                return b.str.titlelize(a)
                            }, f.classify = function(a) {
                                return b.str.classify(a)
                            }, f.trim = function(a) {
                                return b.str.trim(a)
                            }, f.ifEqual = function(a, c, d) {
                                return a === c ? d.fn(this) : b.isFunction(d.inverse) ? d.inverse(this) : void 0
                            }, f.eachWithIndex = function(a, b) {
                                var c, d, e, f, g, h;
                                for (c = [], e = g = 0, h = a.length; h > g; e = ++g) d = a[e], f = d, f.index = e, c.push(b(f));
                                return c.join("")
                            }, f.join = function(a, c) {
                                var d, e, f;
                                return c && b.isFunction(c.fn) && (a = b.map(a, function(a) {
                                    return c.fn(a)
                                })), f = c.hash.sep || ", ", c.hash.lastSep && a.length > 1 && (d = a.splice(-1)), e = a.join(f), d && (e += c.hash.lastSep + d), e
                            }, f.debug = function(a) {
                                return console.log("Current Context"), console.log("===================="), console.log(this), a ? (console.log("Value"), console.log("===================="), console.log(a)) : void 0
                            }, f.outputIf = function(a, b, c, d) {
                                return null == c && (c = ""), null == d && (d = ""), a === b ? c : d
                            }, f.fallback = function(a, b) {
                                return a ? a : b
                            }, f.activity = function(a, b) {
                                var c, d, e, f, g, h, i;
                                return null == b || null == a ? "" : (f = b.verb, e = null != (g = b.object) ? g.type : void 0, null == e || null == f ? "" : (d = null != (h = a[f]) ? h[e] : void 0, null != d ? d : (c = a.fallback, null == c ? "" : (e = ("entity" === e && null != (i = b.object) ? i.uid : void 0) || c.object[e] || b.object.name || b.object.description, (c.verb[f] || f) + " " + e))))
                            }, f.to_s = function(a) {
                                return null == a ? "" : a.name || a.title || a.uid || a.description || a
                            }, f.prune = function(a, c, d) {
                                return b.str.prune(a, c, d)
                            }, f.truncate = function(a, c, d) {
                                return b.str.truncate(a, c, d)
                            }, f
                        }
                })
            }.call(this),
            function() {
                var a = [].slice;
                define("lib/client/component/templates", ["underscore", "lib/utils/handlebars", "lib/utils/handlebars-helpers", "lib/utils/promises", "lib/utils/q2jQuery", "require"], function(b, c, d, e, f, g) {
                    var h, i, j, k, l, m, n, o, p, q;
                    return n = {
                        app: ["hullGlobal", "meteor", "sprockets", "hullDefault"],
                        dom: ["inner", "global"],
                        server: ["require"]
                    }, m = function(a, d, e, f) {
                        var g;
                        return g = b.isFunction(a) ? e ? a : c.template(a, f) : c.compile(a), c.registerPartial(d, g), g
                    }, p = function(a) {
                        var b, c;
                        if (a.length) return c = a.get(0), b = l.domFind(c), b.text() || b.html() || c.innerHTML
                    }, o = {
                        dom: {
                            inner: function(a, b, c) {
                                var d;
                                return d = l.domFind(a, c), p(d)
                            },
                            global: function(a) {
                                var b;
                                return b = l.domFind(a, document), p(b)
                            }
                        },
                        app: {
                            hullGlobal: function(a) {
                                var b;
                                return (null != (b = l.global.Hull.templates) ? b[a] : void 0) ? [l.global.Hull.templates["" + a], a, !1] : void 0
                            },
                            meteor: function(a) {
                                var b;
                                return null != l.global.Meteor && null != (null != (b = l.global.Template) ? b[a] : void 0) ? [l.global.Template[a], a, !1] : void 0
                            },
                            sprockets: function(a) {
                                var b;
                                return null != l.global.HandlebarsTemplates && null != (null != (b = l.global.HandlebarsTemplates) ? b[a] : void 0) ? [l.global.HandlebarsTemplates[a], a, !0] : void 0
                            },
                            hullDefault: function(a) {
                                var b, c;
                                return (null != (b = l.global.Hull.templates) && null != (c = b._default) ? c[a] : void 0) ? [l.global.Hull.templates._default[a], a, !1] : void 0
                            }
                        },
                        server: {
                            require: function(a, b, c) {
                                var d;
                                return b = "text!" + b + "." + c, d = e.deferred(), l.require([b], function(b) {
                                    return d.resolve([b, a, !1])
                                }, function(b) {
                                    return console.error("Error loading template", a, b.message), d.reject(b)
                                }), d.promise
                            }
                        }
                    }, q = function() {
                        var b, c, d, e, f, g, h, i;
                        for (e = arguments[0], b = 2 <= arguments.length ? a.call(arguments, 1) : [], h = n[e], f = 0, g = h.length; g > f; f++)
                            if (c = h[f], d = (i = o[e])[c].apply(i, b)) return d
                    }, i = function(a, b) {
                        var c, d;
                        return c = "script[data-hull-template='" + a + "']", d = q("dom", c, a, b), d ? [d, a, !1] : void 0
                    }, h = function(a) {
                        return q("app", a)
                    }, j = function(a, b, c) {
                        return q("server", a, b, c)
                    }, k = function(a, b) {
                        var c, d, e, f;
                        return d = "" + a.ref + "/" + b, f = [a.componentName, b.replace(/^_/, "")].join("/"), l.domFind && (c = i(f, a.rootEl)), c || (c = h(f)), c ? (e = m.apply(null, c), l.define(d, e)) : e = j(f, d, a.templateFormat).then(function(a) {
                            return m.apply(null, a)
                        }), e
                    }, l = {
                        global: window,
                        define: define,
                        require: g,
                        domFind: void 0,
                        load: function(a, c, d, f) {
                            var g, h, i;
                            return null == a && (a = []), null == f && (f = "hbs"), h = e.deferred(), b.isString(a) && (a = [a]), g = {
                                componentName: c.replace("__component__$", "").split("@")[0],
                                templateFormat: f,
                                rootEl: d,
                                ref: c
                            }, i = b.map(a, b.bind(k, void 0, g)), e.all(i).then(function(c) {
                                return h.resolve(b.object(a, c))
                            }, function(a) {
                                return console.warn("WARNING", a), h.reject(a)
                            }), h.promise
                        },
                        initialize: function(a) {
                            var b, e, g;
                            g = d(a);
                            for (b in g) e = g[b], c.registerHelper(b, e);
                            return l.domFind = a.core.dom.find, a.components.before("initialize", function() {
                                var a, b = this;
                                return a = l.load(this.templates, this.ref, this.el).then(function(a) {
                                    return b._templates = a
                                }, function(a) {
                                    throw console.error("Error while loading templates:", a), a
                                }), f(a)
                            }), null
                        }
                    }
                })
            }.call(this)
    }).call(root)
}();