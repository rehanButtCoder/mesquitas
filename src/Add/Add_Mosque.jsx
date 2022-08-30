import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import "../Add/Add_Dua.scss"
import { getProvinces, saveMosque } from '../Services/Mosques';
import { uploadFile } from '../Services/UploadFile';

function Add_Mosque() {
    const navigate = useNavigate();

    const [btnLoder, setBtnLoder] = useState(false);

    const [picture, setPicture] = useState(null)
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

    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const onSubmit = async (fData) => {
        if (picture === null) {
            Swal.fire({
                title: 'Image is missing',
                icon: 'warning',
                showConfirmButton: true,
            })
        } else {
            debugger
            setBtnLoder(true)

            const data = {
                FilePath: "",
                ProvinceId: fData.province,
                Name: fData.mosqueName,
                Fajr: fData.fajr,
                NascerDoSol: fData.nascer,
                Zuhr: fData.zuhr,
                Asr: fData.asr,
                Maghrib: fData.maghrib,
                Isha: fData.isha
            }

            const formData3 = new FormData();
            // append k sath key aty ha jo api meh sath bejy hoty idr empty h
            formData3.append("mosqueImage", picture);
            const imageResponse3 = await uploadFile(formData3);
            console.log(imageResponse3.data.data[0])
            data.FilePath = imageResponse3.data.data[0].url;


            const resp = await saveMosque(data)

            if (resp.data.code === 1) {

                Swal.fire({
                    title: 'Mosque Added!',
                    timer: 1500,
                    icon: 'success',
                    showConfirmButton: false,
                })

                setTimeout(() => {
                    navigate('/mosques');
                }, 2000);
            }
        }
    }

    const [provinceId, setProvinceId] = useState([]);

    const getProvincesFunc = async () => {
        let respDua = await getProvinces();
        console.log(respDua.data.data)
        setProvinceId(respDua.data.data)
    }
    useEffect(() => {
        getProvincesFunc()
    }, [])

    return (
        <div className='dashboardContainer'>
            <div className='dashboardHeading'>
                <Link className="arrw" to="/mosques">
                    <div><img src="/assets/images/backArrow.svg" alt="" /></div>
                    <div>  <h2 className='mainh2'>Add Mosque</h2></div>
                </Link>
            </div>
            <div className="users-table mb-45">
                <div className="addContainer">
                    <div className='main_body'>
                        <div className='mosque_left'>
                            <form>
                                <div className="add_FieldsContainer">
                                    <div className="mosque_Fields">
                                        <select className='addFieldsInput' {...register("province", { required: true })}>
                                            <option disabled selected value="">Provincia</option>
                                            {provinceId.map((x) => {
                                                return <option value={x.provinceId}>{x.name}</option>
                                            })}
                                        </select>
                                        {errors.province && <span className='eror'>Dua is required</span>}
                                    </div>
                                    <div className="mosque_Fields">
                                        <input className='addFieldsInput' type="text" name="uname" placeholder="Mosque Name" {...register("mosqueName", { required: true })} />
                                        {errors.mosqueName && <span className='eror'>Dua is required</span>}
                                    </div>

                                    {/* "url(/assets/images/arrowDown.svg)" */}
                                    {/* <img src="/assets/images/arrowDown.svg" alt="" /> */}
                                    {/* <div className="mosque_Fields width40">
                                        <Multiselect
                                            showArrow
                                            customArrow={<img className='multislectArrw' src="/assets/images/arrowDown.svg" alt="" />}
                                            customCloseIcon={<span className='clos'>x</span>}
                                            placeholder='Mosque Name'
                                            hidePlaceholder
                                            className='multiSlect'
                                            isObject={false}
                                            onKeyPressFn={function noRefCheck() { }}
                                            onRemove={function noRefCheck() { }}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={function noRefCheck() { }}
                                            options={[
                                                'Option 1',
                                                'Option 2',
                                                'Option 3',
                                                'Option 4',
                                                'Option 5'
                                            ]}
                                        />
                                    </div> */}
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
                                                <input className='namazFields' type="time" name="uname" placeholder="Provincia" {...register("fajr", { required: true })} />
                                                {errors.fajr && <span className='eror'>fajr time is required</span>}
                                            </div>
                                            {/* <input type="time" name="" id="" /> */}
                                            <div className="setNamazFields">
                                                <input className='namazFields' type="time" name="uname" placeholder="2" {...register("nascer", { required: true })} />
                                                {errors.nascer && <span className='eror'>nascer time is required</span>}
                                            </div>
                                            <div className="setNamazFields">
                                                <input className='namazFields' type="time" name="uname" placeholder="Provincia" {...register("zuhr", { required: true })} />
                                                {errors.zuhr && <span className='eror'>zuhr time is required</span>}
                                            </div>
                                            <div className="setNamazFields">
                                                <input className='namazFields' type="time" name="uname" placeholder="Provincia" {...register("asr", { required: true })} />
                                                {errors.asr && <span className='eror'>asr time is required</span>}
                                            </div>
                                            <div className="setNamazFields">
                                                <input className='namazFields' type="time" name="uname" placeholder="Provincia" {...register("maghrib", { required: true })} />
                                                {errors.maghrib && <span className='eror'>maghrib time is required</span>}
                                            </div>
                                            <div className="setNamazFields">
                                                <input className='namazFields' type="time" name="uname" placeholder="Provincia" {...register("isha", { required: true })} />
                                                {errors.isha && <span className='eror'>isha time is required</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="MosquebuttonSet">
                                    {(btnLoder ? <div className="relative">
                                        <div className="loader alignLoader"></div>
                                        <button to="" className="fBtn saveBtn" >Save</button>
                                    </div> :
                                        <button to="" className="fBtn saveBtn" onClick={handleSubmit(onSubmit)}>Save</button>
                                    )}
                                    <Link to="/mosques" className="fBtn" >Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className='mosque_right'>
                            <div className='uplodimg mb-40'>
                                <div className='hiddenField ml120'>
                                    {(imgData ? <img className='mosqueUploaddImg' src={imgData} alt="" /> :
                                        <>
                                            <img id="mleff" src="/assets/images/uploadE.png" alt="" />
                                            <input onChange={imagesPreview} className='mhides' id="files" accept="image/*" type="file" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div >


        </div >
    )
}

export default Add_Mosque;