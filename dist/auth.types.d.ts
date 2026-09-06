import type { PremiumEntitlement, ReviewSettings, UTCTimestamp } from "./primitives.types";
export type RequestPinInput = {
    email: string;
    website?: string;
};
export type VerifyPinInput = {
    email: string;
    pin: string;
};
/** Host `auth.logout` input. `clearLocalData` is engine-local only.
 * Default logout discards the outbox and keeps the canonical cache. */
export type LogoutInput = {
    clearLocalData?: boolean;
    allDevices?: boolean;
};
/** Backend logout wire input — no `clearLocalData`. */
export type AuthLogoutTransportInput = Pick<LogoutInput, "allDevices">;
/** `/auth/me` and login payload (ENGINE.md). */
export type UserAppInfoResponse = {
    status?: string;
    session: {
        expiresAt: UTCTimestamp;
    };
    user: {
        userId: string;
        entitlements: PremiumEntitlement[];
    };
    policy: {
        study: {
            notesMaxUtf8Bytes: number;
            reviewSettingsDefaults: ReviewSettings;
        };
        sync: {
            maxPendingOutboxOps: number;
            maxOutboxOpStalenessMs: number;
        };
        userDataEvictionDelayMs: number;
    };
};
//# sourceMappingURL=auth.types.d.ts.map