import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
  Navigation,
  Check,
} from "lucide-react";
import { AnimatedCounter, Reveal, StaggerContainer, StaggerItem } from "../components/animations";

const premiumEase = [0.22, 1, 0.36, 1];
const heroItem = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, ease: premiumEase },
  },
};

/* ---------- Data ---------- */

const NAV = [
  { href: "#branches", label: "Branches" },
  { href: "#facilities", label: "Facilities" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

const TRAINERS = [
  {
    name: "Rakib Hasan",
    role: "Head Strength Coach",
    img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Sadia Rahman",
    role: "Women's Fitness Trainer",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Tanvir Ahmed",
    role: "Functional & Conditioning",
    img: "https://images.unsplash.com/photo-1583500178690-f7fd39c8f6ac?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Imran Chowdhury",
    role: "Bodybuilding Coach",
    img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&q=80&auto=format&fit=crop",
  },
];

const GALLERY = [
  "/Gallery1.jpeg",
  "/Gallery2.jpeg",
  "/Gallery3.jpeg",
  "/Gallery4.jpeg",
  "/Gallery5.jpeg",
  "/Gallery6.jpeg",
  "/Gallery7.jpeg",
  "/Gallery8.jpeg",
];

const GALLERY_ALTS = [
  "Spacious gym floor with strength and cardio equipment",
  "Modern fitness center training area",
  "Free weights and strength-training equipment",
  "Member performing a strength-training workout",
  "Rows of modern cardio and resistance machines",
  "Athlete training with free weights",
  "Cardio equipment in a modern gym",
  "Open gym floor prepared for fitness training",
];

const HERO_IMG = "/Gallery1.jpeg";

const BRANCHES = [
  {
    id: "tejgaon",
    name: "Tejgaon Branch",
    address:
      "2nd Floor, Northern SR Tower, beside Tejgaon Thana, 49 Bir Uttam Ziaur Rahman Sarak, Dhaka-1215",
    female: "No female hour at any time",
    maps: "https://www.google.com/maps/search/?api=1&query=Automan+Fitness+Gym+Northern+SR+Tower+Tejgaon+Dhaka",
    embed:
      "https://www.google.com/maps?q=Automan+Fitness+Gym+Northern+SR+Tower+Tejgaon+Dhaka&output=embed",
    image: "/TejgaonBranch.jpeg",
  },
  {
    id: "dhanmondi",
    name: "Dhanmondi Branch",
    address: "House #39/A, Road #08, beside Sheikh Jamal Field, Dhanmondi, Dhaka",
    female: "12:00 PM – 2:00 PM",
    femaleNote: "Normal timing only",
    maps: "https://www.google.com/maps/search/?api=1&query=Automan+Fitness+Gym+Dhanmondi+House+39A+Road+8+Sheikh+Jamal+Field+Dhaka",
    embed:
      "https://www.google.com/maps?q=Automan+Fitness+Gym+Dhanmondi+House+39A+Road+8+Sheikh+Jamal+Field+Dhaka&output=embed",
    image: "/DhanmondiBranch.jpeg",
  },
];

const FACILITIES = [
  {
    title: "Strength Training",
    desc: "Heavy racks, plates and platforms built for serious lifters.",
    img: "/StrengthTraining.jpeg",
  },
  {
    title: "Cardio Zone",
    desc: "Modern treadmills, bikes and rowers for endurance work.",
    img: "/CardioZone.jpeg",
  },
  {
    title: "Free Weights",
    desc: "Full dumbbell and barbell range for compound training.",
    img: "/FreeWeights.jpeg",
  },
  {
    title: "Functional Training",
    desc: "Open floor for mobility, kettlebells and athletic conditioning.",
    img: "/FunctionalTraining.jpeg",
  },
  {
    title: "Locker Facilities",
    desc: "Secure lockers so you train with peace of mind.",
    img: "/LockerFacilities.jpeg",
  },
  {
    title: "Steam Bath",
    desc: "Recover, relax and reset after every session.",
    img: "/SteamBath.jpeg",
  },
];

const PRICING = [
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
    img: "/review1.png",
  },
  {
    name: "Nafis Shadman Quader",
    role: "Google Review • a year ago",
    rating: 5,
    text: "I've been coming to this gym for a while and overall it's been a good experience. The equipment is modern and well maintained, and the crowd is respectful and educated, which creates a pleasant atmosphere. The support staff are polite and helpful.",
    img: "/review2.png",
  },
  {
    name: "Sarah Nehrina Nazim",
    role: "Google Review • a year ago",
    rating: 5,
    text: "Small gestures of humbleness and kind words make it easy to maintain a relationship with the gym and continue coming back even after 5 years. Appreciate that the owner remembers his members after long gaps.",
    img: "/review3.png",
  },
  {
    name: "Almoin Nafis",
    role: "Google Review • 11 months ago",
    rating: 2,
    text: "Maintenance of equipment and air conditioning could be improved, and it can get crowded during peak hours. Sharing honest feedback so the team can keep improving.",
    img: "/review4.png",
  },
];

/* ---------- Utils ---------- */

function imageSrcSet(src, widths) {
  if (!src.includes("images.unsplash.com")) return undefined;
  return widths.map((width) => `${src.replace(/w=\d+/, `w=${width}`)} ${width}w`).join(", ");
}

// Regular schedule: Mon-Thu 08:00-22:30, Fri 17:00-22:30, Sat-Sun 08:00-22:30
function useOpenStatus() {
  const [now, setNow] = useState(null);
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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const status = useOpenStatus();
  const menuButtonRef = useRef(null);
  const modalTriggerRef = useRef(null);
  const wasModalOpenRef = useRef(false);
  const reducedMotion = useReducedMotion();

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

  useEffect(() => {
    if (modalOpen) modalTriggerRef.current = document.activeElement;
    if (!modalOpen && wasModalOpenRef.current) {
      requestAnimationFrame(() => modalTriggerRef.current?.focus());
    }
    wasModalOpenRef.current = modalOpen;
  }, [modalOpen]);

  useEffect(() => {
    if (!menuOpen && !modalOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (modalOpen) setModalOpen(false);
      if (menuOpen) {
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, modalOpen]);

  return (
    <div id="home" className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <motion.header
        initial={reducedMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: premiumEase }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/85 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container-x mx-auto flex h-16 max-w-7xl items-center justify-between md:h-20">
          <a href="#home" className="flex min-w-0 items-center gap-2.5">
            <img
              src="/Profile.jpeg"
              alt="Automan Fitness Gym logo"
              className="h-10 w-10 shrink-0 rounded-md object-cover"
            />
            <span className="truncate text-sm font-bold tracking-tight sm:text-base">
              Automan Fitness Gym
            </span>
          </a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="nav-link text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setModalOpen(true)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.97 }}
              className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:inline-flex"
            >
              Join Now
            </motion.button>
            <motion.button
              ref={menuButtonRef}
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={{ scale: 0.92 }}
              className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: premiumEase }}
              className="overflow-hidden border-t border-border bg-background lg:hidden"
            >
              <nav
                aria-label="Mobile navigation"
                className="container-x mx-auto flex max-w-7xl flex-col py-3"
              >
                {NAV.map((n, index) => (
                  <motion.a
                    key={n.href}
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reducedMotion ? 0 : 0.04 * index }}
                    className="flex items-center justify-between border-b border-border/60 py-3 text-base font-medium"
                  >
                    {n.label}
                    <ChevronRight className="h-4 w-4 text-primary" />
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        {/* HERO */}
        <section
          aria-labelledby="home-heading"
          className="relative isolate flex min-h-screen items-center overflow-hidden"
        >
          <motion.img
            src={HERO_IMG}
            srcSet={imageSrcSet(HERO_IMG, [640, 960, 1280, 1600, 2000])}
            sizes="100vw"
            alt="Modern gym floor with strength-training equipment"
            initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.12, ease: premiumEase }}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            width="2000"
            height="1333"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/60 to-background" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          <div className="container-x mx-auto w-full max-w-7xl pt-32 pb-24 md:pt-40 md:pb-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: reducedMotion ? 0 : 0.1, delayChildren: 0.28 },
                },
              }}
              className="max-w-3xl"
            >
              <motion.div
                variants={heroItem}
                className="mb-6 inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Automan Fitness Gym
              </motion.div>
              <motion.h1
                variants={heroItem}
                id="home-heading"
                className="text-display text-5xl uppercase sm:text-6xl md:text-7xl lg:text-8xl"
              >
                Build Your <br />
                <span className="text-primary">Strongest</span> Self.
              </motion.h1>
              <motion.p
                variants={heroItem}
                className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
              >
                Dhaka&apos;s modern fitness destination for people who are serious about their
                health, strength, and lifestyle.
              </motion.p>
              <motion.p
                variants={heroItem}
                className="mt-2 font-display text-base text-foreground/80"
              >
                অটোম্যান ফিটনেস জিম · <span className="text-primary">Let&apos;s Live Life</span>
              </motion.p>
              <motion.div variants={heroItem} className="mt-10 flex flex-col gap-3 sm:flex-row">
                <motion.button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.97 }}
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground"
                >
                  Join Now{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.a
                  href="https://www.facebook.com/afgprem"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/40 px-7 py-4 text-sm font-bold uppercase tracking-wider backdrop-blur hover:border-primary hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" /> Chat on Messenger
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: reducedMotion ? 0 : [0, 5, 0] }}
            transition={{
              opacity: { delay: 1.1 },
              y: { duration: 2.2, repeat: reducedMotion ? 0 : Infinity, ease: "easeInOut" },
            }}
            className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex"
          >
            Scroll
            <span className="relative h-10 w-px overflow-hidden bg-border">
              <span className="absolute inset-x-0 top-0 h-4 bg-primary animate-scroll-hint" />
            </span>
          </motion.div>
        </section>

        {/* STATS */}
        <section className="border-y border-border bg-card/50">
          <StaggerContainer className="container-x mx-auto grid max-w-7xl grid-cols-2 divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
            {[
              { k: "02", v: "Premium Locations" },
              { k: "100+", v: "Modern Equipment" },
              { k: "10+", v: "Certified Trainers" },
              { k: "24/7", v: "Locker & Steam Bath" },
            ].map((s, i) => (
              <StaggerItem key={i} className="px-4 py-8 md:px-8 md:py-10">
                <div className="flex items-baseline gap-1 text-display text-5xl md:text-6xl">
                  <AnimatedCounter value={s.k} />
                  <span className="text-primary">.</span>
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* WHY US */}
        <section id="why" className="container-x mx-auto max-w-7xl py-24 md:py-32">
          <SectionHeader
            tag="Why Automan"
            title={
              <>
                Train Different. <span className="text-primary">Live Different.</span>
              </>
            }
            sub="Everything you need to make your fitness journey stronger, smarter, and more consistent."
          />
          <StaggerContainer className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              <StaggerItem
                key={i}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/60"
              >
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold">{f.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
                <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* BRANCHES */}
        <section id="branches" className="border-t border-border bg-card/30">
          <div className="container-x mx-auto max-w-7xl py-24 md:py-32">
            <SectionHeader
              tag="Our Locations"
              title={
                <>
                  Find Your <span className="text-primary">Training Ground.</span>
                </>
              }
              sub="Two premium locations. One powerful fitness experience."
            />
            <StaggerContainer className="mt-14 grid gap-6 lg:grid-cols-2">
              {BRANCHES.map((b) => (
                <BranchCard
                  key={b.id}
                  branch={b}
                  status={status}
                  onJoin={() => setModalOpen(true)}
                />
              ))}
            </StaggerContainer>

            {/* Ramadan */}
            <Reveal className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-primary/30 bg-primary/5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Ramadan Hours
                  </div>
                  <p className="mt-1 font-display text-lg">রমজানে মহিলাদের জন্য আলাদা সময় নেই</p>
                  <p className="text-sm text-muted-foreground">
                    No separate female hour during Ramadan.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FACILITIES */}
        <section id="facilities" className="container-x mx-auto max-w-7xl py-24 md:py-32">
          <SectionHeader
            tag="Facilities"
            title={
              <>
                Everything Under <span className="text-primary">One Roof.</span>
              </>
            }
            sub="Purpose-built spaces for strength, endurance, recovery and everything in between."
          />
          {/* Mobile slider */}
          <StaggerContainer
            stagger={0.06}
            className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pt-5 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FACILITIES.map((f, i) => (
              <FacilityCard key={i} f={f} className="min-w-[82%] snap-start" />
            ))}
          </StaggerContainer>
          {/* Desktop grid */}
          <StaggerContainer className="mt-14 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map((f, i) => (
              <FacilityCard key={i} f={f} />
            ))}
          </StaggerContainer>
          <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground md:hidden">
            Swipe to explore →
          </p>
        </section>

        {/* TRAINERS */}
        <section id="trainers" className="border-t border-border bg-card/30">
          <div className="container-x mx-auto max-w-7xl py-24 md:py-32">
            <SectionHeader
              tag="Our Team"
              title={
                <>
                  Meet Your <span className="text-primary">Coaches.</span>
                </>
              }
              sub="Certified trainers with years of hands-on experience — ready to guide your journey."
            />
            {/* Mobile slider */}
            <StaggerContainer
              stagger={0.06}
              className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pt-5 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TRAINERS.map((t, i) => (
                <TrainerCard key={i} t={t} className="min-w-[75%] snap-start" />
              ))}
            </StaggerContainer>
            {/* Desktop grid */}
            <StaggerContainer className="mt-14 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
              {TRAINERS.map((t, i) => (
                <TrainerCard key={i} t={t} />
              ))}
            </StaggerContainer>
            <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground md:hidden">
              Swipe to meet more →
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="container-x mx-auto max-w-7xl py-24 md:py-32">
          <SectionHeader
            tag="Gallery"
            title={
              <>
                Inside <span className="text-primary">Automan.</span>
              </>
            }
            sub="A glimpse of our floor, equipment, community and events."
          />
          {/* Mobile slider */}
          <div className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pt-3 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {GALLERY.map((src, i) => (
              <div
                key={i}
                className="relative min-w-[82%] snap-start aspect-[4/3] overflow-hidden rounded-xl border border-border"
              >
                <img
                  src={src}
                  srcSet={imageSrcSet(src, [320, 640, 960, 1200])}
                  sizes="82vw"
                  alt={GALLERY_ALTS[i]}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Desktop slider */}
          <StaggerContainer
            stagger={0.06}
            className="mt-14 hidden gap-4 overflow-x-auto pb-4 md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {GALLERY.map((src, i) => (
              <StaggerItem
                key={i}
                className="relative min-w-[340px] aspect-[4/3] overflow-hidden rounded-xl border border-border transition-transform hover:-translate-y-1"
              >
                <img
                  src={src}
                  srcSet={imageSrcSet(src, [340, 680, 1020])}
                  sizes="340px"
                  alt={GALLERY_ALTS[i]}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* PRICING */}
        <section id="pricing" className="border-t border-border bg-card/30">
          <div className="container-x mx-auto max-w-7xl py-24 md:py-32">
            <SectionHeader
              tag="Membership Plans"
              title={
                <>
                  Simple, Honest <span className="text-primary">Pricing.</span>
                </>
              }
              sub="Choose the plan that fits your goals. Couple packages available on every duration."
            />

            {/* Mobile slider */}
            <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pt-5 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {PRICING.map((p, i) => (
                <PricingCard
                  key={i}
                  plan={p}
                  onJoin={() => setModalOpen(true)}
                  className="min-w-[82%] snap-start"
                />
              ))}
            </div>
            {/* Desktop grid */}
            <StaggerContainer
              stagger={0.07}
              className="mt-10 hidden gap-4 pt-4 md:grid md:grid-cols-3 lg:grid-cols-5"
            >
              {PRICING.map((p, i) => (
                <PricingCard key={i} plan={p} onJoin={() => setModalOpen(true)} />
              ))}
            </StaggerContainer>
            <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground md:hidden">
              Swipe for more plans →
            </p>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="container-x mx-auto max-w-7xl py-24 md:py-32">
          <SectionHeader
            tag="Members"
            title={
              <>
                Real People. <span className="text-primary">Real Progress.</span>
              </>
            }
            sub="What our community is saying about training at Automan Fitness."
          />
          {/* Mobile slider */}
          <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pt-5 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={i} r={r} className="min-w-[85%] snap-start" />
            ))}
          </div>
          {/* Desktop grid */}
          <StaggerContainer className="mt-14 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={i} r={r} />
            ))}
          </StaggerContainer>
          <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground md:hidden">
            Swipe to read more →
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-border bg-card/30">
          <div className="container-x mx-auto max-w-7xl py-24 md:py-32">
            <SectionHeader
              tag="Contact"
              title={
                <>
                  Ready To <span className="text-primary">Start?</span>
                </>
              }
              sub="Reach out — we're happy to answer any questions about membership, timings, or training."
            />

            <StaggerContainer className="mt-14 grid gap-6 lg:grid-cols-2">
              <StaggerItem className="grid gap-4 sm:grid-cols-2">
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
                  href="https://www.facebook.com/afgprem"
                  target="_blank"
                  rel="noreferrer"
                  className="col-span-full flex items-center justify-center gap-2 rounded-md border border-border bg-background py-4 text-sm font-bold uppercase tracking-wider hover:border-primary hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" /> Chat on Messenger
                </a>
              </StaggerItem>
              <div className="grid gap-4 sm:grid-cols-2">
                {BRANCHES.map((b) => (
                  <div
                    key={b.id}
                    className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                        <MapPin className="h-3.5 w-3.5" /> {b.name}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {b.address}
                      </p>
                      <a
                        href={b.maps}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary"
                      >
                        Open in Maps <Navigation className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <iframe
                      src={b.embed}
                      title={`${b.name} on Google Maps`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-56 w-full border-t border-border grayscale-[35%] contrast-125"
                    />
                  </div>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="container-x mx-auto max-w-7xl py-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5">
                <img
                  src="/Profile.jpeg"
                  alt="Automan Fitness Gym logo"
                  className="h-10 w-10 shrink-0 rounded-md object-cover"
                />
                <span className="text-base font-bold">Automan Fitness Gym</span>
              </div>
              <p className="mt-4 font-display text-sm text-primary">Let&apos;s Live Life</p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                A modern fitness destination in Dhaka designed for people who are ready to train
                harder, live healthier, and become stronger.
              </p>
              <div className="mt-6 flex gap-2">
                <a
                  href="https://www.facebook.com/afgprem"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Automan Fitness Gym on Facebook"
                  className="grid h-10 w-10 place-items-center rounded-md border border-border transition-colors hover:border-primary hover:text-primary"
                >
                  <Facebook className="h-4 w-4" />
                </a>
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
      <AnimatePresence>
        {modalOpen && <JoinModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function SectionHeader({ tag, title, sub }) {
  return (
    <StaggerContainer className="max-w-3xl" stagger={0.1}>
      <StaggerItem className="mb-5 inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        {tag}
      </StaggerItem>
      <StaggerItem as="h2" className="text-display text-4xl uppercase sm:text-5xl md:text-6xl">
        {title}
      </StaggerItem>
      <StaggerItem as="p" className="mt-5 text-base text-muted-foreground sm:text-lg">
        {sub}
      </StaggerItem>
    </StaggerContainer>
  );
}

function BranchCard({ branch, status, onJoin }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/60">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={branch.image}
          srcSet={imageSrcSet(branch.image, [480, 800, 1200, 1400])}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={`${branch.name} gym facility in Dhaka`}
          width="1400"
          height="875"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
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
      <Reveal className="p-6 md:p-8" distance={20}>
        <h3 className="text-2xl font-bold uppercase tracking-tight">{branch.name}</h3>
        <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{branch.address}</span>
        </p>

        <div className="mt-6 grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-2">
          <TimeRow label="Sat – Thu" value="8:00 AM – 10:30 PM" />
          <TimeRow label="Friday" value="5:00 PM – 10:30 PM" />
        </div>

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
      </Reveal>
    </div>
  );
}

function TimeRow({ label, value, accent }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className={`mt-0.5 font-medium ${accent ? "text-primary" : ""}`}>{value}</div>
    </div>
  );
}

function ContactCard({ label, value, helper, href }) {
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

function FacilityCard({ f, className = "" }) {
  return (
    <StaggerItem
      className={`group relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card ${className}`}
    >
      <img
        src={f.img}
        srcSet={imageSrcSet(f.img, [320, 640, 960, 1200])}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 82vw"
        alt={`${f.title} facility and equipment`}
        width="1200"
        height="1500"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="mb-1 h-px w-8 bg-primary transition-all duration-500 group-hover:w-16" />
        <h3 className="mt-3 text-xl font-bold">{f.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
      </div>
    </StaggerItem>
  );
}

function ReviewCard({ r, className = "" }) {
  return (
    <StaggerItem
      className={`flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 ${className}`}
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
          alt=""
          width="200"
          height="200"
          loading="lazy"
          decoding="async"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{r.name}</div>
          <div className="truncate text-xs text-muted-foreground">{r.role}</div>
        </div>
      </div>
    </StaggerItem>
  );
}

function AdmissionStat({ label, value, strike, accent }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div
        className={`mt-1 text-xl font-bold ${accent ? "text-primary" : ""} ${
          strike ? "text-muted-foreground line-through" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function PricingCard({ plan, onJoin, className = "" }) {
  return (
    <StaggerItem
      featured={plan.highlight}
      className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
        plan.highlight
          ? "border-primary bg-primary/[0.07] shadow-[0_0_0_1px_var(--primary)]"
          : "border-border bg-card hover:border-primary/50"
      } ${className}`}
    >
      {plan.badge && (
        <span
          className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
            plan.highlight
              ? "bg-primary text-primary-foreground"
              : "bg-background text-primary border border-primary/40"
          }`}
        >
          {plan.badge}
        </span>
      )}
      <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {plan.name}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-display text-4xl">{plan.price}</span>
        {plan.original && (
          <span className="text-sm text-muted-foreground line-through">{plan.original}</span>
        )}
      </div>
      {plan.couple && <div className="mt-1 text-xs font-medium text-primary">{plan.couple}</div>}
      <ul className="mt-5 flex-1 space-y-2.5 border-t border-border pt-5 text-sm">
        {plan.perks.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-foreground/90">{p}</span>
          </li>
        ))}
      </ul>
    </StaggerItem>
  );
}

function TrainerCard({ t, className = "" }) {
  return (
    <div className={`flex flex-col items-center px-3 py-5 text-center ${className}`}>
      <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-primary/40 p-1 sm:h-44 sm:w-44">
        <img
          src={t.img}
          srcSet={imageSrcSet(t.img, [320, 480, 640, 800])}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 75vw"
          alt={t.name}
          width="800"
          height="800"
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="mt-5 flex flex-1 flex-col items-center">
        <h3 className="text-xl font-bold">{t.name}</h3>
        <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-primary">
          {t.role}
        </div>
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */

function JoinModal({ onClose }) {
  const inquiryEndpoint = "https://formsubmit.co/ajax/saimunhasanrifat14@gmail.com";
  const [form, setForm] = useState({
    name: "",
    phone: "",
    branch: "Tejgaon",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[0-9+\-\s]{7,20}$/.test(form.phone.trim()))
      errs.phone = "Please enter a valid phone number.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setSubmitError("Please correct the highlighted fields before submitting.");
      return;
    }
    if (form.website) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(inquiryEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Joining Request",
          _template: "table",
          "Client Name": form.name.trim(),
          "Phone Number": form.phone.trim(),
          "Preferred Branch": form.branch,
          "Client Message": form.message.trim() || "No additional message",
        }),
      });
      const result = await response.json().catch(() => null);
      const wasSuccessful = result?.success === true || result?.success === "true";

      if (!response.ok || !wasSuccessful) {
        throw new Error(result?.message || "The inquiry could not be sent.");
      }

      setSubmitted(true);
    } catch (error) {
      const needsActivation =
        error instanceof Error && error.message.toLowerCase().includes("activation");
      setSubmitError(
        needsActivation
          ? "Email delivery needs one-time activation. Open the activation email we sent to the gym inbox, click “Activate Form,” then submit again."
          : "We couldn't send your inquiry right now. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 px-4 backdrop-blur"
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.32, ease: premiumEase }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      >
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
            <h3 id="join-modal-title" className="mt-6 text-2xl font-bold">
              You&apos;re in.
            </h3>
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
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[10000px] h-px w-px overflow-hidden"
            />
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Membership Inquiry
              </div>
              <h3 id="join-modal-title" className="mt-2 text-2xl font-bold">
                Join Automan Fitness
              </h3>
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

            {submitError && (
              <div
                role="alert"
                className="mt-5 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              >
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Submit Inquiry <ArrowRight className="h-4 w-4" />
                </>
              )}
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
      </motion.div>
    </motion.div>
  );
}

function Field({ label, error, children }) {
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
