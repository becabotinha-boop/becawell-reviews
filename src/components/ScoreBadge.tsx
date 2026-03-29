import { cn } from "@/lib/utils";

const getScoreColor = (score: number) => {
  if (score >= 90) return "bg-score-excellent text-primary-foreground";
  if (score >= 80) return "bg-score-good text-primary-foreground";
  if (score >= 70) return "bg-score-average text-foreground";
  if (score >= 60) return "bg-score-poor text-primary-foreground";
  return "bg-score-bad text-primary-foreground";
};

const ScoreBadge = ({ score, size = "default" }: { score: number; size?: "default" | "lg" }) => (
  <div
    className={cn(
      "flex items-center justify-center rounded-lg font-bold",
      getScoreColor(score),
      size === "lg" ? "h-14 w-14 text-xl" : "h-10 w-10 text-sm"
    )}
  >
    {score}
  </div>
);

export default ScoreBadge;
