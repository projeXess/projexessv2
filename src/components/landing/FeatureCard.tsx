import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

function FeatureCard({
    name,
    description,
    image
}: {
    name: string,
    description: string,
    image: string
}) {
    return (
        <div className="text-center w-1/4 rounded-xl shadow-xl bg-[#3aa0ff24] pt-5 flex flex-col justify-between">
            <div className="flex flex-col justify-around items-center p-2">
                <h2 className=" text-lg title-font font-medium mb-2 ">{name}</h2>
                <p className="leading-relaxed text-base p-2">{description}</p>
                <img src={image} width={240} />
            </div>
               <Link to={"/auth/signup"}>
                <button className="btn-filled w-full justify-self-end p-4 border border-transparent">Start Now <ArrowRight /></button>
               </Link>
        </div>
    )
}

export default FeatureCard