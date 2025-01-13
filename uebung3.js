function logWithTime(logText, counter) {
    console.log(`${new Date().toISOString()} - ${logText} - Counter: ${counter}`);
}

function immediateFunction(counter) {
    logWithTime('Immediate', counter);
}

function timeOutFunction(counter) {
    logWithTime('Timeout', counter);
}

function doHeavy() {
    for (let i = 0; i < 100000000; i++) {} 
}

const fs = require('fs');

function readFile(fileName, counter) {
    const stream = fs.createReadStream(fileName);
 

    stream.on('open', () => {
        doHeavy();
        logWithTime('Open', counter);
    });

    stream.on('data', (chunk) => {
        doHeavy();
        logWithTime('Data', counter);
        console.log(`Inhalt: ${chunk}`); 

    
        if (counter % 3 === 0) {
            setImmediate(() => immediateFunction(counter));
        }
    });

    stream.on('end', () => {
        doHeavy();
        logWithTime('End', counter);
    });

    stream.on('close', () => {
        doHeavy();
        logWithTime('Close', counter);
    });
}

setTimeout(() => timeOutFunction(1), 100);
setTimeout(() => timeOutFunction(2), 3000);

readFile('/Users/hanenhusen/UNI/5.Semester/Web Frameworks/helloWorld.txt', 1);
readFile('/Users/hanenhusen/UNI/5.Semester/Web Frameworks/helloWorld.txt', 2);
readFile('/Users/hanenhusen/UNI/5.Semester/Web Frameworks/helloWorld.txt', 3);
readFile('/Users/hanenhusen/UNI/5.Semester/Web Frameworks/helloWorld.txt', 4);
readFile('/Users/hanenhusen/UNI/5.Semester/Web Frameworks/helloWorld.txt', 5);
