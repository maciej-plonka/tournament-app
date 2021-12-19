import React from 'react';
import styles from "../../styles/NavBar.module.css";
import Link from "next/link";

interface RegisterButtonProps {
}

export function RegisterButton(props: RegisterButtonProps) {
    return (
        <Link href={"/player/register"} passHref>
            <div className={`${styles.navbar__button} mr-2`}>
                Register
            </div>
        </Link>
    )
}
