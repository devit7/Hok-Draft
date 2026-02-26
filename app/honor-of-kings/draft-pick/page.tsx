"use client";

import { useRef, useState } from "react";
import { Download, Pencil } from "lucide-react";
import { domToPng } from "modern-screenshot";
import DraftConfigPanel from "@/components/draft-pick/DraftConfigPanel";
import DraftMatchBoard from "@/components/draft-pick/DraftMatchBoard";
import HeroSelectionDrawer from "@/components/draft-pick/HeroSelectionDrawer";
import useDraftStore from "@/store/useDraftStore";

export default function DraftPickPage() {
  const { matches, config } = useDraftStore();
  const exportRef = useRef<HTMLDivElement>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [customTitle, setCustomTitle] = useState("Draft Pick Simulation");

  const draftStyle = config?.draftStyle || "normal";
  const bgStyle = config?.bgStyle || "default";

  const handleExport = async () => {
    if (!exportRef.current || isExporting) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      let nodeCount = 0;
      const totalNodes = exportRef.current.querySelectorAll("*").length;

      const dataUrl = await domToPng(exportRef.current, {
        backgroundColor: bgStyle === "white" ? "#ffffff" : "#181b44",
        scale: 2,
        onCloneNode: () => {
          nodeCount++;
          setExportProgress(
            Math.min(Math.round((nodeCount / totalNodes) * 90), 90),
          );
        },
      });

      setExportProgress(95);

      const link = document.createElement("a");
      const safeTitle = customTitle
        ? customTitle.replace(/[^a-z0-9]/gi, "-").toLowerCase()
        : "draft-pick";
      link.download = `${safeTitle}.png`;
      link.href = dataUrl;
      link.click();

      setExportProgress(100);
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
    <main className="flex flex-col my-10 w-full">
      <div className="mb-8 flex justify-between items-start gap-4">
        <div>
          <div className="text-2xl font-medium">Draft Pick Simulator</div>
          <span className="text-sm text-gray-400">
            Simulating the draft pick process with different strategies.
          </span>
        </div>
        <div className="flex flex-col gap-2 min-w-[140px] sm:min-w-[200px]">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`px-4 py-2 flex items-center justify-center gap-2 rounded-xs transition-colors text-sm font-medium ${
              isExporting
                ? "bg-blue-600/50 text-blue-200 cursor-wait"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <Download size={16} />
            {isExporting ? `${exportProgress}%` : "Export Image"}
          </button>

          {isExporting && (
            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-blue-500 to-blue-400 transition-all duration-300 ease-out"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <DraftConfigPanel />

      <div
        ref={exportRef}
        className={`rounded-xs ${
          draftStyle === "compact" ? "w-fit mx-auto px-4 py-4" : "sm:p-4"
        } ${bgStyle === "white" ? "bg-white text-gray-800" : "bg-transparent text-white"}`}
      >
        {/* Custom Title */}
        <div
          className={`w-full mb-6 py-2 border-b flex justify-center group relative ${
            bgStyle === "white" ? "border-gray-200" : "border-white/10"
          }`}
        >
          <div className="relative inline-block w-full max-w-3xl">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className={`bg-transparent text-center border-none outline-none w-full text-xl lg:text-2xl font-medium transition-colors pr-8 ${
                bgStyle === "white"
                  ? "text-gray-800 focus:text-blue-600"
                  : "text-white focus:text-blue-400"
              }`}
              placeholder="Enter match title..."
            />
            <Pencil className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>

        <div className={` ${draftStyle === "compact" ? "" : "space-y-12"}`}>
          {matches.map((match, index) => (
            <DraftMatchBoard
              key={match.id}
              matchIndex={index}
              isExporting={isExporting}
            />
          ))}
        </div>

        {/* Watermark */}
        <div
          className={`flex justify-center items-center pt-8 pb-2 opacity-50 ${
            bgStyle === "white" ? "text-gray-500" : "text-white"
          }`}
        >
          <span className="text-xs">
            Made by hok-draft.web.id | Copyright © {new Date().getFullYear()} .
            All rights reserved.
          </span>
        </div>
      </div>

      <HeroSelectionDrawer />
    </main>
  );
}
