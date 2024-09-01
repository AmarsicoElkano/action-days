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
    <div class="grid grid-cols-12 md:grid-cols-12 gap-6 z-20 w-full">
      <h1
        class=" col-span-6 col-start-1 px-40 xs:col-start-2 md:col-start-3 lg:col-start-3 uppercase text-headline_mb pt-[220px] sm:pt-[180px] z-20 max-w-[900px] lg:max-w-[1200px]"
        v-if="slice.primary.title">
        <span class="pl-60">{{ slice.primary.title.split(' ')[0] }}</span>
        {{ slice.primary.title.substring(slice.primary.title.indexOf(' ')) }}
      </h1>

    </div>
    <div class="grid grid-cols-12 mt-[80px] md:pt-20 lg:pt-32">
      <div
        class="col-span-12 z-20 px-60 xs:col-start-2 sm:col-start-6 md:col-start-7 lg:col-start-8 lg:col-span-6 flex flex-col items-start justify-center gap-4 pr-8 md:pr-12 lg:pr-16">
        <PrismicRichText class="w-full leading-20 pb-10" style="font-size: 20px;" :field="slice.primary.description" />

        <button
          class="px-20 font-bold text-primary w-full md:w-auto lg:w-auto min-h-[68px] max-w-[360px] text-sm border-[1px] border-primary border-opacity-25 rounded-full uppercase px-8 py-4 mt-8">
          <PrismicLink v-if="slice.primary.registration_link" :field="slice.primary.registration_link"
            class="tracking-wider" style="font-size: 20px;">
            Go to the registration site
          </PrismicLink>
        </button>
      </div>
    </div>
  </section>
</template>