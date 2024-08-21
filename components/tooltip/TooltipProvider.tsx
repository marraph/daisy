"use client";

import React, {createContext, useContext, useState, useCallback, ReactNode} from 'react';
import {Tooltip, TooltipProps} from "./Tooltip";

interface TooltipContextType {
    addTooltip: (props: TooltipProps) => void;
    removeTooltip: () => void;
    lastTooltipTimestamp: number | null;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

const useTooltip = () => {
    const context = useContext(TooltipContext);
    if (context === undefined) {
        throw new Error('useTooltip muss innerhalb eines TooltipProviders verwendet werden');
    }
    return context;
};

export const TooltipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tooltip, setTooltip] = useState<TooltipProps | null>(null);
    const [lastTooltipTimestamp, setLastTooltipTimestamp] = useState<number | null>(null);

    const addTooltip = useCallback((props: Omit<TooltipProps, 'x' | 'y'>) => {
        setTooltip(props);
    }, []);

    const removeTooltip = useCallback(() => {
        setTooltip(null);
        setLastTooltipTimestamp(Date.now());
    }, []);

    return (
        <TooltipContext.Provider value={{ addTooltip, removeTooltip, lastTooltipTimestamp }}>
            {children}
            {tooltip &&
                <Tooltip lastTooltipTimestamp={lastTooltipTimestamp} {...tooltip}/>
            }
        </TooltipContext.Provider>
    );
};

export {useTooltip};
