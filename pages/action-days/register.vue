<script setup lang="ts">
const prismic = usePrismic();

import { components } from '~/slices';

//GET Registration page
const { data: register } = useAsyncData("[registration_page]", () =>
  prismic.client.getSingle("registration_page"),
);

useHead({
  title: register.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: register.value?.data.meta_description,
    },
  ],
});
</script>


<template>

  <!-- hero -->
  <section class="bg-primary min-h-screen pt-[150px] px-[16px] md:px-[60px] relative">
    <img src="/public/img/ellipse.svg" class="absolute top-20 left-0 right-0 mx-auto" />
    <div class="text-secondary relative z-10">
      <div class="pl-60">
        <p class="uppercase text-highlight sm:text-titleSection_mb md:text-titleSection lg:text-titleSection font-bold"
          data-title>
          {{ register?.data.title_line_1 }}
          <span class="text-base_mb uppercase pl-40" data-subtitle>
            {{ register?.data.date }}
          </span>
        </p>

        <p class="uppercase text-highlight sm:text-titleSection_mb md:text-titleSection lg:text-titleSection font-bold flex flex-row py-15"
          data-title>
          <span class="text-base_mb md:text-detail uppercase md:w-[120px] mr-40" data-subtitle>
            {{ register?.data.location }}
          </span>
          {{ register?.data.title_line_2 }}
        </p>

        <p class="uppercase text-highlight sm:text-titleSection_mb md:text-titleSection lg:text-titleSection font-black ml-[41px]"
          data-title>
          {{ register?.data.title_line_3 }}
        </p>
      </div>

      <div class="flex flex-col items-end justify-center gap-60 pt-80">
        <div class=" max-w-[600px] w-full h-full gap-20">
          <PrismicRichText :field="register?.data.description_hero" />

          <button class="px-20 font-bold text-white w-full md:w-auto lg:w-auto min-h-[68px] max-w-[390px] text-sm border-[1px]
            border-white border-opacity-25 rounded-full uppercase px-8 py-4 mt-40">
            <PrismicLink v-if="register?.data.link_to_registration" :field="register?.data.link_to_registration"
              class="tracking-wider" style="font-size: 20px;">
              Go to the registration site
            </PrismicLink>
          </button>

        </div>

      </div>
    </div>
  </section>

  <!-- app stores -->
  <section class="bg-primary h-auto pb-80 pt-[50px] px-[16px] md:px-[60px] relative"
    v-if="register?.data.title_app.length">
    <div class="border-[1px] border-white border-opacity-25 px-60 py-60 flex flex-row gap-40">
      <PrismicImage v-if="register?.data.image_qr_app" :field="register?.data.image_qr_app" />

      <div class="flex flex-col leading-10">
        <PrismicRichText class="text-secondary ml-10 text-title_base" :field="register?.data.title_app" />

        <p class="text-secondary ml-80 max-w-[600px] pt-40 text-detail_sm ">
          {{ register?.data.description_app }}
        </p>

        <div class="flex flex-row gap-20 ml-80">
          <button
            class="font-bold text-base min-w-[180px] border-[1px] border-white border-opacity-25 z-[100] rounded-full uppercase text-white pl-30 pr-30 py-20 mt-30">
            <PrismicLink v-if="register?.data.link_apple_store" :field="register?.data.link_apple_store"
              class="tracking-wider">app store
            </PrismicLink>
          </button>

          <button
            class="font-bold text-base min-w-[180px] border-[1px] border-white border-opacity-25 z-[100] rounded-full uppercase text-white pl-30 pr-30 py-20 mt-30">
            <PrismicLink v-if="register?.data.link_play_store" :field="register?.data.link_apple_store"
              class="tracking-wider">play store
            </PrismicLink>
          </button>
        </div>

      </div>
    </div>
  </section>

  <SliceZone wrapper="main" :slices="register?.data.slices ?? []" :components="components" />

</template>