import type {
  IanaTimeZone,
  LocalDate,
  Result,
  ReviewSummary,
  StudyError,
  TotalDays,
  UnixMs,
  UTCTimestamp,
} from "./primitives.types";
import type { QueryStore } from "./query.types";

export type ActivityError = StudyError | { code: "validation_failed" };

export type EventRecordTimeRange = {
  startedAt: UnixMs;
  endedAt: UnixMs;
  timezone: IanaTimeZone;
};

export type SpeedKatakanaEventRecord = EventRecordTimeRange & {
  type: "speed_katakana_session_completed";
  challengeId: number;
  accuracyVal: number;
  cpmVal: number;
  pointerType: "fine" | "coarse";
};

export type SpeakingPracticeEventRecord = EventRecordTimeRange & {
  type: "speaking_practice_session_completed";
  challengeId: number;
};

export type ReadingPracticeEventRecord = EventRecordTimeRange & {
  type: "reading_practice_round_completed";
  correctCount: number;
  attemptedCount: number;
};

export type WritingPracticeEventRecord = EventRecordTimeRange & {
  type: "writing_practice_round_completed";
  correctCount: number;
  attemptedCount: number;
};

export type PracticeActivityEventRecord =
  | SpeedKatakanaEventRecord
  | SpeakingPracticeEventRecord
  | ReadingPracticeEventRecord
  | WritingPracticeEventRecord;

export type ActivityRecordSummary = {
  practice: {
    speedKatakana: number;
    speaking: number;
    reading: number;
    writing: number;
  };
  reviews: {
    reading: ReviewSummary;
    writing: ReviewSummary;
    newItems: number;
  };
};

export type DailySummary = ActivityRecordSummary & {
  summaryDate: LocalDate;
  lastUpdatedAt: UTCTimestamp;
};

export type ActivityDaysSummary = {
  totalDaysActive: TotalDays;
  practice: {
    speedKatakana: TotalDays;
    speaking: TotalDays;
    reading: TotalDays;
    writing: TotalDays;
  };
  reviews: {
    reading: TotalDays;
    writing: TotalDays;
    newItems: TotalDays;
  };
};

export type DailySummaryRange = { from: LocalDate; totalDays: TotalDays };

export type AggregatedSummary = {
  range: DailySummaryRange;
  totals: ActivityRecordSummary;
  daysActive: ActivityDaysSummary;
};

export type FirstAttemptsSummary = {
  cakeDay?: LocalDate;
  practice: {
    speedKatakana?: LocalDate;
    speaking?: LocalDate;
    reading?: LocalDate;
    writing?: LocalDate;
  };
  review: {
    writing?: LocalDate;
    reading?: LocalDate;
  };
};

export type AllTimeSummary = {
  totals: ActivityRecordSummary;
  daysActive: ActivityDaysSummary;
  firstAttempts: FirstAttemptsSummary;
};

export type AttemptedAt = LocalDate;

export type ChallengeScore = {
  value: number;
  achievedAt: AttemptedAt;
};

export type SpeedKatakanaChallengePtrSummary = {
  attemptCount: number;
  latest: {
    attemptedAt: AttemptedAt;
    accuracyVal: number;
    cpmVal: number;
  };
  best: {
    accuracy: ChallengeScore;
    cpm: ChallengeScore;
    cpmOverAcc70?: ChallengeScore;
  };
};

export type SpeedKatakanaChallengeCoarsePtrSummary = {
  pointerType: "coarse";
} & SpeedKatakanaChallengePtrSummary;

export type SpeedKatakanaChallengeFinePtrSummary = {
  pointerType: "fine";
} & SpeedKatakanaChallengePtrSummary;

export type SpeedKatakanaChallengeSummary = {
  activityType: "speed_katakana";
  challengeId: number;
  coarsePtrSummary?: SpeedKatakanaChallengeCoarsePtrSummary;
  finePtrSummary?: SpeedKatakanaChallengeFinePtrSummary;
};

export type SpeakingPracticeChallengeSummary = {
  activityType: "speaking_practice";
  challengeId: number;
  attemptCount: number;
  lastAttemptedAt: AttemptedAt;
};

export type ActivityWrite = {
  operationId: string;
};

export type ActivityApi = {
  record(input: PracticeActivityEventRecord): Promise<Result<ActivityWrite>>;
  watchDailySummaries(input: DailySummaryRange): QueryStore<DailySummary[]>;
  watchAllTime(): QueryStore<AllTimeSummary>;
  watchSpeedKatakanaChallenge(
    challengeId: number
  ): QueryStore<SpeedKatakanaChallengeSummary | null>;
  watchSpeakingChallenge(
    challengeId: number
  ): QueryStore<SpeakingPracticeChallengeSummary | null>;
  watchAllSpeedKatakanaChallenges(): QueryStore<
    SpeedKatakanaChallengeSummary[]
  >;
  watchAllSpeakingChallenges(): QueryStore<SpeakingPracticeChallengeSummary[]>;
};
