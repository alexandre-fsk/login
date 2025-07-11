import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import './Form.css'

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  const formRef = useRef(null)
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

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
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const isLongEnough = password.length >= 8
    
    let strength = 0
    if (hasUpperCase) strength++
    if (hasLowerCase) strength++
    if (hasNumbers) strength++
    if (hasSpecialChar) strength++
    if (isLongEnough) strength++
    
    return { isValid: strength >= 4, strength }
  }

  const validateName = (name) => {
    return name.trim().length >= 2
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
    
    // Update password strength
    if (name === 'password') {
      const { strength } = validatePassword(value)
      setPasswordStrength(strength)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Name is required'
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else {
      const { isValid } = validatePassword(formData.password)
      if (!isValid) {
        newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
      }
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Success animation
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      })
      
      // Show success message
      alert('Account created successfully! Welcome!')
      
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword)
      gsap.to(passwordRef.current.querySelector('.password-toggle'), {
        rotation: showPassword ? 0 : 180,
        duration: 0.3,
        ease: "power2.out"
      })
    } else {
      setShowConfirmPassword(!showConfirmPassword)
      gsap.to(confirmPasswordRef.current.querySelector('.password-toggle'), {
        rotation: showConfirmPassword ? 0 : 180,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return '#ef4444'
    if (passwordStrength <= 3) return '#f59e0b'
    if (passwordStrength <= 4) return '#10b981'
    return '#059669'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak'
    if (passwordStrength <= 3) return 'Fair'
    if (passwordStrength <= 4) return 'Good'
    return 'Strong'
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form">
      <h1>Create Account</h1>
      <p>Join us! Create your account to get started</p>
      
      <div className="social-container">
        <a href="#" aria-label="Sign up with Google">
          <i className="fab fa-google"></i>
        </a>
        <a href="#" aria-label="Sign up with Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" aria-label="Sign up with Twitter">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
      
      <span>or use your email for registration</span>
      
      <div className="input-group">
        <div className="input-wrapper">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className={errors.name ? 'error' : ''}
            ref={nameRef}
          />
          <i className="fas fa-user"></i>
        </div>
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      
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
            onClick={() => togglePasswordVisibility('password')}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
          </button>
        </div>
        {formData.password && (
          <div className="password-strength">
            <div className="strength-bar">
              <div 
                className="strength-fill" 
                style={{ 
                  width: `${(passwordStrength / 5) * 100}%`,
                  backgroundColor: getPasswordStrengthColor()
                }}
              ></div>
            </div>
            <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
              {getPasswordStrengthText()}
            </span>
          </div>
        )}
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>
      
      <div className="input-group">
        <div className="input-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className={errors.confirmPassword ? 'error' : ''}
            ref={confirmPasswordRef}
          />
          <i className="fas fa-lock"></i>
          <button
            type="button"
            className="password-toggle"
            onClick={() => togglePasswordVisibility('confirm')}
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            <i className={`fas fa-eye${showConfirmPassword ? '-slash' : ''}`}></i>
          </button>
        </div>
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>
      
      <div className="form-options">
        <label className="checkbox-wrapper">
          <input type="checkbox" required />
          <span className="checkmark"></span>
          I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
        </label>
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
            Creating Account...
          </>
        ) : (
          'Sign Up'
        )}
      </button>
    </form>
  )
}

export default SignupForm 