import { getTrakteerSupporters } from "@/actions/trakteer";
import { formatDistanceToNow } from "date-fns";

const Page = async () => {
  const supporters = await getTrakteerSupporters();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center sm:p-8 w-full max-w-2xl mx-auto">
      <div className="bg-d-primary-surface/50 border border-white/5 p-8 flex flex-col items-center text-center shadow-lg w-full mb-8">
        <h1 className="text-2xl font-semibold mb-2 ">Support Admin</h1>
        <p className="text-gray-400 mb-8 max-w-md text-sm leading-relaxed">
          Hi! If you find this tool useful, consider supporting me on Trakteer.
          Your support helps keep the servers running and fuels further
          development! 🚀
        </p>

        <a
          href="https://trakteer.id/devit-mpiie"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 bg-[#be1e2d] text-white px-8 py-3 rounded-xs font-bold transition-transform hover:scale-105 hover:bg-[#a01825] shadow-lg shadow-red-900/20"
        >
          <img
            src="https://edge-cdn.trakteer.id/images/embed/trbtn-icon.png?v=14-05-2025"
            alt="Trakteer"
            className="w-4 h-6 animate-pulse"
          />
          <span>Dukung Saya di Trakteer</span>

          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-0 -left-full w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shine" />
          </div>
        </a>

        <p className="mt-8 text-xs text-gray-500">
          Thank you for being part of the community! ❤️ Xie Xie
        </p>
      </div>

      {/* Supporters List */}
      <div className="bg-d-primary-surface/30 border border-white/5 p-6 w-full rounded-sm">
        <h2 className="text-lg font-medium mb-4 text-center">
          Recent Supporters
        </h2>

        {supporters.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-4">
            No recent supporters yet. Be the first! 🌟
          </p>
        ) : (
          <div className="space-y-3">
            {supporters.map((support, index) => (
              <div
                key={support.order_id || index}
                className="flex items-start gap-4 p-3 bg-white/5 rounded-xs border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-white">
                      {support.supporter_name}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {support.updated_at}
                    </span>
                  </div>
                  <div className="text-sm text-yellow-500/90 font-medium mt-0.5">
                    gifted {support.quantity} {support.unit_name}
                  </div>
                  {support.support_message && (
                    <p className="text-sm text-gray-300 mt-2 italic border-l-2 border-white/10 pl-2">
                      "{support.support_message}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
