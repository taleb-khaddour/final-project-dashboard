import Swal from 'sweetalert2'
import "../../tabel.css";
import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '@mui/material'
import axios from 'axios'

const AddMenu = (props) => {
  const [post, setPost] = useState({
    name: '',
  })
 

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }

 
  const handleSubmit = async () => {
    try {
      const allData = {
        name: post.name,
      }
      let response = await axios.post(
        'https://idecream-backend.onrender.com/api/category',
        allData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      Swal.fire(
        'Added !',
        'You Add new data!',
        'success'
      )
      
      props.getData()
    } catch (error) {
      console.log(error)
     

    }
  }

  return (
    // if(!data) return <Loading />;
    <div className="back-form">
      <div className="form-submit">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1.5, width: '27ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <h1>Add Category</h1>
          <div className="row-form1">
            <TextField
              id="outlined-multiline-flexible"
              label="Name"
              multiline
              name="name"
              onChange={handleChange}
              maxRows={4}
              value={post.name}
            />
          </div>
        </Box>
        <br />

        <div className="button-block">
          <Button variant="contained" color="error" onClick={props.ShowPopUp} >
            {' '}
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            {' '}
            submit
          </Button>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default AddMenu

// axios
// .patch(`https://idecream-backend.onrender.com/api/subCategory/${props.allData._id}`, newMenu)
// .then((response) => {
//   toast.success("Product updated successfully");
//   window.location.reload();
// })
// .catch((err) => {
//   toast.error("Product not updated ");
// });
// };