"use strict";
/**
 * Main entry point for the application
 */
Object.defineProperty(exports, "__esModule", { value: true });
const interval_manager_1 = require("./interval_manager");
const intervalManager = new interval_manager_1.IntervalManager();
intervalManager.addInterval([2, 3]);
console.log(intervalManager.getIntervals());
intervalManager.addInterval([5, 6]);
intervalManager.addInterval([8, 9]);
console.log(intervalManager.getIntervals());
// This interval should require merging
intervalManager.addInterval([3, 5]);
console.log(intervalManager.getIntervals());
