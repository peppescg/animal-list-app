document.addEventListener("DOMContentLoaded", () => {
  const animalList = document.getElementById("animal-list");
  const addAnimalForm = document.getElementById("add-animal-form");
  const editAnimalForm = document.getElementById("edit-animal-form");
  const deleteAnimalForm = document.getElementById("delete-animal-form");

  // Fetch and display the list of animals
  const fetchAnimals = async () => {
    try {
      const response = await fetch("/animals");
      const animals = await response.json();
      animalList.innerHTML = "";
      animals.forEach((animal) => {
        const li = document.createElement("li");
        li.textContent = `${animal.id}: ${animal.name}`;
        animalList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };

  // Handle form submission for creating a new animal
  // NOTE: Ensure that the backend implements the necessary endpoints (POST/PUT/DELETE for /animals).
  addAnimalForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(addAnimalForm);
    const newAnimal = {
      name: formData.get("name"),
    };
    try {
      const response = await fetch("/animals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnimal),
      });
      if (response.ok) {
        fetchAnimals();
        addAnimalForm.reset();
      } else {
        console.error("Error adding animal:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding animal:", error);
    }
  });

  // Handle form submission for editing an existing animal
  editAnimalForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(editAnimalForm);
    const animalId = formData.get("id");
    const updatedAnimal = {
      name: formData.get("name"),
    };
    try {
      const response = await fetch(`/animals/${animalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAnimal),
      });
      if (response.ok) {
        fetchAnimals();
        editAnimalForm.reset();
      } else {
        console.error("Error editing animal:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing animal:", error);
    }
  });

  // Handle delete button click event
  deleteAnimalForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(deleteAnimalForm);
    const animalId = formData.get("id");
    try {
      const response = await fetch(`/animals/${animalId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchAnimals();
        deleteAnimalForm.reset();
      } else {
        console.error("Error deleting animal:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting animal:", error);
    }
  });

  // Fetch of animals
  fetchAnimals();

  
});
