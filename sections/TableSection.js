let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class TableSection extends Section {
    constructor() {
        super(4);
        this.types = [];
    }

    get typeName() {
        return "TableSection";
    }

    read(buffer) {
        let count = buffer.readVarUint(32);

        for (var i = 0; i < count; i++) {
            this.types.push(buffer.readTableType());
        }
    }

    toString() {
        let parts = [super.toString()];

        parts = parts.concat(
            this.types.map(type => JSON.stringify(type))
        );

        return parts.join("\n  ");
    }
}

module.exports = TableSection;
