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
      className="w-full max-w-7xl mx-auto relative min-h-screen pb-[240px] pt-16 flex flex-col gap-16"
    >
      {props.children}
    </div>
  );
};

export default React.forwardRef(ChatMessageContentArea);
