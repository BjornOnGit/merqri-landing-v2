/* eslint-disable react/prop-types */

const WhyCom = ({title, content, }) => {
  return (
    <div >
        <p className='text-[14px]'><span  className='font-semibold'>{title}: </span>{content}</p>
    </div>
  )
}

export default WhyCom