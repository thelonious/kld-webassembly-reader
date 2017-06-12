let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class MemorySection extends Section {
    constructor() {
        super(5);
        this.entries = [];
    }

    get typeName() {
        return "MemorySection";
    }

    read(buffer) {
        let count = buffer.readVarUint(32);

        for (var i = 0; i < count; i++) {
            this.entries.push(buffer.readResizableLimits());
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

module.exports = MemorySection;
