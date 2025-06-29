import Link from "next/link";

export default function Button({name, href} : ButtonProps){
    return (
        <>
        <Link 
        href = {href}
        className="flex flex-row items-center py-2 bg-black text-white px-2 rounded-lg">
          <span className="text-base px-2"> {name} </span>
        </Link>
        </>
    )
}