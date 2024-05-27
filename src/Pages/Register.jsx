import "../App.css";
import { Input } from "../components/TextInput/Input";
import { DateInput } from "../components/DateInput/DateInput";
import { Button } from "../components/LoginButton/LoginButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validators/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data) {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/-api/user",
        {
          username: data.username,
          password: data.password,
          city: data.city,
          state: data.state,
          yearOfBirth: data.yearOfBirth,
        }
      );
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main">
      <div className="register_container">
        <img src="/movie.svg" alt="movie" className="img_login" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sign Up</h2>
          <Input
            placeholder={"Username"}
            type="text"
            error={errors.username}
            input={register("username")}
          />
          <Input
            placeholder={"Password"}
            type="password"
            error={errors.password}
            input={register("password")}
          />
          <Input
            placeholder={"Confim Password"}
            type="password"
            error={errors.confirmPassword}
            input={register("confirmPassword")}
          />
          <DateInput
            error={errors.yearOfBirth}
            input={register("yearOfBirth")}
          />
          <Input
            placeholder={"City"}
            type="text"
            error={errors.city}
            input={register("city")}
          />
          <Input
            placeholder={"Province"}
            type="text"
            error={errors.state}
            input={register("state")}
          />
          <Button text="Create an account" />
          <p>
            Already have an account?
            <span className="link_span" onClick={() => navigate("/")}>
              {" "}
              Login
            </span>
          </p>
        </form>
      </div>
    </main>
  );
}
