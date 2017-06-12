let ReadBuffer = require('../ReadBuffer');

class ElementSection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("count = %d", count);

        for (var i = 0; i < count; i++) {
            console.log("element %d", i);
            let index = buffer.readVarUint(32);
            console.log("  index = %d", index);
            // do {
                var byte = buffer.readUInt8();
                console.log("  byte = %s", byte.toString(16));
            // } while (byte !== 0);
            
            let num_elem = buffer.readVarUint(32);
            console.log("  num_elem = %d", num_elem);

            for (var j = 0; j < num_elem; j++) {
                console.log("  element %d", j);
                let elem = buffer.readVarUint(32);
                console.log("    elem = %d", elem);
            }
        }
    }
}

module.exports = ElementSection;
