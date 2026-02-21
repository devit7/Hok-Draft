"use client";

import { useRef, useState, useEffect } from "react";
import { Download, Pencil } from "lucide-react";
import { domToPng } from "modern-screenshot";
import DraftConfigPanel from "@/components/draft-pick/DraftConfigPanel";
import DraftMatchBoard from "@/components/draft-pick/DraftMatchBoard";
import HeroSelectionDrawer from "@/components/draft-pick/HeroSelectionDrawer";
import useDraftStore from "@/store/useDraftStore";

export default function DraftPickPage() {
  const { matches } = useDraftStore();
  const exportRef = useRef<HTMLDivElement>(null);

  // Export loading state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [customTitle, setCustomTitle] = useState("Draft Pick Simulation");

  const handleExport = async () => {
    if (!exportRef.current || isExporting) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      // Track progress
      let nodeCount = 0;
      const totalNodes = exportRef.current.querySelectorAll("*").length;

      const dataUrl = await domToPng(exportRef.current, {
        backgroundColor: "#0a0a0a",
        scale: 2,
        onCloneNode: (clonedNode) => {
          nodeCount++;
          const progress = Math.min(
            Math.round((nodeCount / totalNodes) * 90),
            90,
          );
          setExportProgress(progress);
        },
      });

      setExportProgress(95);

      const link = document.createElement("a");
      link.download = "draft-pick.png";
      link.href = dataUrl;
      link.click();

      setExportProgress(100);

      // Reset after delay
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);
    } catch (err) {
      console.error("Export failed:", err);
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <main className="flex flex-col my-10 px-4 w-full">
      <div className="mb-8 flex justify-between items-start gap-4">
        <div>
          <div className="text-2xl font-medium">Draft Pick Simulator</div>
          <span className="text-sm text-gray-400">
            Simulating the draft pick process with different strategies.
          </span>
        </div>
        <div className="flex flex-col gap-2 min-w-[140px]">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`px-4 py-2 flex items-center gap-2 rounded-xs transition-colors text-sm font-medium ${
              isExporting
                ? "bg-blue-600/50 text-blue-200 cursor-wait"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Download size={16} />
            {isExporting ? `${exportProgress}%` : "Export Image"}
          </button>

          {/* Progress Bar */}
          {isExporting && (
            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300 ease-out"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <DraftConfigPanel />

      <div ref={exportRef} className="bg-d-background sm:p-4 rounded-xs">
        {/* Custom Title */}
        <div className="w-full mb-6 py-2 border-b border-white/10 flex justify-center group relative">
          <div className="relative inline-block w-full max-w-3xl">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="bg-transparent text-center border-none outline-none w-full text-xl lg:text-2xl font-medium focus:text-blue-400 transition-colors pr-8"
              placeholder="Enter match title..."
            />
            <Pencil className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 opacity-100 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>

        <div className="space-y-12">
          {matches.map((match, index) => (
            <DraftMatchBoard key={match.id} matchIndex={index} />
          ))}
        </div>

        {/* Watermark */}
        <div className="flex justify-center items-center pt-8 pb-2 opacity-50">
          <span className="text-xs text-white">
            Made by hok-draft.web.id | Copyright © {new Date().getFullYear()} .
            All rights reserved.
          </span>
        </div>
      </div>

      {/* Hero Selection Drawer (Global) */}
      <HeroSelectionDrawer />
    </main>
  );
}
