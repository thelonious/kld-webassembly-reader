let ReadBuffer = require('../ReadBuffer');

let opcodes = require('./opcodes');

class CodeSection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("count = %d", count);

        // TODO: read function bodies
        for (var i = 0; i < count; i++) {
            console.log("function body %d", i);

            let body_size = buffer.readVarUint(32);
            console.log("  body_size = %d", body_size);

            let local_count = buffer.readVarUint(32);
            console.log("  local_count = %d", local_count);

            let local_entry_count = buffer.readVarUint(32);
            console.log("  local_entry_count = %d", local_entry_count);

            let local_type = buffer.readVarUint(7);
            console.log("  local_type = %d", local_type);

            do {
                var byte = buffer.readUInt8();
                let mnemonic = opcodes[byte];

                if (mnemonic !== null) {
                    console.log("  %s", mnemonic);
                }
                else {
                    console.log("  byte = %s", byte.toString(16));
                }
            } while (byte !== 0x0b);
        }
    }
}

module.exports = CodeSection;
