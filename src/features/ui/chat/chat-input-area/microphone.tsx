import { Mic, Square } from "lucide-react";
import { Button } from "../../button";

export const Microphone = (props: {
  isPlaying: boolean;
  isMicrophoneReady: boolean;
  stopPlaying: () => void;
  startRecognition: () => void;
  stopRecognition: () => void;
}) => {
  return (
    <>
      {props.isPlaying ? (
        <Button
          size="icon"
          type="button"
          variant="ghost"
          onClick={props.stopPlaying}
          aria-label="Stop speech input"
        >
          <Square size={16} />
        </Button>
      ) : (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onMouseDown={props.startRecognition}
          onMouseUp={props.stopRecognition}
          onMouseLeave={props.stopRecognition}
          className={
            props.isMicrophoneReady ? "bg-red-400 hover:bg-red-400" : ""
          }
          aria-label="Microphone for speech input"
        >
          <Mic size={16} />
        </Button>
      )}
    </>
  );
};
