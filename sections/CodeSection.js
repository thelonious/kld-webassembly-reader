let ReadBuffer = require('../ReadBuffer');

class CodeSection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("count = %d", count);

        // TODO: read function bodies
    }
}

module.exports = CodeSection;
