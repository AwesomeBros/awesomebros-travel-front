"use client";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Controller, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import { useState } from "react";
import "swiper/css";

export default function Hero() {
  const [textSwiper, setTextSwiper] = useState<SwiperClass | null>(null);
  const [imageSwiper, setImageSwiper] = useState<SwiperClass | null>(null);
  return (
    <section className="w-full overflow-hidden">
      <Swiper
        className="relative top-[50%] h-[50vh] md:top-0 left-0 w-full md:h-screen bg-[#1d1a26] [clip-path:polygon(100%_1%,_0_1%,_0_100%,_100%_100%)] md:[clip-path:polygon(39.5%_0,_0_0,_0_100%,_69.5%_100%)]"
        style={{
          position: "absolute",
        }}
        effect="slide"
        direction="vertical"
        speed={1000}
        longSwipesRatio={0.01}
        grabCursor={true}
        watchSlidesProgress={true}
        mousewheel={true}
        modules={[Controller]}
        onSwiper={setTextSwiper}
        controller={{ control: imageSwiper }}
      >
        <SwiperSlide>
          <div className="h-screen w-full flex flex-col mt-[25%] md:mt-0 justify-start md:justify-center items-center transition-all duration-300 p-[6px] md:w-[40%] text-center md:text-start text-[#cfc9dc] bg-[#1d1927cc] select-none ">
            <h2 className="text-[2rem] leading-[1.1] md:text-[clamp(2.5rem,3vw,4rem)] bg-clip-text">
              Seoul, Korea
            </h2>
            <p className="mt-[15px] md:ml-[10%] md:h-0 md:leading-[1.6] text-[0.95rem] leading-[1.4] md:text-[clamp(1rem, 2vw, 1.4rem)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-screen w-full flex flex-col mt-[25%] md:mt-0 justify-start md:justify-center items-center transition-all duration-300 p-[6px] md:w-[40%] text-center md:text-start text-[#cfc9dc] bg-[#1d1927cc] select-none ">
            <h2 className="text-[2rem] leading-[1.1] md:text-[clamp(2.5rem,3vw,4rem)] bg-clip-text">
              Buenos Aires, Aregentina
            </h2>
            <p className="mt-[15px] md:ml-[10%] md:h-0 md:leading-[1.6] text-[0.95rem] leading-[1.4] md:text-[clamp(1rem, 2vw, 1.4rem)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        className="relative md:h-screen h-[50vh] top-0 right-0 md:w-[60%] md:[clip-path:polygon(0_0,_100%_0,_100%_100%,_50%_100%)] md:bottom-0 bottom-[50%] w-full [clip-path:polygon(100%_0,_0_0,_0_100%,_100%_100%)]"
        style={{
          position: "absolute",
        }}
        effect="fade"
        allowTouchMove={false}
        modules={[EffectFade, Controller]}
        onSwiper={setImageSwiper}
        controller={{ control: textSwiper }}
      >
        <SwiperSlide className="img-slide">
          <div className="relative size-full">
            <Image
              src="/images/seoul.jpg"
              className="object-cover md:object-[40%_50%] object-[50%_0%]"
              fill
              style={{
                filter: "brightness(1)",
              }}
              alt=""
            />
          </div>
          <div className="absolute inset-0 size-full bg-[#29214333]" />
        </SwiperSlide>
        <SwiperSlide className="img-slide">
          <div className="relative size-full">
            <Image
              src="/images/obelisk.jpg"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "40% 50%",
                filter: "brightness(1)",
              }}
              alt=""
            />
          </div>
          <div className="absolute inset-0 size-full bg-[#29214333]" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
