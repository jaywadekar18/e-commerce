import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { getUserData, deleteUserDataById, updateUserData } from '../../../slices/usersSlice'



const columns = [
    { field: '_id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 290 },
    { field: 'role', headerName: 'Role', width: 130 },
    { field: 'email', headerName: 'Email', width: 120 },

];
export default function DataGridDemo({ data }) {
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteButton, setDeleteButton] = useState(true);
    const [editButton, setEditButton] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const users = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getUserData());

    }, [ ])

    

    async function deleteHandler() {
        const result = window.confirm(`Do you want to delete ${selectedRow.name}`);
        if (result) {
           await dispatch(deleteUserDataById(selectedRow._id));
           await dispatch(getUserData());
            setDeleteButton(true);
            //alert('Data deleted!!')
        }
    }
    function editHandler() {
        setOpenDialog(true)
    }
    function dialogCloseHandler() {
        setOpenDialog(false)
    }

     async function onSubmit(data) {
        console.log(data);
        const _id = selectedRow._id;
        const newData = { ...data, _id: _id };
        await dispatch(updateUserData(newData));
        await dispatch(getUserData());
        setOpenDialog(false);
    }
    return (
        <div style={{ height: 500, width: '100%' }}>
            {selectedRow && <Dialog open={openDialog} onClose={dialogCloseHandler} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            variant="outlined"
                            margin="normal"

                            inputRef={register()}
                            defaultValue={selectedRow.name}
                            fullWidth
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                       

                        <TextField
                            variant="outlined"
                            margin="normal"

                            inputRef={register()}
                            defaultValue={selectedRow.role}
                            fullWidth
                            label="Role"
                            name="role"
                            autoComplete="price"
                            autoFocus
                        />
 
                        <TextField
                            variant="outlined"
                            margin="normal"

                            inputRef={register()}
                            defaultValue={selectedRow.email}
                            fullWidth
                            label="Email"
                            name="email"
                            autoComplete="countInStock"
                            autoFocus
                        />
 

                        <Button type='submit' color="primary">Submit</Button>
                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogCloseHandler} color="primary">Cancel</Button>

                </DialogActions>
            </Dialog>

            }
            <Button color='primary' variant='contained' disabled={deleteButton} onClick={deleteHandler}>Delete</Button>

            <Button color='primary' variant='contained' disabled={editButton} onClick={editHandler}>Edit</Button>


            {
                users.status === 'pending' ? (<p>loading...</p>) :
                    users.error ? (<p>{users.error}</p>) :
                        users.data &&
                        <DataGrid getRowId={(row) => row._id} rows={users.data} columns={columns} pageSize={5}
                            onRowSelected={(row) => { setSelectedRow(row.data); setDeleteButton(null); setEditButton(null) }} />
            }
        </div>
    );
}
