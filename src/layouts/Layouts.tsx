import React from "react";

import { Outlet, useLocation } from "react-router";
import Navigation from "../components/Navigation";
import SubNavigation from "../components/SubNavigation";

const Layouts: React.FC = () => {
    const location = useLocation();
    const showSubNav = location.pathname.includes('/hok');

    return (
        <>
            {/* <div className="bg-[#050516] h-screen w-full text-white"> */}
            <div className="h-screen w-full text-white ">
                <Navigation />
                <div className="mx-0 md:mx-16  border-x-2 border-dashed border-[#191937]">
                    {showSubNav && <SubNavigation />}
                    <main className="  overflow-auto ">
                        <Outlet />
                    </main>
                </div>
            </div>

        </>
    );
};

export default Layouts;
