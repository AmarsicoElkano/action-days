<script setup lang="ts">
import { type Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.DontMissAnythingSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section class="bg-light w-full h-auto min-h-[900px] py-[80px] relative text-primary overflow-hidden">

    <PrismicImage class="absolute top-[-240px] right-0 max-w-[750px] z-0" :field="slice.primary.symbol_top_right" />
    <PrismicImage class="absolute bottom-[-240px] left-0 max-w-[750px] z-0" :field="slice.primary.symbol_bottom_left" />


    <h1 class="uppercase text-headline_mb pt-[220px] sm:pt-120 pl-80 max-w-[500px] lg:max-w-[700px] z-20 relative"
      v-if="slice.primary.title">
      <span class="pl-60">{{ slice.primary.title.split(' ')[0] }}</span>
      {{ slice.primary.title.substring(slice.primary.title.indexOf(' ')) }}
    </h1>

    <div class="flex flex-col items-end justify-center gap-60 pt-140 sm:pt-180 z-20 md:pt-100 lg:w-[700px]">
      <div class=" w-[390px] xs:max-w-[390px] sm:max-w-[600px] h-full gap-20 pr-80 sm:mr-120 md:mr-120 lg:mr-120 z-20">
        <div class=" absolute right-[40%] bottom-[20%]">
          <PrismicRichText class="z-20 w-full leading-20 xs:leading-20 sm:leading-20 md:leading-20 lg:leading-20"
            :field="slice.primary.description" />
          <button
            class="font-bold text-primary w-full min-w-[360px] xs:w-full sm:w-[auto] md:w-[auto] lg:w-[auto] min-h-[68px] text-sm border-[1px] border-primary border-opacity-25 z-[100] rounded-full uppercase  text-sm pl-30 pr-30 py-25 mt-120 xs:mt-80 sm:mt-30 md:mt-30 lg:mt-30">
            <PrismicLink v-if="slice.primary.registration_link" :field="slice.primary.registration_link"
              class="tracking-wider">
              Go to the registration site
            </PrismicLink>
          </button>
        </div>

      </div>
    </div>

  </section>
</template>