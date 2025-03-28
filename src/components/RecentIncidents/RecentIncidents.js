import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import Warning from "@/assets/images/warning.svg";
import Pencil from "@/assets/images/pencil.svg";

const RecentIncidents = () => {
  return (
    <>
        <section className='grid 2xl:grid-cols-2 gap-10 bg-[#F7F8FA] sm:bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px]'>
            <div>
                <div className='flex justify-between flex-wrap gap-4 mb-5'>
                    <h4 className='text-[16px] sm:text-[25px]'>Recent Incidents</h4>
                    <Link href="/" className='text-[14px] sm:text-[18px] text-[#3B82F6]'>See More</Link>
                </div>
                <div className='flex flex-col gap-4'>
                    {/* single item  */}
                    <div className='w-full flex justify-between border border-[#DAECFF] rounded-[8px] sm:rounded-[10px] p-[10px] sm:p-[16px] gap-4'>
                        <div className='flex gap-3 items-center'>
                            <Image className='sm:h-[50px] sm:w-[50px] sm:min-w-[50px] h-[32px] w-[32px] min-w-[32px]' src={Warning} alt="report-icon" />
                            <div>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Wrong Medication Dispensed</h6>
                                <p className='text-[10px] sm:text-[14px]'>This incident occurs when a patient receives a m...</p>
                            </div>
                        </div>
                        <div className='min-w-[55px] sm:min-w-auto'>
                            <p className='text-[8px] sm:text-[13px] text-[#C8CFDA]'>30 min ago</p>
                            <Link href="/" className='text-[#3B82F6] text-[8px] sm:text-[14px] font-medium'>View More</Link>
                        </div>
                    </div>
                    {/* single item  */}
                    <div className='w-full flex justify-between border border-[#DAECFF] rounded-[8px] sm:rounded-[10px] p-[10px] sm:p-[16px] gap-4'>
                        <div className='flex gap-3 items-center'>
                            <Image className='sm:h-[50px] sm:w-[50px] sm:min-w-[50px] h-[32px] w-[32px] min-w-[32px]' src={Warning} alt="report-icon" />
                            <div>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Wrong Medication Dispensed</h6>
                                <p className='text-[10px] sm:text-[14px]'>This incident occurs when a patient receives a m...</p>
                            </div>
                        </div>
                        <div className='min-w-[55px] sm:min-w-auto'>
                            <p className='text-[8px] sm:text-[13px] text-[#C8CFDA]'>30 min ago</p>
                            <Link href="/" className='text-[#3B82F6] text-[8px] sm:text-[14px] font-medium'>View More</Link>
                        </div>
                    </div>
                    {/* single item  */}
                    <div className='w-full flex justify-between border border-[#DAECFF] rounded-[8px] sm:rounded-[10px] p-[10px] sm:p-[16px] gap-4'>
                        <div className='flex gap-3 items-center'>
                            <Image className='sm:h-[50px] sm:w-[50px] sm:min-w-[50px] h-[32px] w-[32px] min-w-[32px]' src={Warning} alt="report-icon" />
                            <div>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Wrong Medication Dispensed</h6>
                                <p className='text-[10px] sm:text-[14px]'>This incident occurs when a patient receives a m...</p>
                            </div>
                        </div>
                        <div className='min-w-[55px] sm:min-w-auto'>
                            <p className='text-[8px] sm:text-[13px] text-[#C8CFDA]'>30 min ago</p>
                            <Link href="/" className='text-[#3B82F6] text-[8px] sm:text-[14px] font-medium'>View More</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className='flex justify-between flex-wrap gap-4 mb-5'>
                    <h4 className='text-[16px] sm:text-[25px]'>Medication Dispensing Errors</h4>
                    <Link href="/" className='text-[14px] sm:text-[18px] text-[#3B82F6]'>See More</Link>
                </div>
                <div className='flex flex-col gap-4'>
                    {/* single item  */}
                    <div className='flex justify-between border border-[#DAECFF] rounded-[8px] sm:rounded-[10px] p-[10px] sm:p-[16px] gap-[10px]'>
                        <div className='flex gap-3 items-center w-[60%]'>
                            <div className='sm:h-[50px] sm:w-[50px] sm:min-w-[50px] h-[32px] w-[32px] min-w-[32px] bg-[#3B82F6] flex items-center justify-center rounded-full relative'>
                                <h4 className='text-[16px] sm:text-[26px] uppercase text-white'>D</h4>
                                <Link className='h-[12px] sm:h-[20px] w-[12px] sm:w-[20px] rounded-full bg-white flex items-center justify-center absolute right-0 bottom-0' href="/"><Image className="w-[8px] sm:w-[13px]" src={Pencil} alt="pencil" /></Link>
                            </div>
                            <div className='sm:min-w-[270px]'>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Cyanocobalamin 100mcg</h6>
                                <p className='text-[10px] sm:text-[14px]'>11/3/2024, 10:10 AM</p>
                            </div>
                        </div>
                        <div className='w-[40%] flex justify-between gap-2.5'>
                            <div>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Dispensed</h6>
                                <p className='text-[10px] sm:text-[14px]'>Adam</p>
                            </div>
                            <div>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Checked </h6>
                                <p className='text-[10px] sm:text-[14px]'>Ben</p>
                            </div>
                        </div>
                    </div>

                    {/* single item  */}
                    <div className='flex justify-between border border-[#DAECFF] rounded-[8px] sm:rounded-[10px] p-[10px] sm:p-[16px] gap-[10px]'>
                        <div className='flex gap-3 items-center w-[60%]'>
                            <div className='sm:h-[50px] sm:w-[50px] sm:min-w-[50px] h-[32px] w-[32px] min-w-[32px] bg-[#F97316] flex items-center justify-center rounded-full relative'>
                                <h4 className='text-[16px] sm:text-[26px] uppercase text-white'>F</h4>
                                <Link className='h-[12px] sm:h-[20px] w-[12px] sm:w-[20px] rounded-full bg-white flex items-center justify-center absolute right-0 bottom-0' href="/"><Image className="w-[8px] sm:w-[13px]" src={Pencil} alt="pencil" /></Link>
                            </div>
                            <div className='sm:min-w-[270px]'>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Fluoxetine 20mg</h6>
                                <p className='text-[10px] sm:text-[14px]'>11/3/2024, 10:10 AM</p>
                            </div>
                        </div>
                        <div className='w-[40%] flex justify-between gap-2.5'>
                            <div>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Dispensed</h6>
                                <p className='text-[10px] sm:text-[14px]'>Adam</p>
                            </div>
                            <div>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Checked </h6>
                                <p className='text-[10px] sm:text-[14px]'>Ben</p>
                            </div>
                        </div>
                    </div>

                    {/* single item  */}
                    <div className='flex justify-between border border-[#DAECFF] rounded-[8px] sm:rounded-[10px] p-[10px] sm:p-[16px] gap-[10px]'>
                        <div className='flex gap-3 items-center w-[60%]'>
                            <div className='sm:h-[50px] sm:w-[50px] sm:min-w-[50px] h-[32px] w-[32px] min-w-[32px] bg-[#3B82F6] flex items-center justify-center rounded-full relative'>
                                <h4 className='text-[16px] sm:text-[26px] uppercase text-white'>t</h4>
                                <Link className='h-[12px] sm:h-[20px] w-[12px] sm:w-[20px] rounded-full bg-white flex items-center justify-center absolute right-0 bottom-0' href="/"><Image className="w-[8px] sm:w-[13px]" src={Pencil} alt="pencil" /></Link>
                            </div>
                            <div className='sm:min-w-[270px]'>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Tadalafil 20mg</h6>
                                <p className='text-[10px] sm:text-[14px]'>11/3/2024, 10:10 AM</p>
                            </div>
                        </div>
                        <div className='w-[40%] flex justify-between gap-2.5'>
                            <div>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Dispensed</h6>
                                <p className='text-[10px] sm:text-[14px]'>Adam</p>
                            </div>
                            <div>
                                <h6 className='text-[10px] sm:text-[16px] mb-1.5'>Checked </h6>
                                <p className='text-[10px] sm:text-[14px]'>Ben</p>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </section> 
    </>
  )
}

export default RecentIncidents
