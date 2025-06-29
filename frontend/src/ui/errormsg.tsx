export default function ErrorMsg({message}: ErrorFormProps){
    return (
        <div className="">
            <div className="text-red-500 font-medium">
                {message}
            </div>
        </div>
    )
}