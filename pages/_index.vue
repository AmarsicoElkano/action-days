<script setup>
import { ref, computed } from 'vue';
import { usePrismic } from '@prismicio/vue';
import SecondaryNavigation from '~/components/SecondaryNavigation.vue';

const prismic = usePrismic();

function alert() {
  console.log('test')
}

//GET ALL EVENTS
const { data: events } = await useAsyncData('index', () =>
  prismic.client.getAllByType('page')
);
// GET SINGLE HOME
const { data: home } = await useAsyncData('index', () =>
  prismic.client.getSingle('home')
);

useHead({
  //title: prismic.asText(page.value?.data.title)
});

const getSliceByType = (home, type) => {
  return computed(() => {
    if (home.value.data && home.value.data.slices) {
      return home.value.data.slices.filter((slice) => slice.slice_type === type);
    }
    return [];
  });
};


/* const toggleFAQ = () => {
  console.log("heeeelo")
}; */

const announcementsSlice = getSliceByType(home, 'announcements');
const agendaSlices = getSliceByType(home, 'agenda');
const whenAndWhereSlice = getSliceByType(home, 'whenand_where');
const faqsSlice = getSliceByType(home, 'faqs');
const downloadsSlice = getSliceByType(home, 'downloads');

</script>


<template>

  <section class="bg-primary min-h-screen pt-[150px] px-[60px] py-[127px]">
    <div class="text-secondary">
      <div class="flex gap-[126px] ml-[56px]">
        <p class="text-deatil">
          {{ home?.data.date }}
        </p>
        <p class="text-deatil">
          {{ home?.data.location }}
        </p>
      </div>
      <div>
        <h1 class="uppercase text-headline ml-[56px]">
          {{ home?.data.title_one }}
        </h1>
        <h1 class="uppercase text-headline">
          {{ home?.data.title_two }}
        </h1>
        <h1 class="uppercase text-headline ml-[61px]">
          {{ home?.data.title_three }}
        </h1>
      </div>
    </div>
  </section>

  <!-- secondary navigation -->
  <SecondaryNavigation />

  <section class="bg-primary text-white">
    <div class="flex items-center">
      <div class="w-1/2 pt-[132px]">
        <PrismicImage class="w-full h-[auto] max-w-[617px]" :field="home?.data.main_image" />
      </div>
      <div class="w-1/2 pr-[120px]">
        <PrismicRichText class="" :field="home?.data.intro_text" />
      </div>
    </div>
  </section>

  <section class="bg-primary px-40 py-[200px] text-white">
    <div v-for="(announcement, idx) in announcementsSlice" :key="idx">
      <h2 class="text-lg text-center w-full uppercase text-titleSection">
        {{ announcement.primary.title }}
      </h2>

      <Swiper :slides-per-view="1" :space-between="0" :loop="true" :modules="modules">
        <SwiperSlide v-for="(item, idx) in announcement.primary.announcements" :key="idx" ref="items" class="">
          <div class="flex items-center bg-[#195587]">
            <PrismicImage :field="item.image" class="w-1/2" />
            <div class="px-[65px] w-1/2">
              <div class="mb-[160px]">
                <p class="uppercase font-bold pb-40 text-base">
                  {{ item.subtitle }}
                </p>
                <PrismicRichText :field="item.paragraph" />
              </div>
              <div class="flex">
                <button
                  class="font-bold text-sm border border-[var(--burger-color)] z-[100] rounded-full uppercase text-white text-sm pl-30 pr-30 py-10">
                  View the Programme
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>

  <!-- agenda hero -->
  <section id="agenda"
    class="w-full min-h-screen relative text-primary bg-secondary pt-[120px] pl-60 pr-[100px] flex items-center">
    <div class="flex flex-row gap-[60px]">
      <h2 class="text-titleSection uppercase w-9/12 max-w-[722px]" data-title>
        {{ home?.data.agenda_title }}
      </h2>
      <PrismicRichText class="w-1/2 pt-[170px]" :field="home?.data.agenda_text" />
    </div>
  </section>
  <!-- agenda schedule -->
  <section v-for="(agenda, idx) in agendaSlices" :key="idx" class="w-full h-auto bg-secondary" :class="{
    'pb-[100px]': idx !== agendaSlices.length - 1,
    'pb-[213px]': idx == agendaSlices.length - 1,
  }">
    <div class="w-full bg-secondary min-h-screen">
      <div class="grid-layout pt-[100px] relative">
        <PrismicImage :field="agenda.primary.bg_symbol" class="absolute inset-0 w-full h-full z-0" />
        <div class="items-center grid-layout relative" />
        <div class="flex flex-col">
          <p class="text-primary uppercase text-base w-[300px] font-bold">
            {{ agenda.primary.title }}
          </p>
          <p class="text-primary text-sm w-[300px]">
            {{ agenda.primary.date }}
          </p>
        </div>
        <div class="h-screen relative col-start-6 col-span-12">
          <div ref="masonry" class="masonry grid gap-[20px] relative">
            <div class="content text-primary text-download uppercase">
              <div class="p-20 grid grid-cols-2 w-[720px] gap-20">
                <div v-for="(el, idx) in agenda.primary.card_group" :key="idx"
                  class="p-20 bg-white w-full max-w-[330px] flex flex-col" :class="idx === 1 ? 'mt-20' : ''">
                  <PrismicLink :field="el.link" class="group">
                    <span class="block mb-80 text-sm">
                      {{ el.subtitle }}
                    </span>
                    <div class="mt-auto">
                      <PrismicRichText :field="el.paragraph"
                        :class="el.xl_font_size ? 'mt-auto text-md' : 'mt-auto text-base'" />
                    </div>
                  </PrismicLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- when & where section -->
  <section id="when&where" class="bg-primary w-full min-h-screen">
    <div v-for=" (data, idx) in whenAndWhereSlice" :key="idx">
      <PrismicImage :field="data.primary.bg_symbol" class="z-[10] absolute w-full h-full left-0" />
      <div class="flex flex-row gap-100 py-60 pl-40 pr-40">
        <PrismicImage :field="data.primary.image" class="sm:w-[450px] pt-10" />
        <div class="z-[20] flex flex-col gap-100 pt-40">
          <div v-for="(item, index) in data.primary.questions" :key="index" class="text-secondary ">
            <h1 class=" uppercase text-md">
              {{ item.question_title }}
            </h1>
            <p class="pl-40 pt-40">
              {{ item.question_response }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- faqs section -->
  <section id="faqs" class="bg-primary w-full min-h-screen flex w-full py-80 justify-between px-[60px]">
    <h1 class="w-1/3 text-center text-titleSection text-secondary text-uppercase">
      FAQs
    </h1>

    <div v-for=" (data, index) in faqsSlice" :key="index">
      <div v-for=" (item, idx) in data.primary.faqs" :key="idx">
        <div class="relative mb-3 w-[650px] py-[40px] border-b border-solid border-secondary">
          <div class="mb-0">
            <div
              class="relative flex justify-center items-center p-8 uppercase text-left transition-all ease-in cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-secondary"
              @click="alert">
              <span class="pr-80"> {{ item.title_faq }}</span>
              <img ref="minusSign-{idx}" src="/public/img/minus.svg" class="minusSign absolute right-0 hidden ml-80 ">
              <img ref="plusSign" src="/public/img/plus.svg" class="plusSign absolute right-0 ml-80 block">
            </div>
          </div>
          <div class="text-secondary transition-all duration-300 ease-in-out overflow-hidden max-h-0">
            <div class="p-4 text-sm leading-normal text-blue-gray-500">
              <PrismicRichText class="faqResponse" :field="item.description_faq" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- downloads section -->
  <section class="w-full h-screen bg-primary relative py-20">
    <div v-if="downloadsSlice">
      <div v-for=" (data, idx) in downloadsSlice" :key="idx">
        <div class="grid-layout items-center relative">
          <div class="col-start-2 col-span-10 mb-60 flex gap-[200px]">
            <h2 class="text-xl text-titleSection text-secondary uppercase w-[360px]">
              {{ data.primary.title }}
            </h2>
            <div class="col-start-4 col-span-10 pt-60 pb-40 md:pb-0">
              <p class="text-secondary text-md md:text-base w-[360px]">
                {{ data.primary.paragraph }}
              </p>
            </div>
          </div>
          <div class="col-start-2 col-span-10 md:col-start-7 md:col-span-5">
            <div class="md:flex">
              <div v-for="(item, index) in data.primary.documents" :class="{ 'ml-80': index != 0 }">
                <PrismicLink :field="item.download_url" class="group">
                  <figure class="relative">
                    <figcaption
                      class="absolute z-10 w-full h-full px-20 py-30 text-primary flex flex-col justify-between">
                      <p class="text-md md:text-base">
                        {{ item.subtitle }}
                      </p>
                      <h3 class="text-download uppercase text-md md:text-base">
                        {{ item.title }}
                      </h3>
                    </figcaption>
                    <PrismicImage class="z-0 w-full md:w-auto" :field="item.banner_image" />
                  </figure>
                  <div class="flex items-center justify-between mt-20">
                    <h4 class="text-secondary uppercase tracking-[0.08em] text-md md:text-xsm">
                      {{ item.download_text }}
                    </h4>
                    <div
                      class="w-[35px] h-[35px] flex flex-col border border-[var(--secondary-color)] rounded-full items-center justify-center relative before:absolute before:w-full before:h-full before:bg-primary before:inset-0 before:rounded-full before:scale-0 before:transition-transform group-hover:before:scale-90 before:duration-300 active:before:scale-100">
                      <div class="inline-flex relative overflow-hidden">
                        <div
                          class="w-full h-full relative delay-150 group-hover:delay-0 transition-transform duration-200 expo-out group-hover:translate-y-full">
                          <svg class="w-15 h-15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 9.22754L8.37892 15.9028L1.75784 9.22754" stroke="var(--secondary-color)"
                              stroke-width="2" stroke-miterlimit="13.33" stroke-linecap="square" />
                            <path d="M8.38281 14.9028L8.38281 1" stroke="var(--secondary-color)" stroke-width="2"
                              stroke-linecap="square" stroke-linejoin="round" />
                          </svg>
                        </div>
                        <div
                          class="w-full h-full absolute -top-full delay-0 group-hover:delay-150 transition-transform duration-200 expo-out group-hover:translate-y-full">
                          <svg class="w-15 h-15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 9.22754L8.37892 15.9028L1.75784 9.22754" stroke="var(--white)" stroke-width="2"
                              stroke-miterlimit="13.33" stroke-linecap="square" />
                            <path d="M8.38281 14.9028L8.38281 1" stroke="var(--white)" stroke-width="2"
                              stroke-linecap="square" stroke-linejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </PrismicLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { data } from 'autoprefixer';

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Pagination, Navigation],
      items: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.addEvents();
    },
    addEvents() {
    },
    toggleFAQ() {
      console.log("hello")
    }
  },
};
</script>

<style>
@import 'swiper/swiper-bundle.css';
</style>