import Swal from 'sweetalert2'
import "../../tabel.css";
import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Button } from '@mui/material'
import "../../tabel.css"
import axios from 'axios'
import '../../tabel.css'
const AddMenu = (props) => {
  const [post, setPost] = useState({
    name: '',
    size: '',
    price: '',
    description: '',
    category_id: '',
  })
  const [selectedFile, setSelectedFile] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }

  const handleFileInputChange = (e) => {
    e.preventDefault();
    let image = e.target.files[0];
    setSelectedFile(image);
  }

  const handleSubmit = async () => {
    try {
      const fd = new FormData()
      fd.append('image', selectedFile, selectedFile.name)
      let res = await axios.post(
        'https://api.imgbb.com/1/upload?key=e8e95c55c5edb874d3bcd7d4974724e4',
        fd,
      )
      const allData = {
        name: post.name,
        size: post.size,
        price: post.price,
        description: post.description,
        category_id: post.category_id,
        image: res.data.data.display_url,
      }
      let response = await axios.post(
        'https://idecream-backend.onrender.com/api/subCategory',
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
          <h1>Add Product</h1>
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

            <TextField
              id="outlined-multiline-flexible"
              label="Size"
              multiline
              maxRows={4}
              name="size"
              onChange={handleChange}
              value={post.size}
            />
          </div>
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            name="description"
            value={post.description}
            onChange={handleChange}
          />

          <TextField
            id="outlined-multiline-flexible"
            label="Price"
            multiline
            maxRows={4}
            name="price"
            value={post.price}
            onChange={handleChange}
          />
          <input
            type="file"
            id="myfile"
            name="image"
            onChange={handleFileInputChange}
            className="select"
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
                name="category_id"
              >
                <MenuItem value="645d5a9e09113ff70a5d2cd7">Ice Cream</MenuItem>
                <MenuItem value="645d5aac09113ff70a5d2cd9">Cold Drink</MenuItem>
                <MenuItem value="645d5aba09113ff70a5d2cdb">Hot Derink</MenuItem>
              </Select>
            </FormControl>
          </Box>
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