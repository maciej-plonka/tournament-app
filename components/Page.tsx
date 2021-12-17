import React from 'react';
import bgImage from "../public/bg.png";
import {NavBar} from "@/components/NavBar/NavBar";

const backgroundImage = `url(${bgImage.src})`

interface PageProps {
    children: React.ReactNode
}

export function Page(props: PageProps) {
    return (
        <div className="h-full w-full flex flex-col items-stretch" style={{backgroundImage}}>
            <NavBar/>
            <div className="grow flex flex-col items-center justify-center">
                {props.children}
            </div>
        </div>
    )
}
