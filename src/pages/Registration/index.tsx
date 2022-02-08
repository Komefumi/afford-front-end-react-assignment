import { useState, useCallback, useEffect, useMemo, ChangeEvent } from "react";
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
    <div>
      <form onSubmit={submitForRegistration}>
        <div>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={generateChangeHandler(setFirstName)}
          />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={generateChangeHandler(setLastName)}
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={generateChangeHandler(setEmail)}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={generateChangeHandler(setPassword)}
          />
          <input
            type="password"
            name="passwordRepeat"
            value={passwordRepeat}
            onChange={generateChangeHandler(setPasswordRepeat)}
          />
        </div>
        <div>
          <button disabled={!isSubmitable} className="reg-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
