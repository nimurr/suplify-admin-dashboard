import React from 'react';
import Card from './Card';
import Barchart from './Barchart';
import Transaction from './Transaction';
import EarningsDashboard from '../menu/sidebarMenu/Earning';
 
 
 

const DashboardHome = () => {
 
    return (
        <div>
            <EarningsDashboard />
        </div>
    );
};

export default DashboardHome;