import React from "react";

type DraftHeaderProps = {
  phaseName: string;
  timer: number;
  showTimer: boolean;
  onConfigClick: () => void;
};

const DraftHeader: React.FC<DraftHeaderProps> = ({ 
  phaseName, 
  timer, 
  showTimer,
  /* onConfigClick */
}) => {
  return (
    <div className="mb-8 text-center">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-white">Honor of Kings Draft Simulator</h1>
        {/* <button
          onClick={onConfigClick}
          className="text-sm px-3 py-1 bg-[#191937] hover:bg-[#232350] text-white rounded-md"
        >
          ⚙️ Config
        </button> */}
      </div>
      <div className="bg-[#191937] px-6 py-3 rounded-lg inline-block">
        <span className="text-xl font-bold">{phaseName}</span>
        {showTimer && (
          <span className="ml-4 text-lg">
            Time: <span className={`font-mono ${timer <= 10 ? "text-red-500" : "text-blue-400"}`}>{timer}s</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default DraftHeader;
