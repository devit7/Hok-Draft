"use client";

import { useState, useEffect, useRef } from "react";
import { HERO_LIST } from "@/static-database/hero/hero-list-simple";
import { HERO_EXPERIENCE } from "@/static-database/hero/hero-experience";
import { HERO_TAG } from "@/static-database/hero/hero-tag";
import { HERO_ROLE } from "@/static-database/hero/hero-role";
import { HERO_POWER_SPIKE } from "@/static-database/hero/hero-scaling";

// ─── Types ─────────────────────────────────────────────────────────

type HeroEnrichment = {
  experienceId: number | null;
  tagIds: number[];
  roleIds: number[];
  powerSpikeIds: number[];
};

type EnrichmentMap = Record<number, HeroEnrichment>;

const STORAGE_KEY = "hero-generator-data";
const ORDER_STORAGE_KEY = "hero-generator-order";

// ─── Helpers ───────────────────────────────────────────────────────

const emptyEnrichment: HeroEnrichment = {
  experienceId: null,
  tagIds: [],
  roleIds: [],
  powerSpikeIds: [],
};

function getEnrichment(map: EnrichmentMap, heroId: number): HeroEnrichment {
  return map[heroId] ?? emptyEnrichment;
}

function isEnriched(e: HeroEnrichment): boolean {
  return (
    e.experienceId !== null ||
    e.tagIds.length > 0 ||
    e.roleIds.length > 0 ||
    e.powerSpikeIds.length > 0
  );
}

function countEnriched(map: EnrichmentMap): number {
  return Object.values(map).filter(isEnriched).length;
}

// ─── MultiSelect Component ────────────────────────────────────────

type MultiSelectOption = {
  id: number;
  label: string;
  icon?: string;
};

function MultiSelect({
  options,
  selectedIds,
  onChange,
  placeholder = "Select...",
}: {
  options: MultiSelectOption[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (id: number) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((v) => v !== id)
        : [...selectedIds, id],
    );
  };

  const selectedLabels = options
    .filter((o) => selectedIds.includes(o.id))
    .map((o) => o.label);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          w-full min-w-[130px] px-3 py-1.5 rounded-lg text-sm text-left
          border transition-colors truncate flex items-center justify-between gap-1
          ${
            selectedIds.length > 0
              ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
              : "border-white/10 bg-white/5 text-gray-400"
          }
          hover:border-white/30
        `}
      >
        <span className="truncate">
          {selectedIds.length === 0
            ? placeholder
            : selectedIds.length === 1
              ? selectedLabels[0]
              : `${selectedIds.length} selected`}
        </span>
        <svg
          className={`w-3 h-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-[100] mt-1 w-full min-w-[180px] rounded-lg border border-white/15 bg-[#1a1730] shadow-2xl shadow-black/60 overflow-hidden">
          {options.map((opt) => (
            <label
              key={opt.id}
              className={`
                flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer select-none
                hover:bg-white/10 transition-colors
                ${selectedIds.includes(opt.id) ? "text-blue-300 bg-blue-500/10" : "text-gray-300"}
              `}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(opt.id)}
                onChange={() => toggle(opt.id)}
                className="accent-blue-500 rounded w-3.5 h-3.5 shrink-0"
              />
              {opt.icon && (
                <img
                  src={opt.icon}
                  alt=""
                  className="w-4 h-4 object-contain shrink-0"
                />
              )}
              <span className="truncate">{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────

export default function HeroGeneratorPage() {
  const [enrichments, setEnrichments] = useState<EnrichmentMap>({});
  const [heroOrder, setHeroOrder] = useState<number[]>(() =>
    HERO_LIST.map((h) => h.heroId),
  );
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setEnrichments(JSON.parse(stored));

      const storedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
      if (storedOrder) {
        const parsed: number[] = JSON.parse(storedOrder);
        // Ensure all hero IDs are present (in case new heroes were added)
        const existingIds = new Set(HERO_LIST.map((h) => h.heroId));
        const validOrder = parsed.filter((id) => existingIds.has(id));
        const missing = HERO_LIST.filter(
          (h) => !validOrder.includes(h.heroId),
        ).map((h) => h.heroId);
        setHeroOrder([...validOrder, ...missing]);
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enrichments));
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(heroOrder));
    }
  }, [enrichments, heroOrder, loaded]);

  // Reorder helpers
  const moveHero = (heroId: number, newIndex: number) => {
    setHeroOrder((prev) => {
      const currentIndex = prev.indexOf(heroId);
      if (currentIndex === -1) return prev;
      const clamped = Math.max(0, Math.min(prev.length - 1, newIndex));
      if (currentIndex === clamped) return prev;
      const next = [...prev];
      next.splice(currentIndex, 1);
      next.splice(clamped, 0, heroId);
      return next;
    });
  };

  const moveUp = (heroId: number) => {
    const idx = heroOrder.indexOf(heroId);
    if (idx > 0) moveHero(heroId, idx - 1);
  };

  const moveDown = (heroId: number) => {
    const idx = heroOrder.indexOf(heroId);
    if (idx < heroOrder.length - 1) moveHero(heroId, idx + 1);
  };

  // Update enrichment for a hero
  const updateHero = (heroId: number, partial: Partial<HeroEnrichment>) => {
    setEnrichments((prev) => ({
      ...prev,
      [heroId]: { ...getEnrichment(prev, heroId), ...partial },
    }));
  };

  // Build ordered hero list
  const heroMap = new Map(HERO_LIST.map((h) => [h.heroId, h]));
  const orderedHeroes = heroOrder
    .map((id) => heroMap.get(id))
    .filter(Boolean) as typeof HERO_LIST;

  // Filter heroes by search
  const filteredHeroes = orderedHeroes.filter((h) =>
    h.heroName.toLowerCase().includes(search.toLowerCase()),
  );

  const isSearching = search.trim().length > 0;

  // Stats
  const enrichedCount = countEnriched(enrichments);
  const totalCount = HERO_LIST.length;
  const progressPct = totalCount > 0 ? (enrichedCount / totalCount) * 100 : 0;

  // Generate and download (uses custom order)
  const handleDownload = () => {
    const enrichedHeroes = orderedHeroes.map((hero) => {
      const e = getEnrichment(enrichments, hero.heroId);

      const experienceObj = HERO_EXPERIENCE.find(
        (x) => x.id === e.experienceId,
      );
      const roleObjs = e.roleIds
        .map((id) => HERO_ROLE.find((r) => r.id === id))
        .filter(Boolean);
      const tagStrs = e.tagIds
        .map((id) => HERO_TAG.find((t) => t.id === id)?.tag)
        .filter(Boolean);
      const psStrs = e.powerSpikeIds
        .map((id) => HERO_POWER_SPIKE.find((p) => p.id === id)?.powerSpike)
        .filter(Boolean);

      return {
        heroId: hero.heroId,
        heroName: hero.heroName,
        heroCareer: hero.heroCareer,
        showRate: hero.showRate,
        banRate: hero.banRate,
        winRate: hero.winRate,
        media: hero.media,
        heroExperience: experienceObj?.experience ?? "",
        role: roleObjs,
        tags: tagStrs,
        powerSpike: psStrs,
      };
    });

    const content = [
      `// Hero List — Enriched Data`,
      `// Generated: ${new Date().toLocaleString()}`,
      `// Total: ${enrichedHeroes.length} heroes (${enrichedCount} enriched)`,
      ``,
      `export const HERO_LIST_ENRICHED = ${JSON.stringify(enrichedHeroes, null, 2)};`,
      ``,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hero-list-enriched.ts";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Clear all
  const handleClear = () => {
    if (confirm("Clear all enrichment data? This cannot be undone.")) {
      setEnrichments({});
    }
  };

  // Prepare multi-select options
  const tagOptions: MultiSelectOption[] = HERO_TAG.map((t) => ({
    id: t.id,
    label: t.tag,
  }));
  const roleOptions: MultiSelectOption[] = HERO_ROLE.map((r) => ({
    id: r.id,
    label: r.role,
    icon: r.icon,
  }));
  const powerSpikeOptions: MultiSelectOption[] = HERO_POWER_SPIKE.map((p) => ({
    id: p.id,
    label: p.powerSpike,
  }));

  if (!loaded) {
    return (
      <main className="mt-20 flex items-center justify-center">
        <div className="text-gray-400 animate-pulse">Loading...</div>
      </main>
    );
  }

  return (
    <main className="mt-16 pb-20">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          ⚔️ Hero Data Generator
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Enrich hero data dengan Experience, Tags, Roles, dan Power Spike, lalu
          download hasilnya sebagai file <code>.ts</code>.
        </p>
      </div>

      {/* ── Toolbar ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search hero..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 w-64 transition-colors"
          />
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <span className="text-sm text-gray-400 whitespace-nowrap">
            <span className="text-white font-semibold">{enrichedCount}</span>
            <span className="mx-0.5">/</span>
            <span>{totalCount}</span>
            <span className="ml-1">enriched</span>
          </span>
          <div className="flex-1 max-w-[200px] h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            ⬇ Download .ts
          </button>
        </div>
      </div>

      {/* ── Table ─────────────────────────────────────────── */}
      <div className="rounded-xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-d-primary-surface text-gray-400 text-xs uppercase tracking-wider sticky top-0 z-10">
                <th className="px-4 py-3 text-left w-12 rounded-tl-xl">#</th>
                {!isSearching && (
                  <th className="px-2 py-3 text-center w-20">Move</th>
                )}
                <th className="px-3 py-3 text-left w-14">Icon</th>
                <th className="px-4 py-3 text-left min-w-[140px]">Hero</th>
                <th className="px-4 py-3 text-left min-w-[120px]">Career</th>
                <th className="px-4 py-3 text-left min-w-[150px]">
                  Experience
                </th>
                <th className="px-4 py-3 text-left min-w-[160px]">Tags</th>
                <th className="px-4 py-3 text-left min-w-[160px]">Roles</th>
                <th
                  className={`px-4 py-3 text-left min-w-[170px] ${isSearching ? "rounded-tr-xl" : ""}`}
                >
                  Power Spike
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredHeroes.map((hero, index) => {
                const e = getEnrichment(enrichments, hero.heroId);
                const enriched = isEnriched(e);

                return (
                  <tr
                    key={hero.heroId}
                    className={`
                      group transition-colors
                      ${
                        enriched
                          ? "bg-blue-500/[0.03] hover:bg-blue-500/[0.06]"
                          : "hover:bg-white/[0.03]"
                      }
                    `}
                  >
                    {/* Index */}
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        {enriched && (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        )}
                        {index + 1}
                      </div>
                    </td>

                    {/* Move controls */}
                    {!isSearching && (
                      <td className="px-2 py-1">
                        <div className="flex items-center justify-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => moveUp(hero.heroId)}
                            disabled={index === 0}
                            className="p-1 rounded hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed text-gray-400 hover:text-white transition-colors"
                            title="Move up"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => moveDown(hero.heroId)}
                            disabled={index === filteredHeroes.length - 1}
                            className="p-1 rounded hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed text-gray-400 hover:text-white transition-colors"
                            title="Move down"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={orderedHeroes.length}
                            placeholder={String(index + 1)}
                            className="w-10 px-1 py-0.5 text-[11px] text-center rounded bg-white/5 border border-white/10 text-gray-400 focus:text-white focus:outline-none focus:border-blue-500/50 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            onKeyDown={(ev) => {
                              if (ev.key === "Enter") {
                                const val = parseInt(
                                  (ev.target as HTMLInputElement).value,
                                );
                                if (!isNaN(val)) {
                                  moveHero(hero.heroId, val - 1);
                                  (ev.target as HTMLInputElement).value = "";
                                  (ev.target as HTMLInputElement).blur();
                                }
                              }
                            }}
                            onBlur={(ev) => {
                              const val = parseInt(ev.target.value);
                              if (!isNaN(val)) {
                                moveHero(hero.heroId, val - 1);
                                ev.target.value = "";
                              }
                            }}
                          />
                        </div>
                      </td>
                    )}

                    {/* Icon */}
                    <td className="px-3 py-3">
                      <img
                        src={hero.media.heroIcon}
                        alt={hero.heroName}
                        className="w-9 h-9 rounded-full object-cover bg-white/10 ring-1 ring-white/10"
                        loading="lazy"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3">
                      <span className="font-medium text-white">
                        {hero.heroName}
                      </span>
                    </td>

                    {/* Career */}
                    <td className="px-4 py-3 text-gray-400">
                      {hero.heroCareer}
                    </td>

                    {/* Experience - Single Select */}
                    <td className="px-4 py-3">
                      <select
                        value={e.experienceId ?? ""}
                        onChange={(ev) =>
                          updateHero(hero.heroId, {
                            experienceId: ev.target.value
                              ? Number(ev.target.value)
                              : null,
                          })
                        }
                        className={`
                          w-full px-3 py-1.5 rounded-lg text-sm border transition-colors
                          cursor-pointer
                          ${
                            e.experienceId
                              ? "border-blue-500/50 bg-blue-500/10 text-blue-300"
                              : "border-white/10 bg-white/5 text-gray-400"
                          }
                          hover:border-white/30 focus:outline-none focus:border-blue-500/50
                        `}
                      >
                        <option value="" className="bg-[#1a1730] text-gray-400">
                          Select...
                        </option>
                        {HERO_EXPERIENCE.map((exp) => (
                          <option
                            key={exp.id}
                            value={exp.id}
                            className="bg-[#1a1730] text-white"
                          >
                            {exp.experience}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Tags - Multi Select */}
                    <td className="px-4 py-3">
                      <MultiSelect
                        options={tagOptions}
                        selectedIds={e.tagIds}
                        onChange={(ids) =>
                          updateHero(hero.heroId, { tagIds: ids })
                        }
                        placeholder="Tags..."
                      />
                    </td>

                    {/* Roles - Multi Select */}
                    <td className="px-4 py-3">
                      <MultiSelect
                        options={roleOptions}
                        selectedIds={e.roleIds}
                        onChange={(ids) =>
                          updateHero(hero.heroId, { roleIds: ids })
                        }
                        placeholder="Roles..."
                      />
                    </td>

                    {/* Power Spike - Multi Select */}
                    <td className="px-4 py-3">
                      <MultiSelect
                        options={powerSpikeOptions}
                        selectedIds={e.powerSpikeIds}
                        onChange={(ids) =>
                          updateHero(hero.heroId, { powerSpikeIds: ids })
                        }
                        placeholder="Power Spike..."
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredHeroes.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            <div className="text-3xl mb-2">🔍</div>
            <p>
              No heroes found for &ldquo;
              <span className="text-white">{search}</span>&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Data saved automatically to localStorage •{" "}
        {filteredHeroes.length !== totalCount &&
          `Showing ${filteredHeroes.length} of `}
        {totalCount} heroes
      </div>
    </main>
  );
}
