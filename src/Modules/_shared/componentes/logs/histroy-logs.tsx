import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { useHistory } from "../../../../Context/history-logs-context"

export const Logs: React.FC = () => {

    const { historyAlgorithms } = useHistory()
    
    return (
        <Box sx={{ height: '90%', width: '100%', marginLeft: '2rem' }}>
          <Typography variant="h4" gutterBottom>
            History
          </Typography>
          {historyAlgorithms.map((e, index) => (
            <Card key={index} sx={{ marginBottom: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Algorithm: {e.algorithmName}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Total Nodes: {e.totalNodes}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Nodes Visited: {e.visitedNodes}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Path Length: {e.pathNodes}
                </Typography>
                {e.algorithmName === 'A*' && (
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    Heuristic: {e.heuristic}
                  </Typography>
                )}
              </CardContent>
              <Divider />
            </Card>
          ))}
        </Box>
      );
}