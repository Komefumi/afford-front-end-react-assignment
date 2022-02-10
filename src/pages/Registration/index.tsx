import { useState, useCallback, useEffect, useMemo, ChangeEvent } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  TextFieldProps,
  Typography,
  Grid,
  styled,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import { FullSizeInGridOfAllSizes as TextFieldFullWidth } from "@ui/InputFullWidth";
import { performRegistration } from "../../api";
import { PerformRegistrationStatusEnum as APIStatusEnum } from "../../types/api";
import { SetterFn } from "../../types/alias";

export default function RegistrationPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [formInvalidMessage, setFormInvalidMessage] = useState<string | null>(
    null
  );
  const [apiStatus, setApiStatus] = useState<APIStatusEnum>(
    APIStatusEnum.NEVER_PERFORMED
  );

  const formStatePieceList = useMemo(
    () => [firstName, lastName, email, password, passwordRepeat],
    [firstName, lastName, email, password, passwordRepeat]
  );

  const generateChangeHandler = useCallback((setter: SetterFn) => {
    return (evt: ChangeEvent<HTMLInputElement>) => {
      const { value } = evt.target;
      setter(value);
    };
  }, []);

  /*
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
   */

  const handleChange = (_event: ChangeEvent<HTMLInputElement>) => {};

  const submitForRegistration = useCallback(
    (evt: ChangeEvent<HTMLFormElement>) => {
      evt.preventDefault();
      const [firstName, lastName, email, password] = formStatePieceList;
      setApiStatus(APIStatusEnum.LOADING);
      performRegistration({ firstName, lastName, email, password })
        .then((data) => {
          console.log(data);
          setApiStatus(APIStatusEnum.SUCCEEDED);
        })
        .catch((error) => {
          console.error(error);
          setApiStatus(APIStatusEnum.ERRORED);
        });
    },
    [formStatePieceList]
  );

  // TODO: Use array of invalid messages

  useEffect(() => {
    const isAnyEmpty = formStatePieceList.some(
      (formStatePiece) => formStatePiece.length === 0
    );
    if (isAnyEmpty) {
      setFormInvalidMessage("All fields are required");
      return;
    }

    if (password !== passwordRepeat) {
      setFormInvalidMessage("Password and password repeated have to match");
      return;
    }

    setFormInvalidMessage(null);
  }, [formStatePieceList, setFormInvalidMessage]);

  const isFormValid = useMemo(
    () => formInvalidMessage === null,
    [formInvalidMessage]
  );

  const isSubmitable = useMemo(
    () => isFormValid && apiStatus !== APIStatusEnum.LOADING,
    [isFormValid, apiStatus]
  );

  return (
    <Container maxWidth="sm" sx={{ padding: 5 }}>
      <form onSubmit={submitForRegistration}>
        <Box sx={{ marginBottom: 5 }}>
          <Typography variant="h3" component="h1" color="primary">
            Register Here
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <TextFieldFullWidth
            type="text"
            name="lastName"
            label="First Name"
            placeholder="Your First Name..."
            value={firstName}
            onChange={generateChangeHandler(setFirstName)}
          />
          <TextFieldFullWidth
            type="text"
            name="lastName"
            label="Last Name"
            placeholder="Your Last Name..."
            value={lastName}
            onChange={generateChangeHandler(setLastName)}
          />
          <TextFieldFullWidth
            type="email"
            name="email"
            label="Email"
            placeholder="Your Email Address..."
            value={email}
            onChange={generateChangeHandler(setEmail)}
          />
          <TextFieldFullWidth
            type="password"
            name="password"
            label="Password"
            placeholder="Choose a strong password"
            value={password}
            onChange={generateChangeHandler(setPassword)}
          />
          <TextFieldFullWidth
            type="password"
            name="passwordRepeat"
            label="Repeat Password"
            placeholder="Ensure passwords match"
            value={passwordRepeat}
            onChange={generateChangeHandler(setPasswordRepeat)}
          />
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            startIcon={<SaveIcon />}
            variant="contained"
            color="primary"
            disabled={!isSubmitable}
          >
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
}
