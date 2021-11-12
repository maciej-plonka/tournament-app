import React from 'react';
import styles from '../styles/PageCard.module.css';
interface PageCardProps {
    children: React.ReactNode
}

export function PageCard(props: PageCardProps) {
    return (
        <div className={styles.pageCard}>
            {props.children}
        </div>
    )
}
