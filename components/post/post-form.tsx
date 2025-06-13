"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFindCitiesAll } from "@/hooks/query/use-cities";
import { useFindDistrictsAll } from "@/hooks/query/use-districts";
import { useFindCountriesAll } from "@/hooks/query/user-country";
import { cn } from "@/lib/utils";
import { CityType } from "@/type/citiy.type";
import { CountryType } from "@/type/country.type";
import { DistrictType } from "@/type/district.type";
import { PlaceType, PostFormType } from "@/type/post.type";
import { PostFormSchema } from "@/validation/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import ButtonWrap from "./form/button-wrap";
interface WriteFormProps {
  id?: number;
  onSubmit: (data: PostFormType) => void;
  defaultValues?: PostFormType;
  disabled?: boolean;
}
const ReactQuillEditor = dynamic(() => import("./react-quill-editor"), {
  ssr: false,
});

const AddressMap = dynamic(() => import("@/components/post/form/address-map"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const AddressSearch = dynamic(
  () => import("@/components/post/form/address-search"),
  { ssr: false, loading: () => <p>Loading map...</p> }
);

export default function PostForm({
  id,
  defaultValues,
  onSubmit,
  disabled,
}: WriteFormProps) {
  const [step, setStep] = useState<number>(1);
  const [selectPositions, setSelectPositions] = useState<PlaceType[] | []>([]);
  const { data: findCountriesAll, isLoading: CountriesAreLoading } =
    useFindCountriesAll();
  const { data: findDistrictsAll, isLoading: RegionsAreLoading } =
    useFindDistrictsAll();
  const { data: findCitiesAll, isLoading: CitiesAreLoading } =
    useFindCitiesAll();
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const cities = findCitiesAll ?? [];
  const districts = findDistrictsAll ?? [];
  const countries = findCountriesAll ?? [];

  const filteredCities = cities.filter(
    (cities: CityType) => cities.countries_id === selectedCountry
  );

  const filteredDistricts = districts.filter(
    (district: DistrictType) => district.cities_id === selectedCity
  );

  const form = useForm<PostFormType>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (values: PostFormType) => {
    // if (images.length > 0) {
    //   values.images = [...images];
    // }
    // if (values.description) {
    //   values.description = await replaceImages(values.description, values.slug);
    // }
    console.log("Form values:", values);

    onSubmit(values);
  };
  // const handleImageRemove = (index: number) => {
  //   setImages((prev) => prev.filter((_, i) => i !== index));
  // };

  // const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const newImages: string[] = [];
  //     for (const file of Array.from(files)) {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       const data = await imageUpload(formData);
  //       newImages.push(data);
  //       setImages((prev) => [...prev, ...newImages]);
  //     }
  //   }
  // };

  const { errors } = form.formState;
  console.log("Form errors:", errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-between h-full"
      >
        <div className="space-y-4">
          {step === 1 && (
            <section className="mb-20 md:mb-0 mt-10 flex flex-col gap-4">
              <h1 className="font-semibold text-lg md:text-2xl text-center">
                국가 선택
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 px-10">
                {countries.map((country: CountryType) => (
                  <FormField
                    key={country.id}
                    control={form.control}
                    name="countries_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Label
                            className={cn(
                              "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                              {
                                "border-2 border-primary":
                                  selectedCountry === country.id,
                                "border-2 border-purple-300":
                                  selectedCountry !== country.id,
                              }
                            )}
                            onClick={() => {
                              setSelectedCountry(country.id ?? null);
                              setSelectedCity(null);
                              setSelectedDistrict(null);
                              form.setValue(
                                "districts_id",
                                null as unknown as number
                              );
                              form.setValue(
                                "cities_id",
                                null as unknown as number
                              );
                              field.onChange(country.id);
                            }}
                          >
                            {country.name}
                          </Label>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </section>
          )}
          {step === 2 && (
            <section className="mb-20 md:mb-0 mt-10 flex flex-col gap-4">
              <h1 className="font-semibold text-lg md:text-2xl text-center">
                도시 선택
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 px-10">
                {filteredCities.map((city: CityType) => (
                  <FormField
                    key={city.id}
                    control={form.control}
                    name="cities_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Label
                            className={cn(
                              "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                              {
                                "border-2 border-primary":
                                  selectedCity === city.id,
                                "border-2 border-purple-300":
                                  selectedCity !== city.id,
                              }
                            )}
                            onClick={() => {
                              setSelectedCity(city.id ?? null);
                              setSelectedDistrict(null);
                              form.setValue(
                                "districts_id",
                                null as unknown as number
                              );
                              field.onChange(city.id);
                            }}
                          >
                            {city.name}
                          </Label>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </section>
          )}
          {step === 3 && (
            <section className="mb-20 md:mb-0 mt-10 flex flex-col gap-4">
              <h1 className="font-semibold text-lg md:text-2xl text-center">
                지역 선택
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 px-10">
                {filteredDistricts.map((district: DistrictType) => (
                  <FormField
                    key={district.id}
                    control={form.control}
                    name="districts_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Label
                            className={cn(
                              "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                              {
                                "border-2 border-primary":
                                  selectedDistrict === district.id,
                                "border-2 border-purple-300":
                                  selectedDistrict !== district.id,
                              }
                            )}
                            onClick={() => {
                              setSelectedDistrict(district.id ?? null);
                              if (
                                district.id !== undefined &&
                                district.id !== null
                              ) {
                                form.setValue("districts_id", district.id);
                                field.onChange(district.id);
                              }
                            }}
                          >
                            {district.name}
                          </Label>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </section>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="제목"
                        className="mt-1.5"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(e);
                          const slugValue = e.target.value
                            .replace(/\s+/g, "-")
                            .replace(/:/g, "");
                          form.setValue("slug", slugValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>슬러그</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="슬러그"
                        className="mt-1.5"
                        readOnly
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-1.5">내용</FormLabel>
                    <FormControl>
                      <ReactQuillEditor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex w-full size-full">
                <div className="w-1/2 h-[60vh]">
                  <AddressMap
                    setSelectPositions={setSelectPositions}
                    selectPositions={selectPositions}
                  />
                </div>
                <div className="w-1/2 h-full">
                  <AddressSearch setSelectPositions={setSelectPositions} />
                </div>
              </div>
            </div>
          )}
        </div>
        <ButtonWrap setStep={setStep} step={step} />
      </form>
    </Form>
  );
}
