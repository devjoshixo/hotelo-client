import React, { forwardRef, useEffect } from 'react';
import uniqid from 'uniqid';
import './RoomModal.css';
import Carousel from 'react-material-ui-carousel';
import Breakfast from '../Sections/Breakfast/Breakfast';
import Price from '../Sections/Price/Price';
import parse from 'html-react-parser';

const RoomModal = forwardRef((props, ref) => {
  useEffect(() => {
    if (props.modal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup to remove the class when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [props.modal]);
  return (
    <div className='fixed top-0 left-0 flex justify-center items-center z-[9999] w-[100vw] h-[100vh] overflow-y-hidden bg-[#00000076]'>
      <div
        ref={ref}
        className='fixed w-5/12 h-[90%] flex flex-col gap-4 rounded-[15px] z-[999] pl-4 pt-2 bg-[white] overflow-hidden'
      >
        {/* // */}
        {/* Top Section  */}
        <div className='flex items-center gap-2'>
          <div
            className='w-9 h-9 rounded-[50%] border border-[#00000088] flex justify-center items-center hover:bg-[#b1d0ff81]'
            onClick={() => {
              props.setModal(false);
            }}
          >
            <i className='fa-solid fa-xmark scale-[1.5] font-normal text-[blue]' />
          </div>
          <p className='font-semibold'>Room Information</p>
        </div>
        {/* Top Section  */}
        {/* // */}

        <div className='overflow-y-scroll pr-4 flex flex-col gap-4 pb-5'>
          {/* // */}
          {/* Image Section  */}
          <div className='h-[55%]'>
            <Carousel
              animate='slide'
              interval={null}
              indicators={false}
              navButtonsAlwaysVisible={true}
              navButtonsProps={{
                style: {
                  backgroundColor: 'white',
                  color: 'blue',
                },
              }}
              sx={{
                cursor: 'pointer',
                height: '100%',
                borderRadius: '15px',
              }}
            >
              {props.room.primarySelections[0].propertyUnit.unitGallery.gallery.map(
                (imgUrl) => {
                  return (
                    <img
                      src={imgUrl.image.url}
                      className='w-full rounded-[15px] object-cover'
                      key={uniqid()}
                    />
                  );
                }
              )}
            </Carousel>
          </div>
          {/* Image Section  */}
          {/* // */}

          {/* //  */}
          {/* Details  */}
          <div className='pl-4'>
            <h2 className='text-xl'>{props.room.header.text}</h2>
            <div className='flex flex-col mt-4 gap-1'>
              {props.room.features.map((feature) => {
                return (
                  <div className='flex items-center gap-2' key={uniqid()}>
                    {feature.icon ? (
                      props.ICONS[feature.icon.id]
                    ) : (
                      <img
                        src={feature.graphic.url.value}
                        className='w-5 h-5'
                      />
                    )}
                    <p>{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Details  */}
          {/* //  */}

          {/* //  */}
          {/* Room Amenities  */}
          <div className='pl-4 mt-8'>
            <h2 className='text-lg font-medium'>Room Amenities</h2>
            <div className='flex flex-row flex-wrap flex-[0_0_33.333%]'>
              {props.room.primarySelections[0].propertyUnit.roomAmenities.bodySubSections[0].contents.map(
                (amenities) => {
                  return (
                    <div className='w-[48%] mt-8'>
                      <h2 className='font-semibold text-base'>
                        {amenities.header.text}
                      </h2>
                      <div className='listing text-sm'>
                        {parse(amenities.items[0].content.text)}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {/* Room Amenities  */}
          {/* //  */}
          {/* // */}
          {/* Price  */}
          <div>
            {props.room.primarySelections[0].secondarySelections ? (
              <Breakfast
                details={props.room.primarySelections[0].secondarySelections[0]}
                toggleBreakfast={props.toggleBreakfast}
                breakfast={props.breakfast}
              />
            ) : (
              ''
            )}
          </div>
          <div className='py-4 border border-[#5757575a] rounded-[20px]'>
            <Price
              prices={
                props.room.primarySelections[0].propertyUnit.ratePlans[
                  props.breakfast
                ]
              }
            />
          </div>
          {/* Price  */}
          {/* // */}
        </div>
      </div>
    </div>
  );
});

export default RoomModal;
