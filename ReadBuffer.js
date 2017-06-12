let util = require('util');

module.exports = class ReadBuffer {
    constructor(buffer) {
        this.buffer = buffer;
        this.offset = 0;
    }

    eof() {
        return this.offset >= this.buffer.length;
    }

    position() {
        return this.offset;
    }

    seek(position) {
        if (0 <= position && position <= this.buffer.length) {
            this.offset = position;
        }
        else {
            throw new Error(
                util.format(
                    "seek position out of range. %d is not in [%d,%d]",
                    position,
                    0,
                    this.buffer.length
                )
            );
        }
    }

    peekUInt8() {
        return this.buffer.readUInt8(this.offset);
    }

    readVarInt(bitCount) {
        var result = 0;
        var shift = 0;
        var sign_flag = false;

        while (shift < bitCount) {
            let byte = this.readUInt8();

            result |= ((byte & 0x7F) << shift);
            shift += 7;

            if ((byte & 0x80) === 0) {
                sign_flag = (byte & 0x40) === 0x40;
                break;
            }
        }

        if (sign_flag) {
            result |= (-1 << shift);
        }

        return result;
    }

    readVarUint(bitCount) {
        var result = 0;
        var shift = 0;

        while (shift < bitCount) {
            let byte = this.readUInt8();

            result |= ((byte & 0x7F) << shift);
            shift += 7;

            if ((byte & 0x80) === 0) {
                break;
            }
        }

        return result;
    }

    readUInt8() {
        return this.buffer.readUInt8(this.offset++);
    }

    readInt16() {
        let result = this.buffer.readInt16LE(this.offset);

        this.offset += 2;

        return result;
    }

    readUInt16() {
        let result = this.buffer.readUInt16LE(this.offset);

        this.offset += 2;

        return result;
    }

    readInt32() {
        let result = this.buffer.readInt32LE(this.offset);

        this.offset += 4;

        return result;
    }

    readUInt32() {
        let result = this.buffer.readUInt32LE(this.offset);

        this.offset += 4;

        return result;
    }

    readFloat() {
        let result = this.buffer.readFloatLE(this.offset);

        this.offset += 4;

        return result;
    }

    readDouble() {
        let result = this.buffer.readDoubleLE(this.offset);

        this.offset += 8;

        return result;
    }

    readUTFString() {
        let length = this.readInt16();
        var result = null;

        if (length > 0) {
            let characterBuffer = this.readBytes(length);

            result = characterBuffer.toString('utf-8');
        }

        return result;
    }

    readBytesAsUTFString(length) {
        return this.readBytes(length).toString("utf-8");
    }

    readBytes(length) {
        let result = this.buffer.slice(this.offset, this.offset + length);

        this.offset += length;

        return result;
    }

    readBytesIntoReadBuffer(length) {
        return new ReadBuffer(this.readBytes(length));
    }

    readResizableLimits() {
        var result = {
            flags: this.readVarUint(1),
            initial: this.readVarUint(32)
        }

        if (result.flags === 1) {
            result.maximum = this.readVarUint(32);
        }

        return result;
    }

    readTableType() {
        return {
            elem_type: this.readVarUint(7),
            resizable_limits: this.readResizableLimits()
        };
    }

    readGlobalType() {
        return {
            content_type: this.readVarInt(7),
            mutability: this.readVarUint(1)
        };
    }
};
