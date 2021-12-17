import React from 'react';
import {useSession, signIn, signOut} from "next-auth/react";
import styles from "../../styles/NavBar.module.css"

interface NavBarProps {

}

export function NavBar(props: NavBarProps) {
    const {data} = useSession()
    return (
        <nav className={styles.navbar}>
            {data && (<div className="text-white mr-2">
                {data.user?.name}
            </div>)}
            <AccountButton/>
        </nav>

    )
}


function AccountButton() {
    const {status, data} = useSession();
    switch (status) {
        case "authenticated":
            return (
                <button className={styles.navbar__button} onClick={() => signOut()}>
                    Sign out
                </button>
            )
        case "loading":
            return (
                <div>
                    Loading...
                </div>
            )
        case "unauthenticated":
            return (
                <button className={styles.navbar__button} onClick={() => signIn()}>
                    Sign in
                </button>
            )
    }
}
