


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




// import React from "react";
// import '../../css/WorkoutPlan.css';
// import '../../css/workout.css';

// // import "./WorkoutPlan.css"; // Import the external CSS file

function WorkoutPlan() {
  return (
    <div >
        <div className="user-info">
            <div className="photo-container">
                <div className="photo">

                </div>
                <span>
                    Photo
                </span>
            </div>
            <div className="name">
                <p>Name</p>
            </div>
            <div className="weight-age">
                <p>Age - </p>
                <p>weight - </p>
            </div>



        </div>
        <div className="trainer-container">
            <span>Trainer name - </span>
        </div>   

        <div className="Workout-container">
            <h3>
            WorkoutPlan
            </h3>
            <div className="weekly-plan">
                <div className="monday">
                    <p>
                        M
                    </p>
                    
                </div>

                <div className="tuesday">
                    <p>
                        T
                    </p>
                    
                </div>
                <div className="wednesday">
                    <p>
                        W
                    </p>
                    
                </div>
                <div className="thursday">
                    <p>
                        T
                    </p>
                    
                </div>
                <div className="friday">
                    <p>
                        F
                    </p>
                    
                </div><div className="saturday">
                    <p>
                        S
                    </p>
                    
                </div>
                <div className="sunday">
                    <p>
                        S
                    </p>
                    
                </div>
            </div>
        </div>    
    </div>
    );
}
export default WorkoutPlan

