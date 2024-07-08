import { InstagramFill, LinkedinBoxFill, FacebookFill } from 'akar-icons'
export default function Footer() {
    return (
        <footer id="footer">
            <div className="footer-container py-12">
                <div className="footer-links-pagina">
                    <ul className='container m-auto'>
                        <li><a className='py-4 text-lg ml-4 hover:text-black' href="/">Inicio</a></li>
                        <span className='text-white/40 text-sm'>Servicios Inmobiliarios</span>
                        <li><a className='py-4 sm:text-lg text-sm ml-4 hover:text-black text-wrap text-center' href="/servicios-inmobiliarios/asesoramiento">Asesoramiento compra y venta</a></li>
                        <li><a className='py-4 sm:text-lg text-sm ml-4 hover:text-black text-wrap text-center' href="/servicios-inmobiliarios/evaluacion">Evaluación de proyectos</a></li>
                        <li><a className='py-4 text-lg ml-4 hover:text-black' href="/peritajes">Peritajes</a></li>
                        <span className='text-white/40 text-sm '>Otros Sevicios</span>
                        <li><a className='py-4 text-lg ml-4 hover:text-black' href="/tasaciones">Tasaciones</a></li>
                        <li><a className='py-4 text-lg ml-4 hover:text-black' href="/contactame">Contactame</a></li>
                    </ul>
                </div>
                <div>
                    <ul className="icons my-12">
                        <h3 className='sm:text-lg font-bold mb-2 text-sm'>Seguime en mis redes:</h3>
                        <div className='flex text-center hover:text-black'>
                        <a className="no-underline flex" href="https://www.linkedin.com/in/mar%C3%ADa-laura-bobadilla-98020020a/"> 
                        <LinkedinBoxFill className="i py-2" strokeWidth={2} size={36}></LinkedinBoxFill><span className='mt-1 text-xl'>Linkedin</span>
                        </a>
                        </div>
                        <div className='flex text-center hover:text-black'>
                        <a className="no-underline flex" href="https://www.instagram.com/bobadillamarialaura/">
                        <InstagramFill className="i py-2" strokeWidth={2} size={36}></InstagramFill><span className='mt-1 text-xl'>Instagram</span>
                        </a>                       
                        </div>
                        <div className='flex text-center hover:text-black'>
                        <a className="no-underline flex" href="#"> 
                        <FacebookFill className="i py-2" strokeWidth={2} size={36}></FacebookFill><span className='mt-1 text-xl'>Facebook</span>
                        </a>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="copyright">
                <p>© 2024 - Maria Laura Bobadilla. Todos los derechos reservados</p>
            </div>
        </footer>
    )
}