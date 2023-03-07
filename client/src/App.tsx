import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "./components/from-input/form-input";
import { User } from "./models/user";
import { getData } from "./utils/data-utils";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res: User = await getData(
        "http://localhost:8000/login",
        email,
        password
      );
      setUser(res);
      resetFormFields();
    } catch (error) {
      alert("User sign in failed");
    }
  };

  const reload = () => {
    setUser(null);
    resetFormFields();
  };

  return (
    <div className="App-header">
      <h1>{user && `Welcome ${user.name}`}</h1>
      <div className="card">
        {/* <Logo className="logo" /> */}
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            name="email"
            value={email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            type="password"
            required
            name="password"
            value={password}
            onChange={handleChange}
          />
          <div className="button-group">
            <button type="submit">Sign In</button>
            <span>
              <button type="button" onClick={reload}>
                Clear
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
