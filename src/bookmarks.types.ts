import type { Kanji, Result, StudyError } from "./primitives.types";
import type { QueryStore } from "./query.types";

export type BookmarkError =
  StudyError | { code: "unsupported_kanji"; kanji: Kanji };

export type BookmarksApi = {
  watch(kanji: Kanji): QueryStore<boolean>;
  watchAll(): QueryStore<readonly Kanji[]>;
  add(kanji: Kanji): Promise<Result<void>>;
  remove(kanji: Kanji): Promise<Result<void>>;
};
