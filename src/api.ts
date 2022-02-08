import { BASE_URL } from "./config";
import { APIPerformRegistrationInterface } from "./types/api";

function fetchHelper(
  url: string,
  method: "GET" | "POST",
  body?: Record<string, unknown>
) {
  // TODO: Throw if body not provided when POST request
  const fetchOptions = {
    method,
    body: method === "POST" ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, fetchOptions).then((res) => res.json());
}

export function performRegistration({
  firstName,
  lastName,
  email,
  password,
}: APIPerformRegistrationInterface) {
  const body = { firstName, lastName, email, password };
  return fetchHelper(`${BASE_URL}/signup`, "POST", body);
}
