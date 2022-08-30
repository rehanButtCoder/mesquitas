import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleEvent } from '../Services/Events';
import moment from 'moment';


function ViewEvent() {
    const { id } = useParams();


    const [eventImg, setEventImg] = useState();
    const [values, setValues] = useState({});

    const getEventFunc = async () => {
        const resp = await getSingleEvent(id);
        // reset(resp.data.data)
        setEventImg(resp.data.data.filePath)
        setValues(resp.data.data)
        console.log(resp.data.data)
    }

    useEffect(() => {
        getEventFunc();
    }, [])

    return (
        <div className='dashboardContainer'>
            <div className='dashboardHeading'>
                <Link className="arrw" to="/events">
                    <div><img src="/assets/images/backArrow.svg" alt="" /></div>
                    <div><h2 className='mainh2'>Events Details</h2></div>
                </Link>
            </div>
            <div className="users-table mb-45">
                <div className="eventDetailContainer">
                    <div className='event'>
                        <div className='eventDetail'>
                            <h4 className='eventDetailh4'>Event</h4>
                            <p className='mainP'>{values.name}</p>
                        </div>
                    </div>
                    <div className='event'>
                        <div className='eventDetail'>
                            <h4 className='eventDetailh4'>Date & Time</h4>
                            <p className='mainP'>{(moment(values.date).format('YYYY/MM/DD'))}  &nbsp;&nbsp;{values.time}</p>
                        </div>
                    </div>
                    <div className='event'>
                        <img className='detailEventImg' src={eventImg} alt="" />
                    </div>
                </div>
            </div>

            <Link to={`/events/edit-event/${id}`} className="eDitBtn">Edit</Link>
        </div >
    )
}

export default ViewEvent