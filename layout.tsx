import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'MobiBiz — Your business, moving forward', description: 'A mobile-first storefront and business toolkit for Kenyan small businesses.', manifest: '/manifest.json' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
