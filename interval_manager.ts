/**
 * Class definition for an Interval Manager
 * - Stores the current set of intervals
 * - Private functions for merging intervals (when adding a new interval), 
 * de-merging intervals (when removing an interval), and validating an incoming interval
 * - Public functions to initiate adding a new interval, removing an interval 
 * and retrieving the current set of intervals
 */

class IntervalManager {
    // Hold our current set of intervals
    private _currentIntervalSet: [number, number][];
    
    // Hold our currently queued intervals. If this has 1 or more entries, 
    private _queuedAddIntervals: [number, number][];
    private _queuedRemoveIntervals: [number, number][];
    
    constructor(){
        this._currentIntervalSet = [];
        this._queuedAddIntervals = [];
        this._queuedRemoveIntervals = [];
    }

    // add the passed interval to the set
    // - run interval validation
    // - run interval merge
    public addInterval(interval: [number, number]):void{
        
    }

    // remove the passed interval from the set
    // - run interval validation
    // - run interval demerge
    public removeInterval(interval: [number, number]): void {

    }

    // return the current interval set
    public getIntervals():[number, number][]{
        return this._currentIntervalSet;
    }

    // Tests for urrent validatity criteria on interval
    // - valid integer in each position
    // - integers in ascending order
    private isIntervalValid(interval: [number, number]):boolean{

        return false;
    }

    // Retrieve an interval from the front of the add queue
    // and merge it with the existing set
    private mergeIntervals(){

    }

    // Retrieve an interval from the front of the remove queue
    // add remove it from the existing set
    private demergeIntervals(){

    }


}