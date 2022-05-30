import { useRouter } from 'next/router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { format } from 'date-fns'
import InfoCard from '../components/InfoCard'
import Map from '../components/Mapbox'

function Search({ searchResults }) {
  const router = useRouter()
  const { location, startDate, endDate, numberOfGuests } = router.query
  const formatedStartDate = format(new Date(startDate), 'dd MMMM yy')
  const formatedEndDate = format(new Date(endDate), 'dd MMMM yy')
  const range = `${formatedStartDate} - ${formatedEndDate}`

  return (
    <div>
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuests} guests`}
      />
      <main className="flex">
        <section className="flex-grow px-6 pt-14">
          <p className="text-xs">
            300+ Stays - {range} - for {numberOfGuests} guests
          </p>

          <h1 className="mt-2 mb-6 text-3xl font-semibold">
            Stays in {location}
          </h1>

          <div className="mb-5 hidden space-x-3 whitespace-nowrap text-gray-800 lg:inline-flex">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, description, title, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  description={description}
                  title={title}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>

        <section className="hidden min-w-[600px] cursor-pointer xl:inline-flex">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Search

export async function getServerSideProps(context) {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )

  return {
    props: {
      searchResults,
    },
  }
}
