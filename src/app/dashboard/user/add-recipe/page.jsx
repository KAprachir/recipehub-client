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
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  // Image Upload States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Options States
  const [publishToFeed, setPublishToFeed] = useState(true);
  const [allowComments, setAllowComments] = useState(false);
  const [notifyFollowers, setNotifyFollowers] = useState(true);

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
      !ingredients ||
      !instructions
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
        ingredients: ingredients
          .split("\n")
          .filter((line) => line.trim() !== ""),
        instructions: instructions,
        authorId: user?.id,
        authorName: user?.name,
        authorEmail: user?.email,
        likesCount: 0,
        isFeatured: false,
        status: "active",
        options: { publishToFeed, allowComments, notifyFollowers },
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
        setIngredients("");
        setInstructions("");
        setImageFile(null);
        setImagePreview(null);
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

        {!user?.isPremium && (
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-3 rounded-xl max-w-sm">
            <AlertTriangle
              className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5"
              size={18}
            />
            <p className="text-xs text-amber-800 dark:text-amber-400 font-medium leading-relaxed">
              Normal users can add up to 2 recipes.{" "}
              <span className="font-bold underline cursor-pointer hover:text-amber-600">
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
          <Card className="shadow-sm border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-3">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500 font-bold">
                <ListPlus size={18} /> <span>Ingredients</span>
              </div>
              <button
                type="button"
                className="text-xs text-emerald-600 font-bold hover:underline"
              >
                + Add Section
              </button>
            </div>

            <TextArea
              variant="bordered"
              minrows={4}
              placeholder="Enter each ingredient on a new line (e.g., 200g Arborio Rice)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              isrequired="true"
            />
            <p className="text-[11px] text-zinc-400 italic">
              Pro tip: Use bold text for main components.
            </p>
          </Card>

          {/* Card 3: Instructions */}
          <Card className="shadow-sm border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-500 font-bold border-b border-zinc-100 dark:border-zinc-900 pb-3">
              <FileText size={18} /> <span>Instructions</span>
            </div>

            <TextArea
              variant="bordered"
              minrows={6}
              placeholder="Describe the steps in detail. Be precise about temperatures and timing."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              isrequired="true"
            />
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

            <div className="flex flex-col space-y-3">
              <Checkbox
                color="success"
                isSelected={publishToFeed}
                onValueChange={setPublishToFeed}
              >
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Publish to public feed
                </span>
              </Checkbox>
              <Checkbox
                color="success"
                isSelected={allowComments}
                onValueChange={setAllowComments}
              >
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Allow comments
                </span>
              </Checkbox>
              <Checkbox
                color="success"
                isSelected={notifyFollowers}
                onValueChange={setNotifyFollowers}
              >
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Notify my followers
                </span>
              </Checkbox>
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
