import { cn } from "@/lib/utils";

const tagStyles = {
  "top-pick": "bg-tag-top-pick/10 text-tag-top-pick border-tag-top-pick/20",
  "best-value": "bg-tag-best-value/10 text-tag-best-value border-tag-best-value/20",
  "editors-choice": "bg-tag-editors-choice/10 text-tag-editors-choice border-tag-editors-choice/20",
};

const tagLabels = {
  "top-pick": "Top Pick",
  "best-value": "Best Value",
  "editors-choice": "Editor's Choice",
};

const ProductTag = ({ tag }: { tag: "top-pick" | "best-value" | "editors-choice" }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
      tagStyles[tag]
    )}
  >
    {tagLabels[tag]}
  </span>
);

export default ProductTag;
