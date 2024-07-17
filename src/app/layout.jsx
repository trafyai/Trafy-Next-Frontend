import '@styles/globals.css';
import Header from '@components/common/header/header';
import Footer from '@components/common/footer/Footer';
import imageO from'../app/opengraph-image.png';
import { AuthContextProvider } from '@context/AuthContext';
import { ThemeProvider } from 'next-themes'

export const metadata = {
 
  title: {
    default: 'Interactive Learning, Next Generation Courses.',
  },
  description: 'Learn UI/UX designing, artificial intelligence, and digital marketing with our interactive courses and accelerate your career with expert guidance',

  metadataBase: new URL("https://trafyai.com/"),
  openGraph:{
    title: 'Interactive Learning, Next Generation Courses.',
    description: 'Learn UI/UX designing, artificial intelligence, and digital marketing with our interactive courses and accelerate your career with expert guidance',
  },
  twitter:{
    card:"summary_large_image",
  },
  image:imageO,
  
  
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
    
      <body>
      <AuthContextProvider>
      <ThemeProvider>
        <main className="app">
          <Header />
          {children}
          <Footer/>
        </main>
        </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
