import { useParams, notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";



export default async function RecipePage({ params} : { params: { id: string }}){
    const {id} = params;
    let recipe: Recipe | null = null;
    const cookieHeader = cookies().toString();

    try{
        const res = await fetch(`http://localhost:8080/api/v1/recipe/${id}`, {
            headers : {
                "Cookie" : cookieHeader
            }
        });
        console.log(res);
        if (!res.ok) {
            throw new Error(`Failed to fetch recipe: ${res.status}`);
        }
        recipe = await res.json();
    }
    catch(error){
        console.log("Internal Server Error");
        console.log(error);
        // notFound();
    }
    

    if (!recipe) return null; // safety fallback
    
      return (
        <>
            <div className="max-w-4xl mx-auto p-4 h-screen bg-amber-400 md:rounded-xl ">
                <div className="flex flex-col gap-y-3">
                    <h1 className="text-3xl font-bold">{recipe.name}</h1>
                    <p className="text-gray-600">
                        {new Date(recipe.updatedDate || recipe.createdDate).toLocaleDateString()}
                    </p>
                
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl font-semibold">Ingredients</h2>
                        <p>{recipe.ingredients}</p>
                    </div>
                
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl font-semibold">Instructions</h2>
                        <p>{recipe.instructions}</p>
                    </div>

                    <Link 
                    href = "/"
                    className= "w-fit bg-black rounded-lg text-white shadow-xl"
                    >
                    <p className="p-2"> Return </p> 
                </Link>    
                </div>
            </div>    
        </>

      );
}