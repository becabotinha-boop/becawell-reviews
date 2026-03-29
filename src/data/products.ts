import creatineImg from "@/assets/creatine.jpg";
import theragunImg from "@/assets/theragun.jpg";
import eightsleepImg from "@/assets/eightsleep.jpg";
import ag1Img from "@/assets/ag1.jpg";
import ouraImg from "@/assets/oura.jpg";
import espressoImg from "@/assets/espresso.jpg";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  slug: string;
  image: string;
  rating: number;
  score: number;
  price: string;
  affiliateUrl: string;
  tags: ("top-pick" | "best-value" | "editors-choice")[];
  shortDescription: string;
  scores: {
    effectiveness: number;
    value: number;
    usability: number;
    quality: number;
  };
  pros: string[];
  cons: string[];
  verdict: string;
  whoFor: string[];
  whoNotFor: string[];
  evidence: string;
  reviewContent: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: "1", name: "Supplements", slug: "supplements", icon: "💊", count: 24 },
  { id: "2", name: "Fitness", slug: "fitness", icon: "🏋️", count: 18 },
  { id: "3", name: "Beauty", slug: "beauty", icon: "✨", count: 15 },
  { id: "4", name: "Kitchen", slug: "kitchen", icon: "🍳", count: 12 },
  { id: "5", name: "Productivity", slug: "productivity", icon: "⚡", count: 20 },
  { id: "6", name: "Sleep", slug: "sleep", icon: "😴", count: 9 },
  { id: "7", name: "Recovery", slug: "recovery", icon: "🧊", count: 11 },
  { id: "8", name: "Mindfulness", slug: "mindfulness", icon: "🧘", count: 7 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Momentous Creatine",
    brand: "Momentous",
    category: "supplements",
    slug: "momentous-creatine",
    image: creatineImg,
    rating: 4.8,
    score: 92,
    price: "$39.95",
    affiliateUrl: "#",
    tags: ["top-pick"],
    shortDescription: "The gold standard for creatine monohydrate. NSF certified, third-party tested, and backed by decades of research.",
    scores: { effectiveness: 95, value: 85, usability: 93, quality: 96 },
    pros: ["NSF Certified for Sport", "Micronized for better absorption", "No fillers or additives", "Third-party tested"],
    cons: ["Premium pricing", "Only unflavored option", "Subscription required for best price"],
    verdict: "Momentous Creatine sets the bar for supplement quality. While the price is higher than bargain brands, the NSF certification and purity testing justify the premium for anyone serious about what goes into their body.",
    whoFor: ["Athletes seeking NSF-certified supplements", "Anyone wanting the purest creatine available", "People who prioritize third-party testing"],
    whoNotFor: ["Budget-conscious buyers", "Those who prefer flavored supplements"],
    evidence: "Creatine monohydrate is one of the most extensively studied supplements, with over 500 peer-reviewed studies supporting its efficacy for strength, power, and muscle mass gains.",
    reviewContent: "We tested Momentous Creatine over 8 weeks alongside 4 other leading brands...",
  },
  {
    id: "2",
    name: "Theragun PRO Plus",
    brand: "Therabody",
    category: "recovery",
    slug: "theragun-pro-plus",
    image: theragunImg,
    rating: 4.6,
    score: 88,
    price: "$499",
    affiliateUrl: "#",
    tags: ["editors-choice"],
    shortDescription: "The most advanced percussion therapy device with biometric sensors and guided routines.",
    scores: { effectiveness: 92, value: 72, usability: 90, quality: 95 },
    pros: ["Biometric body scanning", "Guided wellness routines", "Whisper-quiet operation", "5 built-in attachments"],
    cons: ["Expensive", "Heavier than competitors", "App required for full features"],
    verdict: "The Theragun PRO Plus is the pinnacle of at-home recovery. Its smart sensors and guided routines make it more than just a massage gun — it's a recovery system.",
    whoFor: ["Serious athletes", "Physical therapy patients", "Anyone with chronic muscle tension"],
    whoNotFor: ["Casual users", "Budget shoppers", "Minimalists who want simplicity"],
    evidence: "Percussive therapy has been shown to reduce delayed onset muscle soreness (DOMS) by up to 30% in clinical trials.",
    reviewContent: "After 12 weeks of daily use comparing the PRO Plus against 6 competitors...",
  },
  {
    id: "3",
    name: "Eight Sleep Pod 4 Ultra",
    brand: "Eight Sleep",
    category: "sleep",
    slug: "eight-sleep-pod-4-ultra",
    image: eightsleepImg,
    rating: 4.5,
    score: 86,
    price: "$3,049",
    affiliateUrl: "#",
    tags: ["top-pick"],
    shortDescription: "AI-powered smart mattress cover with dynamic temperature regulation for optimal sleep.",
    scores: { effectiveness: 90, value: 65, usability: 88, quality: 92 },
    pros: ["Dual-zone temperature control", "AI sleep coaching", "Vibration alarm", "Tracks sleep metrics"],
    cons: ["Very expensive", "Requires monthly membership", "Complex setup"],
    verdict: "If sleep quality is your priority and budget isn't a concern, the Pod 4 Ultra delivers measurable improvements. Our testers saw an average 15% increase in deep sleep.",
    whoFor: ["Sleep optimizers", "Hot sleepers", "Tech enthusiasts", "Couples with different temperature preferences"],
    whoNotFor: ["Budget-conscious buyers", "People who prefer simple solutions"],
    evidence: "Temperature regulation has been shown to improve deep sleep by 10-20% in clinical studies.",
    reviewContent: "We slept on the Pod 4 Ultra for 60 nights, tracking every metric...",
  },
  {
    id: "4",
    name: "Athletic Greens AG1",
    brand: "AG1",
    category: "supplements",
    slug: "athletic-greens-ag1",
    image: ag1Img,
    rating: 4.3,
    score: 81,
    price: "$79/mo",
    affiliateUrl: "#",
    tags: ["best-value"],
    shortDescription: "Comprehensive daily greens powder with 75 vitamins, minerals, and whole-food sourced ingredients.",
    scores: { effectiveness: 82, value: 70, usability: 95, quality: 85 },
    pros: ["All-in-one convenience", "Great taste", "NSF certified", "Travel packs available"],
    cons: ["Expensive monthly cost", "Proprietary blend amounts", "Contains adaptogens not everyone needs"],
    verdict: "AG1 is the most convenient way to fill nutritional gaps. While it won't replace a healthy diet, it's an excellent insurance policy for busy lifestyles.",
    whoFor: ["Busy professionals", "Travelers", "People who dislike taking multiple pills"],
    whoNotFor: ["Those on tight budgets", "People who prefer knowing exact ingredient doses"],
    evidence: "While no single study validates all 75 ingredients together, individual components are well-supported.",
    reviewContent: "We compared AG1 against 8 other greens powders over 6 weeks...",
  },
  {
    id: "5",
    name: "Oura Ring Gen 3",
    brand: "Oura",
    category: "fitness",
    slug: "oura-ring-gen-3",
    image: ouraImg,
    rating: 4.4,
    score: 84,
    price: "$299",
    affiliateUrl: "#",
    tags: ["editors-choice"],
    shortDescription: "Discreet health tracking ring with best-in-class sleep analysis and readiness scores.",
    scores: { effectiveness: 86, value: 78, usability: 88, quality: 90 },
    pros: ["Incredibly discreet", "Best sleep tracking accuracy", "7-day battery life", "Comfortable to wear 24/7"],
    cons: ["Requires monthly subscription", "Limited workout tracking", "Sizing can be tricky"],
    verdict: "The Oura Ring Gen 3 is the best wearable for sleep tracking and holistic health monitoring. Its form factor is unmatched.",
    whoFor: ["Sleep quality enthusiasts", "People who dislike wrist wearables", "Health data nerds"],
    whoNotFor: ["Serious athletes needing GPS", "People who don't want another subscription"],
    evidence: "Studies show the Oura Ring achieves 96% accuracy in heart rate monitoring compared to medical-grade ECG.",
    reviewContent: "We wore the Oura Ring Gen 3 for 90 days straight...",
  },
  {
    id: "6",
    name: "Breville Barista Express",
    brand: "Breville",
    category: "kitchen",
    slug: "breville-barista-express",
    image: espressoImg,
    rating: 4.7,
    score: 90,
    price: "$699",
    affiliateUrl: "#",
    tags: ["top-pick", "best-value"],
    shortDescription: "The best entry-level espresso machine that doesn't compromise on quality. Built-in grinder included.",
    scores: { effectiveness: 91, value: 88, usability: 85, quality: 93 },
    pros: ["Built-in conical burr grinder", "PID temperature control", "Excellent build quality", "Great value for features"],
    cons: ["Learning curve for beginners", "Counter space required", "Water tank could be larger"],
    verdict: "The Barista Express is the sweet spot between quality and accessibility. It produces café-quality espresso once you master the basics.",
    whoFor: ["Coffee enthusiasts starting out", "Anyone wanting café-quality at home", "Value-conscious buyers"],
    whoNotFor: ["True espresso purists", "Those wanting a simple one-button solution"],
    evidence: "Consumer testing consistently ranks the Barista Express among the top 3 home espresso machines under $1000.",
    reviewContent: "We pulled over 200 shots across 5 espresso machines in this category...",
  },
];

export const getProductsByCategory = (categorySlug: string) =>
  products.filter((p) => p.category === categorySlug);

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getFeaturedProducts = () =>
  products.filter((p) => p.tags.includes("top-pick")).slice(0, 6);
