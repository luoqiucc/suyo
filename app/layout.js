import './globals.css'

export const metadata = {
  title: {
    template: '%s | SUYO',
    default: 'SUYO',
  },
  description: "管理你的文档",
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
