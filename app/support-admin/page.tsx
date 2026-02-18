"use client";

const Page = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center sm:p-8 w-full max-w-2xl mx-auto">
      <div className="bg-d-primary-surface/50 border border-white/5 p-8  flex flex-col items-center text-center shadow-lg w-full">
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
    </div>
  );
};

export default Page;
