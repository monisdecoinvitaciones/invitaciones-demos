"use client";
import React, { useState } from 'react';
import './FriendsSection.css';

const friendsData = [
  {
    id: 1,
    role: "Madrina de Cojín",
    name: "Valentina Gómez",
    phrase: "Para que descanses después de brillar.",
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    role: "Madrina de Brindis",
    name: "Isabella Ruiz",
    phrase: "Por un futuro lleno de risas y sueños.",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    role: "Madrina de Ramo",
    name: "Sofía Hernández",
    phrase: "Flores que celebran tu dulzura.",
    photoUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 4,
    role: "Bestie d'Honor",
    name: "Camila Díaz",
    phrase: "Siempre juntas, en cada paso y cada baile.",
    photoUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop"
  },
];

const FriendCard = ({ friend }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div  id='madrinas'
      className={`flip-card ${isFlipped ? 'flipped' : ''}`} 
      onClick={handleFlip}
      onKeyDown={(e) => { if (e.key === 'Enter') handleFlip(); }}
      tabIndex="0"
      role="button"
      aria-label={`Ver detalle de ${friend.role}`}
    >
      <div className="flip-card-inner">
        
        {/* FRONTAL: Ahora con tono crema descansado */}
        <div className="flip-card-front">
          <span className="card-tag">MADRINA DE</span>
          <h3 className="card-role-text">{friend.role.replace("Madrina de ", "")}</h3>
          <p className="card-instruction">(Toca para revelar)</p>
          <img src="/mariposas/optimized/2.webp" className="card-butterfly-icon" alt="butterfly" />
        </div>

        {/* TRASERA: Con textos ampliados */}
        <div className="flip-card-back">
          <div className="friend-photo-frame">
            <img src={friend.photoUrl} alt={friend.name} className="friend-photo" />
          </div>
          <h4 className="friend-name">{friend.name}</h4>
          <p className="friend-phrase">“{friend.phrase}”</p>
        </div>

      </div>
    </div>
  );
};

const FriendsSection = () => {
  return (
    <section className="friends-interactive-section">
      <div className="friends-container">
        <header className="friends-header">
          <span className="friends-subtitle">CÓMPLICES DE SUEÑOS</span>
          <h2 className="friends-title">Mis madrinas & amigas</h2>
          <div className="friends-divider"></div>
        </header>

        <div className="friends-grid">
          {friendsData.map(friend => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
        
        <p className="friends-tap-hint">Haz clic o toca en una tarjeta para conocerlas.</p>
      </div>
    </section>
  );
};

export default FriendsSection;