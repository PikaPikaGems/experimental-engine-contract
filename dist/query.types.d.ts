import type { Result } from "./primitives.types";
export type QuerySnapshot<T> = {
    status: "loading";
} | {
    status: "ready";
    result: Result<T>;
} | {
    status: "failed";
    diagnosticId: string;
    retryable: boolean;
};
export type QueryStore<T> = {
    getSnapshot(): QuerySnapshot<T>;
    subscribe(listener: () => void): () => void;
    refresh(): Promise<void>;
};
//# sourceMappingURL=query.types.d.ts.map