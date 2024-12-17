import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef,GridSlotProps,GridSlotsComponentsProps,GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from "axios";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'



interface droplet{
  id : string,
  name:string,
  status:string
}

declare module '@mui/x-data-grid' {
  interface FooterPropsOverrides {
    status: string;
  }
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
    renderCell : params=>{
      var status='off'
      if(params.value==='active'){
        status='active'
      }
      console.log(params.value)
      return(
        
        <Chip
        label={status === 'active' ? 'on' : 'off'} // Set label
        color={status === 'active' ? 'success' : 'error'} // Use MUI's built-in colors
        variant="outlined"
      />      )
      
    }
    
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
 
 
export function CustomFooterStatusComponent(
  props: NonNullable<GridSlotsComponentsProps['footer']>,
) {
  return (
    <Box sx={{ p: 1, display: 'flex' }}>
      <FiberManualRecordIcon
        fontSize="small"
        sx={{
          mr: 1,
          color: props.status === 'connected' ? '#4caf50' : '#d9182e',
        }}
      />
      Status {props.status}
    </Box>
  );
}


export default function DataGridDemo() {
  const [reset,setReset]=useState<boolean>(false)
  const [rows, setRows] = useState<droplet[]>([]);
  const [status,setStatus]=useState('disconnected')
  const [loading,setLoading]=useState<boolean>(true)

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
        setLoading(false)
        setStatus('connected')
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();

  }, []); 

  function EditToolbar(props: GridSlotProps['toolbar']) {  
    
  
    return (
      
      <GridToolbarContainer>
                <Actions/>

        <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export data' },
          button: { variant: 'outlined' },
        }}
      />
        <Button color="primary" title='Reset'  onClick={()=>{window.location.reload()}}>
          <RestartAltIcon/>
        </Button>
      </GridToolbarContainer>
    );
  }
  
 

  return (
    <>
    
    <SignedOut>
      <div style={{textAlign:'center'}}>
      <SignInButton>
        Please sign in with your credentials to Access InfraManager V0.1
      </SignInButton>
    </SignedOut>
    <SignedIn>
      <ResponsiveAppBar></ResponsiveAppBar>
      
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
