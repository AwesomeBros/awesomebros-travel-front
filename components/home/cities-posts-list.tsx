"use client";

import { CITIES } from "@/constants";
import { useFindPostsByCities } from "@/hooks/query/use-home";
import { PostType } from "@/type/post.type";
import { HomeCitiesType } from "@/type/types";
import { useState } from "react";
import PostItem from "../post/post-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function CitiesPostsList() {
  const [city, setCity] = useState<HomeCitiesType>("서울");
  const { data: postsAll, isLoading } = useFindPostsByCities(city);

  return (
    <>
      <div className="text-black text-2xl font-medium mb-5">도시별 후기</div>
      <Tabs value={city}>
        <TabsList className="w-full flex flex-wrap">
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
              postsAll.map((post: PostType) => (
                <PostItem key={post.id} post={post} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
