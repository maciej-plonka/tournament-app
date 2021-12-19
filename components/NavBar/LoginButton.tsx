import React, {useEffect, useMemo, useRef} from "react";
import styles from "../../styles/NavBar.module.css";
import {AuthStatus} from "@/components/NavBar/NavBar";

interface LoginButtonProps {
    status: AuthStatus
    onLogIn: () => void,
    onLogOut: () => void
}


export function LoginButton(props: LoginButtonProps) {
    const {label, onClick} = useLoginButton(props)
    return (
        <button
            disabled={props.status == 'loading'}
            className={styles.navbar__button}
            onClick={onClick}>
            {label}
        </button>
    )
}

function useLoginButton(props: LoginButtonProps): { label: string, onClick: () => void } {
    const {status, onLogOut, onLogIn} = props
    const onLogOutRef = useRef(onLogOut)
    const onLogInRef = useRef(onLogIn)

    useEffect(() => {
        onLogOutRef.current = onLogOut
    },[onLogOut])

    useEffect(() => {
        onLogInRef.current = onLogIn
    },[onLogIn])

    return useMemo(() => {
        switch (status) {
            case "unauthenticated":
                return {
                    label: 'Log in',
                    onClick: () => onLogInRef.current()
                }
            case "authenticated":
                return {
                    label: 'Log out',
                    onClick: () => onLogOutRef.current()
                }
            default:
                return {
                    label: 'Loading...',
                    onClick: defaultOnClick
                }
        }
    }, [status])
}

function defaultOnClick() {

}
