'use client';
import fairsData from '../../public/fairs.mock.json';

export default function Home() {
  const fairs = fairsData.fairs;

  return (
    <div className="home-container">
      <h1 className="home-heading">HRlab Trade Fair Dates</h1>
      <ul className="fair-list">
        {fairs.map((fair) => (
          <li key={fair.id} className="fair-item">
            <a href={`/${fair.id}`} className="fair-link">
              <img
                src={`/images/${fair.logo}`}
                alt={`${fair.name} Logo`}
                className="fair-logo"
              />
              <div>
                <h2 className="fair-name">{fair.name}</h2>
                <p className="fair-date">
                  {new Date(fair.start_date).toLocaleDateString()} -{' '}
                  {new Date(fair.end_date).toLocaleDateString()}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}