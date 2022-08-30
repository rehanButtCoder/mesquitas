import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { singleDua } from '../Services/Dua';
function View_Dua() {
    const { id } = useParams();

    const [respValues, setRespValues] = useState({});
    const [img, setImg] = useState();

    const getMosque = async () => {
        const resp = await singleDua(id)
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
                <Link className="arrw" to="/duas">
                    <div><img src="/assets/images/backArrow.svg" alt="" /></div>
                    <div><h2 className='mainh2'>Dua's Details</h2></div>
                </Link>
            </div>
            <div className="users-table mb-45">
                <div className="addContainer">
                    <div className='half'>
                        <div className='edit-body viewM-body'>
                            <form>
                                <div className="add_FieldsContainer">
                                    <div className="add_Fields mb20">
                                        <h5 className='viewHead'>Dua Name</h5>
                                        <p className='viewpara'>{respValues.name}</p>
                                    </div>
                                    <div className="add_Fields mb20">
                                        <h5 className='viewHead'>Dua Type</h5>
                                        <p className='viewpara'>{respValues.duaTypeId}</p>
                                    </div>
                                    <div className="add_Fields width100 mb20">
                                        {/* <textarea className='addFieldsInput width100' type="email" name="upass" placeholder="Dua" /> */}
                                        <h5 className='viewHead'>Dua</h5>
                                        <p className='viewpara'>{respValues.detail}</p>
                                    </div>
                                    <div className="add_Fields width100 mb20">
                                        <h5 className='viewHead'>Dua Translation</h5>
                                        <p className='viewpara'>{respValues.translation}</p>
                                        {/* <textarea className='addFieldsInput width100' type="email" name="upass" placeholder="Dua Translation" /> */}

                                    </div>
                                </div>
                                {/* <div className="buttonSet">
                                    <Link to="" className="fBtn saveBtn">Update</Link>
                                    <Link to="/duas" className="fBtn" >Cancel</Link>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div >
            <Link to={`/duas/edit-dua/${id}`} className="eDitBtn">Edit</Link>

        </div >
    )
}

export default View_Dua