let ReadBuffer = require('../ReadBuffer');

class MemorySection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("count = %d", count);

        for (var i = 0; i < count; i++) {
            console.log("entry %d", i);
            let entry = buffer.readResizableLimits();

            console.log("entry = %d", JSON.stringify(entry));
        }
    }
}

module.exports = MemorySection;
