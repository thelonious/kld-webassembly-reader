#!/usr/bin/env node

let fs = require('fs'),
    ReadBuffer = require('./lib/ReadBuffer');
    

let sectionClasses = [
    require('./lib/sections/CustomSection'),
    require('./lib/sections/TypeSection'),
    require('./lib/sections/ImportSection'),
    require('./lib/sections/FunctionSection'),
    require('./lib/sections/TableSection'),
    require('./lib/sections/MemorySection'),
    require('./lib/sections/GlobalSection'),
    require('./lib/sections/ExportSection'),
    require('./lib/sections/StartSection'),
    require('./lib/sections/ElementSection'),
    require('./lib/sections/CodeSection'),
    require('./lib/sections/DataSection')
];

let bytes = fs.readFileSync("./counter.wasm");
let reader = new ReadBuffer(bytes);
let sectionCount = 0;

console.log("magic = %s", reader.readUInt32().toString(16));
console.log("version = %s", reader.readUInt32());

while (reader.eof === false) {
    let startPosition = reader.position;
    let id = reader.readVarUint(7);
    let payload_len = reader.readVarUint(32);
    let payloadBuffer = reader.readBytesIntoReadBuffer(payload_len);
    let section = new sectionClasses[id]();

    section.read(payloadBuffer);
    console.log();
    console.log(section.toString());

    sectionCount++;

    if (reader.position === startPosition) {
        console.log("Aborting because reader did not advance when reading the last section");
        break;
    }
    if (reader.position < startPosition) {
        console.log("Aborting because reader moved backwards when reading the last section");
        break;
    }
}
