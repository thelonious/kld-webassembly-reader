let ReadBuffer = require('../ReadBuffer');

class ExportSection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("count = %d", count);

        for (var i = 0; i < count; i++) {
            console.log("entry %d", i);
            let field_len = buffer.readVarUint(32);
            console.log("  field_len = %d", field_len);
            let field_str = buffer.readBytesAsUTFString(field_len);
            console.log("  field_str = %s", field_str);
            let kind = buffer.readUInt8();
            console.log("  kind = %d", kind);
            let index = buffer.readVarUint(32);
            console.log("  index = %d", index);
        }
    }
}

module.exports = ExportSection;
