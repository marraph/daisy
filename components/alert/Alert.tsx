"use client";

import {cn} from "../../utils/cn";
import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import {CloseButton} from "../closebutton/CloseButton";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    closeButton: boolean;
    duration: number;
    title: string;
    description?: string;
    icon?: ReactNode;
    titleClassnames?: string;
    descriptionClassnames?: string;
}

type AlertRef = HTMLDivElement & {
    show: () => void;
    hide: () => void;
};

const Alert = forwardRef<AlertRef, AlertProps>(({ icon, title, description, duration, closeButton,
                                                    titleClassnames, descriptionClassnames, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);
    const alertRef = useRef(null);

    useEffect(() => {
        let showTimeout: NodeJS.Timeout, hideTimeout: NodeJS.Timeout;
        if (visible) {
            setAnimate(true);
            showTimeout = setTimeout(() => {
                if (alertRef.current) {
                    alertRef.current.classList.add('opacity-100', 'translate-y-0');
                    alertRef.current.classList.remove('opacity-0', 'translate-y-full');
                }
            }, 10);
            hideTimeout = setTimeout(() => {
                if (alertRef.current) {
                    alertRef.current.classList.remove('opacity-100', 'translate-y-0');
                    alertRef.current.classList.add('opacity-0', 'translate-y-full');
                }
                hideTimeout = setTimeout(() => {
                    setVisible(false);
                    setAnimate(false);
                }, 500);
            }, duration);
        }
        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };
    }, [visible, duration]);

    useImperativeHandle(ref, () => ({
        show: () =>  {
            setVisible(true);
            setAnimate(true);
        },
        hide: () => {
            setVisible(false);
            setVisible(false);
        },
        ...alertRef.current,
    }));

    return (
        <>
            {animate &&
                <div className={`fixed bottom-4 right-4 z-50 border border-edge bg-dark
                                w-max rounded-lg font-normal p-2 text-gray text-base flex flex-row items-center
                                shadow-2xl transition-all duration-500 ease-in-out opacity-0 translate-y-full`}
                     ref={alertRef} {...props}>
                    <div className={"flex flex-row"}>
                        <div className={"flex flex-row items-center"}>
                            <div className={"m-3"}>
                                {icon && icon}
                            </div>
                            <div className={"px-2 py-1 flex flex-col items-start align-center "} ref={ref} {...props}>
                                <span className={cn("text-white font-semibold", titleClassnames)}>{title}</span>
                                {description &&
                                    <span className={cn("float-left", descriptionClassnames)}>{description}</span>
                                }

                            </div>
                        </div>
                        {closeButton &&
                            <CloseButton className={"justify-end top-0 h-max ml-8 bg-dark"}
                                         onClick={() => {setVisible(false); setAnimate(false);}}
                            />
                        }
                    </div>

                </div>
            }
        </>
    );
});
Alert.displayName = "Alert";


export {Alert, AlertRef};