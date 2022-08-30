import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { getEventMosques } from '../Services/Events';
import { uploadFile } from '../Services/UploadFile';
import uuid from 'react-uuid'

function EventTable({ data, setData }) {
    const [picture, setPicture] = useState()
    const [imgData, setImgData] = useState()

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
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();



    const onSubmit = async (eventData) => {
        debugger

        const a = [...data];
        
        const formData3 = new FormData();
        formData3.append("eventImage", picture);
        const imageResponse3 = await uploadFile(formData3);
       
        
        a.push({
            id: uuid(),
            FilePath: imageResponse3.data.data[0].url,
            Name: eventData.name,
            MosqueId: eventData.mosque,
            Date: eventData.date,
            Time: eventData.time
        })
        setData(a)

        reset({ name: "" });
        reset({ mosque: "" });
        reset({ date: "" });
        reset({ time: "" });
        setImgData('')
    };

    const [mosqueId, setMosqueId] = useState([]);

    const getMosqueFunc = async () => {
        let respDua = await getEventMosques();
        setMosqueId(respDua.data.data.result)
    }
    useEffect(() => {
        getMosqueFunc();
    }, [])

    return (
        <form>
            <div className='addDuaFieldBox'>
                <div className="add_FieldsContainer">
                    <div className='a'>
                        <div className='hiddenField'>
                            {(imgData ? <img className='setImg' src={imgData} alt="" /> :
                                <>
                                    <img id="blah" src="/assets/images/uploadE.png" alt="" />
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
                                <option disabled selected value="">Mosque</option>
                                {mosqueId.map((x) => {
                                    return <option value={x.mosqueId}>{x.name}</option>
                                })}
                            </select>
                            {errors.mosque && <span className='eror'>Event type is required</span>}
                            {/* <input className='addFieldsInput' type="text" name="upass" placeholder="Mosque Name" {...register("duaTranslation", { required: true })} />
                        {errors.duaTranslation && <span className='eror'>Dua is required</span>} */}
                        </div>
                        <div className="eventFields">
                            <button onClick={handleSubmit(onSubmit)} className="fBtn saveBtn" >Add</button>
                        </div>
                    </div>

                </div>

            </div>
        </form>
    )
}

export default EventTable;