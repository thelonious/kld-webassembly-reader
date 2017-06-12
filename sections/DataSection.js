let ReadBuffer = require('../ReadBuffer');

class DataSection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("count = %d", count);

        for (var i = 0; i < count; i++) {
            console.log("entry %d", i);

            let index = buffer.readVarUint(32);
            console.log("  index = %d", index);

            // do {
                var byte = buffer.readUInt8();
                console.log("  byte = %s", byte.toString(16));
            // } while (byte !== 0);

            let size = buffer.readVarUint(32);
            console.log("  size = %d", size);

            let bytes = buffer.readBytes(size);
        }
    }
}

module.exports = DataSection;
