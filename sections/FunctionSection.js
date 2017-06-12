let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class FunctionSection extends Section {
    constructor() {
        super(3);
        this.types = [];
    }

    get typeName() {
        return "FunctionSection";
    }

    read(buffer) {
        let count = buffer.readVarUint(32);

        for (var i = 0; i < count; i++) {
            this.types.push(buffer.readVarUint(32));
        }
    }

    toString() {
        let parts = [super.toString()];

        parts = parts.concat(this.types);

        return parts.join("\n  ");
    }
}

module.exports = FunctionSection;
