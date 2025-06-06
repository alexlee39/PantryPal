package com.PantryPal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Table("recipe")
public class Recipe {
    @Id
    private long id;
    private long userId;
    private String name;
    private MealType mealType;
    private String ingredients;
    private String instructions;
    private LocalDate createdDate;
    private LocalDate updatedDate;

    public Recipe() {
    }

    public Recipe(long userId, String name, MealType mealType, String ingredients, String instructions) {
        this.userId = userId;
        this.instructions = instructions;
        this.ingredients = ingredients;
        this.mealType = mealType;
        this.name = name;
    }

    public Recipe(String name, MealType mealType, String ingredients, String instructions) {
        this.name = name;
        this.mealType = mealType;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.createdDate = LocalDate.now();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDate updatedDate) {
        this.updatedDate = updatedDate;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public MealType getMealType() {
        return mealType;
    }

    public void setMealType(MealType mealType) {
        this.mealType = mealType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

}
