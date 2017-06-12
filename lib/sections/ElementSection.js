let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class ElementSection extends Section {
    constructor() {
        super(9);
        this.entries = [];
    }

    get typeName() {
        return "ElementSection";
    }

    read(buffer) {
        let count = buffer.readVarUint(32);

        for (var i = 0; i < count; i++) {
            let entry = {
                index: buffer.readVarUint(32),
                bytes: [],
                elements: []
            }

            do {
                var byte = buffer.readUInt8();

                element.bytes.push(byte);
            } while (byte !== 0x0b);
            
            let num_elem = buffer.readVarUint(32);

            for (var j = 0; j < num_elem; j++) {
                entry.elements.push(buffer.readVarUint(32));
            }

            this.entries.push(entry);
        }
    }

    toString() {
        let parts = [super.toString()];

        if (this.entries.length > 0) {
            parts = parts.concat(
                this.entries.map(entry => JSON.stringify(entry))
            );
        }
        else {
            parts.push("<empty>");
        }

        return parts.join("\n  ");
    }
}

module.exports = ElementSection;
