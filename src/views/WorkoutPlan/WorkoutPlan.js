


// import React from "react";
// import '../../css/WorkoutPlan.css';
// import '../../css/workout.css';

// // import "./WorkoutPlan.css"; // Import the external CSS file


// function WorkoutPlan() {
//   return (
//     <div className="workout-plan-container">
//       {/* Top Section */}
//       <div className="workout-header">
//         <div className="photo-placeholder">Photo</div>
//         <div className="name-container">
//           <label className="name-label">Name</label>
//           <input type="text" className="name-input" placeholder="Enter Name" />
//         </div>
//         <div className="weight-box">
//           <label>Avg. Weight -</label>
//         </div>
//       </div>

//       {/* Trainer Section */}
//       <div className="trainer-container">
//         <label className="trainer-label">Trainer name</label>
//         <input type="text" className="trainer-input" placeholder="Enter Trainer Name" />
//       </div>

//       {/* Workout Plan */}
//       <div className="workout-plan-section">
//         <label className="workout-title">Workout Plan</label>
//         <div className="workout-days">
//           <div className="day">
//             <span>M</span>
//             <button>U</button>
//           </div>
//           <div className="day">
//             <span>T</span>
//             <button>B</button>
//           </div>
//           <div className="day">
//             <span>W</span>
//             <button>C</button>
//           </div>
//           <div className="day">
//             <span>T</span>
//             <button>R</button>
//           </div>
//           <div className="day">
//             <span>F</span>
//             <button>S</button>
//           </div>
//           <div className="day">
//             <span>S</span>
//             <button>L</button>
//           </div>
//           <div className="day">
//             <span>S</span>
//             <button>R</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WorkoutPlan;



// const WorkoutPlan = () => {
//   return (
//     <div className="container">
//       {/* Header Section */}
//       <div className="header">
//         <div className="photo">Photo</div>
//         <div className="name-container">
//           <h2 className="name">Name</h2>
//         </div>
//         <div className="ax-weight">
//           <p>Ax: </p>
//           <p>Weight:</p>
//         </div>
//       </div>

//       {/* Trainer Name */}
//       <div className="trainer-container">
//         <p className="trainer-label">Trainer Name</p>
//         <input className="input-box" type="text" />
//       </div>

//       {/* Workout Plan */}
//       <div className="workout-container">
//         <p className="workout-title">Workout Plan</p>
//         <div className="days-container">
//           {/* Days */}
//           {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
//             <div key={index} className="day-block">
//               <p className="day">{day}</p>
//               <div className="circle">{["U", "B", "C", "R", "S", "L", "R"][index]}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkoutPlan;

// import React from 'react';
// import '../../css/WorkoutPlan.css';

// const WorkoutPlan = ({ photo, weight, age, clientName, trainerName, workoutDays }) => {
//   return (
//     <div className="workout-plan">
//       <div className="header">
//         <div className="photo">
//           <img src={photo} alt="Client" />
//         </div>
//         <div className="info">
//           <div className="details">
//             <span>Weight: {weight} kg</span>
//             <span>Age: {age} years</span>
//           </div>
//           <div className="names">
//             <h3>{clientName}</h3>
//             <p>Trainer: {trainerName}</p>
//           </div>
//         </div>
//       </div>

//       <div className="workout-box">
//         <h4>Weekly Workout Plan</h4>
//         <div className="days">
//           {workoutDays.map((day, index) => (
//             <div key={index} className="day">
//               <div className="icon">{day.icon}</div>
//               <div className="day-name">{day.name}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkoutPlan;
import React from 'react';
import '../../css/workout.css';

function WorkoutPlan() {
  const workoutIcons = {
    M: { name: 'Upper Body', src: '/images/u4.jpg' },
    T: { name: 'Back', src: '/images/u4.jpg' },
    W: { name: 'Cardio', src: '/images/u4.jpg' },
    T2: { name: 'Rest', src: '/images/u4.jpg' },
    F: { name: 'Shoulder', src: '/images/u4.jpg' },
    S: { name: 'Legs', src: '/images/u4.jpg' },
    S2: { name: 'Rest', src: '/images/u4.jpg' },
  };
  const UserName='Dhanshree'
  const weight=48;
  const Age=21;

  const days = ['M', 'T', 'W', 'T2', 'F', 'S', 'S2'];
  const trainer = 'Dhanshree Shinde';

  return (
    <div className='container'>
      <div className='user-info'>
        <div className='photo-container'>
          <div className='photo'>
            <img src='/images/u4.jpg' alt='User' />
          </div>
        </div>
        <div className='name'>
          <p>{UserName}</p>
        </div>
        <div className='weight-age'>
          <p>Age - {Age} </p>
          <p>Weight - {weight} </p>
        </div>
      </div>

      <div className='trainer-container'>
        <span>Trainer name - {trainer}</span>
      </div>

      <div className='workout-container'>
        <h2>Workout Plan</h2>
        <div className='weekly-plan'>
          {days.map((day, index) => (
            <div className='week' key={index}>
              <div className='week-day'>{day.charAt(0)}</div>
              <div className='icon'>
                <img
                  src={workoutIcons[day].src}
                  alt={`${workoutIcons[day].name} icon`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkoutPlan;



// import React from 'react';
// import '../../css/workout.css';

// function WorkoutPlan() {
//   return (
//     <div className='container'>
//       <div className='user-info'>
//         <div className='photo-container'>
//           <div className='photo'></div>
//         </div>
//         <div className='name'>
//           <p>Name</p>
//         </div>
//         <div className='weight-age'>
//           <p>Age - </p>
//           <p>Weight - </p>
//         </div>
//       </div>

//       <div className='trainer-container'>
//         <span>Trainer name - Dhanshree Shinde</span>
//       </div>

//       <div className='workout-container'>
//         <h2>Workout Plan</h2>
//         <div className='weekly-plan'>
//           {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
//             <div className='week' key={index}>
//               <div className='week-day'>{day}</div>
//               <div className='icon'></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WorkoutPlan;



