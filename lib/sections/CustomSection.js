let Section = require('./Section'),
    ReadBuffer = require('../ReadBuffer');

class CustomSection extends Section {
    constructor() {
        super(0);
        this.name = null;
        this.payload = null;
    }

    get typeName() {
        return "CustomSection";
    }
    
    read(reader) {
        let name_len = reader.readVarUint(32);
        
        this.name = reader.readBytesAsUTFString(name_len);
        this.payload = reader.readBytes(reader.length - reader.position);
    }

    toString() {
        let parts = [super.toString(), this.name];
        let bytes = [];

        for (var i = 0; i < this.payload.length; i++) {
            let byte = this.payload.readUInt8(i);

            bytes.push(byte.toString().toUpperCase());
        }

        parts.push(bytes);

        return parts.join("\n  ");
    }
}

module.exports = CustomSection;
