let ReadBuffer = require('../ReadBuffer');

class GlobalSection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("count = %d", count);

        for (var i = 0; i < count; i++) {
            console.log("variable %d", i);

            let type = buffer.readGlobalType();
            console.log("  type = %s", JSON.stringify(type));

            // do {
                var byte = buffer.readUInt8();
                console.log("  byte = %s", byte.toString(16));
            // } while (byte !== 0);
        }
    }
}

module.exports = GlobalSection;
