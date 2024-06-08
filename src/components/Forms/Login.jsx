import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormGroup } from "../FormGroup/FormGroup";
import { useForm } from "react-hook-form";
export function Login() {
  const { signInWithGoogle, signIn } = useAuth();
  const axiosCommon = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    const { email, password } = data;
    try {
      await signIn(email, password);
      toast.success("Login Successfully");
      reset();
      navigate(location.state || "/");
    } catch (_) {
      toast.error("Failed to login");
    }
  }
  async function handleSignin() {
    try {
      const {
        user: { email, displayName },
      } = await signInWithGoogle();
      await axiosCommon.post("/user", { email, name: displayName });
      navigate(location.state || "/");
      toast.success("Login Successfully");
    } catch (_) {
      toast.success("Welcome back!");
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen bg_login">
      <div className="md:w-1/3 bg-black h-3/5 flex flex-col justify-evenly p-5 rounded-lg">
        <div className="flex justify-center">
          <button
            onClick={handleSignin}
            className="space-x-2 flex justify-center items-center w-full btn_login p-3 text-xl"
          >
            <FcGoogle />
            <span className="text-white">Continue with Google</span>
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormGroup errorMessage={errors?.email?.message}>
            <input
              className="bg-black p-3  border block w-full text-white"
              type="text"
              placeholder="email"
              {...register("email", {
                required: { value: true, message: "Required" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </FormGroup>
          <FormGroup errorMessage={errors?.password?.message}>
            <input
              className="bg-black p-3  border block w-full text-white"
              type="text"
              placeholder="password"
              {...register("password", {
                required: { value: true, message: "Required" },
                minLength: {
                  value: 6,
                  message: "Password must be 6 character long ",
                },
                validate: {
                  hasUpperCaseCharacter: (value) => {
                    if (!value.match(/[A-Z]/)) {
                      return "Include at least 1 uppercase letter";
                    }
                  },
                  hasSpecialCharacter: (value) => {
                    if (!value.match(/[!@#$%^&*(),.?":{}|<>]/)) {
                      return "Include a special character like [!@#$%^&*(),.? ...";
                    }
                  },
                  hasNumericCharacter: (value) => {
                    if (!value.match(/[0-9]/)) {
                      return "Include a numeric character";
                    }
                  },
                },
              })}
            />
          </FormGroup>
          <button className="text-white p-2 w-full border hover:bg-white hover:text-black transition duration-150 ease-out">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}