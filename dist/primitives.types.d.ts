export type UnixMs = number;
export type LocalDate = string;
/**
 * RFC 3339 UTC with a trailing `Z` and millisecond precision, exactly as
 * `Date.prototype.toISOString()` produces. The engine compares these as
 * strings (due-card index, "latest" picks), so the backend must emit this
 * form; anything else is normalized on receipt where possible.
 */
export type UTCTimestamp = string;
export type IanaTimeZone = string;
export type TotalDays = number;
export type Kanji = string;
export type CardType = "reading" | "writing";
export type FsrsRating = "again" | "hard" | "good" | "easy";
export type FsrsLearningState = "new" | "learning" | "review" | "relearning";
export type Result<T, E = {
    code: string;
}> = {
    ok: true;
    value: T;
} | {
    ok: false;
    error: E;
};
export type ReviewSummary = {
    again?: number;
    hard?: number;
    good?: number;
    easy?: number;
};
/**
 * Scheduling settings. Client (ts-fsrs) and backend (py-fsrs) must produce
 * identical schedules from these, so every field has one meaning on both sides:
 *
 * - `enableFuzz`: both sides disable their library's fuzz and apply the shared
 *   deterministic fuzz described in ENGINE.md ("How Enable Fuzz works").
 * - Step arrays are always present; an empty array means no steps. Each array
 *   has at most 10 entries, and each step is a whole number from 1 through
 *   1439 minutes. There is no separate short-term switch: a host toggle for
 *   "learning steps" sends empty arrays when off and the user's step values
 *   when on.
 */
export type ReviewSettings = {
    requestRetention: number;
    maximumIntervalDays: number;
    enableFuzz: boolean;
    learningStepsMinutes: number[];
    relearningStepsMinutes: number[];
    modelWeights: number[];
};
export type StudyError = {
    code: "storage_quota";
} | {
    code: "outbox_full";
} | {
    code: "outbox_stale";
} | {
    code: "stale_session";
} | {
    code: "no_active_session";
} | {
    code: "premium_lapsed";
} | {
    code: "cache_rebuilding";
};
/** Standing write-gate for `auth.watchStatus()`. */
export type WriteAccess = {
    allowed: true;
} | {
    allowed: false;
    reason: "outbox_full" | "outbox_stale" | "premium_lapsed" | "storage_quota" | "cache_rebuilding";
};
export type ReviewSettingsCompatibility = {
    status: "compatible";
} | {
    status: "update_required";
    clientVersion: number;
    requiredVersion: number;
};
export type AuthStatus = {
    status: "no_active_session";
} | {
    /**
     * The active account's local database could not be opened. The host can
     * preserve it for a later retry with `auth.logout()`, or delete it after
     * confirmation with `auth.logout({ clearLocalData: true })`.
     */
    status: "local_cache_recovery_required";
    diagnosticId: string;
} | {
    status: "active_session";
    userId: string;
    expiresAt: UTCTimestamp;
    writeAccess: WriteAccess;
    reviewSettings: ReviewSettingsCompatibility;
};
export type PremiumEntitlement = {
    product: string;
    status: "active" | "lapsed" | "none";
    grantedAt?: UTCTimestamp;
    expiresAt?: UTCTimestamp;
};
//# sourceMappingURL=primitives.types.d.ts.map