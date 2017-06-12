let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class ExportSection extends Section {
    constructor() {
        super(7);
        this.fields = [];
    }

    get typeName() {
        return "ExportSection";
    }

    read(buffer) {
        let count = buffer.readVarUint(32);

        for (var i = 0; i < count; i++) {
            let field = {};

            let field_len = buffer.readVarUint(32);
            field.str = buffer.readBytesAsUTFString(field_len);
            field.kind = buffer.readUInt8();
            field.index = buffer.readVarUint(32);

            this.fields.push(field);
        }
    }

    toString() {
        let parts = [super.toString()];

        parts = parts.concat(
            this.fields.map(field => JSON.stringify(field))
        );

        return parts.join("\n  ");
    }
}

module.exports = ExportSection;
