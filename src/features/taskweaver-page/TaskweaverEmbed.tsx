// features/lida-page/TaskweaverEmbed.tsx
import React from 'react';

interface TaskweaverEmbedProps {
  src: string;
}

const TaskweaverEmbed: React.FC<TaskweaverEmbedProps> = ({ src }) => {
  return (
    // Use inline styles or Tailwind CSS classes if you prefer
    <iframe
      src={src}
      className="w-full h-full border-none"
      title="Taskweaver Embed"
    />
  );
};

export default TaskweaverEmbed;