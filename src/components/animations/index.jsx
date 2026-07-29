import { createElement, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";

const easeOut = [0.22, 1, 0.36, 1];

const directions = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -24 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none: { x: 0, y: 0 },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, ease: easeOut },
  },
};

export function Reveal({
  children,
  className = "",
  as = "div",
  direction = "up",
  distance,
  delay = 0,
  duration = 0.65,
  amount = 0.2,
  margin = "0px 0px -8% 0px",
  replay = true,
  scale = 1,
  ...props
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: !replay, amount, margin });
  const reduced = useReducedMotion();
  const Component = motion[as] || motion.div;
  const vector = directions[direction] || directions.up;
  const multiplier = distance == null ? 1 : distance / Math.max(Math.abs(vector.x || vector.y), 1);

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {
          opacity: reduced ? 1 : 0,
          x: reduced ? 0 : vector.x * multiplier,
          y: reduced ? 0 : vector.y * multiplier,
          scale: reduced ? 1 : scale,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: reduced ? 0.01 : duration,
            delay: reduced ? 0 : delay,
            ease: easeOut,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function StaggerContainer({
  children,
  className = "",
  as = "div",
  amount = 0.15,
  margin = "0px 0px -6% 0px",
  stagger = 0.09,
  replay = true,
  ...props
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: !replay, amount, margin });
  const reduced = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: reduced ? 0 : 0.03,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className = "", as = "div", featured = false, ...props }) {
  const reduced = useReducedMotion();
  const Component = motion[as] || motion.div;
  return (
    <Component
      variants={
        reduced
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : {
              ...staggerItem,
              hidden: { ...staggerItem.hidden, scale: featured ? 0.95 : 0.98 },
            }
      }
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function AnimatedCounter({ value, className = "" }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match?.[2] || "";
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.65 });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced || target == null ? target : 0);

  useEffect(() => {
    if (target == null || reduced) {
      setCount(target);
      return;
    }
    if (!inView) {
      setCount(0);
      return;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 900, 1);
      setCount(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, target]);

  if (target == null) return createElement("span", { className }, value);
  return (
    <span ref={ref} className={className}>
      {String(value).startsWith("0") && count < 10 ? "0" : ""}
      {count}
      {suffix}
    </span>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-primary"
      style={{ scaleX }}
    />
  );
}
