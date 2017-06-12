let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class CodeSection extends Section {
    constructor() {
        super(10);
        this.bodies = [];
    }

    get typeName() {
        return "CodeSection";
    }

    read(buffer) {
        let count = buffer.readVarUint(32);

        for (var i = 0; i < count; i++) {
            let body = {
                size: buffer.readVarUint(32),
                local_count: buffer.readVarUint(32),
                local_entry_count: buffer.readVarUint(32),
                local_type: buffer.readVarUint(7),
                bytes: []
            }

            do {
                var byte = buffer.readUInt8();
                
                body.bytes.push(byte);
            } while (byte !== 0x0b);

            this.bodies.push(body);
        }
    }

    toString() {
        let parts = [super.toString()];

        parts = parts.concat(
            this.bodies.map(body => JSON.stringify(body))
        );

        return parts.join("\n  ");
    }
}

module.exports = CodeSection;
