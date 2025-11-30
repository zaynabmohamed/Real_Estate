
export default function WhatweDo() {
  // هنا انا ممكن اللخص الداتا في متغير واعمل عليه map بدل ما اكرر الكود 
  return (
   <div className="bg-white shadow-lg rounded-3xl p-5">
  <div className="flex flex-col justify-center items-center ">
      <h1 className="text-[30px] font-bold">What We Do</h1>
      <p className="text-gray-600 mt-3 text-center max-w-2xl">
          Simplifying the journey of buying, selling, and renting real estate. Our expert team provides comprehensive solutions tailored to your needs.
      </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <div className="p-8">
         <h1 className="text-[#e04141] font-bold text-[20px]"> * Property Sales</h1>
         <p className="mt-3 text-gray-600">
           Helping you find and sell properties quickly with expert guidance and personalized support.
         </p>
      </div>
      <div className="p-8">
         <h1 className="text-[#e04141] font-bold text-[20px]"> * Property Rentals</h1>
         <p className="mt-3 text-gray-600">
           Connecting tenants and landlords for smooth rental experiences with trusted property solutions.
         </p>
      </div>
      <div className="p-8">
         <h1 className="text-[#e04141] font-bold text-[20px]"> * Property Management</h1>
         <p className="mt-3 text-gray-600">
           Comprehensive property management services to keep your investments secure and profitable.
         </p>
      </div>
      <div className="p-8">
         <h1 className="text-[#e04141] font-bold text-[20px]"> *Real Estate Consulting</h1>
         <p className="mt-3 text-gray-600">
           Expert advice on market trends, property valuation, and investment strategies to maximize your returns.
         </p>
      </div>
  </div>
</div>

  )
}
