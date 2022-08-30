import "../Edit/Edit.scss"
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { getDuaId, singleDua, updateDua } from '../Services/Dua';
import { Link, useParams } from 'react-router-dom'


function Edit_Dua() {
    const { id } = useParams();
    // console.log(id)
    const navigate = useNavigate();
    const Swal = require('sweetalert2')

    const [btnLoder, setBtnLoder] = useState(false);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = async (fData) => {
        debugger
        setBtnLoder(true)

        const data = {
            DuaId: id,
            DuaTypeId: fData.duaTypeId,
            Name: fData.name,
            Detail: fData.detail,
            Translation: fData.translation
        }

        const resp = await updateDua(data);

        if (resp.data.code === 1) {
            Swal.fire({
                title: 'Dua Updated!',
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })
            setTimeout(() => {
                navigate('/duas');
            }, 2000);
        }
    }

    const getDua = async () => {
        const resp = await singleDua(id)
        // console.log(resp.data.data)
        reset(resp.data.data)
    }
    const [duaId, setDuaId] = useState([]);

    const getDuaIdFunc = async () => {
        let respDua = await getDuaId();
        // console.log(respDua.data.data)
        setDuaId(respDua.data.data)
        reset(respDua.data.data)
    }
    useEffect(() => {
        getDua()
        getDuaIdFunc()
    }, [])


    return (
        <div className='dashboardContainer'>
            <div className='dashboardHeading'>
                <Link className="arrw" to="/duas">
                    <div><img src="/assets/images/backArrow.svg" alt="" /></div>
                    <div><h2 className='mainh2'>Edit Dua's</h2></div>
                </Link>
            </div>
            <div className="users-table mb-45">
                <div className="addContainer">
                    <div className='half'>
                        <div className='editDua'>
                            <form>
                                <div className="add_FieldsContainer">
                                    <div className="add_Fields">
                                        <input className='addFieldsInput' type="text" name="uname" placeholder="Dua Name"  {...register("name", { required: true })} />
                                        {errors.name && <span className='eror'>Dua is required</span>}
                                    </div>
                                    <div className="add_Fields">
                                        <select className='addFieldsInput' {...register("duaTypeId", { required: true })} >
                                            {duaId.map((x) => {
                                                return <option value={x.duaTypeId}>{x.name}</option>
                                            })}
                                        </select>
                                        {errors.duaTypeId && <span className='eror'>Dua type is required</span>}
                                    </div>
                                    <div className="add_Fields editDua">
                                        <input className='addFieldsInput editDua' type="text" name="upass" placeholder="Dua" {...register("detail", { required: true })} />
                                        {errors.detail && <span className='eror'>Dua is required</span>}
                                    </div>
                                    <div className="add_Fields editDua">
                                        <input className='addFieldsInput editDua' type="text" name="upass" placeholder="Dua Translation" {...register("translation", { required: true })} />
                                        {errors.translation && <span className='eror'>Dua is required</span>}
                                    </div>
                                </div>
                                <div className="buttonSet">
                                    {(btnLoder ? <div className="relative">
                                        <div className="loader alignLoader"></div>
                                        <Link to="" className="fBtn saveBtn" onClick={handleSubmit(onSubmit)}>Update</Link>
                                    </div> :
                                        <Link to="" className="fBtn saveBtn" onClick={handleSubmit(onSubmit)}>Update</Link>
                                    )}
                                    <Link to="/duas" className="fBtn" >Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >


        </div >
    )
}

export default Edit_Dua;