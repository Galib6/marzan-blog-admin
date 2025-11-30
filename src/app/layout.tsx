import { Providers } from '@lib/context';
import type { Metadata } from 'next';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Roboto } from 'next/font/google';
import '../@styles/base.css';
import '../@styles/main.scss';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Lol',
  icons: {
    shortcut: '/images/brand_icon.ico',
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const fontWithMorePropsCreateFn = (fontDefinition: NextFontWithVariable, originalVariableName: string) => {
    return { ...fontDefinition, originalVariableName };
  };

  const robotoFont = fontWithMorePropsCreateFn(roboto, '--font-roboto');

  return (
    <html lang="en">
      <body className="bg-[var(--color-gray-50)] dark:bg-[#181818] designed_scrollbar">
        <Providers nextFont={[robotoFont]}>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
