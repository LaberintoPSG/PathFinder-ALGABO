import { Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDebug } from "../../../../Context/debug-context";

interface DebugTerminalModalProps {
    open: boolean;
    onClose: () => void;
  }


export const DebugTerminalModal: React.FC<DebugTerminalModalProps> = ({open,onClose}) => {

  const { statusLog } = useDebug()

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
          <DialogContent
            sx={{
              backgroundColor: '#121212',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              fontFamily: '"Courier New", Courier, monospace',
              color: '#00FF00',
              height: '100vh',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                color: '#fff'
              }}
            >
              <CloseIcon />
            </IconButton>
    
            <Typography variant="h4" sx={{ color: '#fff', marginBottom: '1rem' }}>
              DEBUG OUTPUT (Full Screen)
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {
              statusLog.map(log => (
                <>
                  {"\n>"+ log}
                </>
              ))
              }
            </Typography>
          </DialogContent>
        </Dialog>
      );
}