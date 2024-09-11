<script setup>
import { components } from "~/slices";

const prismic = usePrismic();

//METADATA
const { data: metadata } = await useAsyncData("metadata", () =>
  prismic.client.getSingle("metadata")
);

//GET Registration page
const { data: register } = useAsyncData("[registration_page]", () =>
  prismic.client.getSingle("registration_page")
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

<script>
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default {
  data() {
    return {};
  },

  mounted() {
    gsap.registerPlugin(SplitText);

    document.fonts.ready.then(() => {
      this.$nextTick(() => {
        this.onLoad();
      });
    });
  },

  methods: {
    onLoad() {
      const section = this.$refs.hero;
      const items = gsap.utils.toArray("[data-item]", section);
      const texts = gsap.utils.toArray(".rich-text-register div p", section);

      if (items.length) {
        gsap.fromTo(
          items,
          {
            autoAlpha: 0,
            yPercent: 100,
          },
          {
            duration: 1.5,
            ease: "expo.out",
            autoAlpha: 1,
            yPercent: 0,
            stagger: 0.125,
          }
        );
      }

      if (texts.length) {
        gsap.set(".rich-text-register", { autoAlpha: 1 });
        gsap.fromTo(
          texts,
          {
            autoAlpha: 0,
            yPercent: 100,
          },
          {
            duration: 1.5,
            ease: "expo.out",
            autoAlpha: 1,
            yPercent: 0,
            stagger: 0.125,
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.rich-text-register div {
  gap: 2rem;
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <Html>

    <Head>
      <Title>{{ metadata?.data?.meta_title }}</Title>
      <Meta name="description" :content="metadata?.data?.meta_description" />
      <Meta property="og:title" :content="metadata?.data?.meta_title" />
      <Meta property="og:description" :content="metadata?.data?.meta_description" />
      <Meta property="og:image" :content="`${metadata?.data?.share_image.url}&w=1920`" />
      <Meta property="og:type" content="website" />
      <Meta property="twitter:card" content="summary_large_image" />
      <Meta property="twitter:title" :content="metadata?.data?.meta_title" />
      <Meta property="twitter:description" :content="metadata?.data?.meta_description" />
      <Meta property="twitter:image" :content="`${metadata?.data?.share_image.url}&w=1920`" />
      <Link rel="icon" type="image/png" :href="`${metadata?.data?.favicon.url}&w=64`" />
    </Head>

  </Html>
  <div>
    <!-- hero -->
    <section ref="hero" class="bg-primary min-h-screen pt-[150px] px-[16px] md:px-[60px] relative">
      <img src="/public/img/ellipse.svg" class="absolute top-20 left-0 right-0 mx-auto" />
      <div class="text-secondary relative z-10">
        <div class="pl-40">
          <p class="tracking-tighter uppercase text-highlight sm:text-titleSection_mb md:text-titleSection lg:text-titleSection font-bold invisible"
            data-item>
            {{ register?.data.title_line_1 }}
            <span class="text-base_mb uppercase pl-30 tracking-normal whitespace-nowrap" data-subtitle>
              {{ register?.data.date }}
            </span>
          </p>

          <p class="tracking-tighter uppercase text-highlight sm:text-titleSection_mb md:text-titleSection lg:text-titleSection font-bold flex flex-row pt-25 invisible"
            data-item>
            <span class="tracking-normal text-base_mb md:text-detail uppercase md:w-[120px] mr-40 pt-8" data-subtitle>
              {{ register?.data.location }}
            </span>
            {{ register?.data.title_line_2 }}
          </p>

          <p class="tracking-tighter uppercase text-highlight sm:text-titleSection_mb md:text-titleSection lg:text-titleSection font-black ml-[41px] invisible"
            data-item>
            {{ register?.data.title_line_3 }}
          </p>
        </div>

        <div class="flex flex-col items-end justify-center gap-60 pt-80">
          <div class="max-w-[600px] w-full h-full">
            <div class="rich-text-register relatuve w-full invisible">
              <PrismicRichText :field="register?.data.description_hero" />
            </div>

            <button
              class="md:px-30 font-bold text-white w-full md:w-auto lg:w-auto min-h-[68px] max-w-[390px] text-sm border-[1px] border-white border-opacity-25 rounded-full uppercase px-14 py-4 mt-40">
              <PrismicLink v-if="register?.data.link_to_registration" :field="register?.data.link_to_registration"
                class="tracking-wider" style="font-size: 20px">
                PARTICIPATION
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

          <p class="text-secondary ml-80 max-w-[600px] pt-40 text-detail_sm">
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
  </div>
</template>