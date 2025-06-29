package com.PantryPal.dto;

public class CreateRecipeReqBodyDto {
    private String mealType;
    private String recipeIngredients;

    public CreateRecipeReqBodyDto() {
    }

    public CreateRecipeReqBodyDto(String mealType, String recipeIngredients) {
        this.mealType = mealType;
        this.recipeIngredients = recipeIngredients;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public String getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setRecipeIngredients(String recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
    }

}
