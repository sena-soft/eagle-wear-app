import { useForm } from "react-hook-form";
import { InputForm } from "../../components/InputForm"
import { LoginFormProps } from "./types";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLoading, setLogin } from "../../store/authSlice";
import { toast } from "react-toastify";
import { authenticate, getIdUserByToken } from "./utils";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state: RootState) => state.auth.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    defaultValues: {
      username: "",
      password: ""
    },
    mode: "onChange",
  });
  const onSubmit = async (data: LoginFormProps) => {
    try {
      dispatch(setLoading(true));
      const response = await authenticate(data);
      console.log(response);
      
      dispatch(setLogin({user: data.username, token: response.token, idUser: getIdUserByToken(response.token ?? '')}));
      navigate('/products', { replace: true });

    } catch (error: any) {
      dispatch(setLoading(false));
      console.log(error.code);
      if (error.code === 'ERR_BAD_REQUEST') {
        toast.error("Credenciales incorrectas!");

      }else
      toast.error("Ha ocurrido un error intentelo nuevamente");

    }
  };
  return (
    <>
  
        <form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
          <InputForm 
            label="Usuario"
            name="username"
            register={register}
            errors={errors.username}
            placeholder="Usuario"
            validationRules={{ required: 'Usuario es requerido' }}
          />
          
          <InputForm 
            label="Password"
            name="password"
            register={register}
            errors={errors.password}
            placeholder="Password"
            type="password"
            validationRules={{ required: 'Password es requerido' }}
          />
         

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          No tienes cuenta?{' '}
          <a href="" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Crear cuenta gratis
          </a>
        </p>
  
  </>
  )
}
