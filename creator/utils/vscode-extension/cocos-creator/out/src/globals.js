// file generated from PHP53Schema.xml using php-exclude_generate_php_globals.js
// component functions
exports.componentFunctions = {
    update: {
        description: 'Update is called every frame, if the Component is enabled.'
    },
    lateUpdate: {
        description: 'LateUpdate is called every frame, if the Component is enabled.'
    },
    onLoad: {
        description: 'Update is called every frame, if the Component is enabled.'
    },
    start: {
        description: "Called before all scripts' update if the Component is enabled."
    },
    onEnable: {
        description: 'Called when this component becomes enabled and its entity becomes active.'
    },
    onDisable: {
        description: 'Called when this component becomes disabled or its entity becomes inactive.'
    },
    onDestroy: {
        description: 'Called when this component will be destroyed.'
    },
    onFocusInEditor: {},
    onLostFocusInEditor: {},
    addComponent: {
        description: "Adds a component class to the entity. You can also add component to entity by passing in the name of the script.\n                      @param typeOrName the constructor or the class name of the component to add. ",
        signature: '(typeOrName: Functioin|string): cc.Component'
    },
    getComponent: {
        description: "Returns the component of supplied type if the entity has one attached, null if it doesn't. \n                      You can also get component in the entity by passing in the name of the script.\n                      @param typeOrName the constructor or the class name of the component to get. ",
        signature: '(typeOrName: Functioin|string): cc.Component'
    },
    schedule: {
        description: "Schedules a callback function that runs only once, with a delay of 0 or larger.\n                      @param callback The callback function\n\t\t              @param interval Tick interval in seconds. 0 means tick every frame. If interval = 0, it's recommended to use scheduleUpdate() instead.\n\t\t              @param repeat The selector will be executed (repeat + 1) times, you can use kCCRepeatForever for tick infinitely.\n\t\t              @param delay The amount of time that the first tick will wait before execution.",
        signature: '(callback: Functioin, interval? : number = 0, repeat? : number = cc.REPEAT_FOREVER, delay? : number = 0): void'
    },
    scheduleOnce: {
        description: "Schedules a callback function that runs only once, with a delay of 0 or larger.\n                      @param callback A function wrapped as a selector.\n\t\t              @param delay The amount of time that the first tick will wait before execution. ",
        signature: '(callback : Function, delay? : number = 0): void'
    },
    unschedule: {
        description: "Unschedules a custom callback function.\n                      @param callback_fn A function wrapped as a selector ",
        signature: '(callback_fn : Function): void'
    },
    unscheduleAllCallbacks: {
        description: "Unschedule all scheduled callback functions: custom callback functions, and the 'update' callback function.\n\t\t              Actions are not affected by this method."
    }
};
// component properties
exports.componentProperties = {
    node: {
        description: 'The node this component is attached to. A component is always attached to a node.',
        signature: 'cc.Node'
    },
    uuid: {
        description: 'The uuid for editor.',
        signature: 'string'
    },
    enabled: {
        description: 'Indicates whether this component is enabled or not.',
        signature: 'boolean'
    },
    enabledInHierarchy: {
        description: 'Indicates whether this component is enabled and its entity is also active in the hierarchy.',
        signature: 'boolean'
    }
};
// node functions
exports.nodeFunctions = {
    addComponent: {
        description: "Adds a component class to the entity. You can also add component to entity by passing in the name of the script.\n                      @param typeOrName the constructor or the class name of the component to add. ",
        signature: '(typeOrName: Functioin|string): cc.Component'
    },
    getComponent: {
        description: "Returns the component of supplied type if the entity has one attached, null if it doesn't. \n                      You can also get component in the entity by passing in the name of the script.\n                      @param typeOrName the constructor or the class name of the component to get. ",
        signature: '(typeOrName: Functioin|string): cc.Component'
    },
    removeComponent: {
        description: "Removes a component identified by the given name or removes the component object given.\n\t\t              You can also use component.destroy() if you already have the reference.\n\t\t              @param component The need remove component.",
        signature: '(typeOrName: Functioin|string): void'
    },
    on: {
        description: "Register an callback of a specific event type on Node.\n                    Use this method to register touch or mouse event permit propagation based on scene graph,\n                    you can propagate the event to the parents or swallow it by calling stopPropagation on the event.\n                    It's the recommended way to register touch/mouse event for Node,\n                    please do not use cc.eventManager directly for Node.\n                    @param type A string representing the event type to listen for.\n                    @param callback The callback that will be invoked when the event is dispatched.\n                                                The callback is ignored if it is a duplicate (the callbacks are unique).\n                    @param target The target to invoke the callback, can be null.",
        signature: '(type : string, callback: (param: Event) => void, target? : any) : Function'
    },
    runAction: {
        description: "Executes an action, and returns the action that is executed.\n\t\tThe node becomes the action's target. Refer to cc.Action's getTarget()\n\t\tCalling runAction while the node is not active won't have any effect.",
        signature: '(action : cc.Action) : cc.Action'
    },
    stopAllActions: {
        description: 'Stops and removes all actions from the running action list.'
    },
    stopAction: {
        description: "Stops and removes an action from the running action list.\n\t\t@param action An action object to be removed.",
        signature: '(action : cc.Action) : void'
    },
    stopActionByTag: {
        description: "Removes an action from the running action list by its tag.\n\t\t@param tag A tag that indicates the action to be removed.",
        signature: '(tag : number) : void'
    },
    getActionByTag: {
        description: "Returns an action from the running action list by its tag.\n        @param tag A tag that indicates the action to get.",
        signature: '(tag : number) : cc.Action'
    },
    getNumberOfRunningActions: {
        description: "Composable actions are counted as 1 action. Example:\n\t\tIf you are running 1 Sequence of 7 actions, it will return 1.\n\t\tIf you are running 7 Sequences of 2 actions, it will return 7.",
        signature: '() : number'
    }
};
// node properties
exports.nodeProperties = {
    active: {
        description: 'The local active state of this node.',
        signature: 'boolean'
    },
    activeInHierarchy: {
        description: 'Indicates whether this node is active in the scene.',
        signature: 'boolean'
    }
};
//# sourceMappingURL=globals.js.map