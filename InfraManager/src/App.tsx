import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef,GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from "axios";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'



interface droplet{
  id : string,
  name:string,
  status:string
}


const columns: GridColDef<any>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Resource_Name',
    width: 150,
    
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    
  },
  {
    field: 'Button',
    headerName: 'Actions',
    renderCell: (params) => (
      <div >
        <Button variant="contained" style={{ margin:'5px'}} onClick={(e)=>{axios.post(`https://inframanager.onrender.com/SpoolUp/${params.id}`)}}>Turn On</Button>
        <Button variant="contained" onClick={(e)=>{axios.post(`https://inframanager.onrender.com/SpoolDown/${params.id}`)}}>Turn Off</Button>
      </div>
      
    ),
    width: 225
  
    
  },
  
  
];
 
 
 


export default function DataGridDemo() {
  const [reset,setReset]=useState<boolean>(false)
  const [rows, setRows] = useState<droplet[]>([]);


  // Fetch data from the API
  const fetchData = () => {
    console.log('API call triggered');
    axios
      .get<{ droplets: droplet[] }>("https://inframanager.onrender.com/GetAll")
      .then((response) => {
        const droplets = response.data.droplets;

        // Transform data if needed (e.g., adding status)
        const data = droplets.map((droplet) => ({
          ...droplet,
        }));

        // Update state
        setRows(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();

  }, []); 

  return (
    <>
    <h1 style={{textAlign:'center'}}>InfraManager V0.1</h1>
    <SignedOut>
      <SignInButton>
        Please sign in with your credentials to Access InfraManager V0.1
      </SignInButton>
    </SignedOut>
    <SignedIn>
      
      <div style={{alignItems:'center',justifyContent:'center'}}>
            
            <Button onClick={e=>{window.location.reload()}}>Reset</Button>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5,50,100]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
          </div>
          </SignedIn>
    </>
    
    
    
    
  );
}
