import React, { useState } from 'react';
import styles from '../../styles/Dashboard.module.scss';
import Sidebar from './Sidebar';
import StatsCard from './StatsCard';
import InventoryTable from './InventoryTable';
import CostEstimator from './CostEstimator';
import ExchangeCalculator from './ExchangeCalculator';
import CustomerManagement from './CustomerManagement';
import type { Customer } from './CustomerManagement';
import { INITIAL_CUSTOMERS } from './CustomerManagement';
import CustomerDetail from './CustomerDetail';
import AddCustomer from './AddCustomer';
import type { Product } from './Dashboard.types';

const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Royal Wedding Band',
        sku: 'GLD-8821',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd1AMtPlbjIYbpF71baxIk8Zqo6O5tJJmuDIytLBbWcOKrwO2bnT32hEP22qOf2OStUq5aN4cqX3mCC4_q9hroZ9rPZO8NbME9tb6Ud7w_pi9837YWt--tQ6VhMW9rNTQPaxrYtPA4SzbfCAzuP-QAyzFs04-2Yj2_T4J1Ps7MNcAYPeJlziefDlVCyu3-HRXl7F3mn7h5lRoMPlaCuHLQul9x1TvEoxWnuf9FQn7ljgb7yWKmdqXXqDoB8licD6bOnOhDz_7FXaKP',
        category: 'Ring',
        material: '22k Gold',
        weight: 12.50,
        price: 1200,
        status: 'In Stock'
    },
    {
        id: '2',
        name: 'Sterling Curb Chain',
        sku: 'SLV-4420',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBt-OeQFfbg1hfg1wzPiMmwGgYmVt9KY1Vb6QPH7R-thm4VySLD0I6O0SO2cQOsi3SIfzHIQBmmCjFvkU52yilr5B9X6zNfmXxpdxIBaThaVO_qkL83Xze0dmcVVoxK26UAc2zmH7jTv215z-F_XZFsopVZRuQ8-R202mRoh4IysLRLUmhkRh3Ht_Ebdz6iLTwQRRJfAiup0YjEQw6FFgH-ZwO2gWcn_Jij7Lhv0Hwb4oVjPdvLTgMrUZeqAVwEqEvfSdbYynbbBwN',
        category: 'Necklace',
        material: '925 Silver',
        weight: 45.00,
        price: 120,
        status: 'Low Stock'
    },
    {
        id: '3',
        name: 'Lakshmi Pendant',
        sku: 'GLD-9901',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh2PIDApmSlL8VBQbLQR4rHnYQd48S3K88IN2l22vDhsrZzG0ZHNbAetrDQzpERI7Zp5LCaGv93aHgvjgNQYfE4SsE50CRVku1JColRPhYq7ULiEhwDI1CeapW0ObjM4JTjhUuwNTUEGkL_a0yGou27tFZyj6DsqAiY8Gx5XaA5vDYEw6t4WvyI1j2tloNBKNnhEhvVnbp9PCGv0JnLNlhELMF4wa4k90OLZBNOVj0DIpaXWsIkuCnSK3b9dilBrO6KXrY2JZD0p92',
        category: 'Pendant',
        material: '24k Gold',
        weight: 8.00,
        price: 950,
        status: 'In Stock'
    },
    {
        id: '4',
        name: 'Classic Hoops',
        sku: 'SLV-1029',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIbe_3Zag1UMx1GwawJfDbognzyuNx19OarD3eWoBH2zvDjEe1dJFPHWhxsgfImmWcLqqlYr0d3Zp4JWZ558EJmtOglwuuzSfK4-cTvDqPNGHiP-WCv3ZoZhwHhMqUqRhMLKQmkNzVC4JHoOGpUtQZ-TlFvq71YstV7GCWpy2m9c8Umw8neq7k0HNrkUnjoElt5Ba23Qzf8kuFpd7UvHOwbXYhF2wpZjtoWqv1cRYEFcs8gRJg5ooCyX1Iw_j5-1yOGkE49Ur184R0',
        category: 'Earrings',
        material: '925 Silver',
        weight: 6.50,
        price: 55,
        status: 'Out of Stock'
    },
    {
        id: '5',
        name: 'Antique Bangle',
        sku: 'GLD-3341',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmRgeDNhQ4QS1zo_0v8iqBnjOhpFTXusW2bWRf9wmCxd4L-Du2GbZ4sazehBU3hoG4EGDW-s75uhfMxchOiPtfLfFMYP1gPdvmOCrA6O-QmhmoWKEXdq66K_ZVdgri8rGwnWWFy-QqznFyS3cSS1Ky4TlPlvb0G-Ah0C2kTScszqFZd01BBf1gKJLmQO_jlJlELFBC8HRTOSX56NpGwl8PX4dSXiGb2_ABIBw_zqXqmlDY7_X-lE4LmU-4Z3NcPpN3VKPUCW_ENCgx',
        category: 'Bracelet',
        material: '22k Gold',
        weight: 24.20,
        price: 2100,
        status: 'In Stock'
    }
];

const Dashboard: React.FC = () => {
    const [sidebarActive, setSidebarActive] = useState('Dashboard');
    const [exchangeValue, setExchangeValue] = useState<number>(0);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);

    return (
        <div className={styles.dashboardContainer}>
            <Sidebar activeItem={sidebarActive} onNavigate={setSidebarActive} />

            <main className={styles.main}>
                {/* Mobile Header */}
                <header className={styles.mobileHeader}>
                    <div className={styles.brand}>
                        <span className="material-symbols-outlined" style={{ color: '#e29d12' }}>diamond</span>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>LuxeVault</span>
                    </div>
                    <button style={{ color: 'white', background: 'none', border: 'none' }}>
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>

                <div className={styles.contentContainer}>
                    {sidebarActive === 'Cost Estimator' ? (
                        <CostEstimator
                            exchangeValue={exchangeValue}
                            onExchangeValueChange={setExchangeValue}
                            onOpenExchangeCalculator={() => setSidebarActive('Exchange Calculator')}
                        />
                    ) : sidebarActive === 'Exchange Calculator' ? (
                        <ExchangeCalculator
                            onBack={() => setSidebarActive('Cost Estimator')}
                            onAddToInvoice={(value) => {
                                setExchangeValue(value);
                                setSidebarActive('Cost Estimator');
                            }}
                        />
                    ) : sidebarActive === 'Customers' ? (
                        <CustomerManagement
                            customers={customers}
                            onSelectCustomer={(customer) => {
                                setSelectedCustomer(customer);
                                setSidebarActive('Customer Detail');
                            }}
                            onAddCustomer={() => {
                                setSelectedCustomer(null);
                                setSidebarActive('Add Customer');
                            }}
                        />
                    ) : sidebarActive === 'Customer Detail' && selectedCustomer ? (
                        <CustomerDetail
                            customer={selectedCustomer}
                            onBack={() => setSidebarActive('Customers')}
                            onEdit={(customer) => {
                                setSelectedCustomer(customer);
                                setSidebarActive('Add Customer');
                            }}
                        />
                    ) : sidebarActive === 'Add Customer' ? (
                        <AddCustomer
                            initialData={selectedCustomer || undefined}
                            onBack={() => setSidebarActive(selectedCustomer ? 'Customer Detail' : 'Customers')}
                            onSave={(updatedCust) => {
                                setCustomers(prev => {
                                    const exists = prev.find(c => c.id === updatedCust.id);
                                    if (exists) {
                                        return prev.map(c => c.id === updatedCust.id ? updatedCust : c);
                                    }
                                    return [updatedCust, ...prev];
                                });
                                setSelectedCustomer(updatedCust); // Update selected customer too
                                setSidebarActive('Customer Detail');
                            }}
                        />
                    ) : (
                        <div className={styles.contentWrapper}>
                            {/* Page Heading */}
                            <div className={styles.pageHeader}>
                                <div className={styles.titleSection}>
                                    <h2>Stock Overview</h2>
                                    <p>Manage your gold and silver inventory, track valuations in real-time, and update product listings.</p>
                                </div>
                                <div className={styles.actions}>
                                    <button className={`${styles.btn} ${styles.secondary}`}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>file_download</span>
                                        Export Report
                                    </button>
                                    <button className={`${styles.btn} ${styles.primary}`}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                                        Add New Item
                                    </button>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className={styles.statsGrid}>
                                <StatsCard
                                    label="Total Gold Stock"
                                    value="1,240"
                                    unit="g"
                                    icon="workspace_premium"
                                    trend="+2.5%"
                                    trendLabel="vs last month"
                                    trendDirection="up"
                                    isHighlight={false}
                                />
                                <StatsCard
                                    label="Total Silver Stock"
                                    value="5,400"
                                    unit="g"
                                    icon="diamond"
                                    trend="+0.8%"
                                    trendLabel="vs last month"
                                    trendDirection="flat"
                                    isHighlight={false}
                                />
                                <StatsCard
                                    label="Low Stock Alerts"
                                    value="12"
                                    unit="Items"
                                    icon="warning"
                                    trend="Needs Attention"
                                    trendLabel=""
                                    trendDirection="down"
                                    isHighlight={false}
                                />
                                <StatsCard
                                    label="Total Valuation"
                                    value="$1,250,000"
                                    icon="monetization_on"
                                    trend="+5.1%"
                                    trendLabel="Market Value"
                                    trendDirection="up"
                                    isHighlight={true}
                                />
                            </div>

                            {/* Main Interface */}
                            <InventoryTable products={MOCK_PRODUCTS} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
