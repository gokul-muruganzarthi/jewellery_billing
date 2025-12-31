import React, { useState } from 'react';
import styles from '../../styles/Dashboard.module.scss';
import type { Product } from './Dashboard.types';

interface InventoryTableProps {
    products: Product[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ products }) => {
    const [activeTab, setActiveTab] = useState<'All' | 'Gold' | 'Silver'>('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter products based on active tab and search query
    const filteredProducts = products.filter(product => {
        const matchesTab =
            activeTab === 'All' ? true :
                activeTab === 'Gold' ? product.material.includes('Gold') :
                    activeTab === 'Silver' ? product.material.includes('Silver') : true;

        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const getBadgeClass = (material: string) => {
        if (material.includes('Gold')) return styles.badgePrimary;
        if (material.includes('Silver')) return styles.badgeSilver;
        return styles.badge; // Fallback
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'In Stock': return styles.badgeSuccess;
            case 'Low Stock': return styles.badgeWarning;
            case 'Out of Stock': return styles.badgeDanger;
            default: return styles.badgeSuccess;
        }
    };

    return (
        <div className={styles.interfaceContainer}>
            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'All' ? styles.active : ''}`}
                    onClick={() => setActiveTab('All')}
                >
                    <p>All Items</p>
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'Gold' ? styles.active : ''}`}
                    onClick={() => setActiveTab('Gold')}
                >
                    <p>Gold Collection</p>
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'Silver' ? styles.active : ''}`}
                    onClick={() => setActiveTab('Silver')}
                >
                    <p>Silver Collection</p>
                </button>
            </div>

            {/* Controls Bar */}
            <div className={styles.controlsBar}>
                {/* Search */}
                <div className={styles.searchWrapper}>
                    <div className={styles.searchIcon}>
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by SKU, Name, or Category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className={styles.filterActions}>
                    <button className={`${styles.btn} ${styles.secondary}`}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>filter_list</span>
                        Filters
                    </button>
                    <button className={`${styles.btn} ${styles.secondary}`}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>sort</span>
                        Sort
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ width: '4rem' }}>
                                <input type="checkbox" />
                            </th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Purity</th>
                            <th className={styles.textRight}>Weight (g)</th>
                            <th className={styles.textRight}>Price</th>
                            <th className={styles.textCenter}>Status</th>
                            <th className={styles.textRight}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <div className={styles.productCell}>
                                        <div
                                            className={styles.productImage}
                                            style={{ backgroundImage: `url("${product.image}")` }}
                                        ></div>
                                        <div className={styles.productInfo}>
                                            <span className={styles.name}>{product.name}</span>
                                            <span className={styles.sku}>SKU: {product.sku}</span>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ color: '#e0e0e0', fontSize: '0.875rem' }}>{product.category}</td>
                                <td>
                                    <span className={getBadgeClass(product.material)}>
                                        {product.material}
                                    </span>
                                </td>
                                <td className={`${styles.textRight} ${styles.textWhite} ${styles.textMono} ${styles.textSm}`}>
                                    {product.weight.toFixed(2)}
                                </td>
                                <td className={`${styles.textRight} ${styles.textWhite} ${styles.textMono} ${styles.fontSemiBold} ${styles.textSm}`}>
                                    ${product.price.toLocaleString()}
                                </td>
                                <td className={styles.textCenter}>
                                    <span className={getStatusBadgeClass(product.status)}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className={styles.textRight}>
                                    <button className={styles.actionBtn}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
                <p>Showing <span>1-{Math.min(5, filteredProducts.length)}</span> of <span>{filteredProducts.length}</span> items</p>
                <div className={styles.paginationControls}>
                    <button disabled>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
                    </button>
                    <button>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InventoryTable;
