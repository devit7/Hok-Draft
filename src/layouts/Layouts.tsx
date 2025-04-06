import React from "react";

import { Outlet, useLocation } from "react-router";
import Navigation from "../components/Navigation";
import SubNavigation from "../components/SubNavigation";

const Layouts: React.FC = () => {
    const location = useLocation();
    const showSubNav = location.pathname.includes('/hok');

    return (
        <>
            <div className="h-screen w-full text-white flex flex-col overflow-hidden">
                <div className="flex-shrink-0">
                    <Navigation />
                </div>
                <div className="flex-1 flex flex-col overflow-hidden mx-0 md:mx-16 border-x-2 border-dashed border-[#191937]">
                    {showSubNav && <div className="flex-shrink-0"><SubNavigation /></div>}
                    <main className="flex-1 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};

export default Layouts;
