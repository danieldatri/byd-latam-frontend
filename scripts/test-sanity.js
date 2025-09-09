// Script para probar la conexión a Sanity
import { getAllPosts, getFeaturedPosts, getAllCategories, getAllCountries, getAllAuthors } from '../lib/sanity'

async function testSanityConnection() {
  console.log('🔍 Probando conexión a Sanity...\n')

  try {
    console.log('📰 Obteniendo todos los posts...')
    const allPosts = await getAllPosts()
    console.log(`✅ Posts encontrados: ${allPosts.length}`)
    if (allPosts.length > 0) {
      console.log(`   - Primer post: "${allPosts[0].title}"`)
    }

    console.log('\n⭐ Obteniendo posts destacados...')
    const featuredPosts = await getFeaturedPosts()
    console.log(`✅ Posts destacados: ${featuredPosts.length}`)

    console.log('\n📂 Obteniendo categorías...')
    const categories = await getAllCategories()
    console.log(`✅ Categorías encontradas: ${categories.length}`)
    categories.forEach(cat => {
      console.log(`   - ${cat.title} (${cat.color})`)
    })

    console.log('\n🌎 Obteniendo países...')
    const countries = await getAllCountries()
    console.log(`✅ Países encontrados: ${countries.length}`)
    countries.forEach(country => {
      console.log(`   - ${country.name} ${country.emoji || ''}`)
    })

    console.log('\n✍️ Obteniendo autores...')
    const authors = await getAllAuthors()
    console.log(`✅ Autores encontrados: ${authors.length}`)
    authors.forEach(author => {
      console.log(`   - ${author.name}`)
    })

    console.log('\n🎉 ¡Conexión a Sanity exitosa!')

  } catch (error) {
    console.error('❌ Error conectando a Sanity:', error)
  }
}

testSanityConnection()
