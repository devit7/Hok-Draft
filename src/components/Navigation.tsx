import { Link } from "react-router";


const Navigation = () => {
    return (
        <>
            <div className="w-full bg-[#0D0D28] text-white border-b border-[#191937] px-16 flex">
                {/* Hok Link */}
                <Link to="/" className="block px-4 py-2 text-sm w-fit hover:bg-[#191937]">
                    <div>
                        L-Draft.gg
                    </div>
                </Link>

                {/* Hok Link */}
                <Link to="/hok" className="block px-4 py-2 text-sm w-fit bg-[#191937]">
                    <div>
                        <img src="/Honor_of_Kings_logo.png" alt="" className="w-[18px] h-[18px] inline-block mr-2" />
                        Honor Of Kings
                    </div>
                </Link>

            </div>
        </>
    );
};

export default Navigation;
