document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#userTable tbody');

    loadSavedData();

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const terms = document.getElementById('terms').checked;

      const dobDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      if (age < 18 || age > 55) {
        alert('You must be between 18 and 55 years old to register.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Invalid email address.');
        return;
      }

     
      const row = tableBody.insertRow(0);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);

      cell1.textContent = name;
      cell2.textContent = email;
      cell3.textContent = password;
      cell4.textContent = dob;
      cell5.textContent = terms ? 'true' : 'false';

      
      saveDataToLocalStorage(name, email, password, dob, terms);

      
      form.reset();
    });

    
    function loadSavedData() {
      const savedData = JSON.parse(localStorage.getItem('userEntries')) || [];
      savedData.forEach(entry => {
        const row = tableBody.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        cell1.textContent = entry.name;
        cell2.textContent = entry.email;
        cell3.textContent = entry.password;
        cell4.textContent = entry.dob;
        cell5.textContent = entry.terms ? 'true' : 'false';
      });
    }

    // Function to save data to local storage
    function saveDataToLocalStorage(name, email, password, dob, terms) {
      const savedData = JSON.parse(localStorage.getItem('userEntries')) || [];
      savedData.unshift({ name, email, password, dob, terms });
      localStorage.setItem('userEntries', JSON.stringify(savedData));
    }
  });
