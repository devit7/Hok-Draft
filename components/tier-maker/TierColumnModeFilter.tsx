"use client";

import Image from "next/image";
import { HERO_ROLE } from "@/static-database/hero/hero-role";
import { Plus, X } from "lucide-react";

export type ColumnMode = "all-roles" | "single-role" | "custom";

export type TierColumn = {
  id: string;
  label: string;
  icon?: string;
};

// Build columns from the current mode
export function buildColumns(
  mode: ColumnMode,
  selectedRoleId: number | null,
  customColumns: TierColumn[],
): TierColumn[] {
  if (mode === "all-roles") {
    return HERO_ROLE.map((r) => ({
      id: `role-${r.id}`,
      label: r.role,
      icon: r.icon,
    }));
  }
  if (mode === "single-role" && selectedRoleId !== null) {
    const role = HERO_ROLE.find((r) => r.id === selectedRoleId);
    if (role) {
      return [{ id: `role-${role.id}`, label: role.role, icon: role.icon }];
    }
  }
  if (mode === "custom") {
    return customColumns;
  }
  return HERO_ROLE.map((r) => ({
    id: `role-${r.id}`,
    label: r.role,
    icon: r.icon,
  }));
}

interface TierColumnModeFilterProps {
  mode: ColumnMode;
  onModeChange: (mode: ColumnMode) => void;
  selectedRoleId: number | null;
  onRoleSelect: (id: number) => void;
  customColumns: TierColumn[];
  onAddCustomColumn: () => void;
  onRenameCustomColumn: (id: string, label: string) => void;
  onDeleteCustomColumn: (id: string) => void;
}

const TierColumnModeFilter = ({
  mode,
  onModeChange,
  selectedRoleId,
  onRoleSelect,
  customColumns,
  onAddCustomColumn,
  onRenameCustomColumn,
  onDeleteCustomColumn,
}: TierColumnModeFilterProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-1">
        {/* All Roles */}
        <button
          onClick={() => onModeChange("all-roles")}
          className={`px-3 py-1.5 text-xs font-medium rounded-xs cursor-pointer transition-colors ${
            mode === "all-roles"
              ? "bg-blue-500/60 text-blue-100"
              : "bg-d-primary-surface text-gray-400 hover:bg-d-primary-surface/80"
          }`}
        >
          All Roles
        </button>

        {/* Individual roles */}
        {HERO_ROLE.map((role) => (
          <button
            key={role.id}
            onClick={() => {
              onModeChange("single-role");
              onRoleSelect(role.id);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-xs cursor-pointer transition-colors flex items-center gap-1.5 ${
              mode === "single-role" && selectedRoleId === role.id
                ? "bg-blue-500/60 text-blue-100"
                : "bg-d-primary-surface text-gray-400 hover:bg-d-primary-surface/80"
            }`}
          >
            <Image
              src={role.icon}
              alt={role.role}
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </button>
        ))}

        {/* Custom */}
        <button
          onClick={() => onModeChange("custom")}
          className={`px-3 py-1.5 text-xs font-medium rounded-xs cursor-pointer transition-colors ${
            mode === "custom"
              ? "bg-blue-500/60 text-blue-100"
              : "bg-d-primary-surface text-gray-400 hover:bg-d-primary-surface/80"
          }`}
        >
          Custom
        </button>
      </div>

      {/* Custom columns editor */}
      {mode === "custom" && (
        <div className="flex flex-wrap gap-2 items-center">
          {customColumns.map((col) => (
            <div
              key={col.id}
              className="flex items-center gap-1 bg-d-primary-surface rounded-xs px-2 py-1"
            >
              <input
                type="text"
                value={col.label}
                onChange={(e) => onRenameCustomColumn(col.id, e.target.value)}
                className="bg-transparent text-xs text-gray-200 border-none outline-none w-20"
              />
              <button
                onClick={() => onDeleteCustomColumn(col.id)}
                className="text-gray-500 hover:text-red-400 cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            onClick={onAddCustomColumn}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 bg-d-primary-surface rounded-xs hover:bg-d-primary-surface/80 cursor-pointer"
          >
            <Plus size={12} />
            Add Column
          </button>
        </div>
      )}
    </div>
  );
};

export default TierColumnModeFilter;
