import Image from 'next/image';

export default function Form() {
    return (
        <div className="px-3 m-auto">
            <div className="py-4 px-12 rounded-lg shadow-light">
                <div className="flex gap-4">
                    <Image src='/assets/comercial.jpeg' alt='Comercial'
                    objectFit="contain" width={50} height={50} className='border-2 rounded-full boder-secondary' />
                    <div>
                        <p>Laura B.</p>
                        <p className='text-secondary font-semibold'>Profesional</p>
                    </div>
                </div>
                <form action="https://formsubmit.co/inmobiliaria.lbobadilla@gmail.com" method="post" className='my-5'>
                    <div>
                        <label className='text-sm text-secondary'>Nombre</label>
                        <div className='mt-2'>
                            <input type="text" name='name' className='w-full rounded-md border-0 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset text-sm' />
                        </div>
                    </div>
                    <div className='mt-2'>
                        <label className='text-sm text-secondary'>Número</label>
                        <div className='mt-2'>
                            <input type="phone" name='phone' id='phone' autoComplete='phone' className='w-full rounded-md border-0 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset text-sm' />
                        </div>
                    </div>
                    <div className='mt-2'>
                        <label className='text-sm text-secondary'>Descripción</label>
                        <div className='mt-2'>
                            <textarea name="descripcion" defaultValue={'Hola, me interesa la propiedad ...'} rows={3} className='w-full rounded-md border-0 py-1.5 px-2 color gris shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset text-sm'></textarea>
                        </div>
                    </div>
                    <div className='flex justify-between gap-5 my-4'>
                        <button type="submit" className='bg-secondary px-4 py-2 text-white rounded-lg text-sm'>Enviar</button>
                        <a href="tel:299154213223" className='border-[1px] border-secondary text-secondary px-2 py-2 rounded-lg text-sm flex items-center justify-center'>
                            Llamar
                        </a>
                    </div>
                    <input type="hidden" name="_next" value="https://www.marialaurabobadilla.com.ar/"/>
                    <input type="hidden" name="_captcha" value="false"/>
                    <input type="hidden" name="_subject" value="Inmobiliaria Bobadilla"/>
                </form>
            </div>
        </div>
    );
}

