import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import CompareIcon from '@mui/icons-material/Compare';
import { useDebug } from "../../../Context/debug-context";

export const Navbar = () => {

    const { isDebugEnable, setDebugEnable } = useDebug()

    const aboutPdf = () => {
        const pdfUrl = 'assets/PATHFINDER.pdf';
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'pathfinder_about.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const aboutPaper = () => {
        const pdfUrl = 'assets/paper.pdf';
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'paper_pathfinder.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button color="inherit" startIcon={<InfoIcon />} onClick={aboutPdf}>ABOUT THE PROJECT</Button>
                        <Button color="inherit" startIcon={<DownloadIcon />} onClick={aboutPaper}>PAPER</Button>
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
