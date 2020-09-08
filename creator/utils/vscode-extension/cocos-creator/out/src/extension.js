'use strict';
var vscode_1 = require('vscode');
var completionItemProvider_1 = require('./completionItemProvider');
function activate(context) {
    context.subscriptions.push(vscode_1.languages.registerCompletionItemProvider('javascript', new completionItemProvider_1.default(), '.'));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map