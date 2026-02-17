"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Shield, Wrench, Activity } from "lucide-react";

const stats = [
  { icon: Users, value: 111, label: "Heroes", suffix: "" },
  { icon: Shield, value: 5, label: "Roles", suffix: "" },
  { icon: Wrench, value: 7, label: "Tools", suffix: "" },
  { icon: Activity, value: 100, label: "Real-time Data", suffix: "%" },
];

// Animated counter hook
function useCountUp(target: number, duration = 1500, trigger = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, trigger]);

  return count;
}

const StatCard = ({
  icon: Icon,
  value,
  label,
  suffix,
  trigger,
}: {
  icon: typeof Users;
  value: number;
  label: string;
  suffix: string;
  trigger: boolean;
}) => {
  const count = useCountUp(value, 1500, trigger);

  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-sm bg-gradient-to-b from-blue-950/30 to-transparent border border-blue-900/30 hover:border-blue-500/40 transition-colors duration-300">
      <Icon className="w-8 h-8 text-blue-400" />
      <div className="text-4xl font-bold text-white tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
};

const StatsHighlight = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} trigger={visible} />
        ))}
      </div>
    </section>
  );
};

export default StatsHighlight;
