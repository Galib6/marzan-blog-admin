import { useEffect } from 'react';

const CustomContextMenu: React.FC = () => {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();

      // Create a custom context menu
      const customMenu = document.createElement('div');
      customMenu.classList.add('custom-menu');
      customMenu.innerHTML = `
        <ul>
          <li id="option1">Option 1</li>
          <li id="option2">Option 2</li>
          <li id="option3">Option 3</li>
        </ul>
      `;

      // Position the custom context menu
      customMenu.style.top = event.clientY + 'px';
      customMenu.style.left = event.clientX + 'px';

      // Append the custom context menu to the page
      document.body.appendChild(customMenu);

      // Handle menu item clicks
      customMenu.addEventListener('click', (e) => {
        const target = e.target as HTMLLIElement;
        if (target.matches('li')) {
          const optionId = target.id;
          handleContextMenuOption(optionId);
          customMenu.remove(); // Remove the custom context menu after the action is performed
        }
      });

      // Handle clicks outside the custom context menu to close it
      document.addEventListener('click', (e) => {
        if (!(e.target as HTMLElement).closest('.custom-menu')) {
          customMenu.remove();
        }
      });
    };

    const handleContextMenuOption = (optionId: string) => {
      // Perform specific actions based on the optionId
      switch (optionId) {
        case 'option1':
          // console.log('Option 1 selected');
          // Perform action for Option 1
          break;
        case 'option2':
          // console.log('Option 2 selected');
          // Perform action for Option 2
          break;
        case 'option3':
          // console.log('Option 3 selected');
          // Perform action for Option 3
          break;
        default:
          break;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return null;
};

export default CustomContextMenu;
