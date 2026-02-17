import HokNavbar from "@/components/navigation/hok-navbar";

export default function HOKLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-gray-200">
      <HokNavbar />
      {children}
    </div>
  );
}
