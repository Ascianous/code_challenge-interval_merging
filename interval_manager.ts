/**
 * Class definition for an Interval Manager
 * - Stores the current set of intervals
 * - Private functions for merging intervals (when adding a new interval), 
 * de-merging intervals (when removing an interval), and validating an incoming interval
 * - Public functions to initiate adding a new interval, removing an interval 
 * and retrieving the current set of intervals
 */

export class IntervalManager {
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
        if(!this.isIntervalValid(interval)) throw Error;
        this._queuedAddIntervals.push(interval);
        if(this._queuedAddIntervals.length == 1){
            this.runAddQueue();
        }
        return;
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

    private runAddQueue(): void{
        this.mergeIntervals();
        this._queuedAddIntervals.shift();
        if(this._queuedAddIntervals.length>0) return this.runAddQueue();
        return;
    }

    // Tests for urrent validatity criteria on interval
    // - valid integer in each position
    // - integers in ascending order
    private isIntervalValid(interval: [number, number]):boolean{
        if(!isNaN(interval[0]) && !isNaN(interval[1]) && interval[0] < interval[1]) return true;
        return false;
    }

    // Retrieve an interval from the front of the add queue
    // and merge it with the existing set
    private mergeIntervals(): void{
        const intervalToMerge: [number, number] | undefined = this._queuedAddIntervals[0];
        if(!intervalToMerge) return;
        
        // Case 0 - our interval set is empty
        // Case 1 - Test if our interval is below the current lowest
        if(this._currentIntervalSet.length==0 || intervalToMerge[1] < this._currentIntervalSet[0]![0]){
            this._currentIntervalSet.unshift(intervalToMerge);
            return;
        }

        // Current index
        let cIdx = 0;
        let haveMergedNewInterval = false;
        while(cIdx < this._currentIntervalSet.length){
            const currentInterval = this._currentIntervalSet[cIdx];
            if(!currentInterval) throw Error;
            if(!haveMergedNewInterval){
                if(this.inRange(currentInterval[0], intervalToMerge[0], intervalToMerge[1]) || this.inRange(currentInterval[1], intervalToMerge[0], intervalToMerge[1])){
                    this._currentIntervalSet[cIdx] = [Math.min(currentInterval[0], intervalToMerge[0]), Math.max(currentInterval[1], intervalToMerge[1])]
                    haveMergedNewInterval = true;
                } else if(currentInterval[1] < intervalToMerge[0] &&  (this._currentIntervalSet[cIdx+1] == undefined || intervalToMerge[1] < this._currentIntervalSet[cIdx+1]![0])){
                    this._currentIntervalSet.splice(cIdx+1,0,intervalToMerge);
                    break;
                }
            } else {
                // We've merged the previous interval. We need to check to make sure the previous interval does not overlap with the current interval
                // If it does, we merge and iterate on
                const previousInterval = this._currentIntervalSet[cIdx-1];
                if(!previousInterval) throw Error;
                if(this.inRange(currentInterval[0], previousInterval[0], previousInterval[1]) || this.inRange(currentInterval[1], previousInterval[0], previousInterval[1])){
                    this._currentIntervalSet[cIdx-1] = [Math.min(currentInterval[0], previousInterval[0]), Math.max(currentInterval[1], previousInterval[1])]
                    this._currentIntervalSet.splice(cIdx, 1);
                    continue;
                } else { break; }
            }
            ++cIdx;
        }
        return;
    }

    // Helper function for determining if a value is within a range
    private inRange(value: number, min: number, max: number): boolean{
        if(value >= min && value <= max) return true;
        return false
    }

    // Retrieve an interval from the front of the remove queue
    // add remove it from the existing set
    private demergeIntervals(){

    }


}