"use client";

import axios from "axios";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface ExperienceItem {
  company: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface FormValues {
  experience: ExperienceItem[];
}

export default function ExperienceStep({ resumeId, onNext, onBack }: Props) {
  let router = useRouter();

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      experience: [
        {
          company: "",
          role: "",
          employmentType: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.data?.workExperience?.length) {
        reset({
          experience: data.data.workExperience,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateDescription = async (index: number) => {
    try {
      const exp = watch(`experience.${index}`);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      const resume = resumeData.data;

      const { data } = await axios.post("/api/ai/generate-Experience", {
        jobRole: exp.role,
        experienceLevel: resume.experienceLevel,
      });

      setValue(
        `experience.${index}.description`,
        data.data.workExperienceDescription,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        workExperience: values.experience,
      });

      router.push(`/resume/${resumeId}/preview`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-slate-700 font-medium">
            <span>Step 5 of 8</span>
            <span>62%</span>
          </div>

          <div className="h-2 mt-2 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full w-[62%] rounded-full bg-violet-600" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Work Experience
              </h1>

              <p className="mt-2 text-slate-600">
                Showcase your professional experience.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                append({
                  company: "",
                  role: "",
                  employmentType: "",
                  startDate: "",
                  endDate: "",
                  currentlyWorking: false,
                  description: "",
                })
              }
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700 transition"
            >
              <Plus size={18} />
              Add Experience
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-5 right-5 text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                )}

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Company Name
                    </label>

                    <input
                      {...register(`experience.${index}.company`)}
                      placeholder="Company Name"
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Job Title
                    </label>

                    <input
                      {...register(`experience.${index}.role`)}
                      placeholder="Frontend Developer"
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Employment Type
                    </label>

                    <select
                      {...register(`experience.${index}.employmentType`)}
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
                    >
                      <option value="">Select Type</option>
                      <option>Full Time</option>
                      <option>Internship</option>
                      <option>Contract</option>
                      <option>Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Start Date
                    </label>

                    <input
                      type="date"
                      {...register(`experience.${index}.startDate`)}
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      End Date
                    </label>

                    <input
                      type="date"
                      disabled={watch(`experience.${index}.currentlyWorking`)}
                      {...register(`experience.${index}.endDate`)}
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 disabled:bg-slate-100 disabled:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="flex items-center gap-3 text-slate-700">
                    <input
                      type="checkbox"
                      {...register(`experience.${index}.currentlyWorking`)}
                      className="h-4 w-4"
                    />
                    Currently Working Here
                  </label>
                </div>

                <div className="mt-6">
                  <div className="flex justify-end mb-3">
                    <button
                      type="button"
                      onClick={() => generateDescription(index)}
                      className="flex items-center gap-2 rounded-xl bg-violet-100 px-4 py-2 text-violet-700 hover:bg-violet-200 transition"
                    >
                      <Sparkles size={18} />
                      Generate Description
                    </button>
                  </div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Description
                  </label>

                  <textarea
                    rows={6}
                    {...register(`experience.${index}.description`)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="w-full rounded-xl border border-slate-300 bg-white p-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none"
                  />
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-slate-700 hover:bg-slate-100 transition"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-white hover:bg-violet-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Continue"}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
