let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class DataSection extends Section {
    constructor() {
        super(11);
        this.entries = [];
    }

    get typeName() {
        return "DataSection";
    }

    read(buffer) {
        let count = buffer.readVarUint(32);

        for (var i = 0; i < count; i++) {
            let entry = {
                index: buffer.readVarUint(32),
                bytes: []
            }

            do {
                var byte = buffer.readUInt8();

                entry.bytes.push(byte);
            } while (byte !== 0x0b);

            let size = buffer.readVarUint(32);

            entry.buffer = buffer.readBytes(size);

            this.entries.push(entry);
        }
    }

    toString() {
        let parts = [super.toString()];

        parts = parts.concat(
            this.entries.map(entry => JSON.stringify(entry))
        );

        return parts.join("\n  ");
    }
}

module.exports = DataSection;
