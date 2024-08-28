import {Search} from 'lucide-react'

const search = ({size}) => {
    return(
        <div className='w-max flex items-center space-x-2 bg-slate-100 rounded-3xl py-[8px] px-4 '>
        <Search className='' size={size} />
        <input
          type='search'
          className='outline-none text-sm bg-transparent'
          placeholder='Search'
        />
      </div>
    )
}

export default search