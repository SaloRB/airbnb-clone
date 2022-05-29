import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

function Header({ placeholder }) {
  // State
  const [searchInput, setSearchInput] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [numberOfGuests, setNumberOfGuests] = useState(1)

  // Router
  const router = useRouter()

  const resetInput = () => {
    setSearchInput('')
  }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
      },
    })
  }

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white p-5  shadow-md md:px-10">
      {/* Logo */}
      <div
        onClick={() => router.push('/')}
        className="relative my-auto flex h-10 cursor-pointer items-center"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Search */}
      <div className="flex items-center rounded-full py-2 md:border-2 md:shadow-sm">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={placeholder || 'Where do you want to go?'}
          className="bg:transparent flex-grow pl-5 text-gray-600 outline-none placeholder:text-gray-400"
        />
        <SearchIcon className="hidden h-8 cursor-pointer rounded-full bg-red-400 p-2 text-white md:mx-2 md:inline-flex" />
      </div>

      {/* Menu */}
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden cursor-pointer md:inline">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 rounded-full border-2 p-2">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {/* Calendar */}
      {searchInput && (
        <div className="col-span-3 mx-auto flex flex-col">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={handleSelect}
          />
          <div className="mb-4 flex items-center border-b">
            <h2 className="flex-grow text-2xl font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              type="number"
              min="1"
              className="w-12 pl-2 text-lg text-red-400 outline-none"
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
