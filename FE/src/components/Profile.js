import React, { useEffect, useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { useAuth } from './AuthContext';

const Profile = () => {
  const [resultsData, setResultsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
          const response = await fetch(`/api/results/all/${userEmail}`);
          const data = await response.json();
          setResultsData(data);
        } else {
          console.error('User email not available in localStorage');
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    logout();
    navigate('/login');
    window.alert("Logged out");
  };

  if (loading) {
    return <p>Loading results...</p>;
  }

  if (resultsData.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div style={{ backgroundImage: `url(${require('../loginBG.jpeg')})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <div style={styles.profileCard}>
        <h2>All Semesters Results</h2>
        {resultsData.map((result, index) => (
          <div key={index} style={styles.resultSection}>
            <h3>{result.collectionName}</h3>
            {result.results ? (
              <div>
                <p>First Name: {result.results.fname || 'N/A'}</p>
                <p>Last Name: {result.results.lname || 'N/A'}</p>
                <p>Email: {result.results.email || 'N/A'}</p>
                {/* Display additional result details as needed */}
              </div>
            ) : (
              <p>No results available for this semester.</p>
            )}
          </div>
        ))}

        <button onClick={handleLogout} className="btn btn-warning mx-2 my-2">
          Logout
        </button>
      </div>

      <div style={styles.linkContainer}>
        <Link className="btn btn-success" to="/Recom">
          Let's Improve
        </Link>
      </div>
    </div>
  );
};

const styles = {
  profileCard: {
    border: '1px solid white',
    borderRadius: '10px',
    width: '70%',
    background: 'transparent',
    backdropFilter: 'blur(60px)',
    margin: '0 auto',
    padding: '1rem',
    textAlign: 'center'
  },
  resultSection: {
    borderBottom: '1px solid white',
    padding: '0.5rem',
    marginBottom: '1rem'
  },
  linkContainer: {
    marginTop: '30px',
    textAlign: 'center'
  }
};

export default Profile;
