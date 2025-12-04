declare global {
    interface Object {
        let<T, R>(this: T, block: (it: T) => R): R;

        run<T, R>(this: T, block: (it: T) => R): R;

        also<T>(this: T, block: (it: T) => void): T;

        applyTo<T>(this: T, block: (it: T) => void): T;

        takeIf<T>(this: T, predicate: (it: T) => boolean): T | null;

        takeUnless<T>(this: T, predicate: (it: T) => boolean): T | null;
    }
}

export function registerKotlinExtensions(): void {
    if (Object.prototype.let === undefined) {
        Object.prototype.let = function <T, R>(this: T, block: (it: T) => R): R {
            return block(this);
        };
    }

    if (Object.prototype.run === undefined) {
        Object.prototype.run = function <T, R>(this: T, block: (it: T) => R): R {
            return block(this);
        };
    }

    if (Object.prototype.also === undefined) {
        Object.prototype.also = function <T>(this: T, block: (it: T) => void): T {
            block(this);
            return this
        };
    }

    if (Object.prototype.applyTo === undefined) {
        Object.prototype.applyTo = function <T>(this: T, block: (it: T) => void): T {
            block(this);
            return this
        };
    }

    if (Object.prototype.takeIf === undefined) {
        Object.prototype.takeIf = function <T>(this: T, predicate: (it: T) => boolean): T | null {
            if (this === undefined || this === null) {
                return null;
            } else if (predicate(this)) {
                return this;
            } else {
                return null;
            }
        };
    }

    if (Object.prototype.takeUnless === undefined) {
        Object.prototype.takeUnless = function <T>(this: T, predicate: (it: T) => boolean): T | null {
            if (this === undefined || this === null) {
                return null;
            } else if (!predicate(this)) {
                return this;
            } else {
                return null;
            }
        };
    }

    // console.log("[KotlinTS] Kotlin extensions loaded successfully.");
}

export function withScope<T, R>(obj: T, block: (it: T) => R): R {
    return block(obj);
}

export default { registerKotlinExtensions, withScope }