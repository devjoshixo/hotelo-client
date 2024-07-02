import React, { useState } from 'react';
import parse from 'html-react-parser';

const About = (props) => {
  const [about, setAbout] = useState({
    ...props.about.propertyContentSectionGroups,
  });
  return (
    <div className='w-full flex flex-col gap-20'>
      {/* // */}
      {/* About this Property  */}
      {about.aboutThisProperty.sections.map((header) => {
        return (
          <div className='w-full flex flex-row justify-around'>
            <h2 className='text-3xl font-medium'>{header.header.text}</h2>
            <div className='flex flex-col w-3/5 gap-5'>
              {header.bodySubSections.map((body) => {
                return body.elements.map((elements) => {
                  return (
                    <div>
                      <p className='text-xl font-medium mb-1'>
                        {elements.header.text}
                      </p>
                      {elements.items.map((items) => {
                        return (
                          <p className='text-[0.95rem]'>
                            {items.content.text || items.content.primary.value}
                          </p>
                        );
                      })}
                    </div>
                  );
                });
              })}
            </div>
          </div>
        );
      })}
      {/* About this Property  */}
      {/* // */}
      {/* // */}
      {/* Amenities */}
      {about.amenities.sections.map((header) => {
        return (
          <div className='w-full flex flex-row justify-around'>
            <h2 className='text-3xl font-medium'>{header.header.text}</h2>
            <div className='h-[50rem] flex flex-col w-3/5 gap-5 flex-wrap '>
              {header.bodySubSections.map((body) => {
                return body.elements.map((elements) => {
                  return (
                    <div className='w-2/5 flex gap-3 items-start'>
                      <i className='fa-solid fa-check scale-[1.5]'></i>
                      <div>
                        <p className='text-xl font-medium mb-1'>
                          {elements.header.text}
                        </p>
                        {elements.items.map((items) => {
                          return (
                            <p className='text-[0.95rem]'>
                              {items.content.text ||
                                items.content.primary.value}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        );
      })}
      {/* Amenities */}
      {/* // */}
      {/* // */}
      {/* Policies */}
      {about.policies.sections.map((header) => {
        return (
          <div className='w-full flex flex-row justify-around'>
            <h2 className='text-3xl font-medium'>{header.header.text}</h2>
            <div className='flex flex-col w-3/5 gap-5'>
              {header.bodySubSections.map((body) => {
                return body.elements.map((elements) => {
                  return (
                    <div className='flex flex-col gap-2'>
                      <p className='text-xl font-medium'>
                        {elements.header.text}
                      </p>
                      {elements.items.map((items) => {
                        if (items.contents) {
                          return items.contents.map((contents) => {
                            return <p>{contents.primary.value}</p>;
                          });
                        } else {
                          return (
                            <div className='flex'>
                              {parse(
                                items.content.text ||
                                  items.content.primary.value
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                });
              })}
            </div>
          </div>
        );
      })}
      {/* Policies */}
      {/* // */}
    </div>
  );
};

export default About;

{
  /* <div className='w-full flex flex-row justify-start gap-10'>
  <h2 className='text-3xl font-medium'>About this property</h2>
  <div>Hello</div>
</div>; */
}
