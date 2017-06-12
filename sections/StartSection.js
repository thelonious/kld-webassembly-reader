let ReadBuffer = require('../ReadBuffer');

class StartSection {
    read(buffer) {
        let index = buffer.readVarUint(32);
        console.log("index = %d", index);
    }
}

module.exports = StartSection;
