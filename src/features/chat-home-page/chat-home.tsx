import { AddExtension } from "@/features/extensions-page/add-extension/add-new-extension";
import { ExtensionCard } from "@/features/extensions-page/extension-card/extension-card";
import { ExtensionModel } from "@/features/extensions-page/extension-services/models";
import { PersonaCard } from "@/features/persona-page/persona-card/persona-card";
import { PersonaModel } from "@/features/persona-page/persona-services/models";
import { ScrollArea } from "@/features/ui/scroll-area";
import { Bot } from "lucide-react"; // Assuming you're using lucide-react for icons
import { FC } from "react";

interface ChatPersonaProps {
  personas: PersonaModel[];
  extensions: ExtensionModel[];
}

export const ChatHome: FC<ChatPersonaProps> = (props) => {
  // Define the title and subtitle for the header
  const props.chatThread.personaMessageTitle = "Welcome to Megapatito"; // Replace with the title you want
  const headerSubtitle = "Version 0.4"; // Replace with the subtitle you want

  return (
    <ScrollArea className="flex-1 p-4">
      <main className="flex flex-1 flex-col gap-6 pb-6">
        {/* Updated header with title and subtitle */}
        <div className="bg-background border-b flex flex-col items-center py-4 px-4">
          <h1 className="text-2xl font-bold">{headerTitle}</h1>
          <div className="text-sm text-muted-foreground flex gap-1 items-center">
            <Bot size={18} />
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
    </ScrollArea>
  );
};
