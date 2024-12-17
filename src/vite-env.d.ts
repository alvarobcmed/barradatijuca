/// <reference types="vite/client" />

interface Window {
  jQuery: typeof import('jquery');
  $: typeof import('jquery');
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}