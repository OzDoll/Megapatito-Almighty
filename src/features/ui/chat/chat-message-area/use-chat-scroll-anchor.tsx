import { chatStore, useChat } from "@/features/chat-page/chat-store";

import { RefObject, useEffect } from "react";


export const useChatScrollAnchor = (props: {

  ref: RefObject<HTMLDivElement>;

  writingAreaHeight: number; // Additional prop for the height of the writing area

}) => {

  const { ref, writingAreaHeight } = props;


  const { autoScroll } = useChat();


  // This effect handles the user's scroll event

  useEffect(() => {

    const handleUserScroll = () => {

      if (ref.current) {

        const userScrolledUp =

          ref.current.scrollTop + ref.current.clientHeight <

          ref.current.scrollHeight;


        chatStore.updateAutoScroll(!userScrolledUp);

      }

    };


    ref.current?.addEventListener("scroll", handleUserScroll);


    // Cleanup: remove the event listener when the component unmounts or the dependencies change

    return () => {

      ref.current?.removeEventListener("scroll", handleUserScroll);

    };

  }, [ref]);


  // This effect handles the automatic scroll to bottom and adjusts padding

  useEffect(() => {

    const handleAutoScroll = () => {

      if (ref.current && autoScroll) {

        ref.current.scrollTop = ref.current.scrollHeight;

        // Adjust the bottom padding of the container

        ref.current.style.paddingBottom = `${writingAreaHeight}px`;

      }

    };


    const observer = new MutationObserver(handleAutoScroll);


    if (ref.current) {

      observer.observe(ref.current, { childList: true, subtree: true });

      // Set initial padding

      ref.current.style.paddingBottom = `${writingAreaHeight}px`;

    }


    // Cleanup: disconnect the observer and reset padding when the component unmounts or the dependencies change

    return () => {

      observer.disconnect();

      if (ref.current) {

        ref.current.style.paddingBottom = '0px'; // Reset padding on cleanup

      }

    };

  }, [ref, autoScroll, writingAreaHeight]);

};