import { Link } from "react-router";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#070720] text-white">
            {/* Hero Banner with Background Image */}
            <section className="relative py-24 px-4 overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: "url('/146-bigskin-8.jpg')"
                }}>
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#070720]/90 to-[#1E1E3F]/70"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-400">
                        Honor of Kings <span className="text-white">Draft Simulator</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
                        Master your drafting strategy with our comprehensive simulation tools
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/hok" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                            Start Drafting
                        </Link>
                        <Link to="/hok/hero-list" className="px-6 py-3 bg-[#191937] hover:bg-[#232350] text-white font-bold rounded-lg transition-colors">
                            Explore Heroes
                        </Link>
                    </div>
                </div>

                {/* Optional decorative elements */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#070720] to-transparent"></div>
            </section>

            {/* Main Menu Navigation */}
            <section className="py-16 px-4 bg-[#0D0D28]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-10 text-center">Main Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link to="/hok/hero-list" className="group">
                            <div className="bg-[#191937] p-6 rounded-lg hover:bg-[#232350] transition-all transform hover:-translate-y-1">
                                <div className="w-16 h-16 bg-blue-600 rounded-lg mb-4 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Hero List</h3>
                                <p className="text-gray-400">Browse all heroes with detailed stats, roles, and abilities.</p>
                            </div>
                        </Link>

                        <Link to="/hok" className="group">
                            <div className="bg-[#191937] p-6 rounded-lg hover:bg-[#232350] transition-all transform hover:-translate-y-1">
                                <div className="w-16 h-16 bg-purple-600 rounded-lg mb-4 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">Draft Pick</h3>
                                <p className="text-gray-400">Simulate competitive drafting with various drafting strategies.</p>
                            </div>
                        </Link>

                        <Link to="/hok/tier-maker" className="group">
                            <div className="bg-[#191937] p-6 rounded-lg hover:bg-[#232350] transition-all transform hover:-translate-y-1">
                                <div className="w-16 h-16 bg-green-600 rounded-lg mb-4 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">Tier List Maker</h3>
                                <p className="text-gray-400">Create and share your custom hero tier lists with the community.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Draft Type Cards */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center">Draft Types</h2>
                    <p className="text-center text-gray-400 mb-10 max-w-3xl mx-auto">
                        Experience different drafting formats to prepare for any competitive situation
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Ranked Draft */}
                        <div className="bg-[#0D0D28] border border-[#191937] rounded-lg overflow-hidden hover:border-blue-500 transition-colors">
                            <div className="h-3 bg-blue-600"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center">
                                    Ranked Draft
                                    <span className="ml-2 px-2 py-1 text-xs bg-blue-900 text-blue-300 rounded">Standard</span>
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    The official competitive draft format used in ranked matches with ban and pick phases.
                                </p>
                                <Link to="/hok" className="text-blue-400 hover:text-blue-300 font-semibold flex items-center">
                                    Try Ranked Draft
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Peak Draft */}
                        <div className="bg-[#0D0D28] border border-[#191937] rounded-lg overflow-hidden hover:border-purple-500 transition-colors">
                            <div className="h-3 bg-purple-600"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center">
                                    Peak Draft
                                    <span className="ml-2 px-2 py-1 text-xs bg-purple-900 text-purple-300 rounded">Under Development</span>
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    Players pick from a shared hero pool. Once selected, heroes are unavailable to both teams.
                                </p>
                                <Link to="/hok" className="text-purple-400 hover:text-purple-300 font-semibold flex items-center">
                                    Try Peak Draft
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Global Ban Pick */}
                        <div className="bg-[#0D0D28] border border-[#191937] rounded-lg overflow-hidden hover:border-yellow-500 transition-colors">
                            <div className="h-3 bg-yellow-600"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center">
                                    Global Ban Pick
                                    <span className="ml-2 px-2 py-1 text-xs bg-yellow-900 text-yellow-300 rounded">Under Development</span>
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    Extended ban phase with global bans affecting both teams, followed by strategic picks.
                                </p>
                                <Link to="/hok" className="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center">
                                    Try Global Ban Pick
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Custom Draft */}
                        <div className="bg-[#0D0D28] border border-[#191937] rounded-lg overflow-hidden hover:border-green-500 transition-colors">
                            <div className="h-3 bg-green-600"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 flex items-center">
                                    Custom Draft
                                    <span className="ml-2 px-2 py-1 text-xs bg-green-900 text-green-300 rounded">Under Development</span>
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    Create your own draft rules with customizable ban/pick counts and sequence.
                                </p>
                                <Link to="/hok" className="text-green-400 hover:text-green-300 font-semibold flex items-center">
                                    Try Custom Draft
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* AI Draft */}
                        <div className="bg-[#0D0D28] border border-[#191937] rounded-lg overflow-hidden hover:border-red-500 transition-colors">
                            <div className="h-3 bg-red-600"></div>
                            <div className="p-6">

                                <h3 className="text-xl font-bold mb-3 flex items-center">
                                    AI Draft
                                    <span className="ml-2 px-2 py-1 text-xs bg-red-900 text-red-300 rounded">Under Development</span>
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    Get AI-powered recommendations for optimal picks and bans based on current meta.
                                </p>
                                <Link to="/hok" className="text-red-400 hover:text-red-300 font-semibold flex items-center">
                                    Try AI Draft
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Coming Soon Feature */}
                        <div className="bg-[#0D0D28] border border-[#191937] rounded-lg overflow-hidden relative filter grayscale">
                            <div className="h-3 bg-gray-600"></div>
                            <div className="p-6">
                                <div className="absolute inset-0 bg-[#070720]/80 flex items-center justify-center">
                                    <span className="px-3 py-1 bg-[#191937] text-white font-bold rounded-full">Coming Soon</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Tournament Mode</h3>
                                <p className="text-gray-400 mb-4">
                                    Organize and manage full team tournaments with automatic bracket generation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Get Started CTA */}
            <section className="py-16 px-4 bg-[#0D0D28]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to perfect your draft strategy?</h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Choose any draft mode to start simulating and improve your team's competitive edge.
                    </p>
                    <Link to="/hok" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg inline-block transition-colors">
                        Get Started Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 bg-[#070720] border-t border-[#191937]">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-bold text-blue-400">Honor of Kings Draft Simulator</h3>
                            <p className="text-gray-500 text-sm">An unofficial tool for Honor of Kings players</p>
                        </div>
                        <div className="flex gap-6">
                            <Link to="/heroes" className="text-gray-400 hover:text-white">Heroes</Link>
                            <Link to="/hok" className="text-gray-400 hover:text-white">Draft</Link>
                            <Link to="/tierlist" className="text-gray-400 hover:text-white">Tier List</Link>
                            <a href="#" className="text-gray-400 hover:text-white">About</a>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-[#191937] text-center text-gray-500 text-sm">
                        <p>© 2025 Honor of Kings Draft Simulator. Not affiliated with TiMi Studio Group or Level Infinite.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
