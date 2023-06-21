"use client"
import Nav from '@/components/Nav';
import './globals.css';
import { Provider } from '@/context/Contex';

export const metadata = {
    title: 'Meal Management',
    description : 'Mess Meal Management'
}

const RootLayout = ({children}) => {
  
  
  return (
    <html lang='eng'>
        <body>
          <Provider>
            <main>
              <Nav/>
              {children}
            </main>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout;