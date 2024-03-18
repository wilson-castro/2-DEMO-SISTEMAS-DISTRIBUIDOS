import { useEffect, useState } from 'react'
import { Box, Container, Paper, Typography } from '@mui/material'
import CustomPaginationActionsTable from './components/Table'
import { ILog } from './types/IData'

function App() {
  const [logs, setLogs] = useState<ILog[]>([]);

  const getLogs = () => {
    fetch('http://localhost:5000/armazenar', {
      mode: 'cors',
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const body = await response.json() as { [key: string]: string | object }[];
        const mapped = body.map((log) => { 
          return { ...log, data: JSON.stringify(log.data) };
        });
        const data = mapped as ILog[];
        setLogs(data);
      }).catch((error) => { 
        console.error("Error: ", error)
      });
  };

  useEffect(() => {
      getLogs();
      const interval = setInterval(() => {
        getLogs(); 
      }, 5000);
      return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Box mt="10rem">
        <Paper elevation={6}>
          <Box bgcolor="#263d74" p="8px" sx={{ borderRadius: "8px 0"}}>
            <Typography variant="h5" color="#e7eaf2">
              🗂️ Logs de Requisições
            </Typography>
          </Box>
          <Box mt="10px"p="20px">
            <CustomPaginationActionsTable data={logs} />
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default App
