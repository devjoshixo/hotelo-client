import React, { useEffect, useState, useContext } from 'react';
import uniqid from 'uniqid';
import postSaveProperty from '../../../api/postSaveProperty';
import AuthContext from '../../../context/AuthContext';
import Loader from '../../UI/Loader';

const HotelItem = (props) => {
  const [scoreWord, setScoreWord] = useState({});
  const [price, setPrice] = useState({});
  const [offer, setOffer] = useState({});
  const [saved, setSaved] = useState(false);
  const [loader, setLoader] = useState(false);
  const hotel = props.hotel;

  useEffect(() => {
    //
    //Gives word review according to review score
    const scoreWordFormer = () => {
      const score = hotel.reviews.score * 10;
      let score_word = '';
      if (score < 80 && score >= 70) {
        score_word = 'Good';
      } else if (score >= 80 && score < 85) {
        score_word = 'Very good';
      } else if (score >= 85 && score < 90) {
        score_word = 'Excellent';
      } else if (score >= 90 && score <= 93) {
        score_word = 'Wonderful';
      } else if (score > 93) {
        score_word = 'Exceptional';
      }
      setScoreWord((prevState) => {
        return { ...prevState, score_word };
      });
    };
    //
    ////

    //
    //Putting comma after thousandth place
    const formatNumberIndian = (number) => {
      const numberString = String(number);
      const parts = numberString.split('.');
      let integerPart = parts[0];
      const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

      let formattedInteger = '';
      let count = 0;
      let thousandReached = false;

      if (numberString.length <= 3) {
        formattedInteger = numberString;
      } else {
        for (let i = integerPart.length - 1; i >= 0; i--) {
          formattedInteger = integerPart[i] + formattedInteger;
          count++;
          if (count === 3 && !thousandReached && i !== 0) {
            formattedInteger = ',' + formattedInteger;
            count = 0;
          }
          if (count === 4 && i > 0 && !thousandReached) {
            formattedInteger = ',' + formattedInteger;
            count = 0;
            thousandReached = true;
          }
        }
      }

      setScoreWord((prevState) => {
        return { ...prevState, total: formattedInteger + decimalPart };
      });
    };
    //
    ////

    //
    //Squeeze out the offer details from the offerBadge key
    const offerBadge = () => {
      let obj = {};
      if (
        !(hotel.offerBadge == null) &&
        !(hotel.offerBadge.secondary == null)
      ) {
        obj = {
          secondary: hotel.offerBadge.secondary.text,
          type: hotel.offerBadge.secondary.theme_temp,
        };

        if (!(obj.secondary[0] == 'W') && !(hotel.offerBadge.primary == null)) {
          if (hotel.offerBadge.primary.theme_temp == 'DEAL_MEMBER') {
            obj = {
              ...obj,
              primary: hotel.offerBadge.primary.text,
              type: hotel.offerBadge.primary.theme_temp,
            };
          }
        }
      }

      if (hotel.offerSummary) {
        let extra = [];
        hotel.offerSummary.messages.map((item) => {
          if (item.type == 'LOYALTY_EARN') {
            obj.loyalty = true;
          } else {
            extra.push(item.message);
          }
        });
        obj.extra = extra;
      }

      if (Object.keys(obj).length > 0) {
        setOffer({ ...obj });
      }
    };
    //
    ////

    //
    //Taking out all the pricing needs
    const priceMapper = () => {
      let price = { formatted: '', strikeOut: '', total: '', taxes: '' };
      hotel.price.displayMessages.map((messages) => {
        messages.lineItems.map((item) => {
          if (item.price != null) {
            if (item.role == 'STRIKEOUT') {
              price.strikeOut = item.price.formatted;
            } else if (item.role == 'LEAD') {
              price.formatted = item.price.formatted;
            }
          } else if (item.state != null) {
            if (item.state == 'BREAKOUT_TYPE_SECONDARY_PRICE') {
              price.total = item.value;
            } else if (item.state == 'BREAKOUT_TYPE_TAX_AND_FEE_CLARIFY') {
              price.taxes = item.value;
            }
          }
        });
      });
      setPrice(price);
    };

    const savedProperty = () => {
      setSaved(hotel.saved ? true : false);
    };

    scoreWordFormer();
    offerBadge();
    priceMapper();
    savedProperty();
    formatNumberIndian(hotel.reviews.total);
  }, []);

  const ctx = useContext(AuthContext);
  const propertySaver = async () => {
    setLoader(true);
    const liked = await props.propertySaver(hotel);
    await setSaved((prevState) => {
      return liked;
    });
    setLoader(false);
  };

  const openToHotel = (event) => {
    if (event.target.getAttribute('name') == 'heart') return;
    console.log(location.search);

    window.open('/hotel/' + hotel.id + location.search);
  };

  return (
    <header
      className='flex border border-[#22222222] flex-row flex-nowrap rounded-[20px] h-60 gap-4 pr-4 w-[50rem] cursor-pointer'
      onClick={openToHotel}
    >
      {loader && <Loader />}
      {/* Hotel Image */}
      <div className='relative'>
        <img
          src={hotel.propertyImage.image.url}
          className='h-60 w-[24rem] rounded-[20px_0_0_20px] object-cover'
          draggable='false'
        />
        <div
          className='absolute flex items-center justify-center top-[3%] right-[4%] text-center bg-[white] w-8 h-8 rounded-[50%] z-[90]'
          name='heart'
          onClick={propertySaver}
        >
          {saved ? (
            <i
              className='fa-solid fa-heart text-[red] scale-[1.3]'
              name='heart'
            />
          ) : (
            <i
              className='fa-regular fa-heart text-[red] scale-[1.3]'
              name='heart'
            />
          )}
        </div>
      </div>
      {/* Hotel Image */}

      {/* Details Section  */}
      <section className='mt-0.5rem flex flex-col w-full justify-between gap-6'>
        <div>
          <h3 className='text-2xl font-medium m-0 font-[Montserrat]'>
            {hotel.name}
          </h3>
          <p className='m-0 mt-0.3rem text-[0.9rem]'>
            {hotel.neighborhood.name}
          </p>
        </div>
        <section className='flex flex-row justify-between items-end'>
          <div className='flex flex-col items-start'>
            <div>
              {offer.extra && offer.extra.length > 0 ? (
                <div>
                  {offer.extra.map((item) => {
                    return (
                      <p
                        key={uniqid()}
                        className='text-[#227950] text-sm font-semibold my-[0.4rem] mx-0'
                      >
                        {item}
                      </p>
                    );
                  })}
                </div>
              ) : (
                ''
              )}
              {offer.loyalty ? (
                <div className='flex items-center'>
                  <i className='fa-solid fa-moon text-[white] bg-[purple] py-[0.3rem] px-[0.4rem] scale-[0.9] rounded-[10px]' />
                  <p className='flex items-center ml-1'>Collect Stamps</p>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className='flex gap-[0.4rem] items-center justify-start mb-4 font-medium text-[0.9rem]'>
              <div className='w-[1.9rem] rounded-[5px] h-[1.8rem] flex justify-center text-[white] items-center bg-[green]'>
                {hotel.reviews.score}
              </div>
              <div>
                <p>{scoreWord.score_word}</p>
                <p className='text-sm font-normal'>{scoreWord.total} review</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-end mb-4'>
            {/*  */}
            {/* offer tag  */}
            {offer.type ? (
              <div className='flex justify-end min-w-40 text-sm font-medium text-[white]'>
                <p
                  className={`${
                    offer.type == 'DEAL_MEMBER'
                      ? 'bg-[#7b1fa2] py-[0.2rem] px-[0.3rem]'
                      : 'bg-[#e61e43] py-1 px-2'
                  }`}
                >
                  {offer.type == 'DEAL_MEMBER' ? (
                    <i className='fa-solid fa-tag text-[white] mr-2 ml-[0.3rem] scale-[1.4]' />
                  ) : (
                    ''
                  )}
                  {offer.primary} {offer.secondary}
                </p>
              </div>
            ) : (
              ''
            )}
            {/* offer tag  */}
            {/*  */}
            {/* Hotel Pricing */}
            <div className='flex items-center gap-2 justify-end w-32'>
              {hotel.price.strikeOut ? (
                <p className='underline text-[0.9rem] m-0'>
                  <s>{price.strikeOut}</s>
                </p>
              ) : (
                ''
              )}

              <p className='text-xl font-medium m-0'>{price.formatted}</p>
            </div>
            <p className='text-[0.89em]'>{price.total}</p>
            <p className='text-[0.88rem] '>{price.taxes}</p>
            {/* Hotel Pricing  */}
          </div>
        </section>
      </section>
      {/* Details Section  */}
    </header>
  );
};

export default HotelItem;
