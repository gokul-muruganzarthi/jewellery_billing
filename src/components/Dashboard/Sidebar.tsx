import React from 'react';
import styles from '../../styles/Dashboard.module.scss';

interface SidebarProps {
    activeItem?: string;
    onNavigate?: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'Dashboard', onNavigate }) => {
    const navItems = [
        { name: 'Dashboard', icon: 'dashboard' },
        { name: 'Inventory', icon: 'inventory_2' },
        { name: 'Cost Estimator', icon: 'receipt_long' },
        { name: 'Customers', icon: 'group' },
        { name: 'Reports', icon: 'bar_chart' },
    ];

    const managementItems = [
        { name: 'Settings', icon: 'settings' },
        { name: 'Help Center', icon: 'help' },
    ];

    const handleNavClick = (e: React.MouseEvent, item: string) => {
        e.preventDefault();
        if (onNavigate) onNavigate(item);
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <div className={styles.brandIcon}>
                            <span className="material-symbols-outlined">diamond</span>
                        </div>
                        <div className={styles.brandText}>
                            <h1>VGH JEWELLERS   </h1>
                            <p>Admin Dashboard</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className={styles.nav}>
                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                className={`${styles.navLink} ${activeItem === item.name ? styles.active : ''}`}
                                onClick={(e) => handleNavClick(e, item.name)}
                            >
                                <span className={`material-symbols-outlined ${styles.icon}`}>
                                    {item.icon}
                                </span>
                                <span>{item.name}</span>
                            </button>
                        ))}
                    </nav>

                    <div className={styles.divider}></div>

                    <nav className={styles.nav}>
                        <p className={styles.sectionTitle}>Management</p>
                        {managementItems.map((item) => (
                            <button
                                key={item.name}
                                className={`${styles.navLink} ${activeItem === item.name ? styles.active : ''}`}
                                onClick={(e) => handleNavClick(e, item.name)}
                            >
                                <span className={`material-symbols-outlined ${styles.icon}`}>
                                    {item.icon}
                                </span>
                                <span>{item.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* User Profile */}
                <div className={styles.userProfile}>
                    <div className={styles.profileCard}>
                        <div className={styles.avatar}>
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzQYHy0QnIT1t3iXevWaMdHkHWqMfgh9IR37AuoQ8TA6VI7PbVmUa61-W4Yc9p6Ugc7froH_YIGcsgsXdrEP2Q-GME5s-XypdkX0iQZjzFTIsuW-clLYTIirVw6aDzs3syfpYCx4hDRlF7WV8ZUJJX5W1KoZ_CYqLzXlJqwPuAs22-jr6q6AKGD3gieWG_HaheSkW-XrE-jGGcxBW3JnlrK4UWAWREb2uVIDfSVhiFNQHukm0011G8id5SDcHrrOM2FVF-GoidlMlL"
                                alt="Admin User"
                            />
                            <div className={styles.status}></div>
                        </div>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>Venkadesh</span>
                            <span className={styles.userRole}>Owner</span>
                        </div>
                        <span className="material-symbols-outlined" style={{ marginLeft: 'auto', color: '#b9b09d' }}>
                            expand_more
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
