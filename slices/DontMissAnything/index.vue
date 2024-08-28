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
  <section class="bg-light w-full h-[800px] relative text-primary overflow-hidden">

    <PrismicImage class="absolute top-[-240px] right-0 max-w-[750px] z-0" :field="slice.primary.symbol_top_right" />
    <PrismicImage class="absolute bottom-[-240px] left-0 max-w-[750px] z-0" :field="slice.primary.symbol_bottom_left" />


    <h1 class="uppercase text-headline_mb pt-140 pl-80 max-w-[500px] z-20 relative" v-if="slice.primary.title">
      <span class="pl-60">{{ slice.primary.title.split(' ')[0] }}</span>
      {{ slice.primary.title.substring(slice.primary.title.indexOf(' ')) }}
    </h1>

    <div class="flex flex-col items-end justify-center gap-60 pt-120 z-20">
      <div class="max-w-[600px] w-full h-full gap-20 mr-120 z-20">
        <PrismicRichText class="z-20 leading-10" :field="slice.primary.description" />
        <button
          class="font-bold max-w-[330px] text-sm border-[1px] border-primary border-opacity-25 z-20 rounded-full uppercase text-primary text-sm pl-30 pr-30 py-20 mt-30">
          <PrismicLink :field="slice.primary.registration_link"> Go to the registration site</PrismicLink>
        </button>
      </div>
    </div>

  </section>
</template>