"use client";

import { useRef } from "react";
import { Download } from "lucide-react";
import { domToPng } from "modern-screenshot";
import DraftConfigPanel from "@/components/draft-pick/DraftConfigPanel";
import DraftMatchBoard from "@/components/draft-pick/DraftMatchBoard";
import HeroSelectionDrawer from "@/components/draft-pick/HeroSelectionDrawer";
import useDraftStore from "@/store/useDraftStore";

export default function DraftPickPage() {
  const { matches } = useDraftStore();
  const exportRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!exportRef.current) return;
    try {
      const dataUrl = await domToPng(exportRef.current, {
        backgroundColor: "#0a0a0a",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = "draft-pick.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  return (
    <main className="flex flex-col my-10 px-4 w-full">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <div className="text-2xl font-medium">Draft Pick Simulator</div>
          <span className="text-sm text-gray-400">
            Simulating the draft pick process with different strategies.
          </span>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xs transition-colors text-sm font-medium"
        >
          <Download size={16} />
          Export Image
        </button>
      </div>

      <DraftConfigPanel />

      <div ref={exportRef} className="bg-d-background sm:p-4 rounded-xs">
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
