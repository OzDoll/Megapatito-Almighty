import { AddExtension } from "@/features/extensions-page/add-extension/add-new-extension";
import { ExtensionCard } from "@/features/extensions-page/extension-card/extension-card";
import { ExtensionModel } from "@/features/extensions-page/extension-services/models";
import { PersonaCard } from "@/features/persona-page/persona-card/persona-card";
import { PersonaModel } from "@/features/persona-page/persona-services/models";
import { ScrollArea } from "@/features/ui/scroll-area";
import { Cat } from "lucide-react"; // Assuming you're using lucide-react for icons
import { FC } from "react";
import { AI_NAME, VERSION } from "../theme/theme-config";

interface ChatPersonaProps {
  personas: PersonaModel[];
  extensions: ExtensionModel[];
}

export const ChatHome: FC<ChatPersonaProps> = (props) => {
  // Define the title and subtitle for the header
  const headerTitle = AI_NAME; // Replace with the title you want
  const headerSubtitle = VERSION; // Replace with the subtitle you want

  return (
    <ScrollArea className="flex-1 p-4">
      <main className="flex flex-1 flex-col gap-6 pb-6">
        {/* Updated header with title and subtitle */}
        <div className="bg-background text-primary border-b flex flex-col items-center py-3 px-4">
        <span>{headerTitle}</span>
          <div className="text-sm text-muted-foreground flex gap-1 items-center">
            <Cat size={17} />
            <span>{headerSubtitle}</span>
          </div>
        </div>
        <div className="container max-w-5xl mx-auto flex gap-8 flex-col px-4 pt-6">
          <div>
            <h2 className="text-2xl font-bold mb-3">Extensions</h2>
            {props.extensions && props.extensions.length > 0 ? (
              <div className="grid grid-cols-4 gap-3">
                {props.extensions.map((extension) => (
                  <ExtensionCard
                    extension={extension}
                    key={extension.id}
                    showContextMenu={false}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground max-w-xl">No extensions created</p>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3">Personas</h2>
            {props.personas && props.personas.length > 0 ? (
              <div className="grid grid-cols-4 gap-3">
                {props.personas.map((persona) => (
                  <PersonaCard
                    persona={persona}
                    key={persona.id}
                    showContextMenu={false}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground max-w-xl">No personas created</p>
            )}
          </div>
        </div>
        <AddExtension />
      </main>
       {/* Footer */}
       <footer className="text-center text-sm text-muted-foreground py-4">
        © {new Date().getFullYear()}. MIT license.
      </footer>
    </ScrollArea>
  );
};
