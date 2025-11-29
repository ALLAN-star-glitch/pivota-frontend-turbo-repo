'use client';

import { useState, useCallback } from "react";
import { JobListing, ValidationError } from "../types/jobs/job";

// -----------------------------------------
// Strong Utility Types for Deep Keys
// -----------------------------------------
export type NestedKeyOf<T> = {
  [K in keyof T & string]:
    T[K] extends object
      ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
      : `${K}`;
}[keyof T & string];

export type ValueAtPath<T, P extends string> =
  P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? ValueAtPath<T[Key], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;

// -----------------------------------------
const initialFormState: JobListing = {
  title: "",
  category: "",
  description: "",
  skills: [],
  experienceLevel: "",
  employmentType: "",
  location: {
    city: "",
    neighborhood: "",
    isRemote: false,
  },
  pay: {
    amount: "",
    rate: "daily",
  },
  applicationPeriod: {
    startDate: "",
    endDate: "",
  },
  documentsNeeded: [],
  equipmentRequired: [],
  additionalNotes: "",
  status: "draft",
};

export function useJobListingForm() {
  const [formData, setFormData] = useState<JobListing>(initialFormState);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [currentSkillInput, setCurrentSkillInput] = useState("");
  const [currentDocumentInput, setCurrentDocumentInput] = useState("");
  const [currentEquipmentInput, setCurrentEquipmentInput] = useState("");

  // -----------------------------------------
  // Strongly typed updateField
  // -----------------------------------------
  const updateField = useCallback(
    <P extends NestedKeyOf<JobListing>>(field: P, value: ValueAtPath<JobListing, P>) => {
      setFormData((prev) => {
        const parts = field.split(".");
        const newData: JobListing = { ...prev };

        const setNested = <T extends object>(obj: T, keys: string[], val: unknown): T => {
          const [first, ...rest] = keys;
          if (!rest.length) return { ...obj, [first]: val } as T;
          return { ...obj, [first]: setNested(obj[first as keyof T] as object, rest, val) };
        };

        return setNested(newData, parts, value) as JobListing;
      });

      setErrors((prev) => prev.filter((e) => e.field !== field));
    },
    []
  );

  // -----------------------------------------
  // Reset Form Hook
  // -----------------------------------------
  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setErrors([]);
    setCurrentSkillInput("");
    setCurrentDocumentInput("");
    setCurrentEquipmentInput("");
  }, []);

  // -----------------------------------------
  // Skill List
  // -----------------------------------------
  const addSkill = useCallback(() => {
    if (currentSkillInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, currentSkillInput.trim()],
      }));
      setCurrentSkillInput("");
    }
  }, [currentSkillInput]);

  const removeSkill = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }, []);

  // -----------------------------------------
  // Documents List
  // -----------------------------------------
  const addDocument = useCallback(() => {
    if (currentDocumentInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        documentsNeeded: [...prev.documentsNeeded, currentDocumentInput.trim()],
      }));
      setCurrentDocumentInput("");
    }
  }, [currentDocumentInput]);

  const removeDocument = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      documentsNeeded: prev.documentsNeeded.filter((_, i) => i !== index),
    }));
  }, []);

  // -----------------------------------------
  // Equipment List
  // -----------------------------------------
  const addEquipment = useCallback(() => {
    if (currentEquipmentInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        equipmentRequired: [...prev.equipmentRequired, currentEquipmentInput.trim()],
      }));
      setCurrentEquipmentInput("");
    }
  }, [currentEquipmentInput]);

  const removeEquipment = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      equipmentRequired: prev.equipmentRequired.filter((_, i) => i !== index),
    }));
  }, []);

  // -----------------------------------------
  // Validation
  // -----------------------------------------
  const validate = useCallback((): boolean => {
    const newErrors: ValidationError[] = [];
    if (!formData.title.trim()) newErrors.push({ field: "title", message: "Job title is required" });
    if (!formData.category) newErrors.push({ field: "category", message: "Please select a job category" });
    if (!formData.description.trim()) newErrors.push({ field: "description", message: "Job description is required" });
    if (!formData.experienceLevel) newErrors.push({ field: "experienceLevel", message: "Please select experience level" });
    if (!formData.employmentType) newErrors.push({ field: "employmentType", message: "Please select employment type" });
    if (!formData.location.city.trim()) newErrors.push({ field: "location.city", message: "City is required" });
    if (!formData.pay.amount.trim()) newErrors.push({ field: "pay.amount", message: "Pay amount is required" });
    if (!formData.applicationPeriod.startDate) newErrors.push({ field: "applicationPeriod.startDate", message: "Start date is required" });
    if (!formData.applicationPeriod.endDate) newErrors.push({ field: "applicationPeriod.endDate", message: "End date is required" });

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [formData]);

  const getError = useCallback((field: string) => errors.find((err) => err.field === field)?.message, [errors]);

  // -----------------------------------------
  // Actions
  // -----------------------------------------
  const saveDraft = useCallback(() => {
    const draft = { ...formData, status: "draft" as const };
    console.log("Saving draft:", draft);
  }, [formData]);

  const publish = useCallback(() => {
    if (validate()) {
      const published = { ...formData, status: "published" as const };
      console.log("Publishing job:", published);
      return true;
    }
    return false;
  }, [formData, validate]);

  // -----------------------------------------
  // Export API
  // -----------------------------------------
  return {
    formData,
    updateField,
    currentSkillInput,
    setCurrentSkillInput,
    addSkill,
    removeSkill,
    currentDocumentInput,
    setCurrentDocumentInput,
    addDocument,
    removeDocument,
    currentEquipmentInput,
    setCurrentEquipmentInput,
    addEquipment,
    removeEquipment,
    getError,
    saveDraft,
    publish,
    resetForm, // <-- added here
  };
}
