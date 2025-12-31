import React, { useState } from 'react';
import styles from '../../styles/CustomerDetail.module.scss';

interface Order {
    id: string;
    date: string;
    itemName: string;
    itemThumb: string;
    type: 'Gold' | 'Silver' | 'Pearl';
    total: number;
}

interface Note {
    id: string;
    date: string;
    author: string;
    text: string;
}

interface Customer {
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
    location?: string;
    address?: string;
    dob?: string;
    anniversary?: string;
}

interface CustomerDetailProps {
    customer: Customer;
    onBack: () => void;
    onEdit: (customer: Customer) => void;
}

const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-9921',
        date: 'Oct 24, 2023',
        itemName: 'Diamond Solitaire Ring',
        itemThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqXkjmtJPC0cprBIk_jTrxt9jMZpz-c88KiFwb8iJaxpZB-zKtVwKY87kllqvRnOlF_Dz7BNOSI6P5HQzv2TkAGA5Rj_YgDrCVQRYTpsbrwNOr40GxUIOBLPooAKDPyXI5lJ8RJloHVjKLI1-W1onli786kgZGPV8hmo8ejRW1y1qGP6hVfOJ7H2P8QNS54hyKYfgdPwbiLTXQRLkYodVvEean81wfLOvdjYDdcxwMLdWxX8IfS-A7PTJVaJJ8BnR4bpVXa-TWIHjb',
        type: 'Gold',
        total: 4200.00
    },
    {
        id: 'ORD-8834',
        date: 'Aug 12, 2023',
        itemName: 'Sterling Silver Chain',
        itemThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW8enYQoMnzQneBTGrQfLm2j4J-L9lTc4_nxz5K5q4XDv7QTbEJrfKznSsdF2E8AiAO3ndREBoz8UoD5lKPo3sBmYGWy2eeY6OLcoE07xL3JbDpaBiPc6y8gZQnnOOAhmvUolHzH0uURwcSBmS4Gtxw4QEcWgae9W9gRQxTSBtZU9qorPUxyMq97JRUHFZtkPpk7B5ov0cUIEdVK8N-ei-jSS_ypAbz_Xs_CGcl7zDrmagj-wEYc0xtI3HacWa4n2feMDvK-emClzQ',
        type: 'Silver',
        total: 185.00
    },
    {
        id: 'ORD-7622',
        date: 'Feb 14, 2023',
        itemName: 'Vintage Gold Watch',
        itemThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhJFxwIJUwQEJdgoF7zHUgtiUhKLmORYji-FZqhqLU72C9Yy1Ld5RtLXnndQLbVn9Udhn2p8jYioVWbSqoLhHsb74UY5whbUe8ElItu8EW6lFAEbH6haMSBRL0d7hHgzxAYSdOSINGjzNhEdg3VGSKkssBOIhFfwnSUZCPjq80eIU7o8qVhQU-3Q8MKuBq2-PswUk8te6yU6j0U9sFvAboqxYeTQBeUgvnk4Jpm9CXby8gYPl010O-7sgXsywmRxA7JeDZJdtebjmD',
        type: 'Gold',
        total: 12500.00
    },
    {
        id: 'ORD-5541',
        date: 'Dec 20, 2022',
        itemName: 'Pearl Drop Earrings',
        itemThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5-LV4wKT-QbmNIVSpE0Zl1FrOgofRKXpcUg_z7SeicZJpYP8nbuedrO0hjpWd6sdkBRKhfQHRqoC09t1IPrQkAVAwSHsYV64FmcoR8ROyJ2J--d12KGtH2EqfTS6xEcXjMT_6eDL3OFa2oXIng9EQMqy0JjefgyKX1lfuTiyv4gnY93dTj6-lbHJiJUf8ky7BJoPeoEAMX96j32ndQgereBr3bQOu4igK1zA8IjLiiDO8sro1xFoBQi0Mcfrq70-r4PHOfW65gE_x',
        type: 'Pearl',
        total: 1450.00
    }
];

const MOCK_NOTES: Note[] = [
    {
        id: '1',
        date: 'Oct 12, 2023',
        author: 'Sarah J.',
        text: "Client mentioned looking for a silver bracelet for daughter's graduation in June. Prefers minimalist designs."
    },
    {
        id: '2',
        date: 'Jan 05, 2023',
        author: 'James A.',
        text: 'Ring size updated to 7.5. Prefers Rose Gold over Yellow Gold.'
    }
];

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, onBack, onEdit }) => {
    const [activeTab, setActiveTab] = useState('Purchase Theory');
    const [newNote, setNewNote] = useState('');

    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        });
    };

    return (
        <div className={styles.container}>
            {/* Breadcrumbs */}
            <nav className={styles.breadcrumbs}>
                <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Home</a>
                <span>/</span>
                <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Customers</a>
                <span>/</span>
                <span className={styles.current}>{customer.name}</span>
            </nav>

            {/* Profile Header */}
            <div className={styles.profileHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.profileInfo}>
                        <div className={styles.avatarWrapper}>
                            {customer.avatar ? (
                                <img src={customer.avatar} alt={customer.name} className={styles.avatar} />
                            ) : (
                                <div className={`${styles.avatar} flex items-center justify-center bg-surface-dark text-white text-4xl font-bold`}>
                                    {customer.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            )}
                            <div className={styles.tierBadge}>{customer.tier}</div>
                        </div>
                        <div className={styles.textDetails}>
                            <h1>{customer.name}</h1>
                            <p className={styles.subText}>Customer ID #{customer.id} • Joined {customer.joinedDate || 'March 2018'}</p>
                            <div className={styles.tags}>
                                <span className={`${styles.tag} ${styles.active}`}>
                                    <span className={styles.dot}></span> Active
                                </span>
                                <span className={`${styles.tag} ${styles.location}`}>
                                    {customer.location || 'New York, USA'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.headerActions}>
                        <button className={styles.secondary} onClick={() => onEdit(customer)}>
                            <span className="material-symbols-outlined icon">edit</span>
                            <span>Edit Profile</span>
                        </button>
                        <button className={styles.primary}>
                            <span className="material-symbols-outlined icon">add</span>
                            <span>New Order</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <div className={`${styles.iconWrapper} ${styles.primary}`}>
                            <span className="material-symbols-outlined icon">payments</span>
                        </div>
                        <span className={styles.label}>Lifetime Value</span>
                    </div>
                    <p className={styles.value}>{formatCurrency(customer.totalSpend)}</p>
                    <p className={`${styles.subInfo} ${styles.up}`}>
                        <span className="material-symbols-outlined trendIcon">trending_up</span> +12% vs last year
                    </p>
                </div>
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <div className={`${styles.iconWrapper} ${styles.blue}`}>
                            <span className="material-symbols-outlined icon">shopping_bag</span>
                        </div>
                        <span className={styles.label}>Total Orders</span>
                    </div>
                    <p className={styles.value}>{customer.transactionCount}</p>
                    <p className={`${styles.subInfo} ${styles.muted}`}>Last purchase {customer.lastVisit}</p>
                </div>
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <div className={`${styles.iconWrapper} ${styles.purple}`}>
                            <span className="material-symbols-outlined icon">sell</span>
                        </div>
                        <span className={styles.label}>Avg. Ticket</span>
                    </div>
                    <p className={styles.value}>{formatCurrency(customer.totalSpend / (customer.transactionCount || 1))}</p>
                    <p className={`${styles.subInfo} ${styles.muted}`}>High value client</p>
                </div>
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <div className={`${styles.iconWrapper} ${styles.orange}`}>
                            <span className="material-symbols-outlined icon">calendar_month</span>
                        </div>
                        <span className={styles.label}>Next Special Date</span>
                    </div>
                    <p className={`${styles.value} ${styles.small}`}>{customer.anniversary || 'Nov 14'}</p>
                    <p className={`${styles.subInfo} ${styles.primary}`}>Anniversary in 2 weeks</p>
                </div>
            </div>

            {/* Content Body */}
            <div className={styles.mainGrid}>
                {/* Left Column: Details & Notes */}
                <div className={styles.leftColumn}>
                    {/* Personal Info Card */}
                    <div className={styles.card}>
                        <div className={styles.cardTitle}>
                            <h3>Client Details</h3>
                            <button className={styles.editBtn} onClick={() => onEdit(customer)}>Edit</button>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.detailItem}>
                                <span className="material-symbols-outlined icon">mail</span>
                                <div className={styles.info}>
                                    <p className={styles.label}>Email Address</p>
                                    <p className={styles.text}><a href={`mailto:${customer.email}`}>{customer.email}</a></p>
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <span className="material-symbols-outlined icon">call</span>
                                <div className={styles.info}>
                                    <p className={styles.label}>Phone Number</p>
                                    <p className={styles.text}><a href={`tel:${customer.phone}`}>{customer.phone}</a></p>
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <span className="material-symbols-outlined icon">location_on</span>
                                <div className={styles.info}>
                                    <p className={styles.label}>Shipping Address</p>
                                    <p className={styles.text}>{customer.address || '42 Central Park West, Apt 12B, New York, NY 10023'}</p>
                                </div>
                            </div>
                            <div style={{ height: '1px', backgroundColor: '#393328', margin: '0.25rem 0' }}></div>
                            <div className={styles.detailItem}>
                                <span className="material-symbols-outlined icon">cake</span>
                                <div className={styles.info}>
                                    <p className={styles.label}>Date of Birth</p>
                                    <p className={styles.text}>{customer.dob || 'August 24, 1978'}</p>
                                </div>
                            </div>
                            <div className={styles.detailItem}>
                                <span className="material-symbols-outlined icon">favorite</span>
                                <div className={styles.info}>
                                    <p className={styles.label}>Anniversary</p>
                                    <p className={styles.text}>{customer.anniversary || 'November 14, 2005'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notes Widget */}
                    <div className={`${styles.card} ${styles.notesWidget}`}>
                        <div className={styles.cardTitle}>
                            <h3>Staff Notes</h3>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.notesList}>
                                {MOCK_NOTES.map(note => (
                                    <div key={note.id} className={styles.noteItem}>
                                        <p className={styles.noteMeta}>{note.date} • by {note.author}</p>
                                        <p className={styles.noteText}>{note.text}</p>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.noteInputWrapper}>
                                <textarea
                                    placeholder="Add a new note..."
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                />
                                <button className={styles.sendBtn}>
                                    <span className="material-symbols-outlined icon">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: History & Gallery */}
                <div className={styles.rightColumn}>
                    {/* Visual Gallery */}
                    <div className={`${styles.card} ${styles.gallerySection}`}>
                        <div className={styles.cardContent}>
                            <div className={styles.galleryHeader}>
                                <h3>Recent Purchases</h3>
                                <a href="#" className={styles.viewAll}>View Gallery</a>
                            </div>
                            <div className={styles.galleryList}>
                                {MOCK_ORDERS.map(order => (
                                    <div key={order.id} className={styles.galleryItem}>
                                        <div className={styles.imgWrapper} style={{ backgroundImage: `url(${order.itemThumb})` }}>
                                            <div className={styles.overlay}>
                                                <span className="material-symbols-outlined text-white">visibility</span>
                                            </div>
                                        </div>
                                        <p className={styles.itemName}>{order.itemName}</p>
                                        <p className={styles.itemPrice}>{formatCurrency(order.total)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Purchase History Tabs & Table */}
                    <div className={`${styles.card} ${styles.tabsSection}`}>
                        <div className={styles.tabsHeader}>
                            <button
                                className={activeTab === 'Purchase History' ? styles.active : ''}
                                onClick={() => setActiveTab('Purchase History')}
                            >
                                Purchase History
                            </button>
                            <button
                                className={activeTab === 'Wishlist' ? styles.active : ''}
                                onClick={() => setActiveTab('Wishlist')}
                            >
                                Wishlist (3)
                            </button>
                            <button
                                className={activeTab === 'Repairs & Service' ? styles.active : ''}
                                onClick={() => setActiveTab('Repairs & Service')}
                            >
                                Repairs & Service
                            </button>
                        </div>
                        <div className={styles.tableWrapper}>
                            <table className={styles.historyTable}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Order ID</th>
                                        <th>Items</th>
                                        <th>Type</th>
                                        <th style={{ textAlign: 'right' }}>Total</th>
                                        <th style={{ textAlign: 'center' }}>Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_ORDERS.map(order => (
                                        <tr key={order.id}>
                                            <td style={{ whiteSpace: 'nowrap' }}>{order.date}</td>
                                            <td style={{ color: '#b9b09d', fontFamily: 'monospace' }}>#{order.id}</td>
                                            <td>
                                                <div className={styles.orderItem}>
                                                    <div className={styles.thumb} style={{ backgroundImage: `url(${order.itemThumb})` }}></div>
                                                    <span>{order.itemName}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`${styles.orderType} ${styles[order.type.toLowerCase()]}`}>
                                                    {order.type}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right' }} className={styles.orderTotal}>
                                                {formatCurrency(order.total)}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button className={styles.invoiceBtn} title="Download Invoice">
                                                    <span className="material-symbols-outlined icon">description</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.pagination}>
                            <span className={styles.summary}>Showing 4 of 14 orders</span>
                            <div className={styles.pages}>
                                <button disabled>Prev</button>
                                <button className={styles.active}>1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
