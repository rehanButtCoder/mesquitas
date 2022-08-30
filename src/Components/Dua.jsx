import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { deleteDua, getDua } from '../Services/Dua';
import Loader from './Loader';


const Dua = () => {

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
        const resp = await getDua({
            pageNumber: page,
            pageSize: perPage
        });
        // console.log(resp)
        setDuaData(resp.data.data.duas)
        setTotalRows(resp.data.data.total)
        setLodr(false);
    }

    const handlePageChange = (page) => {
        // debugger
        getDuaFunc(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        // debugger
        const response = await getDua({ pageNumber: page, pageSize: newPerPage });
        setDuaData(response.data.data.duas);
        setPerPage(newPerPage);
    };

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

    // const { id } = useParams() ;
    const columns = [
        {
            name: 'Sr#',
            cell: (row, index) => index + 1,
            width: "278px",
        },
        {
            name: 'Dua Name',
            selector: row => row.name,
            sortable: true,
        },
        // {
        //     name: 'Dua Type',
        //     selector: row => row.type,
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
                            <Link to={`/duas/edit-dua/${row.duaId}`}>
                                <img className='dropMainIcon' src="/assets/images/icons/action_edit_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/edit_icon.png" alt="" />Edit</Link>
                            <Link to='' onClick={() => deleteduaHandle(row.duaId)}><img className='dropMainIcon' src="/assets/images/icons/action_delete_icon.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/delete_icon.png" alt="" />Delete</Link>
                            <Link to={`/duas/view-dua/${row.duaId}`}><img className='dropMainIcon' src="/assets/images/icons/action_icon_view.svg" alt="" /><img className='dropMainIcon2' src="/assets/images/white_icon/view icon.png" alt="" />View</Link>
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
    useEffect(() => {
        getDuaFunc(1)
        // debugger
    }, [lodr])

    const deleteduaHandle = async (id) => {
        swalWithBootstrapButtons.fire({
            // title: 'Are you sure?',
            text: "Are you sure, you want to delete Dua ?",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
            customClass: "deleteModal"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resp = await deleteDua(id);

                setLodr(true);
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    return (
        <div className='dashboardContainer'>
            <div className="dashboardHeading">
                <div><h2 className='mainh2'>Duas Management</h2></div>
            </div>
            <div className="users-table">
                <div className="dataTableContainer">
                    <div className="user-table-head">
                        <Link to="/duas/add-dua" className="userHeading">
                            <button className='bttn'>Add Dua's</button>
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

export default Dua