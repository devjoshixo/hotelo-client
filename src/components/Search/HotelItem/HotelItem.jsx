import React, { useEffect, useState, useContext } from 'react';
import classes from './HotelItem.module.css';
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

  return (
    <header className={classes.wrapper}>
      {loader && <Loader />}
      {/* Hotel Image */}
      <div className={classes.imagediv}>
        <img src={hotel.propertyImage.image.url} draggable='false' />
        <div className={classes.heart} onClick={propertySaver}>
          {saved ? (
            <i className='fa-solid fa-heart' />
          ) : (
            <i className='fa-regular fa-heart' />
          )}
        </div>
      </div>
      {/* Hotel Image */}

      {/* Details Section  */}
      <section className={classes.details}>
        <div>
          <h3 className={classes.name}>{hotel.name}</h3>
          <p className={classes.district}>{hotel.neighborhood.name}</p>
        </div>
        <section className={classes.lowerdetails}>
          <div className={classes.leftside}>
            <div>
              {offer.extra && offer.extra.length > 0 ? (
                <div>
                  {offer.extra.map((item) => {
                    return (
                      <p
                        key={uniqid()}
                        style={{
                          color: '#227950',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          margin: '0.4rem 0',
                        }}
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
                <div className={classes.loyalty}>
                  <i className='fa-solid fa-moon' />
                  <p>Collect Stamps</p>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className={classes.rating}>
              <div className={classes.ratingbox}>{hotel.reviews.score}</div>
              <div>
                <p>{scoreWord.score_word}</p>
                <p style={{ fontSize: '0.8rem', fontWeight: '400' }}>
                  {scoreWord.total} review
                </p>
              </div>
            </div>
          </div>

          <div className={classes.priceWrapper}>
            {/*  */}
            {/* offer tag  */}
            {offer.type ? (
              <div className={classes.offer}>
                <p
                  className={`${
                    offer.type == 'DEAL_MEMBER'
                      ? classes.memberOffer
                      : classes.generalOffer
                  }`}
                >
                  {offer.type == 'DEAL_MEMBER' ? (
                    <i
                      className='fa-solid fa-tag'
                      style={{
                        color: '#ffff',
                        marginRight: '0.5rem',
                        marginLeft: '0.3rem',
                        scale: '1.4',
                      }}
                    />
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
            <div className={classes.price}>
              {hotel.price.strikeOut ? (
                <p className={classes.strikeout}>
                  <s>{price.strikeOut}</s>
                </p>
              ) : (
                ''
              )}

              <p className={classes.perday}>{price.formatted}</p>
            </div>
            <p style={{ fontSize: '0.89rem' }}>{price.total}</p>
            <p style={{ fontSize: '0.88rem' }}>{price.taxes}</p>
            {/* Hotel Pricing  */}
          </div>
        </section>
      </section>
      {/* Details Section  */}
    </header>
  );
};

export default HotelItem;
