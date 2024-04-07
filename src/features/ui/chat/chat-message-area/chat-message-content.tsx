import React, { ForwardRefRenderFunction } from "react";

interface ChatMessageContentAreaProps {
  children?: React.ReactNode;
}

const ChatMessageContentArea: ForwardRefRenderFunction<
  HTMLDivElement,
  ChatMessageContentAreaProps
> = (props, ref) => {
  return (
    <div
      ref={ref}
      className="container max-w-6xl  relative min-h-screen pb-[160px] pt-16  flex flex-col gap-16"
    >
      {props.children}
    </div>
  );
};

export default React.forwardRef(ChatMessageContentArea);
