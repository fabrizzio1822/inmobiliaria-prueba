'use client';
import { useState, Suspense } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import { Header } from "@/components/Header";
import Loader from "@/components/Loader/Loader";
import { useSession} from 'next-auth/react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const { data, status } = useSession();

    if (status === 'authenticated' ) {
        router.push(callbackUrl)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const result = await signIn('credentials', {
                redirect: false, email, password
            });
            if (result?.error) {
                toast.error(result?.error);
                setLoading(false);
            } else {
                toast.success('Bienvenido otra vez!');
                window.location.reload()
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <div className="container-login">
            <div>
                <img src="/assets/familia login.jpg" alt="Familia"></img>
            </div>
            <div className="form-container">
                <p className="title">Iniciar Sesión</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Contraseña" />
                    <button disabled={loading || !email || !password} className="form-btn">{loading ? 'Cargando..' : 'Ingresar'}</button>
                </form>
                <br></br>
                <Link href='/register'>No tienes cuenta? Regístrate ahora!</Link>
                <div className="buttons-container">
                    <div className="google-login-button">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        </svg>
                        <span onClick={() => signIn('google', { callbackUrl })}>Ingresar con Google</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Login() {
    return (
        <main>
            <Suspense fallback={<Loader/>}>
                <LoginForm />
            </Suspense>
        </main>
    );
}