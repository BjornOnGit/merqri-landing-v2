import React from 'react'

const PartnerBox = ({bgColor, imgUrl, textColor, text, width}) => {
  return (
    <div className={`flex flex-col items-center gap-5 px-6 py-4 rounded-xl text-center text-[15px]`} style={{backgroundColor: bgColor, width: width}}>
        <p><img src={`${imgUrl}`} alt="" /></p>
        <p style={{color: textColor}}>{text}</p>
    </div>
  )
}

export default PartnerBox