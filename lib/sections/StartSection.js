let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class StartSection extends Section {
    constructor() {
        super(8);
        this.index = null;
    }

    get typeName() {
        return "StartSection";
    }

    read(buffer) {
        this.index = buffer.readVarUint(32);
    }

    toString() {
        let parts = [super.toString(), this.index];

        return parts.join("\n  ");
    }
}

module.exports = StartSection;
