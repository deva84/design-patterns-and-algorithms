### How to run circular job runner:
1. Install locally typescript into the folder with project.
2. Compile entry file `index.ts` to .js using `npx tsc index.ts` command.
3. Run `index.js` with a help of `node index.js`. 

### General information:
* You may choose any quantity of jobs to be run (over 0). 
* Jobs running order is based on Node's priority (from 5 to 1) and not Node's value. 
* Number of job running cycles is defaulted to 3. You may change it by passing second parameter to `.startCircularRunner`. 
* If you want to see the circular job running use `Infinity` as a second parameter in `.startCircularRunner` method.
