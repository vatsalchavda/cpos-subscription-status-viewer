import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SubscriptionPage.module.css';

const SubscriptionPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate('/')}>
                Back to Home
            </button>
            {/* ...existing code... */}
        </div>
    );
};

export default SubscriptionPage;