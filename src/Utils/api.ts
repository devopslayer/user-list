import { User } from "../components/UserList/UserList";

export const fetchUsers = async (): Promise<User> => {
  const response = await fetch(
    "https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e"
  );
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};
