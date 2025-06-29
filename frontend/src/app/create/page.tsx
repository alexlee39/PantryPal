"use client"

import type React from "react"

import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"

import { LuChefHat, LuClock, LuUsers } from "react-icons/lu"
// "react-icons/lucide-react"

export default function GenerateRecipeForm() {
  const [ingredients, setIngredients] = useState("")
  const [mealType, setMealType] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [recipe, setRecipe] = useState<{
    name: string
    description: string
    prepTime: string
    servings: string
    ingredients: string[]
    instructions: string[]
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ingredients.trim() || !mealType) return

    setIsGenerating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate a mock recipe based on inputs
    const mockRecipe = {
      name: `Delicious ${mealType}`,
      description: `A wonderful ${mealType.toLowerCase()} made with ${ingredients.split(",")[0]?.trim()} and other fresh ingredients.`,
      prepTime: mealType === "Breakfast" ? "15 mins" : mealType === "Lunch" ? "25 mins" : "35 mins",
      servings: "4",
      ingredients: ingredients
        .split(",")
        .map((ing) => ing.trim())
        .filter((ing) => ing),
      instructions: [
        "Prepare all ingredients by washing and chopping as needed.",
        "Heat a large pan or skillet over medium heat.",
        "Add the main ingredients and cook according to the meal type.",
        "Season with salt, pepper, and your favorite spices.",
        "Cook until everything is tender and flavors are well combined.",
        "Serve hot and enjoy your homemade meal!",
      ],
    }

    setRecipe(mockRecipe)
    setIsGenerating(false)
  }

  const resetForm = () => {
    setIngredients("")
    setMealType("")
    setRecipe(null)
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2"> Generate a Recipe</h1>
          <p className="text-gray-600">Tell us what ingredients you have and what meal you want to make!</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LuChefHat className="h-5 w-5" />
                Create Your Recipe
              </CardTitle>
              <CardDescription>Enter your available ingredients and choose your meal type</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p >Available Ingredients </p>
                  <textarea
                    id="ingredients"
                    placeholder="Enter ingredients separated by commas (e.g., chicken, rice, broccoli, garlic, onion)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meal-type">Meal Type</Label>
                  <p> Meal Type </p>
                  <select value={mealType} onValueChange={setMealType} required>

                  </select>
                  <Select value={mealType} onValueChange={setMealType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Snack">Snack</SelectItem>
                      <SelectItem value="Dessert">Dessert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button type="submit" disabled={isGenerating || !ingredients.trim() || !mealType} className="flex-1">
                  {isGenerating ? "Generating Recipe..." : "Generate Recipe"}
                </Button>
                {recipe && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    New Recipe
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>

          {/* Generated Recipe */}
          <Card className={recipe ? "opacity-100" : "opacity-50"}>
            <CardHeader>
              <CardTitle>Your Generated Recipe</CardTitle>
              <CardDescription>
                {recipe ? "Here's your custom recipe!" : "Your recipe will appear here"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                  <span className="ml-2">Generating your recipe...</span>
                </div>
              ) : recipe ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{recipe.name}</h3>
                    <p className="text-gray-600 mt-1">{recipe.description}</p>
                  </div>

                  <div className="flex gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <LuClock className="h-4 w-4" />
                      {recipe.prepTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <LuUsers className="h-4 w-4" />
                      Serves {recipe.servings}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Ingredients:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                      {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <LuChefHat className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Fill out the form and click "Generate Recipe" to see your custom recipe here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
