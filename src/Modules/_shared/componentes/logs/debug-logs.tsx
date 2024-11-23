import { Box, IconButton, Typography } from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { DebugTerminalModal } from "./debug-terminal-modal";
import { useState } from "react";
import { useDebug } from "../../../../Context/debug-context";

export const DebugLogs: React.FC = () => {

    const [openModal, setOpenModal] = useState(false);
    const { statusLog } = useDebug()

    const handleExpand = () => {
      setOpenModal(true)
    };
  
    const handleClose = () => {
      setOpenModal(false)
    };
  
    return (
      <Box
        sx={{
          height: '90%',
          width: '100%',
          backgroundColor: '#121212', 
          padding: '1rem',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflowY: 'auto',
          fontFamily: '"Courier New", Courier, monospace',
          position: 'relative',
        }}
      >

        <IconButton
          onClick={handleExpand}
          sx={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: '#fff', 
          }}
        >
          <OpenInFullIcon />
        </IconButton>
  
        <Typography variant="h5" sx={{ color: '#fff', marginBottom: '1rem' }}>
          DEBUG
        </Typography>
  
        <Typography variant="body1" sx={{ color: '#00FF00', whiteSpace: 'pre-wrap' }}>
          {
            statusLog.map(log => (
              <>
                {"\n>"+ log}
              </>
            ))
          }
        </Typography>
  
        <DebugTerminalModal open={openModal} onClose={handleClose} />
      </Box>
    );
}