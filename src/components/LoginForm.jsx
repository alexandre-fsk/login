import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import './Form.css'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const formRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  useEffect(() => {
    // Animate form elements on mount
    const formElements = formRef.current.children
    gsap.fromTo(formElements,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power2.out"
      }
    )
  }, [])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      
      // Animate error shake
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.5,
        ease: "power2.out"
      })
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Success animation
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })
      
      // Show success message
      alert('Login successful! Welcome back!')
      
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
    
    // Animate eye icon
    gsap.to(passwordRef.current.querySelector('.password-toggle'), {
      rotation: showPassword ? 0 : 180,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form">
      <h1>Sign In</h1>
      <p>Welcome back! Please sign in to your account</p>
      
      <div className="social-container">
        <a href="#" aria-label="Sign in with Google">
          <i className="fab fa-google"></i>
        </a>
        <a href="#" aria-label="Sign in with Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" aria-label="Sign in with Twitter">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
      
      <span>or use your account</span>
      
      <div className="input-group">
        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className={errors.email ? 'error' : ''}
            ref={emailRef}
          />
          <i className="fas fa-envelope"></i>
        </div>
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      
      <div className="input-group">
        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className={errors.password ? 'error' : ''}
            ref={passwordRef}
          />
          <i className="fas fa-lock"></i>
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
          </button>
        </div>
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      
      <div className="form-options">
        <label className="checkbox-wrapper">
          <input type="checkbox" />
          <span className="checkmark"></span>
          Remember me
        </label>
        <a href="#" className="forgot-password">Forgot your password?</a>
      </div>
      
      {errors.general && (
        <div className="error-message general">{errors.general}</div>
      )}
      
      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner"></span>
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  )
}

export default LoginForm 