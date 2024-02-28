import './globals.css'
import StyledJsxRegistry from './registry'

export const metadata = {
  title: {
    template: '%s | SUYO',
    default: 'SUYO',
  },
  description: "管理你的文档",
}

export default async function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <StyledJsxRegistry>
          {children}
        </StyledJsxRegistry>
      </body>
    </html>
  )
}
