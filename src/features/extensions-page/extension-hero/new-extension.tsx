import { HeroButton } from "@/features/ui/hero";
import { Waypoints } from "lucide-react";
import { extensionStore } from "../extension-store";

export const NewExtension = () => {
  return (
    <HeroButton
      title="New Extension"
      description="Create a new extension with your own internal API"
      icon={<Waypoints />}
      onClick={() => extensionStore.newAndOpenSlider()}
    />
  );
};
