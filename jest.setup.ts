import '@testing-library/jest-dom'
import React from 'react'

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...rest }: any) => React.createElement('a', { href, ...rest }, children)
})

// Mock next/image to plain img
jest.mock('next/image', () => {
  return (props: any) => React.createElement('img', { ...props })
})

