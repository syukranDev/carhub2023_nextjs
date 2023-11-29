import { Hero } from '@/components'
import Image from 'next/image'
import SearchBar from '@/components/SearchBar'
import CustomFilter from '@/components/CustomFilter'
import { fetchCars } from '@/utils'
import CarCard from '@/components/CarCard'

export default async function Home({searchParams} : any) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || ''
  });
  
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero/>
      
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text_container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter  />
            <CustomFilter  />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car}/>
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className='text-black text-xl'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}



      </div>

    </main>
  )
}
