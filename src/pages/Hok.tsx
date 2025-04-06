import { useState } from 'react';
import DraftTab from '../components/DraftTab';

const tabs = [
    { name: 'Ranked Draft', key: 'ranked', },
    { name: 'Peak Draft', key: 'peak', isNew: true },
    { name: 'Global Ban Pick Draft', key: 'gbp', isNew: true },
    { name: 'Custom Draft', key: 'custom', isNew: true },
    { name: 'AI Draft', key: 'ai', isNew: true },
];

const Hok = () => {
    const [activeTab, setActiveTab] = useState('normal');
    return (
        <>

            {/* Tab Draft */}
            <div className="mt-8 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 w-full flex flex-col">
                {/* Penjelasan */}
                <div>
                    {/* Judul */}
                    <div className="text-2xl font-bold text-white mb-4">
                        Simulator Draft Pick
                    </div>
                    {/* Deskripsi */}
                    <div className="text-sm text-[#656891] mb-4">
                        Latih strategi drafting tim Anda menggunakan simulator real-time. Pilih champion, larang musuh, dan uji berbagai komposisi tim dalam berbagai skenario. Sangat cocok untuk pelatihan tim, analisis matchup, dan persiapan turnamen.
                    </div>
                </div>

                {/* Sub Tab Draft */}
                <div className="flex justify-between border-b border-gray-700 pb-1 ">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative text-sm py-2 font-semibold transition-colors ${activeTab === tab.key ? 'text-blue-500' : 'text-white hover:text-blue-400'
                                }`}
                        >
                            {tab.name}
                            {tab.isNew && (
                                <span className="ml-1 inline-block px-1 py-0.5 text-[10px] font-bold text-white bg-blue-500 rounded-md shadow">
                                    DEV
                                </span>
                            )}
                            {activeTab === tab.key && (
                                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-blue-500 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Display the content for the selected tab */}
                <DraftTab activeTab={activeTab} />
            </div>
        </>
    );
};

export default Hok;
