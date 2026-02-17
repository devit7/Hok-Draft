import Image from "next/image";
import { HERO_ROLE } from "@/static-database/hero/hero-role";

const TierRoleFilter = ({
  roleFilter,
  onRoleFilterChange,
}: {
  roleFilter: number | null;
  onRoleFilterChange: (roleId: number | null) => void;
}) => {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      <button
        onClick={() => onRoleFilterChange(null)}
        className={`px-3 py-1.5 text-sm rounded-xs cursor-pointer transition-colors ${
          roleFilter === null
            ? "bg-blue-500/50 text-blue-100"
            : "bg-d-primary-surface text-gray-400 hover:text-gray-200"
        }`}
      >
        All Roles
      </button>
      {HERO_ROLE.map((role) => (
        <button
          key={role.id}
          onClick={() => onRoleFilterChange(role.id)}
          className={`px-3 py-1.5 text-sm rounded-xs cursor-pointer flex items-center gap-1.5 transition-colors ${
            roleFilter === role.id
              ? "bg-blue-500/50 text-blue-100"
              : "bg-d-primary-surface text-gray-400 hover:text-gray-200"
          }`}
        >
          <Image src={role.icon} alt={role.role} width={14} height={14} />
          {role.role}
        </button>
      ))}
    </div>
  );
};

export default TierRoleFilter;
