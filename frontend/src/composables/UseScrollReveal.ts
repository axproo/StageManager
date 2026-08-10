// composables/useScrollReveal.ts
import { ref, onMounted, onUnmounted, type Ref } from "vue";

export function useScrollReveal(itemCount: number, options?: {
  threshold?: number;
  staggerDelay?: number;
}) {
  const threshold = options?.threshold ?? 0.15;
  const staggerDelay = options?.staggerDelay ?? 120;

  const sectionRef: Ref<HTMLElement | null> = ref(null);
  const visibleItems = ref<boolean[]>(new Array(itemCount).fill(false));
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            for (let i = 0; i < itemCount; i++) {
              setTimeout(() => {
                visibleItems.value[i] = true;
              }, i * staggerDelay);
            }
            observer?.disconnect();
          }
        });
      },
      { threshold }
    );
    if (sectionRef.value) observer.observe(sectionRef.value);
  });

  onUnmounted(() => observer?.disconnect());

  return { sectionRef, visibleItems };
}