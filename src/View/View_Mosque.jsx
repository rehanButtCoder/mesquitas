import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SingleMosque } from '../Services/Mosques';

function View_Mosque() {
    const { id } = useParams();

    const [respValues, setRespValues] = useState({});
    const [img, setImg] = useState();

    const getMosque = async () => {
        const resp = await SingleMosque(id)
        // console.log(resp.data.data)
        setImg(resp.data.data.filePath)
        setRespValues(resp.data.data)
    }
    useEffect(() => {
        getMosque()
    }, [])


    return (
        <div className='dashboardContainer'>
            <div className='dashboardHeading'>
                <Link className="arrw" to="/mosques">
                    <div><img src="/assets/images/backArrow.svg" alt="" /></div>
                    <div><h2 className='mainh2'>Mosque Details</h2></div>
                </Link>
            </div>
            <div className="users-table boxShdow0">
                <div className="addContainer padding0">
                    <div className='mosqueMainSec sbtween'>
                        <div className='viewM-body width65'>
                            <form>
                                <div className="add_FieldsContainer">
                                    <div className="add_Fields mb20">
                                        <h5 className='viewHead'>Provincia</h5>
                                        <p className='viewpara'>{respValues.provinceId}</p>
                                    </div>
                                    <div className="add_Fields mb20">
                                        <h5 className='viewHead'>Mosque Name</h5>
                                        <p className='viewpara'>{respValues.name}</p>
                                    </div>

                                </div>
                                <div>
                                    <h3 className='nimazTimng'>Nimaz Timing</h3>
                                    <div className='NamazTimingContainer'>
                                        <div className='namazNames'>
                                            <h4>Name</h4>
                                            <ul>
                                                <li>Fajr</li>
                                                <li>Nascer do sol</li>
                                                <li>Zuhr</li>
                                                <li>Asr</li>
                                                <li>Maghrib</li>
                                                <li>Isha</li>
                                            </ul>
                                        </div>
                                        <div className='namazTimes'>
                                            <h4>Time</h4>
                                            <div className="setNamazFields">
                                                <p className='namazFields setOp'>{respValues.fajr}</p>
                                                {/* <input className='namazFields' type="time" name="uname" placeholder="Provincia" /> */}
                                            </div>
                                            {/* <input type="time" name="" id="" /> */}
                                            <div className="setNamazFields">
                                                <p className='namazFields setOp'>{respValues.nascerDoSol}</p>
                                                {/* <input className='namazFields' type="time" name="uname" placeholder="2" /> */}
                                            </div>
                                            <div className="setNamazFields">
                                                <p className='namazFields setOp'>{respValues.zuhr}</p>
                                                {/* <input className='namazFields' type="time" name="uname" placeholder="Provincia" /> */}
                                            </div>
                                            <div className="setNamazFields">
                                                <p className='namazFields setOp'>{respValues.asr}</p>
                                                {/* <input className='namazFields' type="time" name="uname" placeholder="Provincia" /> */}
                                            </div>
                                            <div className="setNamazFields">
                                                <p className='namazFields setOp'>{respValues.maghrib}</p>
                                                {/* <input className='namazFields' type="time" name="uname" placeholder="Provincia" /> */}
                                            </div>
                                            <div className="setNamazFields">
                                                <p className='namazFields setOp'>{respValues.isha}</p>
                                                {/* <input className='namazFields' type="time" name="uname" placeholder="Provincia" /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='edit2nd-body mr35'>
                            <div className='mosqueSec mb-30'>
                                <h3 className='mHead'>Mosques</h3>
                                <div className='mosqueSecImg'>
                                    <img className='setimgg' src={img} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Link to={`/mosques/edit-mosque/${id}`} className="eDitBtn">Edit</Link>
        </div >
    )
}

export default View_Mosque