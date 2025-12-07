export type Continuation<R> = {
    resume: (value: R | PromiseLike<R>) => void,
    resumeWithException: (error: any) => void
}

export function suspendPromise<R>(
    action: (continuation: Continuation<R>) => void
): Promise<R> {
    return new Promise<R>((resolve, reject) => {
        try {
            action({
                resume: (value: R | PromiseLike<R>) => {
                    resolve(value);
                },
                resumeWithException: (error: any) => {
                    reject(error);
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

export default { suspendPromise }