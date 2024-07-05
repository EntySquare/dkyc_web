// 管理所有的全局组件
import { App } from "vue";
import CallUpCamera from "./CallUpCamera.vue";
import HandSignature from "./HandSignature.vue";
import FormValidation from "./FormValidation.vue";
import UploadIDCard from "./UploadIDCard.vue";
import DeclarationVideo from "./DeclarationVideo.vue";

// 将全局组件封装到插件中
export default {
  install(Vue: App) {
    Vue.component("CallUpCamera", CallUpCamera);
    Vue.component("HandSignature", HandSignature);
    Vue.component("FormValidation", FormValidation);
    Vue.component("UploadIDCard", UploadIDCard);
    Vue.component("DeclarationVideo", DeclarationVideo);
  },
};
