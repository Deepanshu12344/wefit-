import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Check, Download } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

import heroBowl from "@/assets/hero-bowl.jpg";
import catRotiMeal from "@/assets/cat-roti-meal.jpg";
import productProteinBowl from "@/assets/product-protein-bowl.jpg";
import productWrap from "@/assets/product-wrap.jpg";
import appMockup from "@/assets/app-mockup.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WeFit — Affordable High-Protein Meals" },
      {
        name: "description",
        content:
          "Fresh, protein-rich meals from ₹169. Honest ingredients, generous protein, and no delivery, packaging, or platform fees.",
      },
      { property: "og:title", content: "WeFit — Affordable High-Protein Meals" },
      {
        property: "og:description",
        content: "Big protein. Honest prices. Fresh meals made daily by WeFit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}

const categories = [
  { number: "01", name: "Protein Bowls", detail: "Big bowls. Bigger protein." },
  { number: "02", name: "Roti Meals", detail: "Comfort food that pulls its weight." },
  { number: "03", name: "Power Wraps", detail: "Protein you can carry." },
  { number: "04", name: "Keto Specials", detail: "Low carb. Fully loaded." },
  { number: "05", name: "Fit Sandwiches", detail: "Fast, fresh, seriously filling." },
];

const products = [
  {
    name: "Grilled Chicken Protein Bowl",
    protein: "42G",
    price: "₹249",
    image: productProteinBowl,
  },
  {
    name: "Paneer Bhurji Roti Meal",
    protein: "38G",
    price: "₹229",
    image: catRotiMeal,
  },
  {
    name: "Peri Peri Chicken Wrap",
    protein: "35G",
    price: "₹199",
    image: productWrap,
  },
];

const noList = [
  "Processed meat",
  "Frozen chicken",
  "Fake paneer",
  "Mayonnaise",
  "Palm oil",
  "Added sugar",
];

const pricing = [
  {
    number: "01",
    label: "DIRECT SOURCING",
    title: "Farmer to bowl.",
    body: "We source ingredients directly from local farms and cut out three middlemen — saving up to 30% per meal.",
    stamp: "−30%",
  },
  {
    number: "02",
    label: "LOW AD SPEND",
    title: "No celeb tax.",
    body: "Less than 2% goes to ads. We would rather put the money into better food and keep your meal affordable.",
    stamp: "<2%",
  },
  {
    number: "03",
    label: "SMART KITCHENS",
    title: "Cooked, not wasted.",
    body: "Demand-led cooking helps us reduce waste, so you pay for the meal — not what lands in the bin.",
    stamp: "FRESH",
  },
];

function Logo({ textClassName }: { textClassName?: string }) {
  return (
    <a href="#top" aria-label="WeFit home">
      <span className={cn("text-2xl font-black uppercase", textClassName)}>WeFit</span>
    </a>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const updateTagPosition = (event: React.PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--tag-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--tag-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <article
      onPointerMove={updateTagPosition}
      className="group relative cursor-none border-2 border-foreground bg-card p-3 shadow-[7px_7px_0_var(--foreground)] transition-transform hover:-translate-y-1"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 bg-primary px-3 py-2 font-mono text-[11px] font-black text-primary-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        style={{ left: "var(--tag-x, 50%)", top: "var(--tag-y, 50%)" }}
      >
        {product.protein} PROTEIN
      </span>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex min-h-28 items-center justify-between gap-4 px-2 py-5">
        <h3 className="max-w-[15rem] text-xl font-black uppercase leading-tight">{product.name}</h3>
        <span className="shrink-0 border-2 border-foreground bg-secondary px-3 py-2 font-mono text-sm font-black">{product.price}</span>
      </div>
    </article>
  );
}

function CategoryAccordion() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="border-t border-background/20">
      {categories.map((category) => {
        const isOpen = open === category.name;
        return (
          <Reveal key={category.name}>
            <div className="border-b border-background/20">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : category.name)}
                aria-expanded={isOpen}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-left transition-colors hover:text-primary md:grid-cols-[5rem_1fr_1fr_auto] md:py-7"
              >
                <span className="font-mono text-xs text-primary">/{category.number}</span>
                <h3 className="text-2xl font-black uppercase md:text-4xl">{category.name}</h3>
                <span className="hidden text-sm text-background/55 md:block">{category.detail}</span>
                <span className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full border-2 border-background/40 transition-transform duration-300 group-hover:border-primary group-hover:text-primary",
                  isOpen && "rotate-90 border-primary text-primary"
                )}>
                  <ArrowRight size={18} />
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div
                  className="overflow-hidden"
                  style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
                >
                  <div className="border-y-2 border-foreground bg-white text-foreground">
                    <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-14 md:grid-cols-3 md:px-10 md:py-16">
                      {products.map((product) => <ProductCard key={product.name} product={product} />)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b-2 border-foreground bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
          <Logo textClassName="text-3xl md:text-[2rem]" />
          <div className="hidden items-center gap-8 font-mono text-sm font-black uppercase md:flex">
            <a href="#menu" className="transition-colors hover:text-primary">Menu</a>
            <a href="#bestsellers" className="transition-colors hover:text-primary">Bestsellers</a>
            <a href="#why" className="transition-colors hover:text-primary">Why affordable</a>
            <a href="#promise" className="transition-colors hover:text-primary">Our promise</a>
          </div>
          <a href="#app" className="rounded-full bg-primary px-5 py-3 font-mono text-xs font-black uppercase text-primary-foreground transition-transform hover:-translate-y-0.5">
            Order now ↗
          </a>
        </div>
      </nav>

      <main>
        <section className="graph-paper relative mx-auto grid min-h-[calc(100vh-74px)] max-w-[1440px] items-center gap-14 px-5 py-14 md:px-10 lg:grid-cols-12 lg:py-20">
          <Reveal className="relative z-10 lg:col-span-6">
            {/* <p className="mb-7 font-mono text-[11px] font-bold uppercase text-primary">
              Affordable high-protein meals / made fresh daily
            </p> */}
            <h1 className="max-w-4xl text-[clamp(4.6rem,9vw,8.6rem)] font-black uppercase leading-[0.77]">
              Big protein
              <span className="mt-3 block -rotate-1 text-primary">Small bill.</span>
            </h1>
            <p className="mt-9 max-w-lg text-xl font-semibold leading-snug md:text-2xl">
              Fresh, protein-rich meals from <span className="price-underline font-black">₹169</span>. No shortcuts. No fitness tax.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#menu" className="neo-button inline-flex items-center gap-3 bg-foreground px-7 py-4 font-bold text-background">
                Explore menu <ArrowDown size={18} />
              </a>
              <a href="#why" className="neo-button inline-flex items-center gap-3 border-2 border-foreground bg-card px-7 py-4 font-bold">
                See the honest math <ArrowRight size={18} />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 font-mono text-[10px] font-bold uppercase">
              <span className="sticker rotate-2">32G avg protein</span>
              <span className="sticker -rotate-1">From ₹169 / meal</span>
              <span className="sticker rotate-1">₹0 extra fees</span>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative px-2 pb-8 lg:col-span-6 lg:px-8">
            <div className="absolute -inset-1 rotate-3 rounded-[3rem] border-4 border-primary/25 transition-transform duration-700 hover:rotate-0" />
            <div className="relative aspect-square overflow-hidden rounded-[2.6rem] border-[5px] border-foreground bg-card shadow-[18px_18px_0_var(--foreground)] md:shadow-[24px_24px_0_var(--primary)]">
              <img src={heroBowl} alt="Fresh grilled chicken protein bowl" className="size-full object-cover" />
            </div>
            <div className="absolute -bottom-1 left-0 flex rotate-[-4deg] items-center gap-3 rounded-2xl border-[3px] border-foreground bg-card p-4 shadow-[6px_6px_0_var(--foreground)] md:left-2 md:p-5">
              <span className="grid size-14 place-items-center rounded-full bg-primary font-mono text-lg font-black text-primary-foreground">32G</span>
              <div>
                <p className="text-sm font-black uppercase">Average protein</p>
                <p className="font-mono text-[9px] uppercase text-muted-foreground">Per single meal</p>
              </div>
            </div>
          </Reveal>
        </section>

        <div className="ticker" aria-label="WeFit benefits">
          <div className="ticker-track">
            {[0, 1, 2, 3].map((group) => (
              <div key={group} className="flex shrink-0 items-center gap-8 pr-8">
                {[
                  "PROTEIN, NOT PRICEY",
                  "FRESH EVERY DAY",
                  "ZERO EXTRA FEES",
                  "REAL FOOD ONLY",
                ].map((item) => (
                  <span key={`${group}-${item}`} className="flex items-center gap-8 font-heading text-sm uppercase italic tracking-[0.04em]">
                    {item}<span className="text-primary-foreground/50">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="menu" className="bg-foreground py-24 text-background md:py-32">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <Reveal className="mb-14 flex items-end justify-between gap-8">
              <div>
                <p className="mb-3 font-mono text-[11px] font-bold uppercase text-primary">Pick your protein personality</p>
                <h2 className="text-5xl font-black uppercase leading-[0.9] md:text-7xl">Choose<br/><span className="text-primary">your path.</span></h2>
              </div>
              {/* <span className="font-mono text-xs text-background/50">(05) CATEGORIES</span> */}
            </Reveal>
            <CategoryAccordion />
          </div>
        </section>

        <section id="bestsellers" className="py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <Reveal className="mb-12 grid gap-5 md:grid-cols-2 md:items-end">
              <h2 className="text-5xl font-black uppercase leading-[0.86] md:text-7xl">Three meals.<br/><span className="text-primary">Zero guesswork.</span></h2>
              <p className="max-w-md text-lg font-medium md:justify-self-end">The crowd favourites — with protein and price shown upfront, exactly where they should be.</p>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {products.map((product, index) => (
                <Reveal key={product.name} delay={index * 90}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="affordability-grid border-y-2 border-foreground bg-accent py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10">
            <Reveal className="grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
              <div>
                <p className="mb-4 font-mono text-[11px] font-bold uppercase">The honest math / no hidden catch</p>
                <h2 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] md:text-8xl">How do we make high protein meals so <span className="mt-6 block"><span className="bg-foreground px-2 text-background">affordable?</span></span></h2>
              </div>
              <p className="max-w-md text-xl font-bold leading-snug lg:justify-self-end">We spend smarter behind the scenes, so you get more protein on the plate — not more cost on the bill.</p>
            </Reveal>
            <div className="mt-16 grid border-2 border-foreground bg-background md:grid-cols-3">
              {pricing.map((item, index) => (
                <Reveal key={item.number} delay={index * 100} className="h-full">
                  <article className="relative flex h-full min-h-[25rem] flex-col p-7 md:border-r-2 md:border-foreground md:p-9 [&:last-child]:border-r-0">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-xs font-bold">[{item.number}] {item.label}</span>
                      <span className="grid size-20 -rotate-6 place-items-center rounded-full border-[3px] border-foreground bg-primary font-mono text-sm font-black text-primary-foreground">{item.stamp}</span>
                    </div>
                    <h3 className="mt-auto text-4xl font-black uppercase leading-none md:text-5xl">{item.title}</h3>
                    <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="promise" className="bg-background py-24 md:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="mb-4 font-mono text-[11px] font-bold uppercase text-primary">What is not in your food</p>
              <h2 className="text-6xl font-black uppercase leading-[0.8] md:text-8xl">The<br/><span className="text-primary">No-list.</span></h2>
              <p className="mt-8 max-w-sm text-lg font-medium">Real food does not need a long explanation. So we made our “no” list easier to read than an ingredients label.</p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <div className="grid sm:grid-cols-2">
                {noList.map((item, index) => (
                  <div key={item} className="flex min-h-28 items-center gap-4 border-b-2 border-foreground px-2 py-5 sm:px-6 sm:[&:nth-child(odd)]:border-r-2">
                    <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border-2 border-foreground font-black", index % 3 === 1 ? "bg-accent" : "bg-primary text-primary-foreground")}>×</span>
                    <span className="text-xl font-black uppercase md:text-2xl">No {item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="app" className="px-5 pb-10 md:px-10 md:pb-16">
          <div className="mx-auto grid max-w-[1440px] overflow-hidden border-[3px] border-foreground bg-primary shadow-[10px_10px_0_var(--foreground)] lg:grid-cols-12">
            <Reveal className="p-8 md:p-14 lg:col-span-7 lg:p-20">
              <p className="mb-5 font-mono text-[11px] font-bold uppercase text-primary-foreground">The WeFit app / download offer</p>
              <h2 className="text-5xl font-black uppercase leading-[0.86] text-primary-foreground md:text-8xl">50% off your first 3 orders.</h2>
              <div className="mt-8 flex flex-wrap gap-3 font-mono text-[10px] font-black uppercase text-primary-foreground">
                {["₹0 delivery", "₹0 packaging", "₹0 platform fee"].map((item) => (
                  <span key={item} className="flex items-center gap-2 rounded-full border-2 border-primary-foreground px-4 py-2"><Check size={14} />{item}</span>
                ))}
              </div>
              <a href="#top" className="neo-button mt-10 inline-flex items-center gap-3 bg-foreground px-7 py-4 font-bold text-background">
                <Download size={18} /> Download the app
              </a>
            </Reveal>
            <div className="relative min-h-[28rem] overflow-hidden border-t-[3px] border-foreground bg-secondary lg:col-span-5 lg:border-l-[3px] lg:border-t-0">
              <img src={appMockup} alt="WeFit mobile ordering app" loading="lazy" className="absolute left-1/2 top-12 w-[70%] max-w-sm -translate-x-1/2 rotate-3 border-[3px] border-foreground object-cover shadow-[12px_12px_0_var(--foreground)]" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-foreground px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">Affordable protein-rich food, made fresh for everyday ambition.</p>
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-[10px] font-bold uppercase">
            <a href="#menu" className="hover:text-primary">Menu</a>
            <a href="#why" className="hover:text-primary">Why affordable</a>
            <a href="#promise" className="hover:text-primary">Our promise</a>
            <a href="#app" className="hover:text-primary">Get the app</a>
          </div>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">© 2026 WeFit Nutrition Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
