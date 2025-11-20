import Image from "next/image";
import img from "../../public/modern-house-interior-exterior-design-46517595.webp"
export default function HeroHome() {
  return (
    <div>
        <Image src={img} className="w-full object-cover" alt="Hero" width={1200} height={1200}/>
    </div>
  )
}
