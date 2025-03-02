'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import fairsData from '../../../public/fairs.mock.json';

export default function FairDetail() {
  const params = useParams();
  const { id } = params;
  const [timeLeft, setTimeLeft] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const fair = fairsData.fairs.find((f) => f.id.toString() === id);

  useEffect(() => {
    setIsClient(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(fair.start_date) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft());
    };

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [fair.start_date]);

  if (!fair) {
    return <div>Fair not found</div>;
  }

  return (
    <div className="detail-container">
      <h1 className="detail-heading">{fair.name}</h1>
      <div className="cover-container">
        <img
          src={`/images/${fair.cover}`}
          alt={`${fair.name} Cover`}
          className="cover-image"
        />
      </div>
      <div className="logo-container">
        <img
          src={`/images/${fair.logo}`}
          alt={`${fair.name} Logo`}
          className="detail-logo"
        />
      </div>
      <div className="countdown">
        <h2>Countdown to Event:</h2>
        {isClient && timeLeft ? (
          timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
            <p>
              <span>{timeLeft.days}</span> days{' '}
              <span>{timeLeft.hours}</span> hours{' '}
              <span>{timeLeft.minutes}</span> minutes{' '}
              <span>{timeLeft.seconds}</span> seconds
            </p>
          ) : (
            <p>Event has started!</p>
          )
        ) : (
          <p>Loading countdown...</p>
        )}
      </div>
      <div className="detail-info">
        <p>
          <strong>Booth Number:</strong> {fair.booth_number}
        </p>
        <p>
          <strong>Date:</strong> {new Date(fair.start_date).toLocaleDateString()} -{' '}
          {new Date(fair.end_date).toLocaleDateString()}
        </p>
        <p>
          <strong>Address:</strong> {fair.address.street} {fair.address.house_number},{' '}
          {fair.address.city}, {fair.address.zip}, {fair.address.state}
        </p>
        <p>
          <strong>Website:</strong>{' '}
          <a href={fair.website} className="website-link">
            {fair.website}
          </a>
        </p>
      </div>
      <a href={fair.website} className="button">
        Visit Website
      </a>
    </div>
  );
}