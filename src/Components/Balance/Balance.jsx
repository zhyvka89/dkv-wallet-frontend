import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersOperations, usersSelectors } from '../../Redux/users';

import styles from './balance.module.scss';

const Balance = () => {
    const dispatch = useDispatch();
    const balance = useSelector(state => usersSelectors.getCurrentBalance(state));
  
    useEffect(() => {
        dispatch(usersOperations.getCurrentBalance());
    }, [dispatch, balance]);


    return (
        <div className={styles.balanceContainer}>
            <h4 className={styles.balanceText}>your balance</h4>
            <h2 className={styles.balance}>€ {balance}</h2>
        </div>
    );
};

export default Balance;