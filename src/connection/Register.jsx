import React, { useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import  "../page/pagePublic/pagePublic.css";
import {
    DisplayApiErrors,
    ToastError,
    ToastSuccess,
} from '../components/poPup/Toast';
import {Link, useNavigate} from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs';
import {setCookie} from '../service/TokenService';
import {RegisterService} from '../service/ConnectionService';

const Register= () => {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event ) =>{
        event.preventDefault();
        try {
            const response = await RegisterService(   {firstName, lastName, email, password});
            if (response.status === 200){

                    ToastSuccess(response.data.message);
                let token =  response.data.result
                //setCookie("token", token);
                navigate(`/public/home`,{replace: true});
            }else if (response.response.status === 400){
               ToastError(response.response.data.message);
               DisplayApiErrors(response.response.data.errors);
           }
        } catch (error) {
            console.error(error);
            ToastError("le serveur ne répond pas pour le moment, veuillez réessayer plus tard");
        }
    }
    const backgroundStyle = {
        backgroundImage: `url("/img/imgPage/imgConnection.jpg")`,
    };
    return (
    <div>
        <div>
            <div  className="flex">
                <div className="flex bg-image h-screen w-screen items-center justify-center backdrop-blur-xl  bg-cover bg-no-repeat"
                     style={backgroundStyle}>
                    <div className="rounded-xl bg-gray-800 bg-white  w-[400px] flex justify-center mt-10 border-5 border-amber-gray-900  drop-shadow-xl backdrop-blur-md max-sm:px-8">
                            <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">

                                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                        <Link to="/public/home"  className="flex align-middle" >
                                                <p><BsArrowLeft  className="mt-1.5" /></p>
                                                <p className="m-1 font-medium">Home</p>
                                        </Link>
                                        <img
                                            className="mx-auto w-16 w-auto"
                                            src="/img/icons/icons8-poterie-100.png"
                                            alt="Your Company"
                                        />
                                        <h2 className="mt-2 mb-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                            Inscrivez-vous ici
                                        </h2>
                                    </div>

                                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                        <form className="space-y-6" onSubmit={handleRegister} >
                                            <div>
                                                    <div>
                                                        <label
                                                            htmlFor="userName"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Prenom
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={(e) => setFirstName(e.target.value)}
                                                                id="firstName"
                                                                name="firstName"
                                                                type="firstName"
                                                                autoComplete="firstName"
                                                                placeholder="prenom"
                                                                required
                                                                className="block h-10 p-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <label
                                                        htmlFor="lastName"
                                                        className="block text-sm font-medium leading-6 text-gray-900 mt-2"
                                                    >
                                                    Nom
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        id="lastName"
                                                        name="lastName"
                                                        type="lastName"
                                                        placeholder="nom"
                                                        autoComplete="lastName"
                                                        required
                                                        className="w-56 p-3 h-10 text-sm font-medium text-slate-700  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Adresse e-mail
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        autoComplete="email"
                                                        placeholder="hamza88@gmail.com"
                                                        required
                                                        className="block h-10 p-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <label
                                                        htmlFor="password"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Password
                                                    </label>

                                                </div>
                                                <div className="mt-2">
                                                    <input
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        placeholder="*********"
                                                        required
                                                        className="block p-3 h-10 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <button
                                                    type="submit"
                                                    className="flex h-10 w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Inscrivez-vous
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                </div>
                        </div>
                </div>
                </div>
            </div>
    </div>
    );
};

export default Register;