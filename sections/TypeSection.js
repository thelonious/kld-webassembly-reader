let ReadBuffer = require('../ReadBuffer');

class TypeSection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("type count = %d", count);

        for (var i = 0; i < count; i++) {
            console.log("type %d", i);

            let form = buffer.readVarInt(7);
            console.log("form = %d", form);

            let param_count = buffer.readVarUint(32);
            console.log("param_count = %d", param_count);

            for (var j = 0; j < param_count; j++) {
                let value_type = buffer.readVarInt(7);
                console.log("value_type = %d", value_type);
            }

            let return_count = buffer.readVarUint(1);
            console.log("return_count = %d", return_count);

            if (return_count === 1) {
                let value_type = buffer.readVarInt(7);
                console.log("value_type = %d", value_type);
            }
        }
    }
}

module.exports = TypeSection;
