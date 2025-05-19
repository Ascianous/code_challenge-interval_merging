import { IntervalManager } from "../interval_manager.js";
import { describe, it } from "node:test";
import assert from "node:assert";

describe("interval manager class", ()=>{
    it("should error if interval is invalid: incorrectly ordered entries", ()=>{
        const intervalManager = new IntervalManager();
        assert.throws(()=>{ intervalManager.addInterval([2,0])});
        assert.throws(()=>{ intervalManager.addInterval([undefined, "test"])});
    })

    it("should error if interval is invalid: entries are not numbers", ()=>{
        const intervalManager = new IntervalManager();
        assert.throws(()=>{ intervalManager.addInterval([undefined, "test"])});
    })

    it("should return a single interval for one addInterval call)", ()=>{
        const intervalManager = new IntervalManager();
        intervalManager.addInterval([1,2]);
        assert.deepStrictEqual(intervalManager.getIntervals(), [[1,2]]);
    });

    it("should return multiple intervals for multiple addInterval calls (non-overlapping intervals)", ()=>{
        const intervalManager = new IntervalManager();
        intervalManager.addInterval([1,2]);
        intervalManager.addInterval([3,4]);
        assert.deepStrictEqual(intervalManager.getIntervals(), [[1,2],[3,4]]);
    })

    it("should return a single interval for two overlapping addInterval calls", ()=>{
        const intervalManager = new IntervalManager();
        intervalManager.addInterval([1,2]);
        intervalManager.addInterval([2,3]);
        assert.deepStrictEqual(intervalManager.getIntervals(), [[1,3]]);
    })

    
});