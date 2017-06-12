let ReadBuffer = require('../ReadBuffer');

class FunctionSection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("count = %d", count);

        for (var i = 0; i < count; i++) {
            console.log("type %d", i);

            let type_index = buffer.readVarUint(32);
            console.log("type_index = %d", type_index);
        }
    }
}

module.exports = FunctionSection;
