import {Search} from 'lucide-react'

const search = ({size}) => {
    return(
        <div className='relative w-max small:w-[150px] medium:w-[140px] flex items-center space-x-8 pr-2 bg-slate-100 rounded-3xl py-[8px] '>
        <Search className='absolute left-2 items-center' size={size} />
        <input
          type='search'
          className='outline-none text-sm bg-transparent'
          placeholder='Search'
        />
      </div>
    )                               
}

export default search