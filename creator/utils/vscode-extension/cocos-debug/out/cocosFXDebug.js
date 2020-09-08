"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vscode_debugadapter_1 = require('vscode-debugadapter');
var net = require('net');
var nls = require('vscode-nls');
var Path = require('path');
var Fs = require('fs');
var cocosFirefoxProtocol_1 = require('./cocosFirefoxProtocol');
var ScopeExpander = (function () {
    function ScopeExpander(scope) {
        this._scope = scope;
    }
    ScopeExpander.prototype.expand = function (session, results, done) {
        session._addScopeVariables(this._scope, results, done);
    };
    return ScopeExpander;
}());
var PropertyExpander = (function () {
    function PropertyExpander(actor, name) {
        this.actor = actor;
        this.name = name;
    }
    PropertyExpander.prototype.expand = function (session, results, done) {
        session._addPropertyVariables(this, results, function () {
            done();
        });
    };
    return PropertyExpander;
}());
var BreakpointInfo = (function () {
    function BreakpointInfo(actor, line, column, actualLine, condition) {
        this.actor = actor;
        this.line = line;
        this.column = column;
        this.actualLine = actualLine;
        this.condition = condition;
    }
    return BreakpointInfo;
}());
var CocosDebugSession = (function (_super) {
    __extends(CocosDebugSession, _super);
    function CocosDebugSession() {
        var _this = this;
        _super.call(this);
        this._trace = true;
        this._localize = nls.loadMessageBundle();
        this._breakpoints = new Map();
        this._sourceActorMap = {};
        this._frameHandles = new vscode_debugadapter_1.Handles();
        this._variableHandles = new vscode_debugadapter_1.Handles();
        this._variableCache = new Map();
        this.setDebuggerLinesStartAt1(true);
        this.setDebuggerColumnsStartAt1(true);
        this._cocos = new cocosFirefoxProtocol_1.CocosFXProtocol();
        this._cocos.on('error', function (event) {
            _this._termiated('cocos firefox protocol error: ' + event.body);
        });
        this._cocos.on('close', function (event) {
            _this._termiated('cocos firefox protocol close');
        });
        this._cocos.on('diagnostic', function (event) {
            console.error(event.body);
        });
        this._cocos.on('threadState', function (event) {
            _this._remotePaused = (event.body.type === cocosFirefoxProtocol_1.ThreadStateTypes.paused);
            if (_this._remotePaused) {
                var stopEvent = _this._createStoppedEvent(event.body);
                if (stopEvent) {
                    _this._stopped('threadState');
                    _this._lastStoppedEvent = stopEvent;
                    _this.sendEvent(_this._lastStoppedEvent);
                }
            }
        });
    }
    CocosDebugSession.prototype.log = function (category, message) {
        if (this._trace) {
            message = category + ": " + message + " \n";
            this.sendEvent(new vscode_debugadapter_1.OutputEvent(message));
        }
    };
    /**
     * The debug session has terminated
     */
    CocosDebugSession.prototype._termiated = function (reason) {
        this.log('ar', "_termiated: " + reason);
        if (!this._isTerminated) {
            this._isTerminated = true;
            this.sendEvent(new vscode_debugadapter_1.TerminatedEvent);
        }
    };
    /**
     * clear every thing that is no longer valid after a new stopped event
     */
    CocosDebugSession.prototype._stopped = function (reason) {
        this.log('la', "_stopped: got " + reason + " event from JSB");
        this._frameHandles.reset();
        this._variableHandles.reset();
        this._variableCache = new Map();
    };
    /**
     * The 'initialize' request is the first request called by the frontend
     * to interrogate the features the debug adapter provides.
     */
    CocosDebugSession.prototype.initializeRequest = function (response, args) {
        // This debug adapter supports configurationDoneRequest.
        response.body.supportsConfigurationDoneRequest = true;
        // This debug adapter supports function breakpoints.
        response.body.supportsFunctionBreakpoints = false;
        response.body.supportsConditionalBreakpoints = true;
        // TODO: supports evaluate for hovers
        response.body.supportsEvaluateForHovers = false;
        this.sendResponse(response);
    };
    // -------------attach request-----------------------------------------------------------------
    CocosDebugSession.prototype.attachRequest = function (response, args) {
        var _this = this;
        var address = args.address ? args.address : '127.0.0.1';
        var timeout = args.timeout ? args.timeout : CocosDebugSession.ATTACH_TIMEOUT;
        this.log('ar', "attachRequest: address: " + address + " port: " + args.port);
        var connected = false;
        var socket = new net.Socket();
        socket.connect(args.port, address);
        socket.on('connect', function (err) {
            _this.log('ar', 'attachRequest: connected');
            connected = true;
            _this._localRoot = args.cwd;
            _this._localScriptStartIndex = _this._localRoot.length + 1;
            _this._localEngineRoot = _this._getLocalEngineRoot(_this._localRoot);
            if (!_this._localEngineRoot) {
                _this._termiated('Not a valid project.');
                return;
            }
            _this._cocos.startDispatch(socket, socket);
            _this._initialize(response);
        });
        var endTime = new Date().getTime() + timeout;
        socket.on('error', function (err) {
            if (connected) {
                // error happpend after connected
                _this._termiated('socket error');
            }
            else {
                if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET') {
                    var now = new Date().getTime();
                    if (now < endTime) {
                        setTimeout(function () {
                            _this.log('ar', 'attachRequest: retry socket.connect');
                            socket.connect(args.port);
                        }, 200); // retry afater 200 ms
                    }
                    else {
                        _this.sendErrorResponse(response, 2009, _this._localize('VSND2009', "cannot connect to JSB (timeout after {_timeout}ms)"), { _timeout: timeout });
                    }
                }
                else {
                    _this.sendErrorResponse(response, 2010, _this._localize('VSND2010', "cannot connect to JSB (reason: {_error})"), { _error: err.message });
                }
            }
        });
        socket.on('end', function (err) {
            _this._termiated('socket end');
        });
    };
    /**
     * local engine root will be different in different modes
     * TODO: implement debug mode
     *  - creator project
     */
    CocosDebugSession.prototype._getLocalEngineRoot = function (scriptRoot) {
        // cocos jstests?
        var engineRoot = Path.join(scriptRoot, '../../cocos/scripting/js-bindings');
        if (CocosDebugSession._dirExists(engineRoot)) {
            return engineRoot;
        }
        // project created by cocos console?
        engineRoot = Path.join(scriptRoot, 'frameworks/cocos2d-x/cocos/scripting/js-bindings');
        if (CocosDebugSession._dirExists(engineRoot)) {
            return engineRoot;
        }
        // simulator?
        engineRoot = Path.join(scriptRoot, './main.js');
        if (Fs.existsSync(engineRoot)) {
            return engineRoot;
        }
    };
    /**
     * Should get resources from remote and record the corredponding actors.
     */
    CocosDebugSession.prototype._initialize = function (respond) {
        var _this = this;
        // listTabs request
        this._listTabs().then(function (tabActor) {
            _this._tabActor = tabActor;
            // attach tab
            return _this._attachTab(tabActor);
        }).then(function () {
            // attach thread actor
            return _this._attachThreadActor();
        }).then(function () {
            // get sources
            return _this._getSources();
        }).then(function () {
            // resume thread actor
            return _this._resumeThreadActor();
        }).then(function () {
            // can set breakpoint now
            _this.sendEvent(new vscode_debugadapter_1.InitializedEvent());
            _this.sendResponse(respond);
        }).catch(function (e) {
            console.error(e);
            if (e.stack)
                console.error(e.stack);
            _this._sendCocosResponse(respond, e);
        });
    };
    CocosDebugSession.prototype._listTabs = function () {
        var request = {
            to: 'root',
            "type": 'listTabs'
        };
        return this._cocos.command2(request).then(function (result) {
            if (result.error) {
                return Promise.reject('error in listTabs: ' + result.error);
            }
            var selectedTab = result.tabs[result.selected];
            return selectedTab.actor;
        }).catch(function (e) {
            return Promise.reject(e);
        });
    };
    CocosDebugSession.prototype._attachTab = function (tabActor) {
        var _this = this;
        var request = {
            to: tabActor,
            type: "attach"
        };
        return this._cocos.command2(request).then(function (result) {
            if (result.error) {
                return Promise.reject('error in attach tab: ' + result.error);
            }
            _this._threadActor = result.threadActor;
        }).catch(function (e) {
            return Promise.reject(e);
        });
    };
    CocosDebugSession.prototype._attachThreadActor = function () {
        var request = {
            to: this._threadActor,
            type: 'attach',
            useSourceMaps: true,
            autoBlackBox: true
        };
        return this._cocos.command2(request).then(function (result) {
            if (result.error) {
                return Promise.reject('error in attach thread actor: ' + result.error);
            }
        }).catch(function (e) {
            return Promise.reject(e);
        });
    };
    CocosDebugSession.prototype._getSources = function () {
        var _this = this;
        var request = {
            to: this._threadActor,
            type: 'sources'
        };
        return this._cocos.command2(request).then(function (result) {
            if (result.error) {
                return Promise.reject('error in resources request: ' + result.error);
            }
            var sources = result.sources;
            _this._remoteRoot = _this._getRemoteRoot(sources);
            for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
                var source = sources_1[_i];
                // TODO: support eval source
                if (!source.url) {
                    continue;
                }
                var url = _this._getRemoteScriptPath(source.url);
                _this._sourceActorMap[url] = source.actor;
            }
            ;
        }).catch(function (e) {
            return Promise.reject(e);
        });
    };
    CocosDebugSession.prototype._resumeThreadActor = function () {
        var request = {
            to: this._threadActor,
            type: 'resume',
            resumeLimit: null,
            ignoreCaughtExceptions: true
        };
        return this._cocos.command2(request).then(function (result) {
            if (result.error) {
                return Promise.reject('error in resume thread actor: ' + result.error);
            }
        }).catch(function (e) {
            return Promise.reject(e);
        });
    };
    /**
     * Get remote project root path.
     * We use the 'main.js' the get the root path.
     */
    CocosDebugSession.prototype._getRemoteRoot = function (sources) {
        var length = Number.MAX_VALUE;
        var findPath = '';
        for (var _i = 0, sources_2 = sources; _i < sources_2.length; _i++) {
            var source = sources_2[_i];
            var url = source.url;
            if (!url) {
                continue;
            }
            if (url.endsWith('main.js') && url.length < length) {
                length = url.length;
                findPath = url;
            }
        }
        // can not find main.js, an error happened
        if (findPath.length === 0) {
            this.log('ar', 'can not find main.js');
            return '';
        }
        // remote '.main.js'
        return findPath.slice(0, -8);
    };
    //---------------- disconnect request -------------------------------------------------------------
    CocosDebugSession.prototype.disconnectRequest = function (response, args) {
        _super.prototype.disconnectRequest.call(this, response, args);
    };
    CocosDebugSession.prototype.shutdown = function () {
        if (!this._inShutDown) {
            this._inShutDown = true;
            // detach tab actor
            var request = {
                to: this._tabActor,
                type: 'detach'
            };
            this._cocos.command(request);
            // TODO: stop listers to web console if we support web console
            _super.prototype.shutdown.call(this);
        }
    };
    //---------------- set breakpoints request ----------------------------------------------------------
    CocosDebugSession.prototype.setBreakPointsRequest = function (response, args) {
        var _this = this;
        this.log('bp', "setBreakPointsRequest: " + JSON.stringify(args.source) + " " + JSON.stringify(args.breakpoints));
        var path = args.source.path;
        // get source actor
        var actor = this._getActor(path);
        if (!actor) {
            this._sendCocosResponse(response, "no valid source specified " + path);
            return;
        }
        var lbs = args.breakpoints;
        if (!lbs) {
            // deprecated API: convert line number array
            lbs = new Array();
            for (var _i = 0, _a = args.lines; _i < _a.length; _i++) {
                var l = _a[_i];
                lbs.push({
                    line: l,
                    column: 0
                });
            }
        }
        // compute breakpoints that already set
        var lbsAlreadSet = new Array();
        var bps = this._breakpoints[path] || [];
        var tmpBps = new Array();
        for (var _b = 0, lbs_1 = lbs; _b < lbs_1.length; _b++) {
            var l = lbs_1[_b];
            for (var i = 0; i < bps.length; i++) {
                var b = bps[i];
                if (l.line === b.line && l.column === b.column && l.condition === b.condition) {
                    l.line = b.actualLine;
                    lbsAlreadSet.push(l);
                    tmpBps.push(b);
                    bps.splice(i, 1);
                    break;
                }
            }
        }
        this._breakpoints[path] = tmpBps;
        var needToResume = false;
        var needSetBreakpoint = lbs.length !== lbsAlreadSet.length;
        this._clearBreakpoints(bps).then(function () {
            // remote should be in paused to set breakpoint
            if (needSetBreakpoint && !_this._remotePaused) {
                needToResume = true;
                return _this._interruptThreadActor();
            }
        }).then(function () {
            return Promise.all(lbs.map(function (b) {
                var index = lbsAlreadSet.indexOf(b);
                if (index !== -1) {
                    return new vscode_debugadapter_1.Breakpoint(true, lbsAlreadSet[index].line);
                }
                else {
                    return _this._setBreakpoint(actor, b, path);
                }
            }));
        }).then(function (result) {
            response.body = {
                breakpoints: result
            };
            _this.sendResponse(response);
            _this.log('bp', "_updateBreakpoints: result " + JSON.stringify(result));
            if (needToResume) {
                _this._resumeThreadActor();
            }
        }).catch(function (e) {
            _this._sendCocosResponse(response, e);
        });
    };
    CocosDebugSession.prototype._getActor = function (path) {
        path = path.substring(this._localScriptStartIndex);
        // conver to unix path, because the path from JSB remote is unix path
        path = path.split('\\').join('/');
        return this._sourceActorMap[path];
    };
    CocosDebugSession.prototype._interruptThreadActor = function () {
        var request = {
            to: this._threadActor,
            type: 'interrupt',
            when: null
        };
        return this._cocos.command2(request).then(function (result) {
            if (result.error) {
                return Promise.reject('can not interrupe thread actor: ' + result.error);
            }
            else {
                return result.actor;
            }
        }).catch(function (e) {
            return Promise.reject(e);
        });
    };
    CocosDebugSession.prototype._clearBreakpoints = function (breakpointsToDelete) {
        var promises = [];
        for (var _i = 0, breakpointsToDelete_1 = breakpointsToDelete; _i < breakpointsToDelete_1.length; _i++) {
            var bp = breakpointsToDelete_1[_i];
            promises.push(this._clearBreakpoint(bp));
        }
        return Promise.all(promises).then(function () {
            return;
        }).catch(function (e) {
            return;
        });
    };
    CocosDebugSession.prototype._clearBreakpoint = function (breakpointActorInfo) {
        var actor = breakpointActorInfo.actor;
        var request = {
            to: actor,
            type: 'delete'
        };
        return this._cocos.command2(request).then(function (result) {
            if (result.error) {
                return Promise.reject("can not delete breakpoint " + actor + ": " + result.error + " ");
            }
        }).catch(function (e) {
            return Promise.reject(e);
        });
    };
    CocosDebugSession.prototype._setBreakpoint = function (actor, b, scriptPath) {
        var _this = this;
        var request = {
            to: actor,
            type: 'setBreakpoint',
            location: {
                line: b.line,
                column: b.column
            }
        };
        if (b.condition) {
            request.condition = b.condition;
        }
        return this._cocos.command2(request).then(function (result) {
            if (result.error) {
                return new vscode_debugadapter_1.Breakpoint(false);
            }
            var actualLine = b.line;
            if (result.actualLocation) {
                actualLine = result.actualLocation.line;
            }
            _this._breakpoints[scriptPath].push(new BreakpointInfo(result.actor, b.line, b.column, actualLine, b.condition));
            return new vscode_debugadapter_1.Breakpoint(true, actualLine);
        }).catch(function (e) {
            return new vscode_debugadapter_1.Breakpoint(false);
        });
    };
    CocosDebugSession.prototype.threadsRequest = function (response) {
        // return the default thread
        response.body = {
            threads: [
                new vscode_debugadapter_1.Thread(CocosDebugSession.THREAD_ID, "thread 1")
            ]
        };
        this.sendResponse(response);
    };
    //----------- statcktrace request ------------------------------------------------------
    CocosDebugSession.prototype.stackTraceRequest = function (response, args) {
        var _this = this;
        var threadReference = args.threadId;
        var maxLevels = args.levels;
        if (threadReference !== CocosDebugSession.THREAD_ID) {
            this.sendErrorResponse(response, 2014, 'unexpected thread reference {_thread}', { _thread: threadReference }, vscode_debugadapter_1.ErrorDestination.Telemetry);
            return;
        }
        var request = {
            to: this._threadActor,
            type: 'frames',
            start: 0,
            count: maxLevels
        };
        this._cocos.command2(request).then(function (backtraceResponse) {
            if (backtraceResponse.error) {
                return Promise.reject('can not get stacktraces: ' + backtraceResponse.error);
            }
            var responseFrames = backtraceResponse.frames;
            var frames = new Array();
            for (var _i = 0, responseFrames_1 = responseFrames; _i < responseFrames_1.length; _i++) {
                var frame = responseFrames_1[_i];
                // TODO: support eval frame, skip now
                if (!frame.where.source.url) {
                    continue;
                }
                frames.push(_this._createStackFrame(frame));
            }
            return Promise.all(frames);
        }).then(function (stackframes) {
            response.body = {
                stackFrames: stackframes
            };
            _this.sendResponse(response);
        }).catch(function (error) {
            response.body = {
                stackFrames: []
            };
            _this._sendCocosResponse(response, 'can not create stackframes: ' + error);
        });
    };
    CocosDebugSession.prototype._createStackFrame = function (frame) {
        var line = frame.where.line;
        var column = frame.where.column;
        var frameRefrence = this._frameHandles.create(frame);
        var url = this._getValidUrl(frame.source);
        var localPath = this._getLocalPath(url);
        var source = new vscode_debugadapter_1.Source(Path.basename(localPath), localPath);
        if (frame.type === 'call') {
            return this._getFrameName(frame.callee.actor).then(function (functionName) {
                functionName = functionName || 'anonymous function';
                return new vscode_debugadapter_1.StackFrame(frameRefrence, functionName, source, line, column);
            });
        }
        else {
            return Promise.resolve(new vscode_debugadapter_1.StackFrame(frameRefrence, 'anonymous function', source, line, column));
        }
    };
    CocosDebugSession.prototype._getFrameName = function (actor) {
        var request = {
            to: actor,
            type: 'name'
        };
        return this._cocos.command2(request).then(function (result) {
            if (result.error || !result.name) {
                return null;
            }
            return result.name;
        });
    };
    CocosDebugSession.prototype._getLocalPath = function (remotePath) {
        var remoteScriptPath = this._getRemoteScriptPath(remotePath);
        var pathCompoents = remoteScriptPath.split('/');
        if (pathCompoents[0] === 'script') {
            return Path.join(this._localEngineRoot, remoteScriptPath);
        }
        else {
            return Path.join(this._localRoot, remoteScriptPath);
        }
    };
    //------------------ scopes request -----------------------------------------------------
    CocosDebugSession.prototype.scopesRequest = function (response, args) {
        var frame = this._frameHandles.get(args.frameId);
        if (!frame) {
            this.sendErrorResponse(response, 2020, this._localize('VSND2020', 'stack is not valid'));
            return;
        }
        // first scope is frame
        var scopes = new Array();
        var expensive;
        var scopeName;
        // retrieve other scopes
        var scope = frame;
        while (scope) {
            // global scope
            if (scope.type === 'object' && scope.object.class === 'global') {
                scopeName = 'Global';
                expensive = true;
            }
            else {
                scopeName = this._getScopeName(scope);
                expensive = false;
            }
            var s = new vscode_debugadapter_1.Scope(scopeName, this._variableHandles.create(new ScopeExpander(scope)), true);
            scopes.push(s);
            if (scope.environment) {
                // first scope
                scope = scope.environment.parent;
            }
            else {
                scope = scope.parent;
            }
        }
        response.body = {
            scopes: scopes
        };
        this.sendResponse(response);
    };
    CocosDebugSession.prototype._getScopeName = function (scope) {
        var firstScope = (scope.environment !== undefined);
        var scopeName;
        // handle frame type
        if (firstScope) {
            var frameType = scope.type;
            switch (frameType) {
                case 'global':
                    scopeName = 'Global';
                    break;
                case 'call':
                case 'eval':
                case 'clientEvaluate':
                    scopeName = 'Local';
                    break;
                default:
                    scopeName = "Unknown " + frameType;
                    break;
            }
        }
        else {
            scopeName = scope.type;
        }
        return scopeName;
    };
    //-------------- variables request ------------------------------------------------------------------
    CocosDebugSession.prototype.variablesRequest = function (response, args) {
        var _this = this;
        var reference = args.variablesReference;
        var expander = this._variableHandles.get(reference);
        if (expander) {
            var variables_1 = new Array();
            expander.expand(this, variables_1, function () {
                response.body = {
                    variables: variables_1
                };
                _this.sendResponse(response);
            });
        }
        else {
            response.body = {
                variables: []
            };
            this.sendResponse(response);
        }
    };
    CocosDebugSession.prototype._addScopeVariables = function (scope, results, done) {
        var firstScope = (scope.environment !== undefined);
        var type = scope.type;
        // first scope, should add 'this' property
        if (firstScope) {
            var expanderThis = new PropertyExpander(scope.this.actor, 'this');
            var varThis = new vscode_debugadapter_1.Variable('this', scope.this.class, this._variableHandles.create(expanderThis));
            results.push(varThis);
            type = scope.environment.type;
            scope = scope.environment;
        }
        switch (type) {
            // function and block should add variables from scope.bindings
            // scope.bindings.variables contains scope.bindings.arguments,
            // so only have to handle scope.bindings.variables
            case 'function':
            case 'block':
                var variables = scope.bindings.variables;
                for (var key in variables) {
                    var value = variables[key];
                    var variable = this._createVariableFromValue(key, value.value);
                    results.push(variable);
                }
                done();
                break;
            case 'object':
            case 'with':
                var expanderObj = new PropertyExpander(scope.object.actor, '');
                this._addPropertyVariables(expanderObj, results, function () {
                    done();
                });
                break;
            default:
                done();
                break;
        }
    };
    CocosDebugSession.prototype._createVariableFromValue = function (name, value) {
        var type = value.type;
        var v;
        if (type) {
            if (value.class) {
                var expander = new PropertyExpander((value.actor), name);
                v = new vscode_debugadapter_1.Variable(name, value.class, this._variableHandles.create(expander));
            }
            else {
                // null, undefined, NaN..., don't have class property
                v = new vscode_debugadapter_1.Variable(name, type);
            }
        }
        else {
            var dataType = typeof (value);
            switch (dataType) {
                case 'string':
                    if (value !== '') {
                        value = value.replace('\n', '\\n').replace('\r', '\\r');
                    }
                    // need to wrap it with ""
                    v = new vscode_debugadapter_1.Variable(name, ('"' + value + '"'));
                    break;
                case 'boolean':
                case 'number':
                    v = new vscode_debugadapter_1.Variable(name, ('' + value).toLocaleLowerCase());
                    break;
                default:
                    // an error happened
                    this.log('vr', 'can not resolve type: ' + dataType);
                    v = new vscode_debugadapter_1.Variable('' + value, 'unknown type');
                    break;
            }
        }
        return v;
    };
    CocosDebugSession.prototype._addPropertyVariables = function (expander, results, done) {
        var _this = this;
        // return cache value if exists
        var cacheValue = this._variableCache.get(expander.actor);
        if (cacheValue) {
            results = cacheValue;
            done();
            return;
        }
        var request = {
            to: expander.actor,
            type: 'prototypeAndProperties'
        };
        this._cocos.command2(request).then(function (response) {
            if (response.error) {
                _this.log('vr', "error in get property of " + expander.name + ": " + response.error);
                done();
                return;
            }
            // own properties
            var ownProperties = response.ownProperties;
            if (ownProperties) {
                for (var propName in ownProperties) {
                    var variable = _this._createVariableFromValue(propName, ownProperties[propName].value);
                    results.push(variable);
                }
            }
            // // safeGetterValues
            var safeGetterValues = response.safeGetterValues;
            if (safeGetterValues) {
                for (var propName in safeGetterValues) {
                    var variable = _this._createVariableFromValue(propName, safeGetterValues[propName].getterValue);
                    results.push(variable);
                }
            }
            done();
            // cache the result
            _this._variableCache.set(expander.actor, results);
        }).catch(function (error) {
            // ignore the error
            _this.log('vr', "error in get property of " + expander.name + ": " + error);
            done();
        });
    };
    // ---------------- pause request ----------------------------------------------------------------
    CocosDebugSession.prototype.pauseRequest = function (response, args) {
        var _this = this;
        this._interruptThreadActor().then(function () {
            _this._stopped('pause');
            _this._lastStoppedEvent = new vscode_debugadapter_1.StoppedEvent(_this._localize('reason.user.request', 'user request'), CocosDebugSession.THREAD_ID);
            _this.sendResponse(response);
            _this.sendEvent(_this._lastStoppedEvent);
        });
    };
    //-------------------- continue request -----------------------------------------------------
    CocosDebugSession.prototype.continueRequest = function (response, args) {
        var _this = this;
        var request = {
            to: this._threadActor,
            type: 'resume',
            resumeLimit: null,
            ignoreCaughtExceptions: true
        };
        this._cocos.command(request, function (result) {
            _this.sendResponse(response);
        });
    };
    //-------------------- step request ----------------------------------------------------------
    CocosDebugSession.prototype.nextRequest = function (response, args) {
        var _this = this;
        var request = {
            to: this._threadActor,
            type: 'resume',
            resumeLimit: {
                type: 'next'
            },
            ignoreCaughtExceptions: true
        };
        this._cocos.command(request, function (result) {
            _this.sendResponse(response);
        });
    };
    CocosDebugSession.prototype.stepInRequest = function (response, args) {
        var _this = this;
        var request = {
            to: this._threadActor,
            type: 'resume',
            resumeLimit: {
                type: 'step'
            },
            ignoreCaughtExceptions: true
        };
        this._cocos.command(request, function (result) {
            _this.sendResponse(response);
        });
    };
    CocosDebugSession.prototype.stepOutRequest = function (response, args) {
        var _this = this;
        var request = {
            to: this._threadActor,
            type: 'resume',
            resumeLimit: {
                type: 'finish'
            },
            ignoreCaughtExceptions: true
        };
        this._cocos.command(request, function (result) {
            _this.sendResponse(response);
        });
    };
    //----------------- evaluate request -------------------------------------------------------------
    CocosDebugSession.prototype.evaluateRequest = function (response, args) {
        var _this = this;
        var expression = args.expression;
        if (args.frameId <= 0) {
            this.sendErrorResponse(response, 2020, 'stack frame not valid', null, vscode_debugadapter_1.ErrorDestination.Telemetry);
            return;
        }
        var frame = this._frameHandles.get(args.frameId);
        if (!frame) {
            this.sendErrorResponse(response, 2020, 'stack frame not valid', null, vscode_debugadapter_1.ErrorDestination.Telemetry);
            return;
        }
        var request = {
            to: this._threadActor,
            type: 'clientEvaluate',
            frame: frame.actor,
            expression: this._createEvaluateExpression(expression)
        };
        // skip first reply
        this._cocos.dummyCommand();
        this._cocos.command2(request).then(function (evalResponse) {
            if (evalResponse.error) {
                response.success = false;
                response.message = evalResponse.error;
            }
            else {
                var frameFinished = evalResponse.why.frameFinished;
                if (frameFinished.throw || frameFinished.terminated) {
                    response.success = false;
                    response.message = _this._localize('eval.not.available', "not available");
                }
                else {
                    var v = _this._createVariableFromValue('evaluate', frameFinished.return);
                    response.body = {
                        result: v.value,
                        variablesReference: v.variablesReference
                    };
                }
            }
            _this.sendResponse(response);
        });
    };
    CocosDebugSession.prototype._createEvaluateExpression = function (expression) {
        return "eval(\"try {" + expression + "\" + '\\n' + \"} catch (e) {e.name + ': ' + e.message;}\")";
    };
    //--------- private functions ------------------------------------------------
    CocosDebugSession.prototype._sendCocosResponse = function (response, message) {
        this.sendErrorResponse(response, 2013, "cocos request failed (reason: " + message + ")", vscode_debugadapter_1.ErrorDestination.Telemetry);
    };
    /**
     * If some codes is generated dynamically, thre is not a url for it,
     * but we can get its introductionUrl.
     */
    CocosDebugSession.prototype._getValidUrl = function (source) {
        if (source.url) {
            return source.url;
        }
        else {
            return source.introductionUrl;
        }
    };
    CocosDebugSession.prototype._createStoppedEvent = function (body) {
        var reason;
        switch (body.why.type) {
            case cocosFirefoxProtocol_1.UnsolicitedPauses.breakpoint:
                reason = this._localize('reason.breakpoint', 'breakpoint');
                break;
            case cocosFirefoxProtocol_1.UnsolicitedPauses.resumeLimit:
                // step over, step into, step out
                reason = this._localize('reason.step', 'step');
                break;
            default:
                break;
        }
        if (reason) {
            return new vscode_debugadapter_1.StoppedEvent(reason, CocosDebugSession.THREAD_ID);
        }
        else {
            return null;
        }
    };
    /**
     * extract script path that not include remote root
     */
    CocosDebugSession.prototype._getRemoteScriptPath = function (remoteFullPath) {
        var remoteRootLength = this._remoteRoot.length;
        return remoteFullPath.substring(remoteRootLength + 1);
    };
    CocosDebugSession._dirExists = function (path) {
        try {
            var stat = Fs.statSync(path);
            return stat.isDirectory();
        }
        catch (error) {
            return false;
        }
    };
    // we don't support multiple threads, so we can use a hardcoded ID for the default thread
    CocosDebugSession.THREAD_ID = 1;
    CocosDebugSession.ATTACH_TIMEOUT = 10000;
    return CocosDebugSession;
}(vscode_debugadapter_1.DebugSession));
vscode_debugadapter_1.DebugSession.run(CocosDebugSession);
//# sourceMappingURL=cocosFXDebug.js.map