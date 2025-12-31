import React from 'react';
import styles from '../../styles/Dashboard.module.scss';

interface StatsCardProps {
    label: string;
    value: string | number;
    unit?: string;
    icon: string;
    trend?: string;
    trendLabel?: string;
    trendDirection?: 'up' | 'down' | 'flat';
    isHighlight?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
    label,
    value,
    unit,
    icon,
    trend,
    trendLabel,
    trendDirection,
    isHighlight = false,
}) => {
    const getTrendIcon = () => {
        switch (trendDirection) {
            case 'up': return 'trending_up';
            case 'down': return 'arrow_downward';
            case 'flat': return 'trending_flat';
            default: return 'trending_up';
        }
    };

    const getTrendClass = () => {
        switch (trendDirection) {
            case 'up': return styles.trendPositive;
            case 'down': return styles.trendNegative;
            case 'flat': return styles.trendNeutral; // or positive if you want green
            default: return styles.trendPositive;
        }
    };

    return (
        <div className={`${styles.statsCard} ${isHighlight ? styles.statsCardHighlight : ''}`}>
            {isHighlight && <div className={styles.glow}></div>}

            <div className={styles.cardHeader}>
                <p className={styles.label}>{label}</p>
                <div className={styles.icon}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
            </div>

            <p className={styles.value}>
                {value}
                {unit && <span className={styles.unit}>{unit}</span>}
            </p>

            {trend && (
                <div className={`${styles.trend} ${getTrendClass()}`}>
                    <span className="material-symbols-outlined">{getTrendIcon()}</span>
                    <span className={styles.trendValue}>{trend}</span>
                    <span className={styles.trendLabel}>{trendLabel}</span>
                </div>
            )}
        </div>
    );
};

export default StatsCard;
