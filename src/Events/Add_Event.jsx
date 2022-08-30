import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { getEventMosques, saveEvent } from '../Services/Events';
import EventTable from './EventTable';
import Swal from 'sweetalert2';
import uuid from 'react-uuid';
import { uploadFile } from '../Services/UploadFile';

function Add_Event() {
    // const [eventData, setEventData] = useState([])

    // const deleteFunc = (item) => {
    //     const newList = eventData.filter((x) => {
    //         return x.id !== item
    //     })

    //     setEventData(newList);
    // }

    const navigate = useNavigate();
    const [btnLoder, setBtnLoder] = useState(false);


    // work start

    const [picture, setPicture] = useState()
    const [imgData, setImgData] = useState(null)

    const imagesPreview = (e) => {
        // debugger
        if (e.target.files[0]) {
            setPicture(e.target.files[0])
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])

            reader.addEventListener("load", () => {
                setImgData(reader.result)
            })
        }
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();




    const onSubmit = async (eventData) => {
        debugger
        setBtnLoder(true)
        // delete eventData.id;

        const data = {
            // id: uuid(),
            FilePath: '',
            Name: eventData.name,
            MosqueId: eventData.mosque,
            Date: eventData.date,
            Time: eventData.time
        }

        if (imgData !== null) {

            const formData3 = new FormData();
            formData3.append("eventImage", picture);
            const imageResponse3 = await uploadFile(formData3);
            data.FilePath = imageResponse3.data.data[0].url

        }

        const resp = await saveEvent(data)

        if (resp.data.code === 1) {

            Swal.fire({
                title: 'Event Added!',
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })

            setTimeout(() => {
                navigate('/events');
            }, 2000);
        } else {
            setBtnLoder(false)
            const swalWithBootstrapButtons = Swal.mixin({
            })
            swalWithBootstrapButtons.fire({
                title: "",
                icon: 'error',
            })
        }
    }
    const [mosqueId, setMosqueId] = useState([]);

    const getEventFunc = async () => {
        let respDua = await getEventMosques();
        setMosqueId(respDua.data.data.result)
    }
    useEffect(() => {
        getEventFunc();
    }, [])

    return (
        <div className='dashboardContainer'>
            <div className='dashboardHeading'>
                <Link className="arrw" to="/events">
                    <div><img src="/assets/images/backArrow.svg" alt="" /></div>
                    <div><h2 className='mainh2'>ADD Events</h2></div>
                </Link>
            </div>
            <div className="users-table mb-45">
                <div className="addContainer">
                    <div className='half'>
                        <h2 className='mainh2 mb15'>Event</h2>

                        <form>
                            <div className='addDuaFieldBox'>
                                <div className="add_FieldsContainer">
                                    <div className='a'>
                                        <div className='hiddenField'>
                                            {(imgData ? <img className='mt38 eventImgSet' src={imgData} alt="" /> :
                                                <>
                                                    <img id="blah" className='mt38 eventImgSet' src="/assets/images/uploadE.png" alt="" />
                                                    <input onChange={imagesPreview} className='hides' id="files" accept="image/*" type="file" />
                                                </>
                                            )}
                                        </div>
                                        {/* <img src="/assets/images/uploadE.png" alt="" /> */}
                                    </div>
                                    <div className='b'>
                                        <div className="eventFields">
                                            <input className='addFieldsInput' type="text" placeholder="Event Name"  {...register("name", { required: true })} />
                                            {errors.name && <span className='eror'>Event name is required</span>}
                                        </div>
                                        <div className="eventFields">
                                            <input className='addFieldsInput' type="date" placeholder="Date" {...register("date", { required: true })} />
                                            {errors.date && <span className='eror'>Event date is required</span>}
                                        </div>
                                        <div className="eventFields">
                                            <input className='addFieldsInput' type="time" placeholder="Time" {...register("time", { required: true })} />
                                            {errors.time && <span className='eror'>Event time is required</span>}
                                        </div>
                                        <div className="eventFields">
                                            <select className='addFieldsInput' {...register("mosque", { required: true })} >
                                                <option disabled selected value="">Mosque Name</option>
                                                {mosqueId.map((x) => {
                                                    return <option value={x.mosqueId}>{x.name}</option>
                                                })}
                                            </select>
                                            {errors.mosque && <span className='eror'>Event type is required</span>}
                                            {/* <input className='addFieldsInput' type="text" name="upass" placeholder="Mosque Name" {...register("duaTranslation", { required: true })} />
                        {errors.duaTranslation && <span className='eror'>Dua is required</span>} */}
                                        </div>
                                        {/* <div className="eventFields">
                                            <button onClick={handleSubmit(onSubmit)} className="fBtn saveBtn" >Add</button>
                                        </div> */}
                                    </div>

                                </div>

                            </div>
                        </form>
                        {/* events table k lye tha */}
                        {/* <EventTable data={eventData} setData={setEventData} /> */}
                    </div>
                </div>
            </div >

            {/* events table k lye tha */}
            {/* <div className="users-table">
                <div className="users-table-container">
                    <div className='user-table-body'>
                        <div className='videoList bg0'>
                            <div className='accessHead'>
                                <h4>Name</h4>
                            </div>
                            <div className='accessHead'>
                                <h4>Date & Time</h4>
                            </div>
                            <div className='accessHead'>
                                <h4></h4>
                            </div>
                        </div>
                        {eventData.map((x) => {
                            return <div className='LessonvideoList'>
                                <div className='accessHeads'>
                                    <h4>{x.Name}</h4>
                                </div>
                                <div className='accessHeads'>
                                    <h4 className='accessHeadsH4'>{x.Date} {x.Time}</h4>
                                </div>
                                <div className='accessHeads setDelBtn'>
                                    <img className="virtual" src={x.FilePath} alt="" />
                                    <img onClick={() => deleteFunc(x.id)} className="delBtnAbsolute" src='/assets/images/deletekro.svg' alt="" />
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div> */}
            <div className="buttonsetEvents">
                {(btnLoder ? <div className="relative">
                    <div className="loader alignLoader"></div>
                    <Link to="" onClick={handleSubmit(onSubmit)} className="fBtn saveBtn">Save</Link>
                </div> :
                    <Link to="" onClick={handleSubmit(onSubmit)} className="fBtn saveBtn" >Save</Link>
                )}

                {/* <Link to=""  className="fBtn saveBtn" >Save</Link> */}
                <Link to="/events" className="fBtn" >Cancel</Link>
            </div>
        </div >
    )
}

export default Add_Event