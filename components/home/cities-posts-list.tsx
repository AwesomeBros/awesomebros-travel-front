"use client";

import { CITIES } from "@/constants";
import { useFindPostsByCity } from "@/hooks/query/use-home";
import { HomeCitiesType, PostType } from "@/type";
import { useState } from "react";
import PostItem from "../post/post-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function CitiesPostsList() {
  const [city, setCity] = useState<HomeCitiesType>("서울");
  const { data: postsAll, isLoading } = useFindPostsByCity(city);

  return (
    <>
      <Tabs value={city}>
        <TabsList className="w-full flex flex-wrap shadow-md">
          {CITIES.map((city) => (
            <TabsTrigger
              value={city}
              onClick={() => setCity(city as HomeCitiesType)}
              key={city}
            >
              {city}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={city}>
          <div className="w-full flex flex-col py-3 gap-6">
            {isLoading ? null : postsAll.length === 0 ? (
              <div className="w-full h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  후기가 존재하지 않습니다.
                </p>
              </div>
            ) : (
              postsAll.map((post: PostType, index: number) => (
                <PostItem key={post.id} post={post} index={index} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
