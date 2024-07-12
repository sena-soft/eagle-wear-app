import { PropsWithChildren } from 'react'

const Loading = ({children}: PropsWithChildren) => {
  return (
    <div className='flex justify-center text-slate-400 font-semibold'>
        <div>{children}</div>
    </div>
  )
}

export default Loading