import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart,
    BarElement,

} from 'chart.js';
import Graphs from './Graphs';
import LineGraph from './Line_Graph';

Chart.register(
    BarElement,
);



const Dashboard = () => {


    return (
        <div className='dashboardContainer'>
            <div className="dashboardHeading">
                <div><h2 className='mainh2'>Dashboard</h2></div>
            </div>
            <div className="dashboard-stats">
                <div className="dashboard-boxes">
                    <div className="dashboard-box">
                        <div className='box-head'>
                            <h5>Total Users</h5>
                            <h3>6007</h3>
                            <div className="box-description">
                                <span className='fdate'>89.3%</span>
                                <img src="/assets/images/uparrow.svg" alt="" /><span className='ldate'>than last year</span>
                            </div>
                        </div>
                        <div className="box-footer">
                            <img src="/assets/images/MESQUITAS  ICONS/Group 20572.png" alt="" />
                        </div>
                    </div>
                    <div className="dashboard-box">
                        <div className='box-head'>
                            <h5>Total Mosque</h5>
                            <h3>20000</h3>
                            <div className="box-description">
                                <span className='fdate'>89.3%</span>
                                <img src="/assets/images/uparrow.svg" alt="" /><span className='ldate'>than last year</span>
                            </div>
                        </div>
                        <div className="box-footer">
                            <img src="/assets/images/MESQUITAS  ICONS/Group 20573.png" alt="" />
                        </div>
                    </div>
                    <div className="dashboard-box">
                        <div className='box-head'>
                            <h5>Total Duas</h5>
                            <h3>22000</h3>
                            <div className="box-description">
                                <span className='fdate'>89.3%</span>
                                <img src="/assets/images/uparrow.svg" alt="" /><span className='ldate'>than last year</span>
                            </div>
                        </div>
                        <div className="box-footer">
                            <img src="/assets/images/MESQUITAS  ICONS/Group 20574.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="users-table mb30">
                <div className="users-table-container">
                    <Graphs />
                </div>
            </div>

            <div className="users-table">
                <div className="users-table-container">
                    <LineGraph />
                </div>
            </div>
        </div>
    )
}

export default Dashboard