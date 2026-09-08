import type {
  PremiumEntitlement,
  ReviewSettings,
  UTCTimestamp,
} from "./primitives.types";

/**
 * Host-facing auth failures. Wire codes include `retryable` so the host can
 * tell a wrong PIN from a retryable network/server problem. Local codes have
 * no `retryable` field. These are the codes the engine already returns;
 * documenting them is not an EngineAPI version bump.
 */
export type AuthError =
  | {
      code: "authentication_failed";
      retryable: false;
      diagnosticId?: string;
    }
  | { code: "network_error"; retryable: true; diagnosticId?: string }
  | { code: "rate_limited"; retryable: true; diagnosticId?: string }
  | {
      code: "temporarily_unavailable";
      retryable: true;
      diagnosticId?: string;
    }
  | { code: "malformed_response"; retryable: true }
  | { code: "session_active" }
  | { code: "account_cache_full" }
  | { code: "local_cache_unreadable" }
  | { code: "storage_quota" }
  | { code: "stale_session" };

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
