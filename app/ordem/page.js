'use client'

import Image from 'next/image'


export default function Ordem(){
    return( 
    
        <div >


            {/*Ordem de Serviço*/}
            <div className='flex flex-col m-auto w-150' >
                <header className=' my-7   flex justify-center '>
                    <img src="https://placehold.co/100x50"  alt="Picture of the author" className='pr-10' />
                    <h1 className="text-2xl">Venda  N° {123}</h1>
                </header>

                

                <table className='border'>
                    <thead>
                        <tr>
                            <th>cliente</th>
                        </tr>
                    </thead>
                    <tbody >

                        <tr className='border'>
                            <td className='border'>a</td>
                            <td className='border'>a</td>
                            <td className='border'>a</td>
                            <td className='border'>a</td>
                            <td className='border'>a</td>
                            <td className='border'>a</td>
                            <td className='border'>a</td>
                            <td className='border'>a</td>
                            <td className='border'>a</td>
                            <td className='border'>a</td>

                        </tr>
                    </tbody>

                </table>

            </div>

        </div> 
    )
}