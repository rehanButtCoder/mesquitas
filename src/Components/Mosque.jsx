import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { deleteMosque, getMosques } from '../Services/Mosques';
import Loader from './Loader';
import Swal from 'sweetalert2';


const Mosque = () => {
    const showMenu = (e) => {
        document.querySelectorAll(".actionContent").forEach((item) => {
            if (e.target.closest(".actionContent") === item) {
                item.classList.toggle("block")
            } else {
                item.classList.remove("block")
            }
        })
    }
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [duaData, setDuaData] = useState();

    const [lodr, setLodr] = useState(true);

    const getDuaFunc = async (page) => {
        // debugger
        const resp = await getMosques({
            pageNumber: page,
            pageSize: perPage
        });
        // console.log(resp)
        setDuaData(resp.data.data.mosques)
        setTotalRows(resp.data.data.total)
        setLodr(false);
    }

    const handlePageChange = (page) => {
        // debugger
        getDuaFunc(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        // debugger
        const response = await getMosques({ pageNumber: page, pageSize: newPerPage });
        setDuaData(response.data.data.duas);
        setPerPage(newPerPage);
    };
    useEffect(() => {
        getDuaFunc(1)
        // debugger
    }, [lodr])


    const customStyles = {
        headCells: {
            style: {
                fontSize: '12px',
                fontWeight: '400',
                color: '#9B9B9B',
                fontFamily: 'Poppins',
            },
        },
        cells: {
            style: {
                color: '#292929',
                fontSize: '15px',
                fontWeight: '400',
                backgroundColor: '#fff',
                fontFamily: 'Poppins',
            },
        },
        headRow: {
            style: {
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '400',
                border: 'none !important'
            },
        },
    };

    const columns = [
        {
            name: 'Sr#',
            cell: (row, index) => index + 1,
            width: "240px",
        },
        {
            name: 'Provincia',
            selector: row => row.provinceName,
            sortable: true,
        },
        {
            name: 'Mosque Name',
            selector: row => row.name,
            sortable: true,
        },
        // {
        //     name: 'Role',
        //     selector: row => row.role,
        //     sortable: true,
        // },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <div className='actionContent'>
                    <img onClick={showMenu} className='img1' src="/assets/images/dashbord/action_btn.png" alt="" />
                    <div className="dropdown">
                        <div className="dropdown-content">
                            <Link to={`/mosques/edit-mosque/${row.mosqueId}`} >
                                <img className='dropMainIcon' src="/assets/images/icons/action_edit_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/edit_icon.png" alt="" />Edit</Link>
                            <Link to="" onClick={() => deleteMosqueHandle(row.mosqueId)}><img className='dropMainIcon' src="/assets/images/icons/action_delete_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/delete_icon.png" alt="" />Delete</Link>
                            <Link to={`/mosques/view-mosque/${row.mosqueId}`}><img className='dropMainIcon' src="/assets/images/icons/action_icon_view.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/view icon.png" alt="" />View</Link>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        }
    })

    const deleteMosqueHandle = async (id) => {
        swalWithBootstrapButtons.fire({
            // title: 'Are you sure?',
            text: "Are you sure, you want to delete Mosque ?",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: "deleteModal"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resp = await deleteMosque(id);

                setLodr(true);
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your file is safe :)',
                    'error'
                )
            }
        })
    }
    return (
        <div className='dashboardContainer'>
            <div className="dashboardHeading">
                <div><h2 className='mainh2'>Mosque Management</h2></div>
            </div>
            <div className="users-table">
                <div className="dataTableContainer">
                    <div className="user-table-head">
                        <Link to="/mosques/add-mosque" className="userHeading">
                            <button className='bttn'>Add Mosque</button>
                        </Link>
                        <div className="user-table-filter">
                            <input type="text" className='bttn_srch' placeholder='Search' />
                        </div>
                    </div>
                    <div className='user-table-body'>

                        {(lodr ? <Loader /> : <DataTable
                            columns={columns}
                            data={duaData}
                            customStyles={customStyles}
                            pagination
                            paginationServer
                            paginationTotalRows={totalRows}
                            onChangeRowsPerPage={handlePerRowsChange}
                            onChangePage={handlePageChange}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mosque