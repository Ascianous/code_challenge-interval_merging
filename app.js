import { IntervalManager } from "./interval_manager.js";
const intervalManager = new IntervalManager();
intervalManager.addInterval([2, 3]);
console.log(intervalManager.getIntervals());
intervalManager.addInterval([5, 6]);
intervalManager.addInterval([8, 9]);
console.log(intervalManager.getIntervals());
intervalManager.addInterval([3, 5]);
console.log(intervalManager.getIntervals());
