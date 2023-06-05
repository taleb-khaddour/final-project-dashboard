import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import { Button } from '@mui/material';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@mui/material';
import Loding from "../loading/loading.js";



export default function Menu() {
  const [Type, setType] = useState('')
  const [Data, setData] = useState(null);
  const [DataById, setDataById] = useState({
    name: '',
    description: '',
  });
  const [DataPost, setDataPost] = useState({
    name: '',
    description: '',

  });
  const [DataEdit, setDataEdit] = useState(null);
  const [Id, setId] = useState(null);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [iconEdit, setIconEdit] = useState(true);
  const [iconAdd, setIconAdd] = useState(true);
  const [formPopUp, setFormPopUp] = useState(false);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const showAdd = () => {
    setVisibleAdd(!visibleAdd);
  };

  const showEdit = () => {
    setVisibleEdit(!visibleEdit);
  };

  const showicon = () => {
    setIconEdit(!iconEdit);
  };

  const showiconAdd = () => {
    setIconAdd(!iconAdd);
  };

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
  };

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
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ display: 'flex' }}>
             
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
                          `https://idecream-backend.onrender.com/api/suggestion/${tableMeta.rowData[0]}`,
                        )
                        .then((response) => {
                          Swal.fire({
                            icon: 'success',
                            title: 'Your data has been deleted',
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          getData();
                        })
                        .catch((err) => {
                          Swal.fire({
                            icon: 'error',
                            title: 'Your data could not be deleted',
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          console.log(err);
                        });
                    }
                  });
                }}
              >
                <MdDelete />
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const getData = () => {
    axios
      .get(`https://idecream-backend.onrender.com/api/suggestion`)
      .then((response) => {
        console.log(response.data);
        setData(response.data.docs);
        setFormPopUp(false);
        setVisibleEdit(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handelChangePost = (e) => {
    const value = e.target.value;
    setDataPost({
      ...DataPost,
      [e.target.name]: value,
    });
  };

  const EditData = () => {
    axios
      .patch(
        `https://idecream-backend.onrender.com/api/suggestion/${Id}`,
        DataEdit,
      )
      .then((res) => {
        console.log(res);
        toast.success('Updated successfully!');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelChangeEdit = (e) => {
    const value = e.target.value;
    setDataEdit({
      ...DataEdit,
      [e.target.name]: value,
    });
  };

  const ShowPopUp = () => {
    setFormPopUp(!formPopUp);
  };

  if (!Data) return <Box
  sx={{
    width: "100%",
    height: "70vh",
    display: "grid",
    placeItems: "center",
  }}
>
  <Loding />
</Box>;

  return (
    <div className="incomss">
    

      <div className="income_table">
        <div className="table_mui">
          <MUIDataTable
            columns={columns}
            data={Data}
            options={options}
            
          />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
