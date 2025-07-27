import React, { useState, useRef } from "react";

interface TooltipProps {
    content: string;
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    position = "top",
    className = "",
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(true);
    };

    const hideTooltip = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 100);
    };

    const positionClasses = {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    };

    const arrowClasses = {
        top: "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-gray-900 border-l-4 border-r-4 border-t-4",
        bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-gray-900 border-l-4 border-r-4 border-b-4",
        left: "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-gray-900 border-t-4 border-b-4 border-l-4",
        right: "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-gray-900 border-t-4 border-b-4 border-r-4",
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            {isVisible && content && (
                <div
                    className={`absolute z-[9999] ${positionClasses[position]}`}
                >
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap max-w-xs shadow-lg border border-gray-700">
                        {content}
                    </div>
                    <div
                        className={`absolute w-0 h-0 ${arrowClasses[position]}`}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
