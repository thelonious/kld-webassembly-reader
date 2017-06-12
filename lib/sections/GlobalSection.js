let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class GlobalSection extends Section {
    constructor() {
        super(6);
        this.variables = [];
    }

    get typeName() {
        return "GlobalSection";
    }

    read(buffer) {
        let count = buffer.readVarUint(32);

        for (var i = 0; i < count; i++) {
            let variable = {
                type: buffer.readGlobalType(),
                bytes: []
            };

            do {
                var byte = buffer.readUInt8();
                
                variable.bytes.push(byte);
            } while (byte !== 0x0b);

            this.variables.push(variable);
        }
    }

    toString() {
        let parts = [super.toString()];

        parts = parts.concat(
            this.variables.map(variable => JSON.stringify(variable))
        );

        return parts.join("\n  ");
    }
}

module.exports = GlobalSection;
