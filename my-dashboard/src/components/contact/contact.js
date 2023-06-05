import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loding from "../loading/loading.js";
import { Box } from "@mui/material";

export default function Menu() {
  const [Type, setType] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const [Data, setData] = useState(null);

  const [DataPost, SetPostData] = useState({
    name: "",
  });
  const [DataEdit, SetEditData] = useState(null);

  const options = {
    filterType: "checkbox",
    responsive: "simple",
    selectableRows: "none",
    search: true,
    searchPlaceholder: "Search for Income",
    download: true,
    print: true,
    pagination: true,
    rowsPerPage: 5,
    loaded: true,
    rowsPerPageOptions: [5],
  };

  const columns = [
    {
      name: "_id",
      label: " ",
      options: {
        display: "none",
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "message",
      label: "Message",
    },

    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ display: "flex" }}>
              <Button
                sx={{ height: "40px" }}
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#447695",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      axios
                        .delete(
                          `https://idecream-backend.onrender.com/api/contact/${tableMeta.rowData[0]}`
                        )
                        .then((response) => {
                          Swal.fire({
                            icon: "success",
                            title: "Your data has been deleted",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          // window.location.reload()
                        })
                        .catch((err) => {
                          Swal.fire({
                            icon: "error",
                            title: "Your data not deleted deleted",
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
      .get(`https://idecream-backend.onrender.com/api/contact`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
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
    SetPostData({
      ...DataPost,
      [e.target.name]: value,
    });
  };

  const handelChangeEdit = (e) => {
    const value = e.target.value;
    SetEditData({
      ...DataEdit,
      [e.target.name]: value,
    });
  };

  if (!Data)
    return (
      <Box
        sx={{
          width: "100%",
          height: "70vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Loding />
      </Box>
    );
  return (
    <div className="incomss">
      <div className="income_table">
        <div className="table_mui">
          <MUIDataTable columns={columns} data={Data} options={options} />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
