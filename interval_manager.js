export class IntervalManager {
    _currentIntervalSet;
    _queuedAddIntervals;
    _queuedRemoveIntervals;
    constructor() {
        this._currentIntervalSet = [];
        this._queuedAddIntervals = [];
        this._queuedRemoveIntervals = [];
    }
    addInterval(interval) {
        if (!this.isIntervalValid(interval))
            throw Error;
        this._queuedAddIntervals.push(interval);
        if (this._queuedAddIntervals.length == 1)
            this.runAddQueue();
        return;
    }
    removeInterval(interval) {
    }
    getIntervals() {
        return this._currentIntervalSet;
    }
    runAddQueue() {
        this.mergeIntervals();
        this._queuedAddIntervals.shift();
        if (this._queuedAddIntervals.length > 0)
            return this.runAddQueue();
        return;
    }
    isIntervalValid(interval) {
        if (!isNaN(interval[0]) && !isNaN(interval[1]) && interval[0] < interval[1])
            return true;
        return false;
    }
    mergeIntervals() {
        const intervalToMerge = this._queuedAddIntervals[0];
        if (!intervalToMerge)
            return;
        if (this._currentIntervalSet.length == 0 || intervalToMerge[1] < this._currentIntervalSet[0][0]) {
            this._currentIntervalSet.unshift(intervalToMerge);
            return;
        }
        let cIdx = 0;
        let haveMergedNewInterval = false;
        while (cIdx < this._currentIntervalSet.length) {
            const currentInterval = this._currentIntervalSet[cIdx];
            if (!currentInterval)
                throw Error;
            if (!haveMergedNewInterval) {
                if (this.inRange(currentInterval[0], intervalToMerge[0], intervalToMerge[1]) || this.inRange(currentInterval[1], intervalToMerge[0], intervalToMerge[1])) {
                    this._currentIntervalSet[cIdx] = [Math.min(currentInterval[0], intervalToMerge[0]), Math.max(currentInterval[1], intervalToMerge[1])];
                    haveMergedNewInterval = true;
                }
                else if (currentInterval[1] < intervalToMerge[0] && (this._currentIntervalSet[cIdx + 1] == undefined || intervalToMerge[1] < this._currentIntervalSet[cIdx + 1][0])) {
                    this._currentIntervalSet.splice(cIdx + 1, 0, intervalToMerge);
                    break;
                }
            }
            else {
                const previousInterval = this._currentIntervalSet[cIdx - 1];
                if (!previousInterval)
                    throw Error;
                if (this.inRange(currentInterval[0], previousInterval[0], previousInterval[1]) || this.inRange(currentInterval[1], previousInterval[0], previousInterval[1])) {
                    this._currentIntervalSet[cIdx - 1] = [Math.min(currentInterval[0], previousInterval[0]), Math.max(currentInterval[1], previousInterval[1])];
                    this._currentIntervalSet.splice(cIdx, 1);
                    continue;
                }
                else {
                    break;
                }
            }
            ++cIdx;
        }
        return;
    }
    inRange(value, min, max) {
        if (value >= min && value <= max)
            return true;
        return false;
    }
    demergeIntervals() {
    }
}
