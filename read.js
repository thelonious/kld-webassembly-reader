#!/usr/bin/env node

let WasmReader = require('./lib/WasmReader');
    

let reader = new WasmReader();

if (process.argv.length > 2) {
    let filename = process.argv[2];

    console.error("processing", filename);
    reader.readFile(filename);

    reader.sections.forEach(section => {
        console.log();
        console.log(section.toString());
    });
}
else {
    console.error("usage: read <wasm-file>");
}
