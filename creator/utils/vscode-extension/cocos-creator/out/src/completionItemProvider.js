var vscode_1 = require('vscode');
var cocosGlobals = require('./globals');
// implement cocos creator completions
// it only adds completions for cc.Component and xxx.node
// it will add the completions no matter of the context
var CocosCreatorCompletionItemProvider = (function () {
    function CocosCreatorCompletionItemProvider() {
    }
    CocosCreatorCompletionItemProvider.prototype.provideCompletionItems = function (document, position, token) {
        var result = [];
        if (position.character >= 5) {
            // check if the prefix is ' this.' or '.node.'
            var distance = position.character > 5 ? 6 : 5;
            var startPosition = new vscode_1.Position(position.line, position.character - distance);
            var range = new vscode_1.Range(startPosition, position);
            var prefix = document.getText(range);
            // add cc.Component to this
            if (prefix === 'this.' || prefix === ' this.') {
                this.addCompletion(result, cocosGlobals.componentFunctions, true);
                this.addCompletion(result, cocosGlobals.componentProperties, false);
            }
            // add cc.Node to xxx.node
            if (prefix === '.node.') {
                // add our completions
                this.addCompletion(result, cocosGlobals.nodeFunctions, true);
                this.addCompletion(result, cocosGlobals.nodeProperties, false);
            }
        }
        return Promise.resolve(result);
    };
    CocosCreatorCompletionItemProvider.prototype.addCompletion = function (completionItems, entries, isFunction) {
        for (var name in entries) {
            var proposal = new vscode_1.CompletionItem(name);
            proposal.kind = isFunction ? vscode_1.CompletionItemKind.Function : vscode_1.CompletionItemKind.Property;
            var entry = entries[name];
            if (entry.description) {
                proposal.documentation = entry.description;
            }
            if (entry.signature) {
                proposal.detail = entry.signature;
            }
            completionItems.push(proposal);
        }
    };
    return CocosCreatorCompletionItemProvider;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CocosCreatorCompletionItemProvider;
//# sourceMappingURL=completionItemProvider.js.map