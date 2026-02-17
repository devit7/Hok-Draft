import Image from "next/image";
import type { TierColumn } from "./TierColumnModeFilter";

const TierRoleHeader = ({ columns }: { columns: TierColumn[] }) => {
  const colCount = columns.length;

  return (
    <div className="flex gap-0 items-stretch">
      {/* Spacer for tier label column */}
      <div className="min-w-15 shrink-0" />

      {/* Dynamic columns */}
      <div
        className="flex-1 grid gap-px"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {columns.map((col) => (
          <div
            key={col.id}
            className="flex items-center justify-center gap-1.5 py-2 px-2 bg-d-primary-surface"
          >
            {col.icon && (
              <Image
                src={col.icon}
                alt={col.label}
                width={20}
                height={20}
                className="w-5 h-5"
              />
            )}
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">
              {col.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TierRoleHeader;
