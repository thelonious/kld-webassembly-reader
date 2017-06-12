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

class WasmReader {
    constructor() {
        this.magic = null;
        this.version = null;
        this.sections = [];
    }

    readFile(filename) {
        let bytes = fs.readFileSync("./counter.wasm");
        let reader = new ReadBuffer(bytes);
        
        this.magic = reader.readUInt32();
        this.version = reader.readUInt32();

        while (reader.eof === false) {
            let startPosition = reader.position;
            let id = reader.readVarUint(7);
            let payload_len = reader.readVarUint(32);
            let payloadBuffer = reader.readBytesIntoReadBuffer(payload_len);
            let section = new sectionClasses[id]();

            section.read(payloadBuffer);
            
            this.sections.push(section);

            if (reader.position === startPosition) {
                console.log("Aborting because reader did not advance when reading the last section");
                break;
            }
            if (reader.position < startPosition) {
                console.log("Aborting because reader moved backwards when reading the last section");
                break;
            }
        }
    }
};

module.exports = WasmReader;
