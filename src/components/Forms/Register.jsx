import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FormGroup } from "../FormGroup/FormGroup";
import { useNavigate } from "react-router-dom";

export function Register() {
  const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
  const axiosCommon = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(incomingData) {
    const { email: userEmail, name, password, image } = incomingData;
    const formData = new FormData();
    formData.append("image", image[0]);
    try {
      const {
        user: { email },
      } = await createUser(userEmail, password);
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`,
        formData
      );
      const { display_url } = data.data;
      await updateUserProfile(name, display_url);
      await axiosCommon.post("/user", { email, name });
      toast.success("Created Successfully");
      navigate("/");
    } catch (_) {
      toast.error("Already exist. Failed to create.");
    }
  }
  async function handleSignin() {
    try {
      const {
        user: { email, displayName },
      } = await signInWithGoogle();
      await axiosCommon.post("/user", { email, name: displayName });
      navigate("/");
      toast.success("Login Successfully");
    } catch (_) {
      navigate("/");
      toast.success("Welcome back!");
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen bg_login">
      <div className="md:w-1/3 bg-black flex flex-col justify-evenly p-5 rounded-lg">
        <div className="flex justify-center mb-3">
          <button
            onClick={handleSignin}
            className="space-x-2 flex justify-center items-center w-full btn_login p-3 text-xl"
          >
            <FcGoogle />
            <span className="text-white">Continue with Google</span>
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormGroup errorMessage={errors?.name?.message}>
            <input
              className="bg-black p-3  border block w-full text-white"
              type="text"
              placeholder="name"
              {...register("name", {
                required: { value: true, message: "Required" },
              })}
            />
          </FormGroup>
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
          <FormGroup errorMessage={errors?.image?.message}>
            <input
              className="p-1  border block w-full text-white"
              name="image"
              type="file"
              placeholder="image"
              {...register("image", {
                required: { value: true, message: "Required" },
              })}
            />
          </FormGroup>
          <button className="text-white p-2 w-full border hover:bg-white hover:text-black transition duration-150 ease-out">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
