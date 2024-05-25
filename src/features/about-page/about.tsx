import { AI_DESCRIPTION, AI_NAME } from "@/features/theme/theme-config";
import { Hero } from "@/features/ui/hero";
import { ScrollArea } from "@/features/ui/scroll-area";
import Image from "next/image";
import { FC } from "react";

const About: FC = () => {
  return (
    <ScrollArea className="flex-1">
           <main className="flex flex-1 flex-col gap-6 pb-6">
      <Hero
  title={
    <div className="flex flex-col items-center"> {/* Flex container with column direction */}      
        <Image
          src={"/banner.png"} // Change the image path         
          quality={100}
          alt="ai-icon"
        />      
    </div>
  }
  //To remove the description, pass an empty string, element is required so cannot be removed entirely
  description="" // {AI_DESCRIPTION} Pass AI_DESCRIPTION as a string
></Hero>
      </main>
    </ScrollArea>
  );
};

export default About;

