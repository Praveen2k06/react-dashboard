import React, { useRef } from "react";

const RankCard = ({ districts }) => {
    const scrollRef = useRef(null);

    console.log("RankCard seriesData ::",districts)

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="d-flex align-items-center gap-3">

            {/* Left Button */}
            <button
                className="btn rounded-circle d-flex justify-content-center align-items-center"
                style={{
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    width: "48px",
                    height: "48px",
                }}
                onClick={() => scroll("left")}
            >
                ‹
            </button>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="d-flex overflow-auto gap-3"
                style={{
                    scrollbarWidth: "none",
                }}
            >
                {districts.map((d, index) => {
                    const rank = index + 1;
                    const suffix =
                        rank === 1 ? "st" :
                            rank === 2 ? "nd" :
                                rank === 3 ? "rd" : "th";

                    return (
                        <div
                            key={d.district}
                            className="p-3 rounded d-flex flex-column justify-content-between"
                            style={{
                                minWidth: "170px",
                                color: "white",
                            }}
                        >
                            <h5 className="mb-0 p-4" style={{background: "#2b2f3a"}}>{d.district}</h5>

                            <div className="d-flex align-items-center justify-content-between p-2" style={{background: "rgb(3 49 66)"}}>
                                <div className="fw-bold" style={{ fontSize: "1.7rem" }}>
                                    {rank}
                                    <span style={{ fontSize: "1rem" }}>{suffix}</span>
                                </div>
                                <small className="text-light opacity-75">Rank</small>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Right Button */}
            <button
                className="btn rounded-circle d-flex justify-content-center align-items-center"
                style={{
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    width: "48px",
                    height: "48px",
                }}
                onClick={() => scroll("right")}
            >
                ›
            </button>
        </div>
    );
};

export default RankCard;