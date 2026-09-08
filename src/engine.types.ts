import type { ActivityApi } from "./activity.types";
import type {
  AuthError,
  LogoutInput,
  RequestPinInput,
  UserAppInfoResponse,
  VerifyPinInput,
} from "./auth.types";
import type { BookmarksApi } from "./bookmarks.types";
import type { NotesApi } from "./notes.types";
import type { AuthStatus, Result } from "./primitives.types";
import type { QueryStore } from "./query.types";
import type { ReviewsApi } from "./reviews.types";
import type {
  FailedOpsCount,
  OutboxStatus,
  RecentFailedOperation,
  SyncError,
  SyncOutcome,
  SyncStatus,
} from "./sync.types";

export type LogLevel = "silent" | "error" | "debug";

/**
 * One row the backend sent that the engine refused to store. Carries only the
 * row's identity — never user-authored text such as a note's content or a pile
 * item's word — so nothing here is private to the person using the app.
 */
export type DroppedEntity = {
  /** The row's `type`, or `"unknown"` when it has none the engine can read. */
  type: string;
  /** Which row it was, e.g. `"水:reading"`. Empty when unreadable. */
  key: string;
  /** First field that failed the check, e.g. `"stability"`. */
  field: string;
};

export type EngineConfig = {
  apiBaseUrl: string;
  logLevel?: LogLevel;
  /**
   * Called once per row the engine drops as malformed. The row is not stored
   * and reaches no query; it stays missing until the backend sends a newer
   * version of it, or the next bootstrap rebuilds the cache.
   *
   * Fires after the page is committed, never inside the write transaction, and
   * anything it throws is ignored so a reporter cannot break sync.
   */
  onDroppedEntity?: (entity: DroppedEntity) => void;
};

export type AuthApi = {
  requestPin(input: RequestPinInput): Promise<Result<void, AuthError>>;
  verifyPin(
    input: VerifyPinInput
  ): Promise<Result<UserAppInfoResponse, AuthError>>;
  logout(input?: LogoutInput): Promise<Result<void, AuthError>>;
  me(): Promise<Result<UserAppInfoResponse, AuthError>>;
  /** Signed out and local-cache recovery are ready values, not QueryStore failures. */
  watchStatus(): QueryStore<AuthStatus>;
};

export type SyncApi = {
  requestSync(): void;
  catchUp(): Promise<Result<SyncOutcome, SyncError>>;
  watchOutbox(input: {
    limit?: number;
    offset?: number;
  }): QueryStore<OutboxStatus>;
  watchStatus(): QueryStore<SyncStatus>;
  watchFailedOpsCount(): QueryStore<FailedOpsCount>;
  recentFailedOperations(): Promise<readonly RecentFailedOperation[]>;
  dismissFailedOperations(operationIds: readonly string[]): Promise<void>;
};

export type EngineAPI = {
  version: string;
  bookmarks: BookmarksApi;
  notes: NotesApi;
  reviews: ReviewsApi;
  activity: ActivityApi;
  auth: AuthApi;
  sync: SyncApi;
};

export type Engine =
  | { type: "unavailable" }
  | { type: "available"; version: string; engine: EngineAPI };

export type CreateEngine = (config: EngineConfig) => Engine;
