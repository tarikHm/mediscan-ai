'use client'

import { useState, useEffect } from 'react'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)
  const [lang, setLang] = useState('ar')
  const [showAuth, setShowAuth] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const savedLang = localStorage.getItem('mediscan_lang') || 'ar'
    setLang(savedLang)
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = savedLang
  }, [])

  const toggleDark = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleLang = (newLang: string) => {
    setLang(newLang)
    localStorage.setItem('mediscan_lang', newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} className={darkMode ? 'dark' : ''}>
      <body className="font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-b-2 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 text-sm text-center py-2 px-4 font-bold">
          ⚕️ {lang === 'ar' ? 'تنبيه طبي: هذه الأداة للمعلومات فقط وليست بديلاً عن الاستشارة الطبية. الذكاء الاصطناعي قد يخطئ. استشر طبيبك دائماً.' : 'Medical Disclaimer: This tool is for informational purposes only. AI can make mistakes. Always consult a doctor.'}
        </div>

        <div className="flex justify-center w-full p-3">
          <nav className="navbar">
            <div className="flex items-center justify-center gap-2 sm:gap-6">

              <div className="relative group">
                <a href="/" className="p-2 sm:p-3 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-all flex items-center gap-1">
                  <span>🏠</span>
                  <span className="text-xs font-medium">{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
                </a>
              </div>

              <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                <button onClick={() => toggleLang('ar')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ar' ? 'bg-medical-500 text-white' : 'text-gray-500'}`}>🇸🇦</button>
                <button onClick={() => toggleLang('en')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-medical-500 text-white' : 'text-gray-500'}`}>🇬🇧</button>
              </div>

              <label className="switch">
                <input type="checkbox" checked={darkMode} onChange={toggleDark} />
                <span className="slider"></span>
              </label>

              <button onClick={() => setShowAuth(!showAuth)} className="px-4 py-2 bg-medical-500 text-white rounded-full text-sm font-bold hover:bg-medical-600 transition-all">
                {lang === 'ar' ? '👤 دخول' : '👤 Login'}
              </button>

              <div className="tooltip-wrapper">
                <ul className="tooltip-container list-none p-0 m-0">
                  <li className="nav-link">
                    <span className="tooltip-tab">🎧</span>
                    <div className="tooltip">
                      <ul className="tooltip-menu-with-icon list-none p-0">
                        <li className="tooltip-link"><a href="tel:+212718478238">📞 +212 718 478 238</a></li>
                        <li className="tooltip-link"><a href="mailto:tarikhamou7@gmail.com">📧 tarikhamou7@gmail.com</a></li>
                        <li className="tooltip-link"><a href="#">🕐 8:30 - 17:00</a></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </nav>
        </div>

        {showAuth && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAuth(false)}>
            <div className="auth-container" onClick={(e) => e.stopPropagation()}>
              <div className="auth-heading">{isLogin ? (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In') : (lang === 'ar' ? 'إنشاء حساب' : 'Register')}</div>

              {!isLogin && (
                <div className="flex gap-2">
                  <input className="auth-input" type="text" placeholder={lang === 'ar' ? 'الاسم' : 'First Name'} />
                  <input className="auth-input" type="text" placeholder={lang === 'ar' ? 'اللقب' : 'Last Name'} />
                </div>
              )}

              <input className="auth-input" type="email" placeholder="Email" />
              <input className="auth-input" type="password" placeholder={lang === 'ar' ? 'كلمة المرور' : 'Password'} />

              {!isLogin && (
                <input className="auth-input" type="password" placeholder={lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'} />
              )}

              <button className="auth-btn">{isLogin ? (lang === 'ar' ? 'دخول' : 'Sign In') : (lang === 'ar' ? 'تسجيل' : 'Register')}</button>

              <p className="text-center text-sm text-gray-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? (lang === 'ar' ? 'ليس لديك حساب؟ سجل الآن' : "Don't have an account? Register") : (lang === 'ar' ? 'لديك حساب؟ سجل دخول' : 'Already have an account? Sign In')}
              </p>
            </div>
          </div>
        )}

        {children}

        <footer className="border-t border-gray-200 dark:border-gray-700 mt-20 py-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MediScan AI. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
        </footer>

      </body>
    </html>
  )
                          }
