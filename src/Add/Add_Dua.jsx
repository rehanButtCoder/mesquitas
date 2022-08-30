import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../Add/Add_Dua.scss"
import { useForm } from "react-hook-form";
import { getDuaId, saveDua } from '../Services/Dua';
import { useNavigate } from 'react-router';

function Add_Dua() {
    const navigate = useNavigate();
    const Swal = require('sweetalert2')

    const [btnLoder, setBtnLoder] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (fData) => {
        debugger
        setBtnLoder(true)

        const data = {
            DuaTypeId: fData.duaType,
            Name: fData.duaName,
            Detail: fData.duaDetail,
            Translation: fData.duaTranslation
        }

        const resp = await saveDua(data)

        if (resp.data.code === 1) {

            Swal.fire({
                title: 'Dua Added!',
                timer: 1500,
                icon: 'success',
                showConfirmButton: false,
            })

            setTimeout(() => {
                navigate('/duas');
            }, 2000);

        }
    }


    const [duaId, setDuaId] = useState([]);

    const getDuaIdFunc = async () => {
        let respDua = await getDuaId();
        console.log(respDua.data.data)
        setDuaId(respDua.data.data)
    }
    useEffect(() => {
        getDuaIdFunc()
    }, [])


    return (
        <div className='dashboardContainer'>
            <div className='dashboardHeading'>
                <Link className="arrw" to="/duas">
                    <div><img src="/assets/images/backArrow.svg" alt="" /></div>
                    <div>  <h2 className='mainh2'>Add Dua's</h2></div>
                </Link>
            </div>
            <div className="users-table mb-45">
                <div className="addContainer">
                    <div className='half'>
                        <div className='addDuaFieldBox'>
                            <form>
                                <div className="add_FieldsContainer">
                                    <div className="add_Fields">
                                        <input className='addFieldsInput' type="text" name="uname" placeholder="Dua Name"  {...register("duaName", { required: true })} />
                                        {errors.duaName && <span className='eror'>Dua is required</span>}
                                    </div>
                                    <div className="add_Fields">
                                        <select className='addFieldsInput' {...register("duaType", { required: true })} >
                                            <option value="" selected disabled>Dua Type</option>

                                            {duaId.map((x) => {
                                                return <option value={x.duaTypeId}>{x.name}</option>
                                            })}
                                        </select>
                                        {errors.duaType && <span className='eror'>Dua type is required</span>}
                                    </div>
                                    <div className="add_Fields">
                                        <input className='addFieldsInput' type="text" name="upass" placeholder="Dua" {...register("duaDetail", { required: true })} />
                                        {errors.duaDetail && <span className='eror'>Dua is required</span>}
                                    </div>
                                    <div className="add_Fields">
                                        <input className='addFieldsInput' type="text" name="upass" placeholder="Dua Translation" {...register("duaTranslation", { required: true })} />
                                        {errors.duaTranslation && <span className='eror'>Dua is required</span>}
                                    </div>
                                </div>
                                <div className="buttonSet">
                                    {(btnLoder ? <div className="relative">
                                        <div className="loader alignLoader"></div>
                                        <Link to="" className="fBtn saveBtn" >Save</Link>
                                    </div> :
                                        <Link to="" className="fBtn saveBtn" onClick={handleSubmit(onSubmit)}>Save</Link>
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

export default Add_Dua