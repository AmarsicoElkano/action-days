<script setup>
import { components } from "~/slices";
const { client } = usePrismic();
const route = useRoute();

//GET ALL EVENTS

const slug = route.params.uid;

const { data: page } = useAsyncData(`[slug]`, () =>
  client.getByUID("page", slug)
);

//METADATA
const { data: metadata } = await useAsyncData("metadata", () =>
  client.getSingle("metadata")
);
</script>

<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

export default {
  data() {
    return {
      sections: [],
      context: [],
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    this.context = gsap.context(() => {
      this.scroll();
    });
  },
  beforeDestroy() {
    if (this.context) this.context.revert();
  },
  methods: {
    setRef(el) {
      if (el) this.sections.push(el);
    },
    scroll() {
      this.sections.forEach((el) => {
        const titles = gsap.utils.toArray("[data-title-event-hero]", el);
        const subtitles = gsap.utils.toArray("[data-subtitle]", el);
        const texts = gsap.utils.toArray("[data-text]", el);
        const images = gsap.utils.toArray("[data-image]", el);

        if (titles) {
          titles.forEach((title, index) => {
            const duration = parseInt(title.dataset.duration) || 1.25;
            // const scrub = false || title.dataset.scrub;

            const split = new SplitText(title, {
              type: "lines, words",
              linesClass: "overflow-hidden",
            });

            gsap.fromTo(
              split.words,
              {
                yPercent: 150,
                opacity: 0,
              },
              {
                ease: "expo.out",
                yPercent: 0,
                opacity: 1,
                stagger: 0.075,
                delay: 0.3,
                duration: duration,
              }
            );
          });
        }

        if (subtitles) {
          subtitles.forEach((title, index) => {
            const duration = parseInt(title.dataset.duration) || 1.25;
            // const scrub = false || title.dataset.scrub;

            const split = new SplitText(title, {
              type: "lines, words",
              linesClass: "overflow-hidden",
            });

            gsap.fromTo(
              split.words,
              {
                opacity: 0,
              },
              {
                ease: "expo.out",
                opacity: 1,
                stagger: 0.075,
                delay: 0.4,
                duration: duration,
              }
            );
          });
        }

        if (texts) {
          texts.forEach((text, index) => {
            const scrub = false || text.dataset.scrub;
            gsap.fromTo(
              text,
              {
                opacity: 0,
                yPercent: 150,
              },
              {
                opacity: 1,
                yPercent: 0,
                scrollTrigger: {
                  trigger: el,
                  scrub: scrub,
                  start: "top 30%",
                  markers: false,
                },
              }
            );
          });
        }

        if (images) {
          images.forEach((image, index) => {
            gsap.fromTo(
              image,
              {
                opacity: 0,
                yPercent: 150,
              },
              {
                opacity: 1,
                yPercent: 0,
                scrollTrigger: {
                  trigger: el,
                  scrub: false,
                  start: "top 70%",
                  end: "bottom 100%",
                  markers: false,
                },
              }
            );
          });
        }
      });
    }
  },
};
</script>

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
    <section :ref="setRef" class="relative w-screen h-screen" data-nav="light" data-section="overview">
      <div class="absolute inset-0">
        <PrismicImage v-if="page?.data.hero_image" :field="page?.data.hero_image"
          class="absolute inset-0 top-0 z-0 w-full h-full object-cover z-1" />
        <div class="absolute inset-0 bg-[#000] bg-opacity-[0.1] z-2"></div>
      </div>
      <div
        class="absolute left-[16px] md:left-[0] bottom-[32px] md:bottom-0 md:relative text-secondary md:pt-[150px] z-5">
        <p data-subtitle class="md:pl-[170px] text-detail">
          {{ page.data?.label_event }}
        </p>

        <h1 data-title-event-hero class="text-headline_small_mb md:text-headline uppercase pl-[60px] md:pl-[210px]">
          {{ page.data?.title_one }}
        </h1>

        <h1 data-title-event-hero class="text-headline_small_mb md:text-headline uppercase pl-[20px] md:pl-[110px]">
          {{ page.data?.title_two }}
        </h1>

        <div data-title-event-hero
          class="relative text-white text-[38px] leading-none uppercase pl-[60px] md:pl-[210px] pt-20">
          <div v-if="page?.data?.title_three">
            <span class="font-bold text-secondary">{{ page?.data?.title_three }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- secondary navigation -->
    <SecondaryNavigationEvents />

    <!-- info -->
    <section id="overview" :ref="setRef" data-nav="light" data-section="overview"
      class="bg-primary py-[80px] px-[16px] md:px-[120px] text-secondary">
      <div class="flex flex-col md:flex-row justify-between w-full pb-[40px] md:pb-[80px] gap-80">
        <div class="md:w-[30%] flex flex-col gap-[40px]">
          <div data-text>
            <p class="uppercase text-landing_mb font-bold mb-[14px]">Convenor</p>
            <p class="text-xsm uppercase leading-[1.48]">
              {{ page.data?.agency }}
            </p>
          </div>
          <div data-text>
            <p class="uppercase text-landing_mb font-bold mb-[14px]">Focal Point</p>
            <PrismicRichText class="text-xsm uppercase break-words leading-[1.48]" :field="page.data?.focal_point" />
          </div>
          <div data-text>
            <p class="uppercase text-landing_mb font-bold mb-[14px]">Where</p>
            <p class="text-xsm uppercase leading-[1.48]">
              {{ page.data?.location }}
            </p>
          </div>
          <div data-text>
            <p class="uppercase text-landing_mb font-bold mb-[14px]">When</p>
            <p class="text-xsm uppercase leading-[1.48]">
              {{ page.data?.date }}
            </p>
          </div>
        </div>

        <div class="md:w-[70%] max-w-[750px]">
          <div class="pt-80 pb-40 leading-[1.48] text-highlight">
            <PrismicRichText data-text :field="page.data?.overview_primary_text" />
          </div>
          <div class="relative">
            <div class="relative" data-text>
              <PrismicRichText :field="page.data?.overview_secondary_text"
                class="pb-[54px] text-landing_mb leading-[1.48]" />
              <NuxtLink :to="'/action-days/register'">
                <button
                  class="tracking-wider	min-h-[52px] font-bold text-base_xsm h-[40px] border border-white border-opacity-25 rounded-full uppercase text-white pl-30 pr-30">
                  PARTICIPATION to the event
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SliceZone wrapper="main" :slices="page?.data.slices ?? []" :components="components" />
  </div>
</template>