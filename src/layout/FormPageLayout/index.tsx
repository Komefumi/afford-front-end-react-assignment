import { ReactNode } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";

interface Props {
  title: string;
  children: ReactNode;
  onSubmit: (...args: any) => {};
}

export default function FormPageLayout({ title, onSubmit, children }: Props) {
  <Container maxWidth="sm" sx={{ padding: 5 }}>
    <Box >
    </Box>
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        
      </Grid>
    </form>
  </Container>
}
