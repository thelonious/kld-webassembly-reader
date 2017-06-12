module.exports = class Section {
    constructor(id) {
        this.id = id;
    }

    get typeName() {
        return "<unknown>";
    }

    toString() {
        return `${this.typeName}(${this.id})`;
    }
}
