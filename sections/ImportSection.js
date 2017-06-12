let ReadBuffer = require('../ReadBuffer');

let FUNCTION = 0,
    TABLE = 1,
    MEMORY = 2,
    GLOBAL = 3;

class ImportSection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("count = %d", count);

        for (var i = 0; i < count; i++) {
            console.log("import entry %d", i);

            let module_len = buffer.readVarUint(32);
            console.log("  module_len = %d", module_len);

            let module_str = buffer.readBytesAsUTFString(module_len);
            console.log("  module_str = %s", module_str);

            let field_len = buffer.readVarUint(32);
            console.log("  field_len = %d", field_len);

            let field_str = buffer.readBytesAsUTFString(field_len);
            console.log("  field_str = %s", field_str);

            let kind = buffer.readUInt8();

            switch (kind) {
                case FUNCTION:
                    console.log("  function kind");
                    let type_number = buffer.readVarUint(32);
                    console.log("    type_number = %d", type_number);
                    break;

                case TABLE:
                    console.log("    table kind");
                    let table_type = buffer.readTableType();
                    console.log("    table_type = %s", JSON.stringify(table_type));
                    break;

                case MEMORY:
                    console.log("  memory kind");
                    let resizable_limits = buffer.readResizableLimits();
                    console.log("     %s", JSON.stringify(resizable_limits));
                    break;

                case GLOBAL:
                    console.log("  global kind");
                    let global_type = buffer.readGlobalType();
                    console.log("    global_type = %s", JSON.stringify(global_type));
                    break;

                default:
                    console.error("unknown kind: %d", kind);
            }
        }
    }
}

module.exports = ImportSection;
