'use client';

import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

// Configure Ant Design to work with React 19
// This setup is required for React 19 compatibility
// Only use this for special scenarios such as umd, micro-applications, etc.
const setupAntdReact19Compatibility = () => {
  unstableSetRender((node, container) => {
    // Create or reuse the React root for the container
    if (!(container as any)._reactRoot) {
      (container as any)._reactRoot = createRoot(container);
    }
    const root = (container as any)._reactRoot;

    // Render the node
    root.render(node);

    // Return cleanup function
    return async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      root.unmount();
    };
  });
};

// Execute the setup immediately when this module is imported
setupAntdReact19Compatibility();

export { setupAntdReact19Compatibility };
