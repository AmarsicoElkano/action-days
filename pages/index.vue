<script setup>
const { client } = usePrismic();

//METADATA
const { data: metadata } = await useAsyncData("metadata", () =>
  client.getSingle("metadata")
);

//GET Root page
const { data: root } = useAsyncData("[root_page]", () =>
  client.getSingle("root_page")
);

useHead({
  title: root.value?.data.meta_title,
  meta: [
    {
      name: "description",
      content: root.value?.data.meta_description,
    },
  ],
});
</script>

<script>
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

export default {
  data() {
    return {
      sections: [],
      hoveredIndex: null,
    };
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    this.scroll();
  },
  methods: {
    setRef(el) {
      if (el) this.sections.push(el);
    },
    scroll() {
      this.sections.forEach((el) => {
        const titles = gsap.utils.toArray("[data-title]", el);
        const subtitles = gsap.utils.toArray("[data-subtitle]", el);
        const texts = gsap.utils.toArray("[data-text]", el);
        const images = gsap.utils.toArray("[data-image]", el);

        if (titles) {
          titles.forEach((title, index) => {
            const duration = parseInt(title.dataset.duration) || 1.25;
            const scrub = false || title.dataset.scrub;

            const split = new SplitText(title, {
              type: "lines, words",
              linesClass: "overflow-hidden",
            });

            gsap.fromTo(
              split.words,
              duration,
              {
                yPercent: 150,
                opacity: 0,
              },
              {
                ease: "expo.out",
                yPercent: 0,
                opacity: 1,
                stagger: 0.075,
                scrollTrigger: {
                  trigger: el,
                  scrub: scrub,
                  start: "top 30%",
                  markers: false,
                },
                onComplete: () => {
                  split.revert();
                },
              }
            );
          });
        }

        if (subtitles) {
          subtitles.forEach((title, index) => {
            const duration = parseInt(title.dataset.duration) || 1.25;
            const scrub = false || title.dataset.scrub;

            const split = new SplitText(title, {
              type: "lines, words",
              linesClass: "overflow-hidden",
            });

            gsap.fromTo(
              split.words,
              duration,
              {
                opacity: 0,
              },
              {
                ease: "expo.out",
                opacity: 1,
                delay: 0.5,
                stagger: 0.075,
                scrollTrigger: {
                  trigger: el,
                  scrub: scrub,
                  start: "top 30%",
                  markers: false,
                },
                onComplete: () => {
                  split.revert();
                },
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
    },
  },
};
</script>

<template>
  <div>
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

    <article class="relative bg-primary">
      <section :ref="setRef"
        class="bg-gradient-overlay min-h-screen pt-[150px] px-[16px] md:px-[60px] py-[127px] relative overflow-hidden"
        data-section="overview" data-nav="light">
        <div class="relative w-full flex flex-col mdl:flex-row items-start justify-center mdl:justify-between">
          <div class="text-secondary relative z-10">
            <div class="flex justify-between md:justify-normal md:gap-[126px] md:ml-[56px]"></div>
            <div>
              <h1 class="uppercase text-headline_landing_mb sm:text-headline_landing_mbl mdl:text-headline_landing"
                data-title>
                {{ root?.data.title_one }}
              </h1>
              <h1
                class="uppercase text-headline_landing_mb sm:text-headline_landing_mbl mdl:text-headline_landing md:ml-[56px]"
                data-title>
                {{ root?.data.title_two }}
              </h1>
            </div>

            <div class="flex justify-between md:justify-normal md:gap-[126px] md:ml-[56px] max-w-[580px] mt-50">
              <PrismicRichText class="text-landing_mb sm:text-detail_mb md:text-detail" data-subtitle
                :field="root?.data.description" />
            </div>
          </div>

          <div
            class="relative pt-[10vw] sm:pt-[5vw] mdl:pt-0 w-full mdl:w-[auto] text-primary flex flex-col items-center mdl:items-start gap-[30px] mdl:gap-[24px]">
            <PrismicLink v-for="(item, index) in root?.data.card_group" :key="index" :field="item.url_link"
              class="w-full md:w-[inherit]">
              <article
                class="cards-landing relative p-[32px] flex flex-col items-start justify-between w-full sm:w-[500px] mdl:w-[400px] h-full min-h-[220px] mdl:min-h-[180px] card-background"
                @mouseover="hoveredIndex = index" @mouseleave="hoveredIndex = null" :class="{
                  'overlay-mode':
                    hoveredIndex !== null && hoveredIndex !== index,
                }">
                <div class="relative bg-white">
                  <p v-if="item.date">{{ item.date }}</p>
                </div>
                <div class="relative w-full text-primary flex items-center justify-between">
                  <div class="relative max-w-[70rem] sm:max-w-[30rem] mdl:max-w-[15rem] uppercase">
                    <h3>{{ item.title }}</h3>
                  </div>
                  <div class="relative">
                    <svg class="w-[53px] h-[53px] self-end mr-10 mb-5" xmlns="http://www.w3.org/2000/svg" width="42"
                      height="42" viewBox="0 0 42 42" fill="none">
                      <g clip-path="url(#clip0_6_6)">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M15.8414 20.5473H25.5375L21.9525 16.7704C21.741 16.5471 21.7378 16.1825 21.9454 15.9551C22.1537 15.728 22.4934 15.7249 22.7049 15.9474L27.2161 20.7003C27.3185 20.8082 27.3764 20.9554 27.3768 21.1091C27.3775 21.2628 27.321 21.4107 27.2197 21.5194L22.701 26.3703C22.5961 26.4829 22.4586 26.539 22.3212 26.539C22.1841 26.539 22.0467 26.4829 21.9418 26.3703C21.7321 26.1451 21.7321 25.7801 21.9418 25.5553L25.5332 21.7H15.8414C15.5451 21.7 15.3046 21.4418 15.3046 21.1237C15.3046 20.8051 15.5451 20.5473 15.8414 20.5473"
                          fill="#1C4098" />
                      </g>
                      <rect x="1" y="1" width="40" height="40" rx="20" stroke="#1C4098" stroke-linejoin="bevel" />
                      <defs>
                        <clipPath id="clip0_6_6">
                          <rect x="1" y="1" width="40" height="40" rx="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </article>
            </PrismicLink>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
.gradient-overlay {
  background: linear-gradient(to bottom,
      rgba(0, 73, 135, 0) 55%,
      rgba(0, 73, 135, 1) 100%);
}

.bg-gradient-overlay {
  background: radial-gradient(122.77% 108.31% at 107.57% 108.31%,
      #fbb04d 2.14%,
      rgba(0, 158, 219, 0.5) 59.87%,
      rgba(0, 73, 135, 0.06) 99%);
}

.cards-landing {
  background: white;
  box-shadow: -9px 4px 44px 0px #4084be1a;
  transition:
    background-color 0.3s ease,
    mix-blend-mode 0.3s ease;
}

.card-background {
  transition: mix-blend-mode 0.3s ease;
}

.cards-landing.overlay-mode {
  opacity: 0.7;
}
</style>