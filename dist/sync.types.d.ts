import type { CardType, Kanji, UnixMs } from "./primitives.types";
import type { OperationFailureCode, SyncOperation } from "./operations.types";
export type CatchUpRequiredError = {
    code: "catch_up_required";
    retryable: false;
};
export type SyncError = {
    code: "sync_failed";
    diagnosticId: string;
    retryable: boolean;
};
export type SyncStatusError = SyncError | CatchUpRequiredError;
export type SyncOutcome = {
    serverRevision: number;
    completedAt: UnixMs;
    mode: "incremental" | "bootstrap";
};
export type SyncStatusBase = {
    serverRevision: number;
    lastSyncedAt?: UnixMs;
    pendingOperationsCount: number;
    oldestPendingOperationAgeMs?: number;
    /**
     * True after the backend reported a device sequence gap. Sync keeps pulling
     * but no longer uploads; pending operations stay local until the host
     * clears local data (`auth.logout({ clearLocalData: true })`) and signs in
     * again on a fresh device id.
     */
    pushBlocked: boolean;
    contentVersions: {
        kanjiCorpus: string;
    };
};
export type SyncStatus = (SyncStatusBase & {
    state: "idle";
}) | (SyncStatusBase & {
    state: "syncing";
    mode: "incremental" | "bootstrap";
}) | (SyncStatusBase & {
    state: "failed";
    mode: "incremental" | "bootstrap";
    error: SyncStatusError;
});
export type OutboxStatus = SyncStatus & {
    pendingSyncOperations: SyncOperation[];
};
export type FailedOpsCount = {
    count: number;
    permanentCount: number;
    lastUpdatedAt?: UnixMs;
};
export type RecentFailedOperation = {
    operationId: string;
    sequence: number;
    operationType: SyncOperation["type"];
    subject?: {
        kanji?: Kanji;
        cardType?: CardType;
        challengeId?: number;
    };
    /** Outbox snapshot so a permanently rejected note/word can be copied. */
    payload?: SyncOperation;
    code: OperationFailureCode;
    diagnosticId?: string;
    failedAt: UnixMs;
    state: "retryable-pending" | "permanently-rejected";
};
//# sourceMappingURL=sync.types.d.ts.map