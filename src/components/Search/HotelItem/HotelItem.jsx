import React, { useEffect, useState } from 'react';
import classes from './HotelItem.module.css';

const HotelItem = (props) => {
  const [scoreWord, setScoreWord] = useState({});
  const hotel = props.hotel;

  useEffect(() => {
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

    const offerBadge = () => {
      if (!(hotel.offerBadge == null)) {
        if (!(hotel.offerBadge.secondary == null)) {
          setScoreWord((prevState) => {
            return {
              ...prevState,
              offer: {
                text: hotel.offerBadge.secondary.text,
                type: hotel.offerBadge.secondary.theme_temp,
              },
            };
          });
        }
      }
    };

    scoreWordFormer();
    offerBadge();
    formatNumberIndian(hotel.reviews.total);
  }, []);

  return (
    <header className={classes.wrapper}>
      {/* Hotel Image */}
      <div className={classes.imagediv}>
        <img src={hotel.propertyImage.image.url} />
      </div>
      {/* Hotel Image */}

      {/* Details Section  */}
      <section className={classes.details}>
        <div>
          <h3 className={classes.name}>{hotel.name}</h3>
          <p className={classes.district}>{hotel.neighborhood.name}</p>
        </div>
        <section className={classes.lowerdetails}>
          <div className={classes.rating}>
            <div className={classes.ratingbox}>{hotel.reviews.score}</div>
            <div>
              <p>{scoreWord.score_word}</p>
              <p style={{ fontSize: '0.8rem', fontWeight: '400' }}>
                {scoreWord.total} review
              </p>
            </div>
          </div>

          {/* Hotel Pricing */}
          <div className={classes.price}>
            {hotel.price.strikeOut ? (
              <p className={classes.strikeout}>
                <s>{hotel.price.strikeOut.formatted}</s>
              </p>
            ) : (
              ''
            )}
            <p className={classes.perday}>{hotel.price.lead.formatted}</p>
            {scoreWord.offer ? (
              <div className={classes.offer}>{scoreWord.offer.text}</div>
            ) : (
              ''
            )}
          </div>
          {/* Hotel Pricing  */}
        </section>
      </section>
      {/* Details Section  */}
    </header>
  );
};

export default HotelItem;
