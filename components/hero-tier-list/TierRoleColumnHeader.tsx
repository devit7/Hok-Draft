import Image from "next/image";
import { HERO_ROLE } from "@/static-database/hero/hero-role";

const TierRoleColumnHeader = ({
  roleFilter,
}: {
  roleFilter: number | null;
}) => {
  if (roleFilter !== null) {
    const selectedRole = HERO_ROLE.find((r) => r.id === roleFilter);
    if (!selectedRole) return null;
    return (
      <div className="flex gap-0 items-stretch mb-0">
        <div className="min-w-15 shrink-0" />
        <div className="flex-1 flex items-center gap-1.5 py-2 px-3 text-xs text-gray-400 font-medium">
          <Image
            src={selectedRole.icon}
            alt={selectedRole.role}
            width={16}
            height={16}
          />
          <span>{selectedRole.role}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-0 items-stretch mb-5">
      <div className="min-w-15 shrink-0" />
      <div
        className="flex-1 grid gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${HERO_ROLE.length}, minmax(0, 1fr))`,
        }}
      >
        {HERO_ROLE.map((role) => (
          <div
            key={role.id}
            className="flex items-center bg-d-primary-surface justify-center gap-1.5 py-2 text-xs text-gray-400 font-medium"
          >
            <Image src={role.icon} alt={role.role} width={16} height={16} />
            <span className="hidden md:inline">{role.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TierRoleColumnHeader;
