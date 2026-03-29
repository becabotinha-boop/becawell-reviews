import { cn } from "@/lib/utils";

const getBarColor = (score: number) => {
  if (score >= 90) return "bg-score-excellent";
  if (score >= 80) return "bg-score-good";
  if (score >= 70) return "bg-score-average";
  if (score >= 60) return "bg-score-poor";
  return "bg-score-bad";
};

const ScoreBar = ({ label, score }: { label: string; score: number }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{score}</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-secondary">
      <div
        className={cn("h-full rounded-full transition-all duration-700", getBarColor(score))}
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

export default ScoreBar;
