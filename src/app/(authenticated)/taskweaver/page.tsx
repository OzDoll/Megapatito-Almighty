// pages/taskweaver.tsx
import React from 'react';
import TaskweaverEmbed from '@/features/taskweaver-page/TaskweaverEmbed';

const TaskweaverPage: React.FC = () => {
  const taskweaverAppUrl = 'process.env.TASKWEAVER_ENDPOINT';

  return (
    // Use Tailwind CSS classes to set the full viewport width and height, remove default margin and padding
    <div className="w-full h-screen p-0 m-0">
      <TaskweaverEmbed src={taskweaverAppUrl} />
    </div>
  );
};

export default TaskweaverPage;