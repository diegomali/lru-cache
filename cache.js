 class Cache {
    _maxRecords = 0;
    _innerData = new Map();
    _keys = [];
    constructor(maxRecords = 10) {
        this._maxRecords = maxRecords;
    }

    delete(key) {
        this._keys = this._keys.filter((x) => x !== key);
        this._innerData.delete(key);
    }

    count() {
        return this._innerData.size;
    }

    clear() {
        this._keys.length = 0;
        this._innerData.clear();
    }

    write(key, value) {
        this._keys.push(key);
        this._innerData.set(key, value);
        if (this._keys.length > this._maxRecords) {
            const k = this._keys.shift();
            this.delete(k);
        }
    }

    read(key) {
        return this._innerData.get(key) ?? null;
    }

    toObject() {
        return this._keys.reduce((x, key) => {
            const value = this.read(key);
            x[key] = value;
            return x;
        }, {});
    }
}

exports.default = Cache;