import React, {useCallback} from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import styles from "../../styles/NavBar.module.css"
import {LoginButton} from "@/components/NavBar/LoginButton";
import {RegisterButton} from "@/components/NavBar/RegisterButton";

interface NavBarProps {

}

export function NavBar(props: NavBarProps) {
    const {data, status} = useSession()
    return (
        <nav className={styles.navbar}>
            {status === "unauthenticated" && <RegisterButton />}
            {data && (<div className="text-white mr-2">
                {data.user?.name}
            </div>)}
            <LoginButton status={status} onLogIn={signIn} onLogOut={signOut}/>
        </nav>
    )
}
export type AuthStatus = ReturnType<typeof useSession>['status']
