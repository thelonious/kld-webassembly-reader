let ReadBuffer = require('../ReadBuffer');

class TableSection {
    read(buffer) {
        let count = buffer.readVarUint(32);
        console.log("count = %d", count);

        for (var i = 0; i < count; i++) {
            console.log("table %d", i);
            let table_type = buffer.readTableType();

            console.log("  table_type = %s", JSON.stringify(table_type));
        }
    }
}

module.exports = TableSection;
