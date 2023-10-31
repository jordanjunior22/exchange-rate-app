import './globals.css'

export const metadata = {
  title: 'EXCHANGE RATE',
  description: 'An Exchange Rate App',
}    

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body>{children}</body>
    </html>
 

  )
}
