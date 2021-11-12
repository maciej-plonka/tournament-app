import React from 'react';
import bgImage from "../public/bg.png";

const backgroundImage = `url(${bgImage.src})`

interface PageProps {
    children: React.ReactNode
}

export function Page(props: PageProps) {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center" style={{backgroundImage}}>
            {props.children}
        </div>
    )
}
