import React, { useState } from 'react';
import styles from '../../styles/AddCustomer.module.scss';
import type { Customer } from './CustomerManagement';

interface AddCustomerProps {
    initialData?: Customer;
    onBack: () => void;
    onSave: (customer: Customer) => void;
}

interface Phone {
    number: string;
    type: string;
}

const AddCustomer: React.FC<AddCustomerProps> = ({ initialData, onBack, onSave }) => {
    const isEditing = !!initialData;
    const [phones, setPhones] = useState<Phone[]>(
        initialData?.phone
            ? [{ number: initialData.phone, type: 'Mobile' }]
            : [{ number: '', type: 'Mobile' }]
    );
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        dob: '',
        segment: initialData?.tier === 'Gold VIP' ? 'VIP / High Value' : 'Standard Retail',
        email: initialData?.email || '',
        address: '',
        city: '',
        state: '',
        zip: '',
        billingSame: true,
        loyaltyMember: true,
        material: 'Both'
    });

    const handleAddPhone = () => {
        setPhones([...phones, { number: '', type: 'Mobile' }]);
    };

    const handlePhoneChange = (index: number, field: keyof Phone, value: string) => {
        const newPhones = [...phones];
        newPhones[index][field] = value;
        setPhones(newPhones);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const customerData: Customer = {
            id: initialData?.id || 'CUST-' + Math.floor(1000 + Math.random() * 9000),
            name: formData.name,
            email: formData.email,
            phone: phones[0].number || initialData?.phone || '',
            tier: formData.segment === 'VIP / High Value' ? 'Gold VIP' :
                formData.segment === 'Wholesale' ? 'Platinum' :
                    formData.segment === 'Standard Retail' ? 'Silver' : 'Regular',
            joinedDate: initialData?.joinedDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            totalSpend: initialData?.totalSpend || 0,
            transactionCount: initialData?.transactionCount || 0,
            lastVisit: initialData?.lastVisit || 'Never',
            avatar: initialData?.avatar
        };

        onSave(customerData);
    };

    return (
        <div className={styles.container}>
            {/* Breadcrumbs */}
            <nav className={styles.breadcrumbs}>
                <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Dashboard</a>
                <span>/</span>
                <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }}>Customers</a>
                <span>/</span>
                <span className={styles.current}>{isEditing ? 'Edit Profile' : 'New Profile'}</span>
            </nav>

            {/* Header */}
            <div className={styles.pageHeader}>
                <div className={styles.titleBlock}>
                    <h1>{isEditing ? 'Edit Customer Profile' : 'New Customer Profile'}</h1>
                    <p>{isEditing ? 'Update the personal and contact information for this client.' : 'Enter the personal and contact information for the new client.'}</p>
                </div>
                <button className={styles.importBtn}>
                    <span className="material-symbols-outlined icon">upload_file</span>
                    Import CSV
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Section 1: Personal */}
                <div className={styles.formSection}>
                    <div className={styles.sectionInfo}>
                        <h3>Personal Identity</h3>
                        <p>Basic identification details required for invoicing and legal compliance.</p>
                    </div>
                    <div className={styles.sectionFields}>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}>
                            <label>Full Name</label>
                            <div className={`${styles.inputWrapper} ${styles.hasIconRight}`}>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="e.g. Eleanor Rigby"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="material-symbols-outlined icon right">person</span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Date of Birth</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    name="dob"
                                    type="date"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Customer Segment</label>
                            <div className={`${styles.inputWrapper} ${styles.hasIconRight}`}>
                                <select
                                    name="segment"
                                    value={formData.segment}
                                    onChange={handleChange}
                                >
                                    <option>Standard Retail</option>
                                    <option>Wholesale</option>
                                    <option>VIP / High Value</option>
                                    <option>Corporate Gift</option>
                                </select>
                                <span className="material-symbols-outlined icon right">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className={styles.divider} />

                {/* Section 2: Contact */}
                <div className={styles.formSection}>
                    <div className={styles.sectionInfo}>
                        <h3>Contact Information</h3>
                        <p>Reachability for order updates and promotional offers.</p>
                    </div>
                    <div className={`${styles.sectionFields} ${styles.fullWidth}`}>
                        <div className={styles.formGroup}>
                            <label>Email Address</label>
                            <div className={`${styles.inputWrapper} ${styles.hasIconLeft}`}>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="material-symbols-outlined icon left">mail</span>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Phone Number(s)</label>
                            <div className={styles.phoneList}>
                                {phones.map((phone, index) => (
                                    <div key={index} className={styles.phoneRow}>
                                        <div className={`${styles.inputWrapper} ${styles.hasIconLeft} flex-1`}>
                                            <input
                                                type="tel"
                                                placeholder="+91 00000 00000"
                                                value={phone.number}
                                                onChange={(e) => handlePhoneChange(index, 'number', e.target.value)}
                                            />
                                            <span className="material-symbols-outlined icon left">call</span>
                                        </div>
                                        <div className={`${styles.inputWrapper} ${styles.hasIconRight}`} style={{ width: '120px' }}>
                                            <select
                                                value={phone.type}
                                                onChange={(e) => handlePhoneChange(index, 'type', e.target.value)}
                                            >
                                                <option>Mobile</option>
                                                <option>Home</option>
                                                <option>Work</option>
                                            </select>
                                            <span className="material-symbols-outlined icon right" style={{ fontSize: '1rem' }}>expand_more</span>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className={styles.addPhoneBtn} onClick={handleAddPhone}>
                                    <span className="material-symbols-outlined icon">add</span>
                                    Add another number
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className={styles.divider} />

                {/* Section 3: Address */}
                <div className={styles.formSection}>
                    <div className={styles.sectionInfo}>
                        <h3>Shipping & Billing</h3>
                        <p>Primary residence or business location for deliveries.</p>
                    </div>
                    <div className={styles.sectionFields}>
                        <div className={`${styles.formGroup} ${styles.spanFull}`}>
                            <label>Street Address</label>
                            <input
                                name="address"
                                type="text"
                                placeholder="1234 Gold Leaf Blvd, Suite 100"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>City</label>
                            <input
                                name="city"
                                type="text"
                                placeholder="New York"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className={styles.formGroup}>
                                <label>State</label>
                                <input
                                    name="state"
                                    type="text"
                                    placeholder="NY"
                                    value={formData.state}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Zip Code</label>
                                <input
                                    name="zip"
                                    type="text"
                                    placeholder="10001"
                                    value={formData.zip}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className={`${styles.formGroup} ${styles.spanFull} mt-2`}>
                            <label className={styles.toggleSwitch}>
                                <input
                                    name="billingSame"
                                    type="checkbox"
                                    checked={formData.billingSame}
                                    onChange={handleChange}
                                />
                                <div className={styles.slider}></div>
                                <span className={styles.label}>Billing address same as shipping</span>
                            </label>
                        </div>
                    </div>
                </div>

                <hr className={styles.divider} />

                {/* Section 4: Loyalty */}
                <div className={styles.formSection}>
                    <div className={styles.sectionInfo}>
                        <h3>Loyalty & Preferences</h3>
                        <p>Enrollment in reward programs and marketing preferences.</p>
                    </div>
                    <div className={`${styles.sectionFields} ${styles.fullWidth} ${styles.loyaltyCard}`}>
                        <div className={styles.accent}></div>
                        <div className={styles.loyaltyHeader}>
                            <div className={styles.brandInfo}>
                                <div className={styles.brandIcon}>
                                    <span className="material-symbols-outlined icon">workspace_premium</span>
                                </div>
                                <div className={styles.brandText}>
                                    <h4>Gold Circle Loyalty Program</h4>
                                    <p>Members earn 2x points on gold purchases and get early access to new collections.</p>
                                </div>
                            </div>
                            <label className={styles.toggleSwitch} style={{ padding: '0.25rem' }}>
                                <input
                                    name="loyaltyMember"
                                    type="checkbox"
                                    checked={formData.loyaltyMember}
                                    onChange={handleChange}
                                />
                                <div className={styles.slider} style={{ width: '3.5rem', height: '1.75rem' }}></div>
                            </label>
                        </div>
                        <div className={styles.loyaltyDetails}>
                            <div className={styles.formGroup}>
                                <label>Preferred Material</label>
                                <div className={styles.radioGroup}>
                                    {['Gold', 'Silver', 'Both'].map((mat) => (
                                        <label key={mat} className={`${styles.radioOption} ${mat === 'Silver' ? styles.silver : ''}`}>
                                            <input
                                                type="radio"
                                                name="material"
                                                value={mat}
                                                checked={formData.material === mat}
                                                onChange={handleChange}
                                            />
                                            <div className={styles.tag}>{mat}</div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Member ID (Auto)</label>
                                <div className={styles.inputWrapper}>
                                    <input type="text" value="GC-8842-NEW" disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className={styles.actionBar}>
                    <button type="button" className={styles.cancel} onClick={onBack}>Cancel</button>
                    <button type="submit" className={styles.save}>
                        <span className="material-symbols-outlined icon">save</span>
                        {isEditing ? 'Update Customer' : 'Save Customer'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomer;
