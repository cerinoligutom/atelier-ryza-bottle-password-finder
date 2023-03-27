import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.directive('tooltip', Tooltip);
});
