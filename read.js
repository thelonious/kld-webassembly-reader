#!/usr/bin/env node

let WasmReader = require('./lib/WasmReader');
    

let reader = new WasmReader();

reader.readFile('./counter.wasm');

reader.sections.forEach(section => {
    console.log();
    console.log(section.toString());
});
