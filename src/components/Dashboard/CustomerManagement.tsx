import React, { useState, useMemo } from 'react';
import styles from '../../styles/CustomerManagement.module.scss';

export interface Customer {
    id: string;
    name: string;
    avatar?: string;
    joinedDate: string;
    phone: string;
    email: string;
    tier: 'Gold VIP' | 'Silver' | 'Platinum' | 'Regular';
    totalSpend: number;
    transactionCount: number;
    lastVisit: string;
}

// Initial data can be exported to be used in Dashboard
export const INITIAL_CUSTOMERS: Customer[] = [
    {
        id: 'CUST-001',
        name: 'Priya Sharma',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX4IJ-Tf4fZxUAOf8otcDuseJKiXSVl6ukF-10vM0JiQVRrGXEpzgL-BWSRrlqt8TqYuQ1MlMYaah-31PW-1tCMs8GPnfKf79pJXtvMmFSdOeiOoqep25ekEU0sszWUKPWSLFCdZEQxAdH66sIOFYEn5CZsejDCmH3fBDOS3xolGIS6JF0v1O2JorqmJJnGxSrRgQXvF1As5zeEoZbQRzOZ2MCymfpGrSxjnAXCJCmSOVyBvMVlc2zeZQWlEurcO_GkgCssrE4Eq4A',
        joinedDate: 'Jan 2023',
        phone: '+91 98765 43210',
        email: 'priya.s@example.com',
        tier: 'Gold VIP',
        totalSpend: 450000,
        transactionCount: 12,
        lastVisit: '2 days ago'
    },
    {
        id: 'CUST-002',
        name: 'Rahul Verma',
        joinedDate: 'Mar 2023',
        phone: '+91 99887 76655',
        email: 'rahul.v@example.com',
        tier: 'Silver',
        totalSpend: 120000,
        transactionCount: 4,
        lastVisit: '1 week ago'
    },
    {
        id: 'CUST-003',
        name: 'Amit Patel',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgLHuv_MRwF0QECYCoqX9poazmEMmlcJpb1xBG8XU3OViRuqjGC6e1w7Pt9kAJ59zbrhkaLAsjfZ1g4fN-u3EgJdkDCP0LAb9aQw-m07hi1ttZ1cLJSwcMuX87Gxrhc9VgmdrtvpLxdJn-XGbgkCl-nc-zeDWqRkUedrng8h3qYZC14FJmup1Au_Cb-cru9lW3yYOE9rVVPW7HvUu4ohVydIJltv7fCBCHAEK589-RNNqxqk3w8HiCbMO7adx8sxs1HCIze9DkMMXp',
        joinedDate: 'Dec 2022',
        phone: '+91 91234 56789',
        email: 'amit.patel@business.com',
        tier: 'Gold VIP',
        totalSpend: 890000,
        transactionCount: 18,
        lastVisit: '3 days ago'
    },
    {
        id: 'CUST-004',
        name: 'Sneha Reddy',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfF8rOj-tqEbOzrhTCc8nCu1x8U--72bj39i1zwzcDa_QrlEomjr3V_4lw1azmTR15jw_ksGUb-4ZU0zVjCbXGzXaSy6rVDOexIBIKA6XMZC2HcQOmcoNfJRFg50-KODv7gDhaXyWwmps4lqx4dq477ntHYdxWkb300NOLdN439qe4qnfOOdCZaskDHJO4NCGModpgtHO-RR2wR0ygaOyPFkaROwqUAVyv7b2sTIvIajVHSCMTmVlg9x_dWT_9XbsUABsEVo-geaiM',
        joinedDate: 'Jun 2023',
        phone: '+91 95544 33221',
        email: 'sneha.r@example.com',
        tier: 'Regular',
        totalSpend: 45000,
        transactionCount: 1,
        lastVisit: '1 month ago'
    },
    {
        id: 'CUST-005',
        name: 'Vikram Singh',
        joinedDate: 'Nov 2021',
        phone: '+91 90000 11111',
        email: 'v.singh@royal.com',
        tier: 'Platinum',
        totalSpend: 1200000,
        transactionCount: 24,
        lastVisit: 'Today, 10:30 AM'
    }
];

interface CustomerManagementProps {
    customers: Customer[];
    onSelectCustomer?: (customer: Customer) => void;
    onAddCustomer?: () => void;
}

const CustomerManagement: React.FC<CustomerManagementProps> = ({ customers, onSelectCustomer, onAddCustomer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [tierFilter, setTierFilter] = useState('');
    const [sortBy, setSortBy] = useState('recent');

    // Filtering and Sorting Logic
    const filteredCustomers = useMemo(() => {
        let result = [...customers];

        // Search Filter
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(c =>
                c.name.toLowerCase().includes(lowerSearch) ||
                c.phone.includes(lowerSearch) ||
                c.id.toLowerCase().includes(lowerSearch) ||
                c.email.toLowerCase().includes(lowerSearch)
            );
        }

        // Tier Filter
        if (tierFilter) {
            result = result.filter(c => c.tier === tierFilter);
        }

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case 'spend_desc':
                    return b.totalSpend - a.totalSpend;
                case 'spend_asc':
                    return a.totalSpend - b.totalSpend;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'recent':
                default:
                    // For mock purposes, "recent" just uses ID or assuming lastVisit order
                    // In a real app, this would use a timestamp
                    return b.id.localeCompare(a.id);
            }
        });

        return result;
    }, [searchTerm, tierFilter, sortBy]);

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        });
    };

    const getTierClass = (tier: string) => {
        switch (tier) {
            case 'Gold VIP': return styles.gold;
            case 'Silver': return styles.silver;
            case 'Platinum': return styles.platinum;
            default: return styles.regular;
        }
    };

    const getTierIcon = (tier: string) => {
        switch (tier) {
            case 'Gold VIP': return 'diamond';
            case 'Silver': return 'verified';
            case 'Platinum': return 'workspace_premium';
            default: return 'person';
        }
    };

    return (
        <div className={styles.container}>
            {/* Page Heading */}
            <header className={styles.pageHeader}>
                <div className={styles.titleBlock}>
                    <h1>Customer Management</h1>
                    <p>
                        Manage customer records, track VIP status, view purchase history, and update contact profiles for personalized service.
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.secondary}>
                        <span className="material-symbols-outlined">file_download</span>
                        Export List
                    </button>
                    <button className={styles.primary} onClick={onAddCustomer}>
                        <span className="material-symbols-outlined">add</span>
                        Add Customer
                    </button>
                </div>
            </header>

            {/* Stats Overview */}
            <section className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.cardTop}>
                        <span className={styles.label}>Total Customers</span>
                        <span className="material-symbols-outlined icon">group</span>
                    </div>
                    <p className={styles.value}>1,240</p>
                    <div className={`${styles.trend} ${styles.up}`}>
                        <span className="material-symbols-outlined trendIcon">trending_up</span>
                        <span>+5% vs last month</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.cardTop}>
                        <span className={styles.label}>New This Month</span>
                        <span className="material-symbols-outlined icon">person_add</span>
                    </div>
                    <p className={styles.value}>45</p>
                    <div className={`${styles.trend} ${styles.up}`}>
                        <span className="material-symbols-outlined trendIcon">trending_up</span>
                        <span>+12% vs last month</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.cardTop}>
                        <span className={styles.label}>VIP Clients</span>
                        <span className="material-symbols-outlined icon">diamond</span>
                    </div>
                    <p className={styles.value}>120</p>
                    <div className={`${styles.trend} ${styles.neutral}`}>
                        <span>Stable</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.cardTop}>
                        <span className={styles.label}>Avg. Spend</span>
                        <span className="material-symbols-outlined icon">currency_rupee</span>
                    </div>
                    <p className={styles.value}>₹42k</p>
                    <div className={`${styles.trend} ${styles.up}`}>
                        <span className="material-symbols-outlined trendIcon">trending_up</span>
                        <span>+2.4%</span>
                    </div>
                </div>
            </section>

            {/* Filters & Search Toolbar */}
            <div className={styles.toolbar}>
                <div className={styles.searchBox}>
                    <label>Search</label>
                    <div className={styles.inputWrapper}>
                        <span className="material-symbols-outlined searchIcon">search</span>
                        <input
                            type="text"
                            placeholder="Search by name, phone, or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <label>Tier Status</label>
                        <div className={styles.selectWrapper}>
                            <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
                                <option value="">All Tiers</option>
                                <option value="Gold VIP">Gold VIP</option>
                                <option value="Silver">Silver Member</option>
                                <option value="Platinum">Platinum</option>
                                <option value="Regular">Regular</option>
                            </select>
                            <span className="material-symbols-outlined dropdownIcon">arrow_drop_down</span>
                        </div>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Sort By</label>
                        <div className={styles.selectWrapper}>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="recent">Recently Active</option>
                                <option value="spend_desc">Highest Spend</option>
                                <option value="spend_asc">Lowest Spend</option>
                                <option value="name">Name (A-Z)</option>
                            </select>
                            <span className="material-symbols-outlined dropdownIcon">sort</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Data Table */}
            <div className={styles.tableContainer}>
                <div className={styles.tableWrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Contact Info</th>
                                <th>Tier</th>
                                <th>Total Spend</th>
                                <th>Last Visit</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} onClick={() => onSelectCustomer?.(customer)} style={{ cursor: onSelectCustomer ? 'pointer' : 'default' }}>
                                        <td style={{ fontFamily: 'monospace', color: '#b9b09d' }}>#{customer.id}</td>
                                        <td>
                                            <div className={styles.custInfo}>
                                                {customer.avatar ? (
                                                    <img src={customer.avatar} alt={customer.name} className={styles.avatar} />
                                                ) : (
                                                    <div className={styles.initials}>
                                                        {customer.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                )}
                                                <div className={styles.details}>
                                                    <span className={styles.name}>{customer.name}</span>
                                                    <span className={styles.joined}>Joined {customer.joinedDate}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.contactBlock}>
                                                <div className={styles.phone}>
                                                    <span className="material-symbols-outlined icon">call</span>
                                                    {customer.phone}
                                                </div>
                                                <div className={styles.email}>
                                                    <span className="material-symbols-outlined icon">mail</span>
                                                    {customer.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles.tierBadge} ${getTierClass(customer.tier)}`}>
                                                <span className="material-symbols-outlined icon">{getTierIcon(customer.tier)}</span>
                                                {customer.tier}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.spendBlock}>
                                                <p className={`${styles.amount} ${customer.tier === 'Regular' ? styles.normal : ''}`}>
                                                    {formatCurrency(customer.totalSpend)}
                                                </p>
                                                <p className={styles.transactions}>{customer.transactionCount} Transactions</p>
                                            </div>
                                        </td>
                                        <td className={styles.lastVisit}>{customer.lastVisit}</td>
                                        <td align="right">
                                            <div className={styles.actions}>
                                                <button title="View Profile">
                                                    <span className="material-symbols-outlined">visibility</span>
                                                </button>
                                                <button className={styles.edit} title="Edit Details">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#b9b09d' }}>
                                        No customers found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <footer className={styles.pagination}>
                    <p className={styles.info}>
                        Showing <strong>1-{filteredCustomers.length}</strong> of <strong>{filteredCustomers.length}</strong> {filteredCustomers.length === 1 ? 'customer' : 'customers'}
                    </p>
                    <div className={styles.pages}>
                        <button className={styles.iconBtn} disabled>
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
                        <button className={styles.pageBtn}>2</button>
                        <button className={styles.pageBtn}>3</button>
                        <span className={styles.dots}>...</span>
                        <button className={styles.iconBtn}>
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CustomerManagement;
