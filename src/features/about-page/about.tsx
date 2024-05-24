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
            <>
               <Image
          src={"/banner-xm.png"} // Change the image path         
          quality={100}
          alt="ai-icon"
        />      
              <span className="ml-2">{AI_NAME}</span> {/* Added a span with margin-left for spacing */}
            </>
          }
          description={AI_DESCRIPTION}
        />
        {/* Add additional content for the About page here */}
        <section>
          <h2>About {AI_NAME}</h2>
          <p>{/* Add more detailed information about the AI here */}</p>
        </section>
        {/* You can add more sections as needed */}
      </main>
    </ScrollArea>
  );
};

export default About;

