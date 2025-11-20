import CreateProperty from "@/app/_components/CreateProperty";

export default function Page() {
  return (
    <div className='max-w-4xl mx-auto'>

        <div className='mb-8'>
            <h2 className='my-5' >Add Property</h2>

            <CreateProperty/>
        </div>
    </div>
  )
}

