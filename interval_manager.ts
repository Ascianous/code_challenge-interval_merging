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
    // - run add queue
    public addInterval(interval: [number, number]):void{
        if(!this.isIntervalValid(interval)) throw Error;
        this._queuedAddIntervals.push(interval);
        if(this._queuedAddIntervals.length == 1) this.runAddQueue();
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

    // Tests for validatity criteria on interval
    // - valid integer in each position
    // - integers in ascending order
    private isIntervalValid(interval: [number, number]):boolean{
        if(!isNaN(interval[0]) && !isNaN(interval[1]) && interval[0] < interval[1]) return true;
        return false;
    }

    // Retrieve an interval from the front of the add queue
    // and merge it with the existing set
    private mergeIntervals(): void{
        // TODO combine with while loop
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
            // TODO refactor - there is code overlap between the if and else bodies. Can we find a way to merge the two sections?
            if(!haveMergedNewInterval){
                // case 3 - the incoming interval overlaps partially with an existing interval. We need to run a merge and iterate through
                if(this.inRange(currentInterval[0], intervalToMerge[0], intervalToMerge[1]) || this.inRange(currentInterval[1], intervalToMerge[0], intervalToMerge[1])){
                    this._currentIntervalSet[cIdx] = [Math.min(currentInterval[0], intervalToMerge[0]), Math.max(currentInterval[1], intervalToMerge[1])]
                    haveMergedNewInterval = true;
                } // case 2 - the incoming interval exists between two existing intervals.  We need to insert and then we can break
                else if(currentInterval[1] < intervalToMerge[0] &&  (this._currentIntervalSet[cIdx+1] == undefined || intervalToMerge[1] < this._currentIntervalSet[cIdx+1]![0])){
                    this._currentIntervalSet.splice(cIdx+1,0,intervalToMerge);
                    break;
                }
            } else {
                // We've merged into the previous interval. We need to check to make sure the newly merged interval does not overlap with the current interval
                // If it does, we merge and iterate on
                const previousInterval = this._currentIntervalSet[cIdx-1];
                if(!previousInterval) throw Error;
                if(this.inRange(currentInterval[0], previousInterval[0], previousInterval[1]) || this.inRange(currentInterval[1], previousInterval[0], previousInterval[1])){
                    this._currentIntervalSet[cIdx-1] = [Math.min(currentInterval[0], previousInterval[0]), Math.max(currentInterval[1], previousInterval[1])]
                    this._currentIntervalSet.splice(cIdx, 1);
                    continue;
                } else { break; } // As entries are organised in ascending order, so if we've merged our intial target and find no other matches, we are finished
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
        // TODO
        /**
         * Similar principles apply here to the merge intervals in that
         * 1) There a several distinct cases, a) exists in space between intervals, b) exists across one interval, c) exists across many intervals
         * 2) In some cases we will need to iterate through some of if not all of the interval set when running a demerge, and in others we won't.
         * 
         * First, determine what kind of demerge we need to do
         * If the interval to remove exists between two intervals, we don't need to do anything. We can return
         * 
         * If the interval to remove is fully contained within one interval, 
         * we can then split that interval into one or two parts and then nothing further is needed. We can return
         * edge case here is where the interval to remove fully matches one interval. Here we need to remove that interval from the set entirely and then return.
         * 
         * If the interval to remove is partially contained within one interval then
         *  - remove the part that overlaps from the current interval set
         *  - iterate to the next interval in the set and see if there is overlap (repeating previous steps)
         *  - as soon as we no longer find any overlap, we can stop and return
         */
    }


}