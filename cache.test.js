const Cache = require('./cache').default;


const createCache = () => {    
    return new Cache(4);
}

describe('lru cache', () => {
    test('read a should return 10 for { a: 10, b: 15 }', () => {
        const c = createCache();
        c.write('a', 10);
        expect(c.read('a')).toBe(10);
    });

    test('read a should return null for { b: 15 }', () => {
        const c = createCache();
        c.write('b', 15);
        expect(c.read('a')).toBe(null);
    });

    test('write(a, 10) should produce { a: 10  }', () => {
        const c = createCache();
        c.write('a', 10);
        expect(c.toObject()).toStrictEqual({ a: 10});
    });

    test('delete(a) for { a: 10, b: 15 } should produce { b: 15 }', () => {
        const c = createCache();
        c.write('a', 10);
        c.write('b', 15);
        c.delete('a');
        expect(c.toObject()).toStrictEqual({ b: 15 });
    });

    test('count() for { a: 10, b: 15 } should be 2', () => {
        const c = createCache();
        c.write('a', 10);
        c.write('b', 15);
        expect(c.count()).toBe(2);
    });

    test('clear() for { a: 10, b: 15 } should empty the cache', () => {
        const c = createCache();
        c.write('a', 10);
        c.write('b', 15);
        c.clear()
        expect(c.count()).toBe(0);
    });


    test('for new Cache(4) { a: 1, b: 2 , c: 3, d: 4 } when write(e, 5) a should become {  b: 2 , c: 3, d: 4, e: 5 } ', () => {
        const c = createCache();
        c.write('a', 1);
        c.write('b', 2);
        c.write('c', 3);
        c.write('d', 4);
        c.write('e', 5);
        expect(c.toObject()).toStrictEqual({  b: 2 , c: 3, d: 4, e: 5 });
    });
  });
