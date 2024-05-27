import "../App.css";
import { Input } from "../components/TextInput/Input";
import { Button } from "../components/LoginButton/LoginButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validators/validationSchemas";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data) {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/-api/login",
        data
      );

      if (response.status === 200) {
        Cookies.set("access_token", response.data.accessToken);
        Cookies.set("refresh_token", response.data.refreshToken);
        sessionStorage.setItem("username", response.data.username);
        sessionStorage.setItem("id", response.data.id);
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("path", "/home");
        sessionStorage.setItem("city", response.data.city);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading("false");
    }
  }

  const navigate = useNavigate();
  return (
    <main className="main">
      <div className="login_container">
        <img src="/movie.svg" alt="movie" className="img_login" />
        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>

          <Input
            placeholder="Username"
            type="text"
            error={errors.username}
            input={register("username")}
          />
          <Input
            placeholder="Password"
            type="password"
            input={register("password")}
            error={errors.password}
          />
          <Button text="Login to your account" loading={isLoading} />
          <p>
            Don’t have an account?{" "}
            <span className="link_span" onClick={() => navigate("/register")}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </main>
  );
}
