import {expect} from "chai";
import {suspendPromise} from "../src";

class TestDelayedCallback<R> {
    private readonly delayedValue: R
    private callback: (value: R) => void = (it) => {}
    constructor(delayedValue: R) {
        this.delayedValue = delayedValue
    }

    public setCallback(callback: (value: R) => void) {
        this.callback = callback
    }

    public get() {
        this.callback(this.delayedValue)
    }
}

const testDelayedCallback = new TestDelayedCallback("abc")

describe('Promise Extensions', () => {
    describe('suspendPromise()', () => {
        it('should resume()', async () => {
            const result = await suspendPromise(continuation => {
                testDelayedCallback.setCallback(it => {
                    continuation.resume(it)
                })

                testDelayedCallback.get()
            })

            expect(result).to.eq("abc")
        });

        it('should resumeWithException()', async () => {
            try {
                await suspendPromise(continuation => {
                    testDelayedCallback.setCallback(it => {
                        continuation.resumeWithException(new Error("Expected"))
                    })
                    testDelayedCallback.get()
                })
            } catch (err) {
                if (err instanceof Error) {
                    expect(err.message).to.equal("Expected")
                } else {
                    expect(err).to.be.instanceof(Error)
                }
            }
        })
    });

});