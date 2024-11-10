import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import { useDebug } from "../../../Context/debug-context";

export const Navbar = () => {

    const { isDebugEnable, setDebugEnable } = useDebug()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button color="inherit" startIcon={<InfoIcon />}>ABOUT THE PROJECT</Button>
                        <Button color="inherit" startIcon={<DownloadIcon />}>PAPER</Button>
                        <Button color={
                            isDebugEnable ? "success" : "inherit"
                        } 
                        variant= {
                            isDebugEnable ? "contained": "text"
                        }
                        startIcon={<BugReportIcon />}
                        onClick={() => setDebugEnable(!isDebugEnable)}
                        >{ isDebugEnable ? "Deactivate" :"Activate"} DEBUG mode</Button>
                    </Box>
                    <Typography variant="h6" component="div" sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                        Pathfinder
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
