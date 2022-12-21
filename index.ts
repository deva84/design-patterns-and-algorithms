import {JobRunner} from "./src/job-runner";
import {PriorityQueue} from "./src/priority-queue";

const priorityQueue = new PriorityQueue();
const jobRunner = new JobRunner(priorityQueue);

/* you may pass second parameter here that will correspond to a number of cycles (or Infinity)
   of job running repetition. Default value is 3
 */
jobRunner.startCircularRunner(50);
