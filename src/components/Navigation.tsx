import { Link } from "react-router";
import { useEffect, useState } from "react";

const Navigation = () => {
    const [gradientStyle, setGradientStyle] = useState({});

    // Create an effect to animate the gradient
    useEffect(() => {
        // Set up the animation keyframe
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes gradientAnimation {
                0% { background-position: 0% 50% }
                50% { background-position: 100% 50% }
                100% { background-position: 0% 50% }
            }
        `;
        document.head.appendChild(style);

        // Create the gradient style
        setGradientStyle({
            background: 'linear-gradient(90deg, #ff5e62, #ff9966, #4e54c8, #8f94fb, #ff5e62)',
            backgroundSize: '300% 300%',
            animation: 'gradientAnimation 5s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            fontWeight: 'bold'
        });

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <>
            <div className="w-full bg-[#0D0D28] text-white border-b border-[#191937] px-4 md:px-16 flex justify-between">
                <div className="flex items-center  w-full ">
                    {/* Hok Link */}
                    <Link to="/" className="hidden md:block px-4 py-2 text-sm w-fit hover:bg-[#191937]">
                        <div>
                            Hok-Draft
                        </div>
                    </Link>

                    {/* Hok Link */}
                    <Link to="/hok"  className="block px-4 py-2 text-sm w-fit bg-[#191937]">
                        <div>
                            <img src="/Honor_of_Kings_logo.png" alt="" className="w-[18px] h-[18px] inline-block mr-2" />
                            Honor Of Kings
                        </div>
                    </Link>
                </div>
                <div className="flex text-sm items-center gap-2 w-44 justify-end">
                    {/* Text with gradient animation */}
                    <Link to="/" style={gradientStyle}>Made By Mpiie 💖</Link>
                </div>
            </div>
        </>
    );
};

export default Navigation;
