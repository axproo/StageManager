/// <reference types="vite/client" />

declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "@stagemanager/auth";

declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const component: DefineComponent<{}, {}, any>;
  export default component;
}
