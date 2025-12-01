"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { ReactMutation, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import type { Id } from "@/convex/_generated/dataModel";
import type { CreatePropertyType } from "../Types/Type";

interface Props {
  initialData?: Partial<CreatePropertyType>;
  isEditing?: boolean;
  propertyId?: string;
  updateProperty?: ReactMutation<any>;
}

export default function CreateProperty({
  initialData,
  isEditing = false,
  propertyId,
}: Props) {
  const router = useRouter();

  // mutations
  const createProperty = useMutation(api.Real_Estate.createProperty);
  const updateProperty = useMutation(api.Real_Estate.updateProperty);

  // local states (controlled inputs)
  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    price: initialData?.price ?? "",
    bedrooms: initialData?.bedrooms ?? 1,
    bathrooms: initialData?.bathrooms ?? 1,
    area: initialData?.area ?? "",
    address: initialData?.address ?? "",
    city: initialData?.city ?? "",
    state: initialData?.state ?? "",
    zipCode: initialData?.zipCode ?? "",
    propertyType: initialData?.propertyType ?? "house",
    status: initialData?.status ?? "for-sale",
    featured: !!initialData?.featured,
    images: initialData?.images ?? ([] as string[]),
  });

  const [isUploading, setIsUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // derived values (memoized) — ensure proper types before sending to server
  const normalizedPayload = useMemo(() => {
    return {
      title: String(formData.title).trim(),
      description: String(formData.description).trim(),
      price: Number(formData.price) || 0,
      bedrooms: Number(formData.bedrooms) || 1,
      bathrooms: Number(formData.bathrooms) || 1,
      area: Number(formData.area) || 0,
      address: String(formData.address).trim(),
      city: String(formData.city).trim(),
      state: String(formData.state).trim(),
      zipCode: String(formData.zipCode).trim(),
      propertyType: formData.propertyType as
        | "house"
        | "apartment"
        | "condo"
        | "townhouse",
      status: formData.status as "for-sale" | "for-rent" | "sold" | "rented",
      images: formData.images,
      featured: Boolean(formData.featured),
    } as CreatePropertyType;
  }, [formData]);

  // generic input handler (keeps controlled inputs fast)
  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target as HTMLInputElement;
      // keep numeric fields as strings while typing to avoid cursor jump, convert later
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : // keep number fields as string to avoid cursor issues
              ["price", "area", "zipCode"].includes(name)
              ? value
              : value,
      }));
    },
    []
  );

  // toggle checkbox
  const handleCheckboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    },
    []
  );

  // upload images (sequential, show previews, allow multiple)
  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      setIsUploading(true);

      try {
        const uploadedUrls: string[] = [];
        for (const file of Array.from(files)) {
          const data = new FormData();
          data.append("file", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: data,
          });
          if (!res.ok) throw new Error("Upload failed");
          const json = await res.json();
          if (json.url) uploadedUrls.push(json.url);
        }
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }));
      } catch (err) {
        console.error("Upload error", err);
        alert("Failed to upload image(s). Try again.");
      } finally {
        setIsUploading(false);
        // reset input value so same file can be re-picked if needed
        if (e.target) (e.target as HTMLInputElement).value = "";
      }
    },
    []
  );

  const handleRemoveImage = useCallback((idx: number) => {
    setFormData((prev) => {
      const copy = [...prev.images];
      copy.splice(idx, 1);
      return { ...prev, images: copy };
    });
  }, []);

  // validation (simple). You can replace with Zod schema for production.
  const validate = useCallback(() => {
    if (!normalizedPayload.title) return "Title is required";
    if (!normalizedPayload.description) return "Description is required";
    if (!normalizedPayload.price || normalizedPayload.price <= 0)
      return "Price must be > 0";
    // add more rules if needed
    return null;
  }, [normalizedPayload]);

  // submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isUploading) {
        alert("Please wait for images to finish uploading.");
        return;
      }
      const err = validate();
      if (err) {
        alert(err);
        return;
      }
      setSubmitting(true);
      try {
        if (isEditing && propertyId) {
          await updateProperty({
            id: propertyId as Id<"Real_Estate">,
            ...normalizedPayload,
            propertyType: formData.propertyType as
              | "house"
              | "apartment"
              | "condo"
              | "townhouse",
            status: formData.status as
              | "for-sale"
              | "for-rent"
              | "sold"
              | "rented",
          });
        } else {
          await createProperty(normalizedPayload as any);
        }
        // success: navigate and/or show toast
        router.push("/Real-Estate");
      } catch (error) {
        console.error("Save error", error);
        alert("Failed to save property. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [
      isUploading,
      validate,
      isEditing,
      propertyId,
      normalizedPayload,
      createProperty,
      updateProperty,
      router,
    ]
  );

  return (
    <form
      className="space-y-8"
      onSubmit={handleSubmit}
      aria-label="Property form"
    >
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-normal mb-1" htmlFor="title">
              Property Title *
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              type="text"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              rows={5}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="price">
              Price *
            </label>
            <input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              type="number"
              inputMode="numeric"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="area">
              Area *
            </label>
            <input
              id="area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="w-full p-3 border rounded"
              type="number"
              inputMode="numeric"
              required
            />
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Property Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-1">Bedrooms</label>
            <select
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Bathrooms</label>
            <select
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Property Type</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
              <option value="sold">Sold</option>
              <option value="rented">Rented</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm mb-1">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">State</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Zip Code</label>
            <input
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="featured">Mark as featured property</label>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Images</h3>

        <div className="mb-4">
          <label className="inline-block p-4 border-2 border-dashed rounded cursor-pointer">
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 mb-2" />
              <span>
                {isUploading ? "Uploading..." : "Click to upload images"}
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((src, i) => (
              <div key={i} className="relative border rounded overflow-hidden">
                <Image
                  src={src}
                  alt={`property-${i}`}
                  width={400}
                  height={250}
                  className="object-cover w-full h-48"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={submitting || isUploading}>
          {submitting
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Update Property"
              : "Create Property"}
        </Button>
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => router.push("/Real-Estate")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
