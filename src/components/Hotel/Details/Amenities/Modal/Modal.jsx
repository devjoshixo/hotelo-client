import Reactxs from 'react';
import uniqid from 'uniqid';

const Modal = (props) => {
  // console.log(props.amenities);
  return (
    <div className='fixed top-0 left-0 flex justify-center z-[9999] w-[100vw] h-[100vh] overflow-hidden bg-[#00000076]'>
      <div className='fixed w-[40rem] h-4/5 top-[10%] rounded-[20px] z-[999] bg-[white] pb-20 px-5 pt-5'>
        <div className='flex justify-between h-16 ml-10'>
          <h3 className='text-[1.4rem] font-semibold'>Property Amenities</h3>
          <i
            className='fa-regular fa-circle-xmark scale-[2.4] m-[1.2rem_1rem_0_0]'
            name='close'
            onClick={props.onToggle}
          />
        </div>
        <section className='relative mt-4 flex flex-col flex-nowrap gap-[10px] ml-10 min-h-[80px] text-[0.9rem] leading-8 h-full overflow-y-scroll'>
          <div>
            Popular Amenities
            <div className='flex flex-col flex-wrap h-60'>
              {props.amenities.takeover.highlight[0].items.map(
                (item, index) => {
                  return (
                    <div
                      className='flex gap-[10px] items-center min-w-40 h-9 text-base'
                      key={uniqid()}
                    >
                      {props.ICONS[item.icon.id]}
                      <p className='m-0'>{item.text}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {props.amenities.takeover.property.map((property) => {
            return (
              <div className=''>
                <h3 className='m-0 h-8'>{property.header.text}</h3>
                <ul className='p-0 list-disc list-inside'>
                  {property.items.map((item) => {
                    return <li className='text-base'>{item.text}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Modal;
