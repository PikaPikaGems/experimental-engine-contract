import type { CardType, FsrsRating, IanaTimeZone, Kanji, ReviewSettings, UnixMs, UTCTimestamp } from "./primitives.types";
export type OperationMetadata = {
    operationId: string;
    clientUpdatedAt: UTCTimestamp;
    timezone: IanaTimeZone;
};
export type NoteSaveOperation = OperationMetadata & {
    type: "note-save";
    kanji: Kanji;
    content: string;
    baseRevision: number;
};
export type BookmarkSaveOperation = OperationMetadata & {
    type: "bookmark-save";
    kanji: Kanji;
    isActive: boolean;
};
export type ReviewSettingsUpdateOperation = OperationMetadata & {
    type: "review-settings-update";
    settings: ReviewSettings;
};
export type ReviewPileAddOperation = OperationMetadata & {
    type: "review-pile-add";
    kanji: Kanji;
    word: string;
};
export type ReviewPileRemoveOperation = OperationMetadata & {
    type: "review-pile-remove";
    kanji: Kanji;
};
export type ReviewGradeOperation = OperationMetadata & {
    type: "review-grade";
    kanji: Kanji;
    cardType: CardType;
    grade: FsrsRating;
};
export type SpeedKatakanaOperation = OperationMetadata & {
    type: "speed_katakana_session_completed";
    challengeId: number;
    startedAt: UnixMs;
    endedAt: UnixMs;
    accuracyVal: number;
    cpmVal: number;
    pointerType: "fine" | "coarse";
};
export type SpeakingPracticeOperation = OperationMetadata & {
    type: "speaking_practice_session_completed";
    challengeId: number;
    startedAt: UnixMs;
    endedAt: UnixMs;
};
export type ReadingPracticeOperation = OperationMetadata & {
    type: "reading_practice_round_completed";
    startedAt: UnixMs;
    endedAt: UnixMs;
    correctCount: number;
    attemptedCount: number;
};
export type WritingPracticeOperation = OperationMetadata & {
    type: "writing_practice_round_completed";
    startedAt: UnixMs;
    endedAt: UnixMs;
    correctCount: number;
    attemptedCount: number;
};
export type SyncOperation = NoteSaveOperation | BookmarkSaveOperation | ReviewSettingsUpdateOperation | ReviewPileAddOperation | ReviewPileRemoveOperation | ReviewGradeOperation | SpeedKatakanaOperation | SpeakingPracticeOperation | ReadingPracticeOperation | WritingPracticeOperation;
export type OperationFailureCode = "validation_failed" | "premium_lapsed" | "stale_session" | "schema_version_mismatch" | "unknown_operation_error";
//# sourceMappingURL=operations.types.d.ts.map