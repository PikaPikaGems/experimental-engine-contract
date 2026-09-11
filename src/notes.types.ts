import type { Kanji, Result, StudyError, UTCTimestamp } from "./primitives.types";
import type { QueryStore } from "./query.types";

export type NoteError =
  | StudyError
  | { code: "unsupported_kanji"; kanji: Kanji }
  | { code: "validation_failed"; reason: "length_exceeded" }
  | { code: "stale_version" };

export type KanjiNoteView = {
  kanji: Kanji;
  content: string;
  hasMergedEdit: boolean;
  mergedAt?: UTCTimestamp;
  status: "pending-sync" | "synced";
  /**
   * This note row's `serverRevision` (0 until the backend has acknowledged
   * the row). Pass it back as `expectedRevision` on every `save()`.
   */
  revision: number;
};

export type SaveNoteInput = {
  kanji: Kanji;
  content: string;
  /** From `KanjiNoteView.revision`, or `0` when `watch()` is null. */
  expectedRevision: number;
};

export type NotesApi = {
  notesMaxUtf8Bytes: number;
  watch(kanji: Kanji): QueryStore<KanjiNoteView | null>;
  save(input: SaveNoteInput): Promise<Result<KanjiNoteView | null, NoteError>>;
};
