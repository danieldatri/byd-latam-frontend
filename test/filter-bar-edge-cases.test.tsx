import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FilterBar } from '@/components/filter-bar'

// Mock data
const mockCategories = [
  { _id: 'cat1', title: 'Lanzamientos', color: '#00BFFF' },
  { _id: 'cat2', title: 'Análisis', color: '#FF69B4' },
]

const mockCountries = [
  { _id: 'arg', name: 'Argentina', emoji: '🇦🇷' },
  { _id: 'mex', name: 'México', emoji: '🇲🇽' },
]

const mockPosts = [
  {
    _id: 'post1',
    title: 'Post Argentina',
    publishedAt: '2025-01-15T10:00:00Z',
    category: [{ _id: 'cat1', title: 'Lanzamientos', slug: { current: 'lanzamientos' }, color: '#00BFFF', description: 'desc' }],
    country: { _id: 'arg', name: 'Argentina', slug: { current: 'argentina' }, emoji: '🇦🇷' },
  },
  {
    _id: 'post2',
    title: 'Post México',
    publishedAt: '2025-01-10T10:00:00Z',
    category: [{ _id: 'cat2', title: 'Análisis', slug: { current: 'analisis' }, color: '#FF69B4', description: 'desc' }],
    country: { _id: 'mex', name: 'México', slug: { current: 'mexico' }, emoji: '🇲🇽' },
  },
  {
    _id: 'post3',
    title: 'Post Sin País',
    publishedAt: '2025-01-05T10:00:00Z',
    category: [{ _id: 'cat1', title: 'Lanzamientos', slug: { current: 'lanzamientos' }, color: '#00BFFF', description: 'desc' }],
    country: null,
  },
] as any[]

describe('FilterBar Edge Cases', () => {
  const mockOnFilterChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('filters by category correctly', async () => {
    render(
      <FilterBar
        categories={mockCategories}
        countries={mockCountries}
        allPosts={mockPosts}
        onFilterChange={mockOnFilterChange}
        foundCount={2}
      />
    )

    const categorySelect = screen.getByDisplayValue('Todas las categorías')
    fireEvent.change(categorySelect, { target: { value: 'cat1' } })

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled()
      const [filteredPosts] = mockOnFilterChange.mock.calls[mockOnFilterChange.mock.calls.length - 1]
      expect(filteredPosts).toHaveLength(2) // post1 and post3 have cat1
    })
  })

  it('filters by country correctly', async () => {
    render(
      <FilterBar
        categories={mockCategories}
        countries={mockCountries}
        allPosts={mockPosts}
        onFilterChange={mockOnFilterChange}
      />
    )

    const countrySelect = screen.getByDisplayValue('Todas las regiones')
    fireEvent.change(countrySelect, { target: { value: 'arg' } })

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled()
      const [filteredPosts] = mockOnFilterChange.mock.calls[mockOnFilterChange.mock.calls.length - 1]
      expect(filteredPosts).toHaveLength(1) // only post1 is from Argentina
      expect(filteredPosts[0]._id).toBe('post1')
    })
  })

  it('sorts by title A-Z correctly', async () => {
    render(
      <FilterBar
        categories={mockCategories}
        countries={mockCountries}
        allPosts={mockPosts}
        onFilterChange={mockOnFilterChange}
      />
    )

    const sortSelect = screen.getByDisplayValue('Más reciente')
    fireEvent.change(sortSelect, { target: { value: 'title' } })

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled()
      const [filteredPosts] = mockOnFilterChange.mock.calls[mockOnFilterChange.mock.calls.length - 1]
      expect(filteredPosts[0].title).toBe('Post Argentina') // alphabetically first
      expect(filteredPosts[1].title).toBe('Post México')
      expect(filteredPosts[2].title).toBe('Post Sin País')
    })
  })

  it('displays foundCount when provided', () => {
    render(
      <FilterBar
        categories={mockCategories}
        countries={mockCountries}
        allPosts={mockPosts}
        onFilterChange={mockOnFilterChange}
        foundCount={42}
      />
    )

    expect(screen.getByText('42 artículos encontrados')).toBeInTheDocument()
  })

  it('falls back to allPosts.length when foundCount not provided', () => {
    render(
      <FilterBar
        categories={mockCategories}
        countries={mockCountries}
        allPosts={mockPosts}
        onFilterChange={mockOnFilterChange}
      />
    )

    expect(screen.getByText('3 artículos encontrados')).toBeInTheDocument()
  })

  it('handles empty categories and countries gracefully', () => {
    render(
      <FilterBar
        categories={[]}
        countries={[]}
        allPosts={mockPosts}
        onFilterChange={mockOnFilterChange}
      />
    )

    expect(screen.getByDisplayValue('Todas las categorías')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Todas las regiones')).toBeInTheDocument()
  })
})
