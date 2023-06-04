import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditCategory = (props) => {
  const [post, setPost] = useState({
    name: props.allData.name,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        name: post.name,
      };

      await axios.put(
        `https://idecream-backend.onrender.com/api/category/${props.allData._id}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      Swal.fire('Updated!', 'You updated the data!', 'success');

      props.getData();
      console(props.getData())
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          <h1>Edit Category</h1>
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
          <Button variant="contained" color="error" onClick={props.ShowPopUp}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
