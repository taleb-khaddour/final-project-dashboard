import MUIDataTable from 'mui-datatables'
// import '../../components/tabel.css'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import EditMenu from './editMenu/index'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import logo from "../../../public/Assets/Logo-final.png"

import AddMenu from './addMenu'
import { Navigate } from 'react-router-dom'

export default function Menu() {
  const [Type, setType] = useState('')

  const handleChange = (event) => {
    setType(event.target.value)
  }

  const [Data, setData] = useState(null)
  const [DataById, setDataById] = useState({
    name: '',
    description: '',
    size: '',
    image: '',
    price: '',
  })

  const [DataPost, SetPostData] = useState({
    name: '',
  })
  const [DataEdit, SetEditData] = useState(null)
  const [Id, setId] = useState()

  // const show = () => {
  //   var ele = document.querySelector(".none");
  //   ele.classList.toggle("form-add-Menu");
  // };
  const [visibleAdd, isShowAdd] = useState(false)
  const [visibleEdit, isShowEdit] = useState(false)
  const [iconEdit, isShowIcon] = useState(true)
  const [iconAdd, isShowIconAdd] = useState(true)

  const showAdd = () => {
    if (visibleAdd === false) {
      isShowAdd(true)
    } else {
      isShowAdd(false)
    }
  }

  const showEdit = () => {
    if (visibleEdit === false) {
      isShowEdit(true)
    } else {
      isShowEdit(false)
    }
  }

  const showicon = () => {
    iconEdit ? isShowIcon(false) : isShowIcon(true)
  }
  const showiconAdd = () => {
    iconAdd ? isShowIconAdd(false) : isShowIconAdd(true)
  }

  const options = {
    filterType: 'checkbox',
    responsive: 'simple',
    selectableRows: 'none',
    search: true,
    searchPlaceholder: 'Search for Income',
    download: true,
    print: true,
    pagination: true,
    rowsPerPage: 5,
    loaded: true,
    rowsPerPageOptions: [5],
  }

  const columns = [
    {
      name: '_id',
      label: ' ',
      options: {
        display: 'none',
      },
    },
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'description',
      label: 'Description',
    },
    {
      name: 'size',
      label: 'Size',
    },
    {
      name: 'image',
      label: 'Picture',
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <img
                src={data}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '150px' }}
              />
            </>
          )
        },
      },
    },
    {
      name: 'price',
      label: 'Price',
    },
    {
      name: 'category_id',
      label: 'category',
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <span>{data.name}</span>
            </>
          )
        },
      },
    },

    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ display: 'flex' }}>
              {iconEdit && (
                <Button
                  sx={{ height: '40px' }}
                  onClick={() => {
                    axios
                      .get(
                        `https://idecream-backend.onrender.com/api/subCategory/${tableMeta.rowData[0]}`,
                      )
                      .then((response) => {
                        setDataById(response.data.data)
                        setId(tableMeta.rowData[0])
                        console.log('getbyId', response.data.data)
                        showEdit()
                      })
                      .catch((err) => {
                        console.log(err.message)
                      })
                  }}
                >
                  <AiFillEdit />
                </Button>
              )}
              <Button
                sx={{ height: '40px' }}
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#447695',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      axios
                        .delete(
                          `https://idecream-backend.onrender.com/api/subCategory/${tableMeta.rowData[0]}`,
                        )
                        .then((response) => {
                          Swal.fire({
                            icon: 'success',
                            title: 'Your data has been deleted',
                            showConfirmButton: false,
                            timer: 1500,
                          })
                          // window.location.reload()
                        })
                        .catch((err) => {
                          Swal.fire({
                            icon: 'error',
                            title: 'Your data not deleted deleted',
                            showConfirmButton: false,
                            timer: 1500,
                          })
                          console.log(err)
                        })
                    }
                  })
                }}
              >
                <MdDelete />
              </Button>
            </div>
          )
        },
      },
    },
  ]

  const getData = () => {
    axios
      .get(`https://idecream-backend.onrender.com/api/subCategory`)
      .then((response) => {
        console.log(response.data)
        setData(response.data)
        setFormPopUp(false)

        isShowEdit(false)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const handelChangePost = (e) => {
    const value = e.target.value
    SetPostData({
      ...DataPost,
      [e.target.name]: value,
    })
  }

  const EditData = () => {
    axios
      .patch(
        `https://idecream-backend.onrender.com/api/subCategory/${Id}`,
        DataEdit,
      )
      .then((res) => {
        console.log(res)
        toast.success('updated successfully!')

        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handelChangeEdit = (e) => {
    const value = e.target.value
    SetEditData({
      ...DataEdit,
      [e.target.name]: value,
    })
  }

  const [formPopUp, setFormPopUp] = useState(false)

  const ShowPopUp = () => {
    setFormPopUp(!formPopUp)
  }

  if (!Data) return 'wait'
  return (
    <div className="incomss">
      {visibleEdit && (
        <EditMenu allData={DataById} getData={getData} showEdit={showEdit} />
      )}

      <div className="income_table">
        <div className="table_mui">
          <MUIDataTable
            columns={columns}
            data={Data}
            options={options}
            title={
              iconAdd && (
                <Button
                  onClick={() => {
                    ShowPopUp()
                  }}
                >
                  + Add Menu
                </Button>
              )
            }
          />
          <ToastContainer />
        </div>
      </div>
      {formPopUp && <AddMenu ShowPopUp={ShowPopUp} getData={getData} />}
    </div>
  )
}

// export default function Menu() {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     axios
//       .get(`http://localhost:4001/api/subCategory`)
//       .then((response) => {
//         console.log(response);
//         setData(response.data.docs);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   if (!data) return "wait";
