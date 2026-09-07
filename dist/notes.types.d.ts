import type { Kanji, Result, StudyError, UTCTimestamp } from "./primitives.types";
import type { QueryStore } from "./query.types";
export type NoteError = StudyError | {
    code: "unsupported_kanji";
    kanji: Kanji;
} | {
    code: "validation_failed";
    reason: "length_exceeded";
};
export type KanjiNoteView = {
    kanji: Kanji;
    content: string;
    hasMergedEdit: boolean;
    mergedAt?: UTCTimestamp;
    status: "pending-sync" | "synced";
};
export type SaveNoteInput = {
    kanji: Kanji;
    content: string;
};
export type NotesApi = {
    notesMaxUtf8Bytes: number;
    watch(kanji: Kanji): QueryStore<KanjiNoteView | null>;
    save(input: SaveNoteInput): Promise<Result<KanjiNoteView | null>>;
};
//# sourceMappingURL=notes.types.d.ts.map