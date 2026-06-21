"use client";
import React, { useState, useRef } from "react";
import {
  Input,
  Select,
  ListBox, // 1. Replaced SelectItem with ListBox
  Label, // 2. Added Label for the new v3 structure
  TextArea,
  Button,
  Checkbox,
  Card,
} from "@heroui/react";
import {
  Utensils,
  ListPlus,
  Image as ImageIcon,
  Send,
  FileText,
  AlertTriangle,
  Plus,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { createRecipe } from "@/lib/actions/recipes";

const CATEGORIES = [
  "Main Course",
  "Breakfast",
  "Dessert",
  "Appetizer",
  "Salad",
  "Beverage",
];
const CUISINES = [
  "Italian",
  "Mexican",
  "Indian",
  "Chinese",
  "American",
  "Bengali",
  "Thai",
];

export default function AddRecipePage() {
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  // Form States
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState(null); // Updated: v3 uses null/string instead of Set
  const [cuisine, setCuisine] = useState(null); // Updated: v3 uses null/string instead of Set
  const [difficulty, setDifficulty] = useState("Medium");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [newInstruction, setNewInstruction] = useState("");

  // Image Upload States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Options States
  const [visibility, setVisibility] = useState(true);

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const handleIngredientKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, newInstruction.trim()]);
      setNewInstruction("");
    }
  };

  const handleRemoveInstruction = (indexToRemove) => {
    setInstructions(instructions.filter((_, index) => index !== indexToRemove));
  };

  const handleInstructionKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddInstruction();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Updated: Checking direct values instead of .currentKey
    if (
      !recipeName ||
      !category ||
      !cuisine ||
      !prepTime ||
      ingredients.length === 0 ||
      instructions.length === 0
    ) {
      Swal.fire("Error", "Please fill in all required fields.", "error");
      return;
    }

    if (!imageFile) {
      Swal.fire("Error", "Please upload a cover image.", "error");
      return;
    }

    try {
      setIsUploading(true);

      // 1. Upload to Imgbb
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", imageFile);

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
          method: "POST",
          body: imgbbFormData,
        },
      );
      const imgbbData = await imgbbRes.json();

      if (!imgbbData.success) {
        throw new Error("Imgbb Upload Failed");
      }

      const imageUrl = imgbbData.data.url;

      // 2. Prepare Payload
      const recipePayload = {
        recipeName,
        recipeImage: imageUrl,
        category: category, // Updated: Pass value directly
        cuisineType: cuisine, // Updated: Pass value directly
        difficultyLevel: difficulty,
        preparationTime: parseInt(prepTime),
        ingredients: ingredients,
        instructions: instructions,
        authorId: user?.id,
        authorName: user?.name,
        authorEmail: user?.email,
        likesCount: 0,
        isFeatured: false,
        status: "active",
        visibility: visibility,
        options: {
          publishToFeed: visibility,
          allowComments: true,
          notifyFollowers: visibility,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log(recipePayload);

      // 3. Post to backend router (Simulated)
      const response = await createRecipe(recipePayload);
      console.log(response);

      if (response.insertedId) {
        Swal.fire("Success 🎉", "Recipe published successfully!", "success");
        setRecipeName("");
        setCategory(null);
        setCuisine(null);
        setPrepTime("");
        setIngredients([]);
        setNewIngredient("");
        setInstructions([]);
        setNewInstruction("");
        setImageFile(null);
        setImagePreview(null);
        setVisibility(true);
      }
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      Swal.fire("Submission Failed", errorMsg, "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpgradeToPremium = () => {
    const form = document.createElement("form");
    form.action = "/api/checkout_sessions";
    form.method = "POST";
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 text-zinc-800 dark:text-zinc-200">
      {/* ─── HEADER AREA ─── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Share Your Culinary Masterpiece
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Contribute to the RecipeHub community with your unique creations.
          </p>
        </div>

        {user?.role !== "premium" && user?.role !== "admin" && (
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-3 rounded-xl max-w-sm">
            <AlertTriangle
              className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5"
              size={18}
            />
            <p className="text-xs text-amber-800 dark:text-amber-400 font-medium leading-relaxed">
              Normal users can add up to 2 recipes.{" "}
              <span 
                onClick={handleUpgradeToPremium}
                className="font-bold underline cursor-pointer hover:text-amber-600"
              >
                Upgrade to Premium
              </span>{" "}
              for unlimited access.
            </p>
          </div>
        )}
      </div>

      {/* ─── FORM GRID ─── */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Recipe Basics */}
          <Card className="shadow-sm border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500 font-bold border-b border-zinc-100 dark:border-zinc-900 pb-3">
              <Utensils size={18} /> <span>Recipe Basics</span>
            </div>

            <Input
              type="text"
              label="Recipe Name"
              placeholder="e.g., Summer Truffle Risotto"
              variant="bordered"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              isrequired="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* V3 COMPATIBLE SELECT: CATEGORY */}
              <div className="flex flex-col gap-1 w-full">
                <Select value={category} onChange={setCategory} isrequired>
                  <Label className="text-xs font-semibold text-zinc-500">
                    Category
                  </Label>
                  <Select.Trigger className="border-2 border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl h-12 px-3">
                    <Select.Value placeholder="Select Category" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {CATEGORIES.map((cat) => (
                        <ListBox.Item id={cat} textValue={cat} key={cat}>
                          {cat}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* V3 COMPATIBLE SELECT: CUISINE */}
              <div className="flex flex-col gap-1 w-full">
                <Select value={cuisine} onChange={setCuisine} isrequired>
                  <Label className="text-xs font-semibold text-zinc-500">
                    Cuisine
                  </Label>
                  <Select.Trigger className="border-2 border-zinc-200 dark:border-zinc-800 bg-transparent rounded-xl h-12 px-3">
                    <Select.Value placeholder="Select Cuisine" />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {CUISINES.map((cui) => (
                        <ListBox.Item id={cui} textValue={cui} key={cui}>
                          {cui}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-500">
                  Difficulty
                </label>
                <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl w-fit">
                  {["Easy", "Medium", "Expert"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        difficulty === level
                          ? "bg-[#10B981] text-white shadow-sm"
                          : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <Input
                type="number"
                label="Prep Time (minutes)"
                placeholder="30"
                variant="bordered"
                endcontent={<span className="text-xs text-zinc-400">min</span>}
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                isrequired="true"
              />
            </div>
          </Card>

          {/* Card 2: Ingredients */}
          <Card className="shadow-sm border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-3">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500 font-bold">
                <ListPlus size={18} /> <span>Ingredients</span>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Input
                type="text"
                placeholder="e.g., 200g Arborio Rice"
                variant="bordered"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyDown={handleIngredientKeyDown}
                className="flex-1"
              />
              <Button
                type="button"
                color="success"
                onClick={handleAddIngredient}
                isIconOnly
                className="h-10 w-10 min-w-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              >
                <Plus size={18} />
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {ingredients.length === 0 ? (
                <div className="text-center py-6 text-zinc-400 text-xs border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                  No ingredients added yet. Type an ingredient above and press
                  Enter.
                </div>
              ) : (
                ingredients.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 transition-all hover:bg-zinc-100/70 dark:hover:bg-zinc-900/80"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {item}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
            <p className="text-[11px] text-zinc-400 italic">
              Pro tip: List ingredients in the order they are used.
            </p>
          </Card>

          {/* Card 3: Instructions */}
          <Card className="shadow-sm border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500 font-bold border-b border-zinc-100 dark:border-zinc-900 pb-3">
              <FileText size={18} /> <span>Instructions (Step-by-Step)</span>
            </div>

            <div className="flex gap-2 items-end">
              <TextArea
                variant="bordered"
                minrows={2}
                placeholder="Describe this step (e.g., Heat olive oil, sauté minced garlic...)"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
                onKeyDown={handleInstructionKeyDown}
                className="flex-1"
              />
              <Button
                type="button"
                color="success"
                onClick={handleAddInstruction}
                isIconOnly
                className="h-10 w-10 min-w-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs mb-1"
              >
                <Plus size={18} />
              </Button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 pt-2">
              {instructions.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 text-xs border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                  No steps added yet. Describe your first step above and click
                  "Add Step".
                </div>
              ) : (
                instructions.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 transition-all hover:bg-zinc-100/70 dark:hover:bg-zinc-900/80 gap-3"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-[10px] font-black bg-[#00693E] text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-xs">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 whitespace-pre-line leading-relaxed pt-0.5">
                        {step}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInstruction(idx)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-1 shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Card 4: Cover Image */}
          <Card className="shadow-sm border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500 font-bold border-b border-zinc-100 dark:border-zinc-900 pb-3">
              <ImageIcon size={18} /> <span>Cover Image</span>
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl h-44 flex flex-col items-center justify-center p-4 cursor-pointer bg-zinc-50 dark:bg-zinc-900/50 transition-all text-center"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                <>
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-full shadow-sm text-zinc-400 mb-2">
                    <ImageIcon size={22} />
                  </div>
                  <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-1">
                    High-resolution JPEG or PNG (Max 10MB)
                  </p>
                </>
              )}
            </div>
            <div className="bg-amber-50/60 dark:bg-amber-950/10 p-3 rounded-xl border border-amber-100/70 dark:border-amber-900/30">
              <p className="text-[11px] text-amber-800 dark:text-amber-500 font-semibold leading-relaxed text-center">
                💡 Great photos increase recipe engagement by up to 300%!
              </p>
            </div>
          </Card>

          {/* Card 5: Visibility Configuration */}
          <Card className="shadow-sm border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 space-y-4">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase border-b border-zinc-100 dark:border-zinc-900 pb-2">
              Visibility & Options
            </p>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-zinc-500">
                Recipe Visibility
              </label>
              <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => setVisibility(true)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    visibility === true
                      ? "bg-[#10B981] text-white shadow-sm"
                      : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Public
                </button>
                <button
                  type="button"
                  onClick={() => setVisibility(false)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    visibility === false
                      ? "bg-[#10B981] text-white shadow-sm"
                      : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Private
                </button>
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 italic leading-relaxed">
                {visibility
                  ? "💡 Anyone can search for, view, and cook this recipe."
                  : "🔒 This recipe will only be visible to you in your profile dashboard."}
              </p>
            </div>
          </Card>

          {/* Actions Block */}
          <div className="space-y-2">
            <Button
              type="submit"
              isLoading={isUploading}
              className="w-full bg-[#00693E] hover:bg-[#005230] text-white font-bold py-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              {!isUploading && <Send size={16} />}
              <span>
                {isUploading ? "Uploading & Publishing..." : "Submit Recipe"}
              </span>
            </Button>
            <Button
              type="button"
              variant="bordered"
              className="w-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-semibold py-6 rounded-xl"
            >
              Save Draft
            </Button>
            <p className="text-[10px] text-center text-zinc-400 px-4 mt-2 leading-relaxed">
              By submitting, you agree to our{" "}
              <span className="underline cursor-pointer text-zinc-500">
                Culinary Quality Guidelines
              </span>
              .
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
