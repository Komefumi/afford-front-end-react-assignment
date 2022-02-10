import { TextField, TextFieldProps, Grid, styled } from "@mui/material";

const TEXTFIELD = "TEXTFIELD";

const classes = {
  root: `${TEXTFIELD}-root`,
  content: `${TEXTFIELD}-content`,
  cta: `${TEXTFIELD}-cta`,
};

const TextFieldFullWidthStyled = styled(TextField)(() => ({
  [`&.${classes.root}`]: {
    display: "block",
    width: "100%",
    margin: "10px 0",
  },
}));

export default function TextFieldFullWidth(props: TextFieldProps) {
  return (
    <Grid item xs={12}>
      <TextFieldFullWidthStyled
        className={classes.root}
        fullWidth
        {...props}
      />
    </Grid>
  );
}

export function FullSizeInGridOfAllSizes(props: TextFieldProps) {
  return (
    <Grid item xs={12}>
      <TextFieldFullWidth {...props} />
    </Grid>
  );
}
