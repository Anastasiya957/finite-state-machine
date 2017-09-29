class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        try {
            this.initial = config.initial;
            this.states = config.states;   
            this.history = [this.initial];
            this.pointer = 0;     
        } catch(err) {
            throw err;
        }
    
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.history[this.pointer];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        try {
            this.history.push(state);
            this.pointer = this.history.length - 1;
        } catch(err) {
            throw err;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.history.push( this.states[this.history[this.pointer]].transitions[event] );
        this.pointer = this.history.length - 1;;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.history.push( this.initial );
        this.pointer += 1;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) {
            var allStates = [];

            for (var key in this.states) {
                allStates.push(key);
            }
            return allStates;
        }

        var correctStates = [];
        for (var key in this.states) {
            if (this.states[key].transitions[event] !== undefined) {
                correctStates.push(key);
            }
        }
        return correctStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if ( this.history[this.pointer - 1] === undefined) {
            return false;
        }
        this.pointer -= 1;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if ( this.history[this.pointer + 1] === undefined) {
            return false;
        }
        this.pointer += 1;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [this.history[this.pointer]];
        this.pointer = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
