import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 0, width: '100%' }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            InfraManager
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Add spacing for content below the AppBar */}
      <Box sx={{ height: 50 }} /> {/* Adjust height based on the AppBar size */}
    </Box>
  );
}