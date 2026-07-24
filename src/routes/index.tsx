import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Dumbbell,
  Menu,
  X,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  Users,
  Lock,
  Waves,
  ChevronRight,
  Star,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  Navigation,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Automan Fitness Gym — Let's Live Life | Dhaka" },
      {
        name: "description",
        content:
          "Modern premium gym in Dhaka with branches in Tejgaon and Dhanmondi. International-standard equipment, certified trainers, steam bath and locker facilities.",
      },
      { property: "og:title", content: "Automan Fitness Gym — Let's Live Life | Dhaka" },
      {
        property: "og:description",
        content: "Modern premium gym in Dhaka with branches in Tejgaon and Dhanmondi. International-standard equipment, certified trainers, steam bath and locker facilities.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80&auto=format&fit=crop",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80&auto=format&fit=crop",
      },
    ],
  }),
  component: Landing,
});

/* ---------- Data ---------- */

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#why", label: "Why Us" },
  { href: "#branches", label: "Branches" },
  { href: "#facilities", label: "Facilities" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=2000&q=80&auto=format&fit=crop";

type Branch = {
  id: "tejgaon" | "dhanmondi";
  name: string;
  address: string;
  female: string;
  femaleNote?: string;
  maps: string;
  embed: string;
  image: string;
};

const BRANCHES: Branch[] = [
  {
    id: "tejgaon",
    name: "Tejgaon Branch",
    address:
      "2nd Floor, Northern SR Tower, beside Tejgaon Thana, 49 Bir Uttam Ziaur Rahman Sarak, Dhaka-1215",
    female: "No female hour at any time",
    maps: "https://www.google.com/maps/search/?api=1&query=Automan+Fitness+Gym+Northern+SR+Tower+Tejgaon+Dhaka",
    embed:
      "https://www.google.com/maps?q=Automan+Fitness+Gym+Northern+SR+Tower+Tejgaon+Dhaka&output=embed",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=80&auto=format&fit=crop",
  },
  {
    id: "dhanmondi",
    name: "Dhanmondi Branch",
    address:
      "House #39/A, Road #08, beside Sheikh Jamal Field, Dhanmondi, Dhaka",
    female: "12:00 PM – 2:00 PM",
    femaleNote: "Normal timing only",
    maps: "https://www.google.com/maps/search/?api=1&query=Automan+Fitness+Gym+Dhanmondi+House+39A+Road+8+Sheikh+Jamal+Field+Dhaka",
    embed:
      "https://www.google.com/maps?q=Automan+Fitness+Gym+Dhanmondi+House+39A+Road+8+Sheikh+Jamal+Field+Dhaka&output=embed",
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=1400&q=80&auto=format&fit=crop",
  },
];

const FACILITIES = [
  {
    title: "Strength Training",
    desc: "Heavy racks, plates and platforms built for serious lifters.",
    img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Cardio Zone",
    desc: "Modern treadmills, bikes and rowers for endurance work.",
    img: "https://images.unsplash.com/photo-1652363722833-509b3aac287b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Free Weights",
    desc: "Full dumbbell and barbell range for compound training.",
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Functional Training",
    desc: "Open floor for mobility, kettlebells and athletic conditioning.",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Locker Facilities",
    desc: "Secure lockers so you train with peace of mind.",
    img: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Steam Bath",
    desc: "Recover, relax and reset after every session.",
    img: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=1200&q=80&auto=format&fit=crop",
  },
];

type Plan = {
  name: string;
  price: string;
  original?: string;
  couple?: string;
  highlight?: boolean;
  badge?: string;
  perks: string[];
};

const PRICING: Plan[] = [
  {
    name: "Weekly",
    price: "৳1,200",
    perks: ["1 week full access", "All equipment", "Locker use"],
  },
  {
    name: "1 Month",
    price: "৳5,000",
    couple: "৳9,000 for 2 (Couple)",
    perks: ["Full month access", "All equipment", "Steam bath"],
  },
  {
    name: "3 Months",
    price: "৳12,000",
    original: "৳17,000",
    couple: "৳22,000 for 2 (Couple)",
    badge: "Save ৳5,000",
    perks: ["3 months access", "All equipment", "Steam bath & locker"],
  },
  {
    name: "6 Months",
    price: "৳20,000",
    original: "৳29,000",
    couple: "৳35,000 for 2 (Couple)",
    highlight: true,
    badge: "Most Popular",
    perks: ["6 months access", "Priority support", "Steam bath & locker"],
  },
  {
    name: "12 Months",
    price: "৳35,000",
    original: "৳53,000",
    couple: "৳50,000 for 2 (Couple)",
    badge: "Best Value",
    perks: ["Full year access", "Priority support", "All facilities included"],
  },
];

const ADMISSION = {
  fee: "৳5,000",
  discounted: "৳2,500",
  monthly: "৳4,000",
  combo: "৳6,500 total to start (admission + first month)",
};

const REVIEWS = [
  {
    name: "Tarin Anwar",
    role: "Google Review • 6 months ago",
    rating: 5,
    text: "Best gym in the Dhanmondi area. Uncrowded. Suggestion: it should open at 6 AM (not 8 AM) on weekdays, and on Fridays it should be like any other day and not open at 5 PM which is too late.",
    img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&q=80&auto=format&fit=crop",
  },
  {
    name: "Nafis Shadman Quader",
    role: "Google Review • a year ago",
    rating: 5,
    text: "I've been coming to this gym for a while and overall it's been a good experience. The equipment is modern and well maintained, and the crowd is respectful and educated, which creates a pleasant atmosphere. The support staff are polite and helpful.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
  },
  {
    name: "Sarah Nehrina Nazim",
    role: "Google Review • a year ago",
    rating: 5,
    text: "Small gestures of humbleness and kind words make it easy to maintain a relationship with the gym and continue coming back even after 5 years. Appreciate that the owner remembers his members after long gaps.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop",
  },
  {
    name: "Almoin Nafis",
    role: "Google Review • 11 months ago",
    rating: 2,
    text: "Maintenance of equipment and air conditioning could be improved, and it can get crowded during peak hours. Sharing honest feedback so the team can keep improving.",
    img: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=200&q=80&auto=format&fit=crop",
  },
];

/* ---------- Utils ---------- */

// Regular schedule: Mon-Thu 08:00-22:30, Fri 17:00-22:30, Sat-Sun 08:00-22:30
function useOpenStatus() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return useMemo(() => {
    if (!now) return { open: false, label: "—" };
    const day = now.getDay(); // 0 Sun ... 6 Sat
    const mins = now.getHours() * 60 + now.getMinutes();
    let openMin = 8 * 60;
    const closeMin = 22 * 60 + 30;
    if (day === 5) openMin = 17 * 60; // Friday
    const open = mins >= openMin && mins < closeMin;
    return { open, label: open ? "Open Now" : "Closed Now" };
  }, [now]);
}

/* ---------- Component ---------- */

function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const status = useOpenStatus();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, modalOpen]);

  return (
    <div id="home" className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container-x mx-auto flex h-16 max-w-7xl items-center justify-between md:h-20">
          <a href="#home" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
              <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="truncate text-sm font-bold tracking-tight sm:text-base">
              Automan Fitness Gym
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Join Now
            </button>
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="container-x mx-auto flex max-w-7xl flex-col py-3">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-border/60 py-3 text-base font-medium"
                >
                  {n.label}
                  <ChevronRight className="h-4 w-4 text-primary" />
                </a>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setModalOpen(true);
                }}
                className="mt-4 mb-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Join Now
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Modern gym floor with strength equipment"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        <div className="container-x mx-auto w-full max-w-7xl pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Automan Fitness Gym
            </div>
            <h1 className="text-display text-5xl uppercase sm:text-6xl md:text-7xl lg:text-8xl">
              Build Your <br />
              <span className="text-primary">Strongest</span> Self.
            </h1>
            <p className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg">
              Dhaka&apos;s modern fitness destination for people who are serious about their
              health, strength, and lifestyle.
            </p>
            <p className="mt-2 font-display text-base text-foreground/80">
              অটোম্যান ফিটনেস জিম · <span className="text-primary">Let&apos;s Live Life</span>
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Join Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#branches"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/40 px-7 py-4 text-sm font-bold uppercase tracking-wider backdrop-blur hover:border-primary hover:text-primary"
              >
                Explore Our Gyms
              </a>
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex">
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-border">
            <span className="absolute inset-x-0 top-0 h-4 bg-primary animate-scroll-hint" />
          </span>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card/50">
        <div className="container-x mx-auto grid max-w-7xl grid-cols-2 divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
          {[
            { k: "02", v: "Premium Locations" },
            { k: "100+", v: "Modern Equipment" },
            { k: "10+", v: "Certified Trainers" },
            { k: "24/7", v: "Locker & Steam Bath" },
          ].map((s, i) => (
            <div key={i} className="px-4 py-8 md:px-8 md:py-10">
              <div className="flex items-baseline gap-1 text-display text-5xl md:text-6xl">
                <span>{s.k}</span>
                <span className="text-primary">.</span>
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="container-x mx-auto max-w-7xl py-24 md:py-32">
        <SectionHeader
          tag="Why Automan"
          title={<>Train Different. <span className="text-primary">Live Different.</span></>}
          sub="Everything you need to make your fitness journey stronger, smarter, and more consistent."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Dumbbell,
              t: "International Standard Equipment",
              d: "Modern professional-grade equipment for strength, muscle, cardio and overall fitness.",
            },
            {
              icon: Users,
              t: "Certified Trainers",
              d: "Experienced coaches help members train safely according to their personal goals.",
            },
            {
              icon: Lock,
              t: "Locker Facilities",
              d: "Secure lockers so members can focus on training with total peace of mind.",
            },
            {
              icon: Waves,
              t: "Steam Bath & Hygiene",
              d: "Clean, comfortable and hygienic environment to make every workout better.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/60"
            >
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold">{f.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* BRANCHES */}
      <section id="branches" className="border-t border-border bg-card/30">
        <div className="container-x mx-auto max-w-7xl py-24 md:py-32">
          <SectionHeader
            tag="Our Locations"
            title={<>Find Your <span className="text-primary">Training Ground.</span></>}
            sub="Two premium locations. One powerful fitness experience."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {BRANCHES.map((b) => (
              <BranchCard key={b.id} branch={b} status={status} onJoin={() => setModalOpen(true)} />
            ))}
          </div>

          {/* Ramadan */}
          <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-primary/30 bg-primary/5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
                <Clock className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Ramadan Hours
                </div>
                <p className="mt-1 font-display text-lg">
                  রমজানে মহিলাদের জন্য আলাদা সময় নেই
                </p>
                <p className="text-sm text-muted-foreground">
                  No separate female hour during Ramadan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section id="facilities" className="container-x mx-auto max-w-7xl py-24 md:py-32">
        <SectionHeader
          tag="Facilities"
          title={<>Everything Under <span className="text-primary">One Roof.</span></>}
          sub="Purpose-built spaces for strength, endurance, recovery and everything in between."
        />
        {/* Mobile slider */}
        <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FACILITIES.map((f, i) => (
            <FacilityCard key={i} f={f} className="min-w-[82%] snap-start" />
          ))}
        </div>
        {/* Desktop grid */}
        <div className="mt-14 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f, i) => (
            <FacilityCard key={i} f={f} />
          ))}
        </div>
        <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground md:hidden">
          Swipe to explore →
        </p>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-border bg-card/30">
        <div className="container-x mx-auto max-w-7xl py-24 md:py-32">
          <SectionHeader
            tag="Membership Plans"
            title={<>Simple, Honest <span className="text-primary">Pricing.</span></>}
            sub="Choose the plan that fits your goals. Couple packages available on every duration."
          />

          {/* Admission summary */}
          <div className="mt-10 grid gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:grid-cols-4 md:p-6">
            <AdmissionStat label="Admission Fee" value={ADMISSION.fee} strike />
            <AdmissionStat label="Discounted" value={ADMISSION.discounted} accent />
            <AdmissionStat label="Monthly Fee" value={ADMISSION.monthly} />
            <AdmissionStat label="Start With" value="৳6,500" accent />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Pay ৳6,500 and get admission + first month (limited-time discount).
          </p>

          {/* Mobile slider */}
          <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PRICING.map((p, i) => (
              <PricingCard key={i} plan={p} onJoin={() => setModalOpen(true)} className="min-w-[82%] snap-start" />
            ))}
          </div>
          {/* Desktop grid */}
          <div className="mt-10 hidden gap-4 md:grid md:grid-cols-3 lg:grid-cols-5">
            {PRICING.map((p, i) => (
              <PricingCard key={i} plan={p} onJoin={() => setModalOpen(true)} />
            ))}
          </div>
          <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground md:hidden">
            Swipe for more plans →
          </p>
        </div>
      </section>


      {/* CTA */}
      <section className="relative overflow-hidden border-y border-border">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=2000&q=80&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
        <div className="relative container-x mx-auto max-w-7xl py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Membership
            </div>
            <h2 className="text-display text-4xl uppercase sm:text-5xl md:text-6xl lg:text-7xl">
              Your Fitness Journey <span className="text-primary">Starts Here.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Stop waiting for the perfect time. Start building the strongest version of yourself
              today.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:scale-[1.03] transition-transform"
              >
                Join Now <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="https://m.me/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/60 px-7 py-4 text-sm font-bold uppercase tracking-wider backdrop-blur hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" /> Chat on Messenger
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="container-x mx-auto max-w-7xl py-24 md:py-32">
        <SectionHeader
          tag="Members"
          title={<>Real People. <span className="text-primary">Real Progress.</span></>}
          sub="What our community is saying about training at Automan Fitness."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <img
                  src={r.img}
                  alt={r.name}
                  loading="lazy"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{r.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border bg-card/30">
        <div className="container-x mx-auto max-w-7xl py-24 md:py-32">
          <SectionHeader
            tag="Contact"
            title={<>Ready To <span className="text-primary">Start?</span></>}
            sub="Reach out — we're happy to answer any questions about membership, timings, or training."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard
                label="Main Phone"
                value="01314-495657"
                helper="Call us anytime"
                href="tel:01314495657"
              />
              <ContactCard
                label="Alternative"
                value="01631-893684"
                helper="Alternative number"
                href="tel:01631893684"
              />
              <a
                href="tel:01314495657"
                className="col-span-full flex items-center justify-center gap-2 rounded-md bg-primary py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <a
                href="https://m.me/"
                target="_blank"
                rel="noreferrer"
                className="col-span-full flex items-center justify-center gap-2 rounded-md border border-border bg-background py-4 text-sm font-bold uppercase tracking-wider hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" /> Chat on Messenger
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {BRANCHES.map((b) => (
                <div key={b.id} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    <MapPin className="h-3.5 w-3.5" /> {b.name}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.address}</p>
                  <a
                    href={b.maps}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                  >
                    Open in Maps <Navigation className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="container-x mx-auto max-w-7xl py-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                  <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <span className="text-base font-bold">Automan Fitness Gym</span>
              </div>
              <p className="mt-4 font-display text-sm text-primary">Let&apos;s Live Life</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                A modern fitness destination in Dhaka designed for people who are ready to train
                harder, live healthier, and become stronger.
              </p>
              <div className="mt-6 flex gap-2">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social"
                    className="grid h-10 w-10 place-items-center rounded-md border border-border transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Explore
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-primary">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Reach Us
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href="tel:01314495657" className="hover:text-primary">
                    01314-495657
                  </a>
                </li>
                <li>
                  <a href="tel:01631893684" className="hover:text-primary">
                    01631-893684
                  </a>
                </li>
                <li className="pt-3 text-xs uppercase tracking-widest text-muted-foreground">
                  Branches
                </li>
                <li>Tejgaon</li>
                <li>Dhanmondi</li>
              </ul>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© 2026 Automan Fitness Gym. All rights reserved.</p>
            <p>অটোম্যান ফিটনেস জিম</p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {modalOpen && <JoinModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function SectionHeader({
  tag,
  title,
  sub,
}: {
  tag: string;
  title: React.ReactNode;
  sub: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="mb-5 inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        {tag}
      </div>
      <h2 className="text-display text-4xl uppercase sm:text-5xl md:text-6xl">{title}</h2>
      <p className="mt-5 text-base text-muted-foreground sm:text-lg">{sub}</p>
    </div>
  );
}

function BranchCard({
  branch,
  status,
  onJoin,
}: {
  branch: Branch;
  status: { open: boolean; label: string };
  onJoin: () => void;
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/60">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={branch.image}
          alt={branch.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-semibold backdrop-blur">
          <span
            className={`h-2 w-2 rounded-full ${
              status.open ? "bg-primary animate-pulse" : "bg-muted-foreground"
            }`}
          />
          {status.label}
        </div>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold uppercase tracking-tight">{branch.name}</h3>
        <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{branch.address}</span>
        </p>

        <div className="mt-6 grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-2">
          <TimeRow label="Mon – Thu" value="8:00 AM – 10:30 PM" />
          <TimeRow label="Friday" value="5:00 PM – 10:30 PM" />
          <TimeRow label="Sat – Sun" value="8:00 AM – 10:30 PM" />
          <TimeRow label="Female Hour" value={branch.female} accent />
        </div>
        {branch.femaleNote && (
          <p className="mt-2 text-xs text-muted-foreground">*{branch.femaleNote}</p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={branch.maps}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary"
          >
            <Navigation className="h-4 w-4" /> Google Maps
          </a>
          <button
            onClick={onJoin}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform"
          >
            Join Now <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TimeRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className={`mt-0.5 font-medium ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}

function ContactCard({
  label,
  value,
  helper,
  href,
}: {
  label: string;
  value: string;
  helper: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/60"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <Phone className="h-4 w-4 text-primary" />
      </div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{helper}</div>
    </a>
  );
}

/* ---------- Modal ---------- */

function JoinModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    branch: "Tejgaon",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[0-9+\-\s]{7,20}$/.test(form.phone.trim())) errs.phone = "Please enter a valid phone number.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 px-4 backdrop-blur animate-fade-in-slow">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-md border border-border hover:border-primary hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="px-6 py-14 text-center md:px-10">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-2xl font-bold">You&apos;re in.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Thanks {form.name.split(" ")[0]}. Our team will call you shortly to confirm your
              membership details.
            </p>
            <button
              onClick={onClose}
              className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 md:p-8">
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Membership Inquiry
              </div>
              <h3 className="mt-2 text-2xl font-bold">Join Automan Fitness</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill this in and we&apos;ll get back to you.
              </p>
            </div>

            <div className="space-y-4">
              <Field label="Full Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  maxLength={80}
                  className="input"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={20}
                  inputMode="tel"
                  className="input"
                  placeholder="01XXX-XXXXXX"
                />
              </Field>
              <Field label="Preferred Branch">
                <select
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  className="input"
                >
                  <option>Tejgaon</option>
                  <option>Dhanmondi</option>
                </select>
              </Field>
              <Field label="Message (optional)">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  maxLength={500}
                  rows={3}
                  className="input resize-none"
                  placeholder="Anything we should know?"
                />
              </Field>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:scale-[1.01] transition-transform"
            >
              Submit Inquiry <ArrowRight className="h-4 w-4" />
            </button>

            <style>{`
              .input {
                width: 100%;
                background: transparent;
                border: 1px solid var(--color-border);
                border-radius: 0.5rem;
                padding: 0.75rem 0.9rem;
                font-size: 0.9rem;
                color: var(--color-foreground);
                outline: none;
                transition: border-color 0.15s;
              }
              .input:focus { border-color: var(--color-primary); }
              select.input { color: var(--color-foreground); }
              select.input option { background: var(--color-card); color: var(--color-foreground); }
            `}</style>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      {children}
      {error && <div className="mt-1 text-xs text-destructive">{error}</div>}
    </label>
  );
}
