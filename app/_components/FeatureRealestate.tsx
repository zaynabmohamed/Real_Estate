"use client"
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import PropertyCard from './FeatureCard';
import { ArrowBigRight } from 'lucide-react';
import Link from 'next/link';


export default function FeatureRealestate() {
  const FeatureRealestate = useQuery(api.Real_Estate.getFeature)
  console.log(FeatureRealestate);
if (!FeatureRealestate) return <p>Loading... </p>;

  return (
    <div>
      <div className='p-24  mb-8 space-y-12'>
        <h2>Real-Estate</h2>
        {FeatureRealestate === undefined ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
         {[...Array(6)].map((_,i)=>(
          <div key={i} className='bg-gray-200 animate-pulse  rounded-lg '></div>
         ))}
          </div>
        ):FeatureRealestate.length ===  0 ? (
          <div className='text-center'>
            <h3 className=' text-xl font-semibold text-gray-600 mb-4'>No Feature Real-Estate </h3>
             <Button>Add your Rea-Estate</Button>
          </div>
        ): (<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
           {FeatureRealestate.map((property)=>(
            <PropertyCard key={property._id} p={property}/>
           ))}
        </div>)}
        <div className='flex items-center justify-end'>
          <Link href="/Real-Estate">    
              <Button > See all <ArrowBigRight/></Button>
           </Link>
        </div>
        {/* start section  */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 py-12'>
          <div className='text-center'>
            <h3 className='text-4xl font-bold text-[#e04141]'>500+</h3>
            <p className='text-gray-600'>Real-Estate</p>
          </div>
          <div className='text-center'>
            <h3 className='text-4xl font-bold text-[#e04141]'>200+</h3>
            <p className='text-gray-600'>Real-Estate</p>
          </div>
          <div className='text-center'>
            <h3 className='text-4xl font-bold text-[#e04141]'>80+</h3>
            <p className='text-gray-600'>Real-Estate</p>
          </div>
        </div>
      </div>
    </div>
  )
}

