let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class TypeSection extends Section {
    constructor() {
        super(1);
        this.types = null;
    }

    get typeName() {
        return "TypeSection";
    }
    
    read(reader) {
        let count = reader.readVarUint(32);

        this.types = [];

        for (var i = 0; i < count; i++) {
            let type = {
                form: reader.readVarInt(7),
                params: [],
                returns: []
            };

            let param_count = reader.readVarUint(32);

            for (var j = 0; j < param_count; j++) {
                type.params.push(reader.readVarInt(7));
            }

            let return_count = reader.readVarUint(1);

            if (return_count === 1) {
                type.returns.push(reader.readVarInt(7));
            }

            this.types.push(type);
        }
    }

    toString() {
        var parts = [super.toString()];

        parts = parts.concat(
            this.types.map(type => JSON.stringify(type))
        );

        return parts.join("\n  ");
    }
}

module.exports = TypeSection;
