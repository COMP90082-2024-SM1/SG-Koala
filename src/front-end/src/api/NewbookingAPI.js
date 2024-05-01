export const getAllTemplates = async () => {
    return fetch("http://127.0.0.1:8000/api/template/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        });
};

export const getAllMiscellaneous = async () => {
    return fetch("http://127.0.0.1:8000/api/miscellaneous/")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      });
  };
  

export const getAllSchool= async () => {
    return fetch("http://127.0.0.1:8000/api/school/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        });
};
export const createNewBooking = async (bookingData) => {
    return fetch("http://127.0.0.1:8000/api/booking/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    });
  };

  export const createNewSchool = async (bookingData) => {
    return fetch("http://127.0.0.1:8000/api/school/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    });
  };
  
  export const createNewChecklist = async (bookingData) => {
    
    return fetch(`http://127.0.0.1:8000/api/checklist/${bookingData}/`, {
      method: 'POST',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    });
  };
