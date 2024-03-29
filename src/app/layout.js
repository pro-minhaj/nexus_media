import './globals.css';
import { Poppins } from 'next/font/google';
import NextProvider from '@/Providers/NextProvider';
import ThemeProvider from '../Providers/ThemeContext';
import ColorProvider from '@/Providers/ColorProvider';
import AuthProvider from '@/Providers/AuthProvider';
import { Toaster } from 'sonner';

const poppins = Poppins({
    weight: ['200', '400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap'
});

export const metadata = {
    title: 'Nexus Media',
    description: 'Generated by Nexus Media'
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={`${poppins.className}`}>
                <NextProvider>
                    <ColorProvider>
                        <ThemeProvider>
                            <AuthProvider>
                                <Toaster position='top-right' />
                                {children}
                            </AuthProvider>
                        </ThemeProvider>
                    </ColorProvider>
                </NextProvider>
            </body>
        </html>
    );
}
