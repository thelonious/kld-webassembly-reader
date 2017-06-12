let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

let FUNCTION = 0,
    TABLE = 1,
    MEMORY = 2,
    GLOBAL = 3;

class ImportSection extends Section {
    constructor() {
        super(2);
        this.imports = [];
    }

    get typeName() {
        return "ImportSection";
    }

    read(buffer) {
        let count = buffer.readVarUint(32);

        for (var i = 0; i < count; i++) {
            let imp = {};

            let module_len = buffer.readVarUint(32);
            imp.module_str = buffer.readBytesAsUTFString(module_len);

            let field_len = buffer.readVarUint(32);
            imp.field_str = buffer.readBytesAsUTFString(field_len);

            module.kind = buffer.readUInt8();

            switch (module.kind) {
                case FUNCTION:
                    module.type_number = buffer.readVarUint(32);
                    break;

                case TABLE:
                    module.table_type = buffer.readTableType();
                    break;

                case MEMORY:
                    module.resizable_limits = buffer.readResizableLimits();
                    break;

                case GLOBAL:
                    module.global_type = buffer.readGlobalType();
                    break;

                default:
                    console.error("unknown kind: %d", module.kind);
            }

            this.imports.push(imp);
        }
    }

    toString() {
        let parts = [super.toString()];

        parts = parts.concat(
            this.imports.map(imp => `${imp.module_str}.${imp.field_str}`)
        );

        return parts.join("\n  ");
    }
}

module.exports = ImportSection;
