 class Cache {
    _maxRecords = 0;
    _innerData = new Map();
    constructor(maxRecords = 10) {
        this._maxRecords = maxRecords;
    }
    delete(key) {
        this._innerData.delete(key);
    }
    count() {
        return this._innerData.size;
    }
    clear() {
        this._innerData.clear();
    }
    write(key, value) {
        this._innerData.delete(key);
        this._innerData.set(key, value);
        if (this._innerData.size > this._maxRecords) {
            const k = this._innerData.keys().next().value;
            this.delete(k);
        }
    }
    read(key) {
       const value = this._innerData.get(key);
       if (value !== undefined) {
            this._innerData.delete(key);
            this._innerData.set(key, value);
        }
        return value ?? null;
    }

    toObject() {
        return Object.fromEntries(this._innerData)
    }
}
exports.default = Cache;
