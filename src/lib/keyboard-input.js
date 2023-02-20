import { onBeforeMount, onBeforeUnmount } from "vue";
import { KEYBOARD_ARROW_CODE_TO_DIRECTION } from "@/constants";

export default function trackKeyboardInput({ onArrowPressed }) {
  let isReadyForUserInput = true;

  const onKeyDownHandler = function ({ code }) {
    if (!isReadyForUserInput) return;

    if (Object.keys(KEYBOARD_ARROW_CODE_TO_DIRECTION).includes(code)) {
      isReadyForUserInput = false;
      onArrowPressed({ direction: KEYBOARD_ARROW_CODE_TO_DIRECTION[code] });
    }
  };

  const onKeyUpHandler = function ({ code }) {
    if (Object.keys(KEYBOARD_ARROW_CODE_TO_DIRECTION).includes(code)) {
      isReadyForUserInput = true;
    }
  };

  onBeforeMount(() => {
    window.addEventListener("keydown", onKeyDownHandler);
    window.addEventListener("keyup", onKeyUpHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDownHandler);
    window.removeEventListener("keyup", onKeyUpHandler);
  });
}
