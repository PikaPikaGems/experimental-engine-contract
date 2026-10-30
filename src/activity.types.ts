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

export type GenericChallengeEventRecord = EventRecordTimeRange & {
  type: "generic_challenge_completed";
  activityType: string;
  challengeId: number;
};

export type PracticeActivityEventRecord =
  SpeedKatakanaEventRecord | GenericChallengeEventRecord;

export type ActivityRecordSummary = {
  genericChallenges: Partial<Record<string, number>>;
  practice: {
    speedKatakana: number;
  };
  reviews: {
    reading: ReviewSummary;
    secondaryReading: ReviewSummary;
    writing: ReviewSummary;
    newItems: number;
  };
};

export type DailySummary = ActivityRecordSummary & {
  summaryDate: LocalDate;
  lastUpdatedAt: UTCTimestamp;
};

export type ActivityDaysSummary = {
  genericChallenges: Partial<Record<string, TotalDays>>;
  totalDaysActive: TotalDays;
  practice: {
    speedKatakana: TotalDays;
  };
  reviews: {
    secondaryReading: TotalDays; // days with secondary-reading reviews
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
  genericChallenges: Partial<Record<string, LocalDate>>;
  cakeDay?: LocalDate;
  practice: {
    speedKatakana?: LocalDate;
  };
  review: {
    writing?: LocalDate;
    reading?: LocalDate;
    secondaryReading?: LocalDate;
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

export type GenericChallengeSummary = {
  activityType: string;
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
    challengeId: number,
  ): QueryStore<SpeedKatakanaChallengeSummary | null>;
  watchGenericChallenge(
    activityType: string,
    challengeId: number,
  ): QueryStore<GenericChallengeSummary | null>;
  watchAllSpeedKatakanaChallenges(): QueryStore<
    SpeedKatakanaChallengeSummary[]
  >;
  watchAllGenericChallenges(
    activityType: string,
  ): QueryStore<GenericChallengeSummary[]>;
};
