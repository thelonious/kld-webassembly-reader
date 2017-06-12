#!/usr/bin/env node

let fs = require('fs'),
    ReadBuffer = require('./ReadBuffer');
    

let sectionClasses = [
    require('./sections/CustomSection'),
    require('./sections/TypeSection'),
    require('./sections/ImportSection'),
    require('./sections/FunctionSection'),
    require('./sections/TableSection'),
    require('./sections/MemorySection'),
    require('./sections/GlobalSection'),
    require('./sections/ExportSection'),
    require('./sections/StartSection'),
    require('./sections/ElementSection'),
    require('./sections/CodeSection'),
    require('./sections/DataSection')
];

let bytes = fs.readFileSync("./counter.wasm");
let reader = new ReadBuffer(bytes);
let sectionCount = 0;

console.log("magic = %s", reader.readUInt32().toString(16));
console.log("version = %s", reader.readUInt32());

while (!reader.eof()) {
    let startPosition = reader.position();
    let id = reader.readVarUint(7);
    let payload_len = reader.readVarUint(32);

    console.log();
    console.log("#%d: type=%d", sectionCount, id);
    console.log("payload_len = %s", payload_len);

    if (id === 0) {
        let startPosition = reader.position();
        let name_len = reader.readVarUint(32);
        let name = reader.readBytesAsUTFString(name_len);

        console.log("name_len = %s", name_len);
        console.log("name = %s", name);

        reader.seek(startPosition);
    }

    let payloadBuffer = reader.readBytesIntoReadBuffer(payload_len);
    let section = new sectionClasses[id]();
    section.read(payloadBuffer);

    sectionCount++;

    if (reader.position() === startPosition) {
        console.log("Aborting because reader did not advance when reading the last section");
        break;
    }
    if (reader.position() < startPosition) {
        console.log("Aborting because reader moved backwards when reading the last section");
        break;
    }
}

console.log("done");
