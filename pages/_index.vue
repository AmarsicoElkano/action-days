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
  <!-- hero -->
  <!-- <section
    class="w-full h-full pt-20 pb-130 relative bg-primary overflow-hidden"
    data-logo="#ffffff"
    data-burger="#ffffff"
  >
    <figure
      ref="heroArrow"
      class="absolute right-0 w-[1000px] top-[-30%] z-0"
    >
      <svg
        width="1067"
        height="1035"
        class="absolute w-full right-0"
        viewBox="0 0 1067 1035"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M989.311 700.278H699.485C520.907 700.278 376.098 845.169 376.098 1024"
          stroke="url(#paint0_radial_970_1766)"
          stroke-width="80"
          stroke-miterlimit="10"
        />
        <path
          d="M40 1033C40 763.923 253.624 373 693.078 373C1132.53 373 850.142 373 969.5 373"
          stroke="url(#paint1_linear_970_1766)"
          stroke-width="80"
          stroke-miterlimit="10"
        />
        <g filter="url(#filter0_d_970_1766)">
          <path
            d="M206 40C206 242.623 366.642 537 697.104 537C1027.57 537 874.245 537 964 537"
            stroke="url(#paint2_radial_970_1766)"
            stroke-width="80"
            stroke-miterlimit="10"
            shape-rendering="crispEdges"
          />
        </g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M330 40C330 117.27 360.262 209.501 420.815 282.871C482.255 357.317 575.577 413 699.745 413H701.042H702.334H703.621H704.902H706.177H707.447H708.712H709.972H711.226H712.474H713.718H714.956H716.189H717.416H718.638H719.855H721.067H722.273H723.474H724.67H725.861H727.047H728.227H729.403H730.573H731.738H732.898H734.053H735.203H736.347H737.487H738.621H739.751H740.876H741.995H743.11H744.22H745.324H746.424H747.519H748.609H749.694H750.774H751.849H752.92H753.985H755.046H756.102H757.153H758.199H759.241H760.278H761.31H762.337H763.36H764.378H765.391H766.4H767.404H768.403H769.398H770.388H771.373H772.354H773.331H774.302H775.27H776.232H777.191H778.144H779.093H780.038H780.978H781.914H782.846H783.773H784.695H785.614H786.527H787.437H788.342H789.243H790.139H791.032H791.919H792.803H793.682H794.558H795.428H796.295H797.158H798.016H798.87H799.72H800.566H801.408H802.245H803.079H803.908H804.733H805.555H806.372H807.185H807.994H808.799H809.6H810.398H811.191H811.98H812.766H813.547H814.324H815.098H815.868H816.634H817.396H818.154H818.908H819.659H820.406H821.149H821.888H822.624H823.355H824.084H824.808H825.529H826.246H826.959H827.669H828.375H829.077H829.776H830.471H831.163H831.851H832.535H833.216H833.894H834.568H835.238H835.905H836.569H837.229H837.886H838.539H839.189H839.835H840.478H841.118H841.754H842.387H843.017H843.643H844.266H844.886H845.502H846.116H846.726H847.333H847.936H848.536H849.134H849.728H850.319H850.906H851.491H852.073H852.651H853.226H853.799H854.368H854.934H855.497H856.057H856.614H857.169H857.72H858.268H858.813H859.356H859.895H860.432H860.965H861.496H862.024H862.549H863.072H863.591H864.108H864.622H865.133H865.641H866.147H866.65H867.15H867.647H868.142H868.634H869.124H869.61H870.095H870.576H871.055H871.531H872.005H872.477H872.945H873.411H873.875H874.336H874.795H875.251H875.705H876.156H876.605H877.052H877.496H877.937H878.377H878.814H879.248H879.68H880.11H880.538H880.963H881.386H881.807H882.226H882.642H883.056H883.468H883.878H884.285H884.691H885.094H885.495H885.894H886.291H886.686H887.078H887.469H887.858H888.244H888.629H889.011H889.392H889.771H890.147H890.522H890.895H891.265H891.634H892.001H892.366H892.73H893.091H893.451H893.809H894.164H894.519H894.871H895.222H895.57H895.918H896.263H896.607H896.949H897.289H897.628H897.965H898.3H898.634H898.966H899.297H899.626H899.953H900.279H900.603H900.926H901.247H901.567H901.885H902.202H902.518H902.832H903.144H903.455H903.765H904.073H904.38H904.686H904.99H905.293H905.595H905.895H906.194H906.492H906.788H907.084H907.378H907.671H907.962H908.253H908.542H908.83H909.117H909.403H909.688H909.971H910.254H910.536H910.816H911.095H911.374H911.651H911.928H912.203H912.477H912.751H913.023H913.295H913.566H913.835H914.104H914.372H914.64H914.906H915.171H915.436H915.7H915.963H916.225H916.487H916.748H917.008H917.267H917.526H917.784H918.041H918.298H918.554H918.809H919.064H919.318H919.571H919.824H920.077H920.329H920.58H920.831H921.081H921.331H921.58H921.829H922.078H922.326H922.573H922.82H923.067H923.314H923.56H923.805H924.051H924.296H924.541H924.785H925.029H925.273H925.517H925.76H926.004H926.247H926.489H926.732H926.975H927.217H927.459H927.701H927.943H928.185H928.427H928.669H928.91H929.152H929.393H929.635H929.877H930.118H930.36H930.602H930.844H931.086H931.327H931.57H931.812H932.054H932.297H932.539H932.782H933.025H933.268H933.512H933.755H933.999H934.243H934.488H934.732H934.977H935.223H935.469H935.715H935.961H936.208H936.455H936.702H936.95H937.199H937.448H937.697H937.947H938.197H938.448H938.699H938.951H939.203H939.456H939.71H939.964H940.219H940.474H940.73H940.986H941.244H941.501H941.76H942.019H942.279H942.54H942.802H943.064H943.327H943.591H943.855H944.121H944.387H944.654H944.922H945.191H945.46H945.731H946.003H946.275H946.548H946.823H947.098H947.374H947.652H947.93H948.209H948.49H948.771H949.053H949.337H949.622H949.907H950.194H950.482H950.772H951.062H951.354H951.646H951.94H952.235H952.532H952.83H953.128H953.429H953.73H954.033H954.337H954.643H954.95H955.258H955.567H955.878H956.191H956.505H956.82H957.136H957.455H957.774H957.891V454.324L1067 373.446L957.891 292.567V333H957.774H957.455H957.136H956.82H956.505H956.191H955.878H955.567H955.258H954.95H954.643H954.337H954.033H953.73H953.429H953.128H952.83H952.532H952.235H951.94H951.646H951.354H951.062H950.772H950.482H950.194H949.907H949.622H949.337H949.053H948.771H948.49H948.209H947.93H947.652H947.374H947.098H946.823H946.548H946.275H946.003H945.731H945.46H945.191H944.922H944.654H944.387H944.121H943.855H943.591H943.327H943.064H942.802H942.54H942.279H942.019H941.76H941.501H941.244H940.986H940.73H940.474H940.219H939.964H939.71H939.456H939.203H938.951H938.699H938.448H938.197H937.947H937.697H937.448H937.199H936.95H936.702H936.455H936.208H935.961H935.715H935.469H935.223H934.977H934.732H934.488H934.243H933.999H933.755H933.512H933.268H933.025H932.782H932.539H932.297H932.054H931.812H931.57H931.327H931.086H930.844H930.602H930.36H930.118H929.877H929.635H929.393H929.152H928.91H928.669H928.427H928.185H927.943H927.701H927.459H927.217H926.975H926.732H926.489H926.247H926.004H925.76H925.517H925.273H925.029H924.785H924.541H924.296H924.051H923.805H923.56H923.314H923.067H922.82H922.573H922.326H922.078H921.829H921.58H921.331H921.081H920.831H920.58H920.329H920.077H919.824H919.571H919.318H919.064H918.809H918.554H918.298H918.041H917.784H917.526H917.267H917.008H916.748H916.487H916.225H915.963H915.7H915.436H915.171H914.906H914.64H914.372H914.104H913.835H913.566H913.295H913.023H912.751H912.477H912.203H911.928H911.651H911.374H911.095H910.816H910.536H910.254H909.971H909.688H909.403H909.117H908.83H908.542H908.253H907.962H907.671H907.378H907.084H906.788H906.492H906.194H905.895H905.595H905.293H904.99H904.686H904.38H904.073H903.765H903.455H903.144H902.832H902.518H902.202H901.885H901.567H901.247H900.926H900.603H900.279H899.953H899.626H899.297H898.966H898.634H898.3H897.965H897.628H897.289H896.949H896.607H896.263H895.918H895.57H895.222H894.871H894.519H894.164H893.809H893.451H893.091H892.73H892.366H892.001H891.634H891.265H890.895H890.522H890.147H889.771H889.392H889.011H888.629H888.244H887.858H887.469H887.078H886.686H886.291H885.894H885.495H885.094H884.691H884.285H883.878H883.468H883.056H882.642H882.226H881.807H881.386H880.963H880.538H880.11H879.68H879.248H878.814H878.377H877.937H877.496H877.052H876.605H876.156H875.705H875.251H874.795H874.336H873.875H873.411H872.945H872.477H872.005H871.531H871.055H870.576H870.095H869.61H869.124H868.634H868.142H867.647H867.15H866.65H866.147H865.641H865.133H864.622H864.108H863.591H863.072H862.549H862.024H861.496H860.965H860.432H859.895H859.356H858.813H858.268H857.72H857.169H856.614H856.057H855.497H854.934H854.368H853.799H853.226H852.651H852.073H851.491H850.906H850.319H849.728H849.134H848.536H847.936H847.333H846.726H846.116H845.502H844.886H844.266H843.643H843.017H842.387H841.754H841.118H840.478H839.835H839.189H838.539H837.886H837.229H836.569H835.905H835.238H834.568H833.894H833.216H832.535H831.851H831.163H830.471H829.776H829.077H828.375H827.669H826.959H826.246H825.529H824.808H824.084H823.355H822.624H821.888H821.149H820.406H819.659H818.908H818.154H817.396H816.634H815.868H815.098H814.324H813.547H812.766H811.98H811.191H810.398H809.6H808.799H807.994H807.185H806.372H805.555H804.733H803.908H803.079H802.245H801.408H800.566H799.72H798.87H798.016H797.158H796.295H795.428H794.558H793.682H792.803H791.919H791.032H790.139H789.243H788.342H787.437H786.527H785.614H784.695H783.773H782.846H781.914H780.978H780.038H779.093H778.144H777.191H776.232H775.27H774.302H773.331H772.354H771.373H770.388H769.398H768.403H767.404H766.4H765.391H764.378H763.36H762.337H761.31H760.278H759.241H758.199H757.153H756.102H755.046H753.985H752.92H751.849H750.774H749.694H748.609H747.519H746.424H745.324H744.22H743.11H741.995H740.876H739.751H738.621H737.487H736.347H735.203H734.053H732.898H731.738H730.573H729.403H728.227H727.047H725.861H724.67H723.474H722.273H721.067H719.855H718.638H717.416H716.189H714.956H713.718H712.474H711.226H709.972H708.712H707.447H706.177H704.902H703.621H702.334H701.042H699.745C602.028 333 530.478 290.064 482.516 231.95C433.668 172.761 410 98.4913 410 40H330Z"
          fill="url(#paint3_linear_970_1766)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M957.891 577.326V617.757L1067 536.879L957.891 456V497.326L691.104 497.326C512.614 497.326 378.947 577.323 290.752 684.413C203.442 790.428 160 923.648 160 1034.33H240C240 942.381 276.879 827.1 352.505 735.271C427.246 644.517 539.131 577.326 691.104 577.326L957.891 577.326Z"
          fill="url(#paint4_linear_970_1766)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M330 367C330 444.27 360.262 536.501 420.815 609.871C482.255 684.317 575.577 740 699.745 740H701.042H702.334H703.621H704.902H706.177H707.447H708.712H709.972H711.226H712.474H713.718H714.956H716.189H717.416H718.638H719.855H721.067H722.273H723.474H724.67H725.861H727.047H728.227H729.403H730.573H731.738H732.898H734.053H735.203H736.347H737.487H738.621H739.751H740.876H741.995H743.11H744.22H745.324H746.424H747.519H748.609H749.694H750.774H751.849H752.92H753.985H755.046H756.102H757.153H758.199H759.241H760.278H761.31H762.337H763.36H764.378H765.391H766.4H767.404H768.403H769.398H770.388H771.373H772.354H773.331H774.302H775.27H776.232H777.191H778.144H779.093H780.038H780.978H781.914H782.846H783.773H784.695H785.614H786.527H787.437H788.342H789.243H790.139H791.032H791.919H792.803H793.682H794.558H795.428H796.295H797.158H798.016H798.87H799.72H800.566H801.408H802.245H803.079H803.908H804.733H805.555H806.372H807.185H807.994H808.799H809.6H810.398H811.191H811.98H812.766H813.547H814.324H815.098H815.868H816.634H817.396H818.154H818.908H819.659H820.406H821.149H821.888H822.624H823.355H824.084H824.808H825.529H826.246H826.959H827.669H828.375H829.077H829.776H830.471H831.163H831.851H832.535H833.216H833.894H834.568H835.238H835.905H836.569H837.229H837.886H838.539H839.189H839.835H840.478H841.118H841.754H842.387H843.017H843.643H844.266H844.886H845.502H846.116H846.726H847.333H847.936H848.536H849.134H849.728H850.319H850.906H851.491H852.073H852.651H853.226H853.799H854.368H854.934H855.497H856.057H856.614H857.169H857.72H858.268H858.813H859.356H859.895H860.432H860.965H861.496H862.024H862.549H863.072H863.591H864.108H864.622H865.133H865.641H866.147H866.65H867.15H867.647H868.142H868.634H869.124H869.61H870.095H870.576H871.055H871.531H872.005H872.477H872.945H873.411H873.875H874.336H874.795H875.251H875.705H876.156H876.605H877.052H877.496H877.937H878.377H878.814H879.248H879.68H880.11H880.538H880.963H881.386H881.807H882.226H882.642H883.056H883.468H883.878H884.285H884.691H885.094H885.495H885.894H886.291H886.686H887.078H887.469H887.858H888.244H888.629H889.011H889.392H889.771H890.147H890.522H890.895H891.265H891.634H892.001H892.366H892.73H893.091H893.451H893.809H894.164H894.519H894.871H895.222H895.57H895.918H896.263H896.607H896.949H897.289H897.628H897.965H898.3H898.634H898.966H899.297H899.626H899.953H900.279H900.603H900.926H901.247H901.567H901.885H902.202H902.518H902.832H903.144H903.455H903.765H904.073H904.38H904.686H904.99H905.293H905.595H905.895H906.194H906.492H906.788H907.084H907.378H907.671H907.962H908.253H908.542H908.83H909.117H909.403H909.688H909.971H910.254H910.536H910.816H911.095H911.374H911.651H911.928H912.203H912.477H912.751H913.023H913.295H913.566H913.835H914.104H914.372H914.64H914.906H915.171H915.436H915.7H915.963H916.225H916.487H916.748H917.008H917.267H917.526H917.784H918.041H918.298H918.554H918.809H919.064H919.318H919.571H919.824H920.077H920.329H920.58H920.831H921.081H921.331H921.58H921.829H922.078H922.326H922.573H922.82H923.067H923.314H923.56H923.805H924.051H924.296H924.541H924.785H925.029H925.273H925.517H925.76H926.004H926.247H926.489H926.732H926.975H927.217H927.459H927.701H927.943H928.185H928.427H928.669H928.91H929.152H929.393H929.635H929.877H930.118H930.36H930.602H930.844H931.086H931.327H931.57H931.812H932.054H932.297H932.539H932.782H933.025H933.268H933.512H933.755H933.999H934.243H934.488H934.732H934.977H935.223H935.469H935.715H935.961H936.208H936.455H936.702H936.95H937.199H937.448H937.697H937.947H938.197H938.448H938.699H938.951H939.203H939.456H939.71H939.964H940.219H940.474H940.73H940.986H941.244H941.501H941.76H942.019H942.279H942.54H942.802H943.064H943.327H943.591H943.855H944.121H944.387H944.654H944.922H945.191H945.46H945.731H946.003H946.275H946.548H946.823H947.098H947.374H947.652H947.93H948.209H948.49H948.771H949.053H949.337H949.622H949.907H950.194H950.482H950.772H951.062H951.354H951.646H951.94H952.235H952.532H952.83H953.128H953.429H953.73H954.033H954.337H954.643H954.95H955.258H955.567H955.878H956.191H956.505H956.82H957.136H957.455H957.774H957.891V781.324L1067 700.446L957.891 619.567V660H957.774H957.455H957.136H956.82H956.505H956.191H955.878H955.567H955.258H954.95H954.643H954.337H954.033H953.73H953.429H953.128H952.83H952.532H952.235H951.94H951.646H951.354H951.062H950.772H950.482H950.194H949.907H949.622H949.337H949.053H948.771H948.49H948.209H947.93H947.652H947.374H947.098H946.823H946.548H946.275H946.003H945.731H945.46H945.191H944.922H944.654H944.387H944.121H943.855H943.591H943.327H943.064H942.802H942.54H942.279H942.019H941.76H941.501H941.244H940.986H940.73H940.474H940.219H939.964H939.71H939.456H939.203H938.951H938.699H938.448H938.197H937.947H937.697H937.448H937.199H936.95H936.702H936.455H936.208H935.961H935.715H935.469H935.223H934.977H934.732H934.488H934.243H933.999H933.755H933.512H933.268H933.025H932.782H932.539H932.297H932.054H931.812H931.57H931.327H931.086H930.844H930.602H930.36H930.118H929.877H929.635H929.393H929.152H928.91H928.669H928.427H928.185H927.943H927.701H927.459H927.217H926.975H926.732H926.489H926.247H926.004H925.76H925.517H925.273H925.029H924.785H924.541H924.296H924.051H923.805H923.56H923.314H923.067H922.82H922.573H922.326H922.078H921.829H921.58H921.331H921.081H920.831H920.58H920.329H920.077H919.824H919.571H919.318H919.064H918.809H918.554H918.298H918.041H917.784H917.526H917.267H917.008H916.748H916.487H916.225H915.963H915.7H915.436H915.171H914.906H914.64H914.372H914.104H913.835H913.566H913.295H913.023H912.751H912.477H912.203H911.928H911.651H911.374H911.095H910.816H910.536H910.254H909.971H909.688H909.403H909.117H908.83H908.542H908.253H907.962H907.671H907.378H907.084H906.788H906.492H906.194H905.895H905.595H905.293H904.99H904.686H904.38H904.073H903.765H903.455H903.144H902.832H902.518H902.202H901.885H901.567H901.247H900.926H900.603H900.279H899.953H899.626H899.297H898.966H898.634H898.3H897.965H897.628H897.289H896.949H896.607H896.263H895.918H895.57H895.222H894.871H894.519H894.164H893.809H893.451H893.091H892.73H892.366H892.001H891.634H891.265H890.895H890.522H890.147H889.771H889.392H889.011H888.629H888.244H887.858H887.469H887.078H886.686H886.291H885.894H885.495H885.094H884.691H884.285H883.878H883.468H883.056H882.642H882.226H881.807H881.386H880.963H880.538H880.11H879.68H879.248H878.814H878.377H877.937H877.496H877.052H876.605H876.156H875.705H875.251H874.795H874.336H873.875H873.411H872.945H872.477H872.005H871.531H871.055H870.576H870.095H869.61H869.124H868.634H868.142H867.647H867.15H866.65H866.147H865.641H865.133H864.622H864.108H863.591H863.072H862.549H862.024H861.496H860.965H860.432H859.895H859.356H858.813H858.268H857.72H857.169H856.614H856.057H855.497H854.934H854.368H853.799H853.226H852.651H852.073H851.491H850.906H850.319H849.728H849.134H848.536H847.936H847.333H846.726H846.116H845.502H844.886H844.266H843.643H843.017H842.387H841.754H841.118H840.478H839.835H839.189H838.539H837.886H837.229H836.569H835.905H835.238H834.568H833.894H833.216H832.535H831.851H831.163H830.471H829.776H829.077H828.375H827.669H826.959H826.246H825.529H824.808H824.084H823.355H822.624H821.888H821.149H820.406H819.659H818.908H818.154H817.396H816.634H815.868H815.098H814.324H813.547H812.766H811.98H811.191H810.398H809.6H808.799H807.994H807.185H806.372H805.555H804.733H803.908H803.079H802.245H801.408H800.566H799.72H798.87H798.016H797.158H796.295H795.428H794.558H793.682H792.803H791.919H791.032H790.139H789.243H788.342H787.437H786.527H785.614H784.695H783.773H782.846H781.914H780.978H780.038H779.093H778.144H777.191H776.232H775.27H774.302H773.331H772.354H771.373H770.388H769.398H768.403H767.404H766.4H765.391H764.378H763.36H762.337H761.31H760.278H759.241H758.199H757.153H756.102H755.046H753.985H752.92H751.849H750.774H749.694H748.609H747.519H746.424H745.324H744.22H743.11H741.995H740.876H739.751H738.621H737.487H736.347H735.203H734.053H732.898H731.738H730.573H729.403H728.227H727.047H725.861H724.67H723.474H722.273H721.067H719.855H718.638H717.416H716.189H714.956H713.718H712.474H711.226H709.972H708.712H707.447H706.177H704.902H703.621H702.334H701.042H699.745C602.028 660 530.478 617.064 482.516 558.95C433.668 499.761 410 425.491 410 367H330Z"
          fill="url(#paint5_linear_970_1766)"
        />
        <defs>
          <filter
            id="filter0_d_970_1766"
            x="113"
            y="0"
            width="886"
            height="625"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood
              flood-opacity="0"
              result="BackgroundImageFix"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset
              dx="-9"
              dy="4"
            />
            <feGaussianBlur stdDeviation="22" />
            <feComposite
              in2="hardAlpha"
              operator="out"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.25098 0 0 0 0 0.517647 0 0 0 0 0.745098 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_970_1766"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_970_1766"
              result="shape"
            />
          </filter>
          <radialGradient
            id="paint0_radial_970_1766"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(901 732) rotate(166.749) scale(566.692 742.19)"
          >
            <stop
              offset="0.0655321"
              stop-color="#0B9CD9"
            />
            <stop
              offset="0.51831"
              stop-color="#FBB04D"
              stop-opacity="0.39"
            />
            <stop
              offset="0.963494"
              stop-color="#E6F3F8"
              stop-opacity="0.25"
            />
          </radialGradient>
          <linearGradient
            id="paint1_linear_970_1766"
            x1="951.437"
            y1="1064.68"
            x2="-12.7697"
            y2="740.009"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0.210928"
              stop-color="#0B9CD9"
            />
            <stop
              offset="0.592645"
              stop-color="#FBB04D"
              stop-opacity="0.54"
            />
            <stop
              offset="0.742245"
              stop-color="#E6F3F8"
              stop-opacity="0.25"
            />
          </linearGradient>
          <radialGradient
            id="paint2_radial_970_1766"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(964 550) rotate(-161.556) scale(825.277 1294.47)"
          >
            <stop
              offset="0.25179"
              stop-color="#FBB04D"
            />
            <stop
              offset="0.471311"
              stop-color="#009EDB"
              stop-opacity="0.87"
            />
            <stop
              offset="0.779778"
              stop-color="#009EDB"
              stop-opacity="0.05"
            />
            <stop
              offset="0.916589"
              stop-color="#E6F3F8"
              stop-opacity="0"
            />
          </radialGradient>
          <linearGradient
            id="paint3_linear_970_1766"
            x1="385"
            y1="323"
            x2="982"
            y2="340"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stop-color="#009EDB"
              stop-opacity="0"
            />
            <stop
              offset="1"
              stop-color="#0094D7"
            />
          </linearGradient>
          <linearGradient
            id="paint4_linear_970_1766"
            x1="995"
            y1="538.326"
            x2="270.674"
            y2="570.123"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0.0213742"
              stop-color="#FBB04D"
            />
            <stop
              offset="0.512169"
              stop-color="#0B9CD9"
              stop-opacity="0.59"
            />
            <stop
              offset="0.922169"
              stop-color="#0B9CD9"
              stop-opacity="0"
            />
          </linearGradient>
          <linearGradient
            id="paint5_linear_970_1766"
            x1="385"
            y1="650"
            x2="982"
            y2="667"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stop-color="#009EDB"
              stop-opacity="0"
            />
            <stop
              offset="1"
              stop-color="#0094D7"
            />
          </linearGradient>
        </defs>
      </svg>
    </figure>
    <div class="grid-layout items-end z-10 relative pt-100">
      <div class="col-start-2 col-span-7 text-secondary">
        <div class="flex flex-row pt-40 gap-30">
          <p class="text-md md:text-base ml-60">
            {{ home?.data.date }}
          </p>
          <p class="text-md md:text-base ml-60">
            {{ home?.data.location }}
          </p>
        </div>
        <div class="pt-20">
          <h1
            class="text-xl md:text-3xl uppercase ml-50"
            data-title
          >
            {{ home?.data.title_one }}
          </h1>
          <h1
            class="text-xl md:text-3xl uppercase"
            data-title
          >
            {{ home?.data.title_two }}
          </h1>
          <h1
            class="text-xl md:text-3xl uppercase ml-55"
            data-title
          >
            {{ home?.data.title_three }}
          </h1>
        </div>
      </div>
    </div>
  </section> -->

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

  <!-- section one -->
  <!-- <section class="w-full relative text-white bg-primary pr-80">
    <div class="flex flex-row">
      <div class="relative">
        <svg
          width="995"
          height="841"
          class="ml-[-60px]"
          viewBox=" 0 0 995 841"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="154.527"
            cy="0.465429"
            r="594.5"
            transform="rotate(133.51 154.527 0.465429)"
            stroke="url(#paint0_linear_1928_5)"
            stroke-width="80"
            stroke-miterlimit="10"
          />
          <circle
            cx="156.369"
            cy="-0.278208"
            r="256.5"
            transform="rotate(133.51 156.369 -0.278208)"
            stroke="url(#paint1_linear_1928_5)"
            stroke-width="80"
            stroke-miterlimit="10"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1928_5"
              x1="605.287"
              y1="-477.712"
              x2="-281.483"
              y2="-415.194"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0.0213742"
                stop-color="#FBB04D"
              />
              <stop
                offset="0.52"
                stop-color="#3B8AA1"
              />
              <stop
                offset="1"
                stop-color="#3A6F9B"
              />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1928_5"
              x1="422.22"
              y1="-206.625"
              x2="-14.8862"
              y2="-157.616"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0.0213742"
                stop-color="#FBB04D"
              />
              <stop
                offset="0.52"
                stop-color="#3B8AA1"
              />
              <stop
                offset="1"
                stop-color="#3A6F9B"
              />
            </linearGradient>
          </defs>
        </svg>
        <span v-if="home?.data.main_image">
          <PrismicImage
            class="w-[608px] absolute bottom-0"
            :field="home?.data.main_image"
          />
        </span>
      </div>
      <div class="md:max-w-[480px] ml-[-250px] z-10 pt-100 pb-100">
        <PrismicRichText
          class="md:max-w-[480px]"
          :field="home?.data.intro_text"
        />
      </div>
    </div>
  </section> -->
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

  <!-- announcements section -->
  <!-- <section class="w-full relative text-white bg-primary py-100 pr-80 pl-80">
    <div
      v-for="(announcement, idx) in announcementsSlice"
      :key="idx"
    >
      <div class="flex center py-40">
        <h1 class="text-lg text-center w-full uppercase">
          {{ announcement.primary.title }}
        </h1>
      </div>
      <div
        v-for="(item, idx) in announcement.primary.announcements"
        ref="items"
        class="pl-40 pr-40 flex flex-row"
      >
        <PrismicImage
          :field="item.image"
          class="w-1/2"
        />
        <div class="flex flex-col p-40 w-1/2">
          <p class="uppercase font-bold pb-40 pt-80 text-base">
            {{ item.subtitle }}
          </p>
          <PrismicRichText :field="item.paragraph" />
          <div class="flex flex-row justify-between pt-100">
            <PrismicLink :field="item.button_link">
              <button
                class="font-bold text-sm border border-[var(--burger-color)] z-[100] rounded-full uppercase text-white text-sm pl-30 pr-30 py-10"
              >
                View
                the Programme
              </button>
            </PrismicLink>
            <div class="flex gap-20">
              <button ref="prevBtn">
                <img
                  src="/public/img/arrow-left.svg"
                  width="53"
                  height="auto"
                >
              </button>
              <button ref="nextBtn">
                <img
                  src="/public/img/arrow-right.svg"
                  width="53"
                  height="auto"
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> -->
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