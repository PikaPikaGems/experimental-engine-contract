import type {
  CardType,
  FsrsLearningState,
  FsrsRating,
  IanaTimeZone,
  Kanji,
  Result,
  ReviewSettings,
  ReviewSummary,
  StudyError,
  UnixMs,
  UTCTimestamp,
} from "./primitives.types";
import type { QueryStore } from "./query.types";

export type ReviewError =
  | StudyError
  | { code: "pile_item_exists"; kanji: Kanji; canonicalWord: string }
  | { code: "review_handle_expired" }
  | { code: "review_handle_consumed" }
  | { code: "invalid_settings"; field: keyof ReviewSettings; reason: string }
  | { code: "stale_version" }
  | { code: "schema_version_mismatch" };

export type CardProgress = {
  firstReviewedAt?: UTCTimestamp;
  ratingsSummary?: ReviewSummary;
  dueAt: UTCTimestamp;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  learningState: FsrsLearningState;
  lastReviewedAt?: UTCTimestamp;
  lapses: number;
  repetitions: number;
  learningStepIndex: number;
  retrievability: number;
  retrievabilityAsOf: UnixMs;
};

export type ReviewPileItemView = {
  kanji: Kanji;
  word: string;
  reading: CardProgress;
  writing: CardProgress;
  addedAt: UTCTimestamp;
  addedAtTzName: IanaTimeZone;
};

export type DueCard = {
  kanji: Kanji;
  cardType: CardType;
  dueAt: UTCTimestamp;
  version: string;
};

export type RatingPreview = {
  rating: FsrsRating;
  scheduledAt: UTCTimestamp;
};

export type ActiveReview = {
  handleId: string;
  kanji: Kanji;
  word: string;
  cardType: CardType;
  previews: Readonly<Record<FsrsRating, RatingPreview>>;
  openedAt: UnixMs;
  expiresAt: UnixMs;
};

export type GradeOutcome = {
  operationId: string;
  provisionalCard: DueCard;
};

export type ReviewsApi = {
  settings: {
    watchCurrent(): QueryStore<ReviewSettings>;
    update(settings: ReviewSettings): Promise<Result<ReviewSettings>>;
    defaultSettings: ReviewSettings;
  };
  pile: {
    add(input: {
      kanji: Kanji;
      word: string;
    }): Promise<Result<ReviewPileItemView>>;
    remove(kanji: Kanji): Promise<Result<void>>;
    watch(kanji: Kanji): QueryStore<ReviewPileItemView | null>;
    watchAll(): QueryStore<ReviewPileItemView[]>;
  };
  getDueCount(cardType: CardType): Promise<Result<number>>;
  getDue(input: {
    cardType: CardType;
    limit: number;
  }): Promise<Result<DueCard[]>>;
  beginReview(input: {
    kanji: Kanji;
    cardType: CardType;
    expectedVersion: string;
  }): Promise<Result<ActiveReview>>;
  grade(input: {
    handleId: string;
    rating: FsrsRating;
  }): Promise<Result<GradeOutcome>>;
  cancel(handleId: string): Promise<Result<void>>;
};
