import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import './App.css'

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })
  const containerRef = useRef(null)
  const formRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    // Set theme attribute on html
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    // Initial animation
    gsap.fromTo(containerRef.current, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    )

    // Animate form elements
    gsap.fromTo(formRef.current.children,
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: "power2.out"
      }
    )
  }, [])

  const toggleForm = () => {
    const tl = gsap.timeline()
    
    // Animate overlay
    tl.to(overlayRef.current, {
      x: isLogin ? '50%' : '-50%',
      duration: 0.6,
      ease: "power2.inOut"
    })
    
    // Animate form container
    tl.to(containerRef.current, {
      scale: 0.95,
      duration: 0.3,
      ease: "power2.inOut"
    }, "-=0.3")
    
    tl.to(containerRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
    
    // Update state
    tl.call(() => setIsLogin(!isLogin), [], "+=0.1")
    
    // Animate new form elements
    tl.fromTo(formRef.current.children,
      { 
        opacity: 0, 
        y: 20 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out"
      }
    )
  }

  const handleToggleDarkMode = () => setDarkMode((prev) => !prev)

  return (
    <div className="app">
      <button
        className={`darkmode-toggle${darkMode ? ' active' : ''}`}
        onClick={handleToggleDarkMode}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? (
          <i className="fas fa-sun"></i>
        ) : (
          <i className="fas fa-moon"></i>
        )}
      </button>
      <div className="login-container" ref={containerRef}>
        <div className="form-container">
          <div className="form-wrapper" ref={formRef}>
            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>
          <div className="overlay-container">
            <div className="overlay" ref={overlayRef}>
              <div className="overlay-panel overlay-left">
                <h2>Welcome Back!</h2>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={toggleForm}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h2>Hello, Friend!</h2>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" onClick={toggleForm}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 