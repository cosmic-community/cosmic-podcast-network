'use client'

import { useState } from 'react'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  onFilter?: (categoryId: string | null) => void
}

export default function CategoryFilter({ categories, onFilter }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    onFilter?.(categoryId)
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`btn ${
          selectedCategory === null ? 'btn-primary' : 'btn-secondary'
        }`}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`btn ${
            selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'
          } flex items-center gap-1`}
        >
          {category.metadata?.emoji && (
            <span>{category.metadata.emoji}</span>
          )}
          {category.title}
        </button>
      ))}
    </div>
  )
}